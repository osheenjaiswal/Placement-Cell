import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import UserLogin from './Components/UserLogin';
import Signup from './Components/SignUp';

function App() {

  return (
    <>
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/userlogin" element={<UserLogin />} />
    <Route exact path="/signup" element={<Signup />} />
    </Routes>
    </>
  )
}

export default App
