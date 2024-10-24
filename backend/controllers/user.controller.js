import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js";
import { User} from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken'; 
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from 'mongoose';


const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false})

        return {accessToken, refreshToken}
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong")
        
    }
}

const registerUser = asyncHandler( async (req, res)=>{
    
    const {fullName, email, username, password} = req.body;
    
    if(
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")      
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0){
        coverImageLocalPath = req.files.coverImage[0].path;

    }

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath) ;
    const coverImage = await uploadOnCloudinary(coverImageLocalPath) ;

    if(!avatar){
        throw new ApiError(400 , "Avatar file is required")
    }

    //create entry in DB==> create an object
    //.create is a mongoDb method
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })
    // check if user is created or not
    // removing password and refreshToken
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse (200, createdUser, "user registered successfully")
    )



})

const loginUser = asyncHandler( async (req, res)=>{
  
    const {email, username, password} = req.body
    if((!username) || (!email)){
        throw new ApiError(400, "username or email is required")    
    }

    const user =await User.findOne({
        $or:[{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Inalid user credentials" )
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken",refreshToken, options)
    .json(
        new ApiResponse (
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "user logged in successfully"
        )
    )

})

const logOutUser = asyncHandler (async (req, res) =>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,

            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out")
    )


})

const refreshAccessToken = asyncHandler( async (req, res)=>{
    //get token from user
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    //req.body==> for for mobile users

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }
    

    //we want decoded data so...
    try {// trycatch for DB calls
        const decodedToken = jwt.verify(
            incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        //check the incomingRefreshToken === refreshtoken saved in DB
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used")
        }
        
        //better to declare as g variable
        const options = {
            httpOnly: true,
            secure: true
        }
    
        //generateAccessAndRefreshToken
        const {accessToken, newrefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken",accessToken, options)
        .cookie("refreshToken",newrefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {
                    accessToken, newrefreshToken
                },
                "Access token refreshed successfully"
    
            )
        )
    } 
    catch (error) {
        throw new ApiError(401, error?.message ||
            "Invalid refresh token"
        )
    }

} )

const changeCurrentPassword = asyncHandler(async (req, res) =>{
    const {oldPassword, newPassword} = req.body;

    //get user._id from DB
    const user = await User.findById(req.user?._id)
    //isPasswordCorrect method is defined in user.models.js 

    const isPasswordCorrect =  await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid old password")
    }

    //set newPassword to user's password 
    user.password = newPassword
    //Now save it in the DB
    await user.save({ validateBeforeSave: false })

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password changed successfully")
    )





})


const getCurrentUser = asyncHandler(async(req, res)=>{
    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, "current user fetched successfully")
    )
})


const updateAccountDetails = asyncHandler(async (req, res)=>{
    const {fullName, email} = req.body;

    if(!fullName || !email){
        throw new ApiError(400, "all fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, "account details updated successfully")
    )

    

})

const updateUserAvatar = asyncHandler(async (req, res)=>{
    //req.file ==not files(here only)
    const avatarLocalPath = req.file?.path
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is missing")

    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.url){
        throw new ApiError(400, "Error while uploading on avatar ")

    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {
            new :true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar updated successfully")
    )


} )


const updateUserCoverImage = asyncHandler(async (req, res)=>{
    //req.file ==not files(here only)
    const coverImageLocalPath = req.file?.path
    
    if(!coverImageLocalPath){
        throw new ApiError(400, "Image file is missing")

    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!coverImage.url){
        throw new ApiError(400, "Error while uploading on coverImage ")

    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                coverImage: coverImage.url
            }
        },
        {
            new :true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Cover image updated successfully")
    )


} )







export { registerUser, loginUser, logOutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage };




