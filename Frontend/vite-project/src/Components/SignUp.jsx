import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Loginpage.css"

const Signup = () => {
    const navigate = useNavigate()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault() //
        try {
            let data = {
                email: email,
                password: password,
                name: name,
            }
            const res = await axios.post("http://localhost:8000/signup", data)
            console.log("res", res)
            if (res.data.status === true) {
                alert(res.data.message)
                navigate("/userlogin")

            }
        }
        catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                alert(error?.response?.data?.message)
            }
        }


    }
    return (
        <div className="sign-banner">
            <div className="signupbox">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-lg-6 col-md-6 signupcontent ">
                            <h2>Welcome!</h2>
                            <img className='img-fluid' src="./images/girl.jpg" alt="" />
                        </div>

                        <div className="col-lg-6 col-md-6 signupform ">
                            <form onSubmit={handleSubmit}>
                                <h2>Sign Up </h2>

                                <div className="form-floating mb-3">
                                    <input type="username" className="form-control" id="floatingInput" placeholder="" required value={name} onChange={(e) => {
                                        setname(e.target.value)
                                    }}
                                    />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                                        required
                                        value={email} onChange={(e) => {
                                            setemail(e.target.value)
                                        }}
                                    />
                                    <label htmlFor="floatingInput" >Email address</label>
                                </div>

                                <div className=" form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingInput" placeholder=""
                                        required
                                        value={password} onChange={(e) => {
                                            setpassword(e.target.value)
                                        }}
                                    />
                                    <label htmlFor="floatingInput"> Password</label>
                                </div>

                                <div className='button_box'>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>

                            </form>


                        </div>


                    </div>
                </div>

            </div>

        </div>

    )
}

export default Signup