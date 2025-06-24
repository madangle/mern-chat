import { Route, Routes } from 'react-router-dom';
import './App.css'
// import ChatLayout from './components/Layout';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import Login from './components/authorization/Login';
import Register from './components/authorization/Register';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' Component={HomePage}/>
          <Route path='/chat' Component={ChatPage}/>
          <Route path='/login' Component={Login}/>
          <Route path='/sign-up' Component={Register}/>
        </Routes>        
      </div>
    </>
  )
}

export default App
