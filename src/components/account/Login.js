import React, { useState } from "react";
import classes from './Login.module.css'
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { auth } from "../../firebase-config";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    const navigate = useNavigate()
    const signinHandler = async (e) =>{
        e.preventDefault()
        try{
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(user)
        }
        catch (error) {
            console.log(error.message)
        }
        navigate('/', {replace:true})
    }

    return(
        <div className={classes.login}>
            <form onSubmit={signinHandler}>
            <h2> Đăng nhập </h2>
                <label htmlFor="username"> Tên đăng nhập </label> 
                <input type="email" name='username' id='username' required onChange={emailHandler}></input>
                <label htmlFor="password"> Mật khẩu </label> 
                <input type="password" name="pass" id="password" required onChange={passwordHandler}></input>
                <button className="primary"> Đăng nhập </button>
                <span> Bạn chưa có tài khoản? {` `}</span><Link to="/dangky"> Nhấn vào đây để đăng ký</Link>
            </form>
        </div>
    )
}
export default Login