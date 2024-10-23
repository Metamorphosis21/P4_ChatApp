export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

import UserProfile from './UserProfile';

export default function App() {
  return (
    <div className="app-container">
      <h1 className="text-3xl font-bold underline">Welcome to the Chat App!</h1>
      <UserProfile />
    </div>
  );
}
