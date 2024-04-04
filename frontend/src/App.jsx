import './App.css'
import SignUpForm from './componenets/Signup/Signup'
import LoginForm from './componenets/Login/Login'
import Home from './componenets/Home/Home'
import {Toaster} from 'react-hot-toast'
import { Navigate, Route,Routes } from 'react-router-dom'
import { useAuthContext } from './Context/AuthContext'
function App() {
  const {authUser} = useAuthContext();
  return(
  <div>
  <Routes>
    <Route path='/' element={authUser ? <Home /> :<Navigate to='/login' />} />
    <Route path='/login' element={authUser ? <Navigate to="/"/> :<LoginForm />} />
    <Route path='/signup' element={authUser ? <Navigate to="/"/> :<SignUpForm />}/>
  </Routes>
  <Toaster />
 </div>
  )
}

export default App
