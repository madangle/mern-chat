import { Route, Routes } from 'react-router-dom';
import './App.css'
// import ChatLayout from './components/Layout';
// import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import Register from './Components/authorization/Register.tsx';
import Login from "./Components/authorization/Login.tsx";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' Component={Login}/>
          <Route path='/chat' Component={ChatPage}/>
          <Route path='/login' Component={Login}/>
          <Route path='/sign-up' Component={Register}/>
        </Routes>        
      </div>
    </>
  )
}

export default App
