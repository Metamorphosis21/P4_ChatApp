import "./Styles_01.scss";
import styled from "styled-components";

// import Pic1 from "../Images/bgImg_3.png";
// import Pic2 from "../Images/bgImg_1.png";
// import Pic4 from "../Images/bgImg_2.png";

function LandingPage() {

  const LogInButton = () => {
    return (
      <StyledLogInWrapper>
        <button>LogIn</button>
      </StyledLogInWrapper>
    );
  };
  const StyledLogInWrapper = styled.div`
    button {
      color: #fff;
      padding: 0.5em 1.5em;
      font-size: 15px;
      border-radius: 0.5em;
      background: #292929;
      cursor: pointer;
      border: 1px solid #212121;
      transition: all 0.2s;
    }

    button:active {
      color: #666;
      box-shadow: inset 4px 4px 12px black, inset -4px -4px 12px #1f1f1f;
    }
  `;

  const KnowMoreButton = () => {
    return (
      <StyledKnowMoreWrapper className="Sw_1">
        <button className="learn-more">
          <span className="circle" aria-hidden="true">
            <span className="icon arrow" />
          </span>
          <span className="button-text">Know More</span>
        </button>
      </StyledKnowMoreWrapper>
    );
  };
  const StyledKnowMoreWrapper = styled.div`
    button {
      position: relative;
      display: inline-block;
      cursor: pointer;
      outline: none;
      border: 0;
      vertical-align: middle;
      text-decoration: none;
      background: transparent;
      padding: 0;
      font-size: 15px;
      font-family: Orbitron;
    }

    button.learn-more {
      width: 10rem;
      height: auto;
    }

    button.learn-more .circle {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: relative;
      display: block;
      margin: 0;
      width: 2rem;
      height: 2rem;
      background: #282936;
      border-radius: 1.625rem;
    }

    button.learn-more .circle .icon {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      background: #fff;
    }

    button.learn-more .circle .icon.arrow {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      left: 0.125rem;
      width: 1.125rem;
      height: 0.125rem;
      background: none;
    }

    button.learn-more .circle .icon.arrow::before {
      position: absolute;
      content: "";
      top: -0.29rem;
      right: 0.0625rem;
      width: 0.625rem;
      height: 0.625rem;
      border-top: 0.125rem solid #fff;
      border-right: 0.125rem solid #fff;
      transform: rotate(45deg);
    }

    button.learn-more .button-text {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0.25rem 0;
      margin: 0 0 0 1.85rem;
      color: #282936;
      font-weight: 700;
      line-height: 1.6;
      text-align: center;
    }

    button:hover .circle {
      width: 100%;
    }

    button:hover .circle .icon.arrow {
      background: #fff;
      transform: translate(1rem, 0);
    }

    button:hover .button-text {
      color: #fff;
    }
  `;

  const GetStartedButton = () => {
    return (
      <StyledGetStartedWrapper>
        <button className="button" data-text="Awesome">
          <span className="actual-text">&nbsp;GetStarted&nbsp;</span>
          <span aria-hidden="true" className="hover-text">
          &nbsp;GetStarted&nbsp;
          </span>
        </button>
      </StyledGetStartedWrapper>
    );
  };
  const StyledGetStartedWrapper = styled.div`
    /* === removing default button style ===*/
    .button {
      margin: 0;
      height: auto;
      background: transparent;
      padding: 0;
      border: none;
      cursor: pointer;
    }

    /* button styling */
    .button {
      --border-right: 3px;
      --text-stroke-color: rgba(240 , 240 , 240 , 0.6);
      --animation-color: #fff;
      --fs-size: 1em;
      letter-spacing: 3px;
      text-decoration: none;
      font-size: var(--fs-size);
      font-family: "Orbitron";
      position: relative;
      text-transform: uppercase;
      color: transparent;
      -webkit-text-stroke: 1px var(--text-stroke-color);
    }
    /* this is the text, when you hover on button */
    .hover-text {
      position: absolute;
      box-sizing: border-box;
      content: attr(data-text);
      color: var(--animation-color);
      width: 0%;
      inset: 0;
      border-right: var(--border-right) solid var(--animation-color);
      overflow: hidden;
      transition: 0.5s;
      -webkit-text-stroke: 1px var(--animation-color);
    }
    /* hover */
    .button:hover .hover-text {
      width: 100%;
      filter: drop-shadow(0 0 10px var(--animation-color));
    }
  `;

  const ChatNowButton = () => {
    return (
      <StyledChatNowWrapper>
        <button>Chat Now</button>
      </StyledChatNowWrapper>
    );
  };
  const StyledChatNowWrapper = styled.div`
  button {
  width: 10em;
  position: relative;
  height: 3.5em;
  border: 3px ridge #149CEA;
  outline: none;
  background-color: transparent;
  color: aliceblue;
  transition: .5s;
  border-radius: 0.3em;
  font-family: Orbitron;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

button::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 3%;
  width: 95%;
  height: 40%;
  background-color: #000;
  transition: 0.5s;
  transform-origin: center;
}

button::before {
  content: "";
  transform-origin: center;
  position: absolute;
  top: 80%;
  left: 3%;
  width: 95%;
  height: 40%;
  background-color: #000;
  transition: 0.5s;
}

button:hover::before, button:hover::after {
  transform: scale(0)
}

button:hover {
  box-shadow: inset 0px 0px 25px #1479EA;
}
`;

  return (
    <div className="landing-page h-[100vh]">
      <div className="navbar text-slate-300 h-14 w-full px-12 border-b-2 flex justify-between items-center fixed z-10">
        <div className="logo">Logo</div>
        <div className="navlinks flex gap-[6rem]">
          <ul className="flex flex-row gap-[6rem] items-center">
            <li>
              <a href="#">Chat Now</a>
            </li>
            <li>
              <a href="#">Updates</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
          <div className="login-btn">
            <LogInButton />
          </div>
        </div>
      </div>

      <div className="background relative h-[92%] top-14 overflow-auto">
        <div className="bgGrid h-full grid grid-cols-5 grid-rows-5">
          <div className="bgImg1 bg-gray-800 text-slate-300 row-span-3 col-span-3 flex flex-col justify-center gap-5 p-3">
            <h2 className="heading1">
              PulseNet: Futuristic Conversations, Instant Connection
            </h2>
            <p className="para1"></p>
            <div className="getStarted">
              <GetStartedButton/>
            </div>
          </div>
          <div className="bgImg2 bg-yellow-600 row-span-3 col-span-2 flex flex-col justify-center gap-5 p-3">
            <h2 className="heading2">H2</h2>
            <p className="para2">
              Welcome to <b>PulseNet</b>, a futuristic chat app designed to
              revolutionize communication. With its sleek, neon-infused
              interface and cutting-edge features, <b>PulseNet</b> brings
              conversations to life in a whole new way. Whether youre connecting
              with friends or collaborating with colleagues, this app ensures
              seamless and secure communication across the globe
            </p>
            <div className="knowmore-btn">
              <KnowMoreButton />
            </div>
          </div>
          <div className="bgImg3 bg-blue-800 row-span-2 col-span-2 flex flex-col justify-center gap-5 p-3">
            <h2 className="heading3 text-slate-300">H3</h2>
            <p className="para3 text-slate-300">
              Welcome to <b>PulseNet</b>, a futuristic chat app designed to
              revolutionize communication. With its sleek, neon-infused
              interface and cutting-edge features, <b>PulseNet</b> brings
              conversations to life in a whole new way. Whether youre connecting
              with friends or collaborating with colleagues, this app ensures
              seamless and secure communication across the globe
            </p>
            <div className="knowmore-btn">
              <KnowMoreButton />
            </div>
          </div>
          <div className="bgImg4 bg-black text-slate-300 row-span-2 col-span-3 flex flex-col justify-center gap-5 p-3">
            <h2 className="heading4">
              EchoVerse: Chat in the World of Tomorrow
            </h2>
            <p className="para4"></p>
            <div className="chatNow-btn">
              <ChatNowButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
// https://marketplace.canva.com/EAFduPmf5Lw/1/0/1600w/canva-lA32ra6HgjI.jpg
