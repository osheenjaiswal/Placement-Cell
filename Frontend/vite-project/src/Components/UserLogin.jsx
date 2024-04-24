import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "./Loginpage.css"
import axios from 'axios';

const userLogin = () => {
const [email, setEmail] = useState();
const [password, setPassword] = useState("");
const navigate = useNavigate()
const token = localStorage.getItem('token') || ""
   
const handleLogin = async (event) => {
  event.preventDefault()
  try{

    let data = {
      // keyname : keyvalue
      email : email,
      password:password
  }

     if(email === ''){
          alert('email is required')
          return false
      }

      if(password === ''){
          alert('password is required')
          return false
      }
    const res = await axios.post("http://localhost:8000/placementcell/login",data,{
      headers:{
          'Content-Type':'application/json',
          'x-access-token': token
      }
  })
  console.log('login response')
  console.log(res)
 
  if(res.data.status===true){
      alert(res.data.message)
      localStorage.setItem('users',JSON.stringify(res.data.data))
      localStorage.setItem('token',res.data.jwttoken)
      navigate('/')
  }
}
catch(err){
console.log(err)
if(err?.response?.data?.status === false)
{
  alert(err?.response?.data?.message)
  
}
}
 
}
  return (
    <>
      <div className="banner">
        <div className="login_box">
          <div className="container-fluid h-100">
            <div className="row">
              <div className="col-md-7 logincontent">
                <h2>Welcome!</h2>
                <img className='img-fluid' src="./images/loginpage.jpg" alt="" />
              </div>
              <div className="col-md-5 formbox logincontent ">
                <form onSubmit={
                  handleLogin
                }>
                  <h2>Login</h2>
                  <div class="form-floating mb-3">
                    <input
                      type="email" className='form-control' id="floatingInput" placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput" >Email address</label>
                  </div>

                  <div class="form-floating mb-3">
                    <input
                      type="password" className="form-control" id="floatingInput" placeholder=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Password</label>
                  </div>

                  
                  <div className='d-grid '>
                    <button className='btn btn-primary' type="submit">Let's Go</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
</>

  )
}

export default userLogin;