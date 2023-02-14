import React, { useCallback, useState } from "react";
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
    const [style, setStyle] = useState({display: 'none'})
    const signinHandler = async (e) =>{
        e.preventDefault()
        try{
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            navigate('/', {replace:true})
        }
        catch (error) {
            console.log(error.message)
            setStyle({display: 'block'})
        }
    }
    // const loginSuccess = () => {
    //     if(!user.email){
    //         setStyle({display: 'block'})
    //     }
    //     else{
    //         useCallback(() => navigate('/', {replace:true}), [navigate])
    //     }
    // }

    return(
        <div className={classes.login}>
            <form onSubmit={signinHandler}>
            <h2> Đăng nhập </h2>
                <label htmlFor="username"> Tên đăng nhập </label> 
                <input type="email" name='username' id='username' required onChange={emailHandler}></input>
                <label htmlFor="password"> Mật khẩu </label> 
                <input type="password" name="pass" id="password" required onChange={passwordHandler}></input>
                <b><p style={style}> Tên đăng nhập hoặc mật khẩu sai !</p></b>
                <button className="primary"> Đăng nhập </button>
                <span> Bạn chưa có tài khoản? {` `}</span><Link to="/dangky"> <u> Nhấn vào đây để đăng ký </u> </Link>
            </form>
        </div>
    )
}
export default Login