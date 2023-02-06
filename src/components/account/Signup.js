import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword} from 'firebase/auth'
import classes from './Signup.module.css'
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const special= /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    const lower= /[a-z]/
    const upper= /[A-Z]/
    const number= /[1-9]/
    const [submitActive,setSubmitActive] = useState(false)
    const [passwordAlert,setPasswordAlert] = useState('')
    const [repassAlert,setRepassAlert] = useState('')
    const [pass,setPass] = useState('')
    const [passIsValid, setPassIsValid] = useState(false)
    const [repassIsValid, setRepassIsValid] = useState(false)

    const [username, setUsername] = useState('')
    const usernameHandler = (e) => {
        setUsername(e.target.value.trim())
    }
    const passwordHandler = (e) => {
        const password = e.target.value.trim()
        setPass(password)
        if(password.length>=8 && special.test(password) && upper.test(password) && lower.test(password) && number.test(password)){
            setPasswordAlert("Mật khẩu hợp lệ")
            setPassIsValid(true)
        }
        else{
            setPasswordAlert("Mật khẩu phải dài ít nhất 8 ký tự và phải bao gồm chữ hoa, chữ thường, ký tự đặc biệt")
            setPassIsValid(false)
        }
    }
    const reWritePassHandler = (e) => {
        if(e.target.value!==pass){
            setRepassAlert("Mật khẩu không trùng khớp")
            setRepassIsValid(false)
        }
        else{
            setRepassAlert("Mật khẩu khớp")
            setRepassIsValid(true)
        }
    }
    useEffect(() =>{
        if(passIsValid&&repassIsValid){
            setSubmitActive(true)
        } 
        else{
            setSubmitActive(false)
        }
    },[passIsValid,repassIsValid])

    const navigate = useNavigate()
    const signupHandler = async (e) =>{
        e.preventdefault()
        try{
            const user = await createUserWithEmailAndPassword(
                auth,
                username,
                pass
            );
            console.log(user)
        }
        catch (error) {
            console.log(error.message)
        }
        navigate('/', {replace:true})
    }

    return(
        <div className={classes.signup}>
            <h2> Đăng ký tài khoản </h2>
            <form onSubmit={signupHandler}>
                <label htmlFor="username"> Tên đăng nhập </label> 
                <input type="email" name='username' id='username' required onBlur={e => usernameHandler(e)}></input>
                <label htmlFor="password"> Mật khẩu </label> 
                <input type="password" name="pass" id="password" required onChange={e => passwordHandler(e)}></input>
                <p className={passIsValid? classes['green-alert'] : classes['red-alert']}> {passwordAlert} </p>
                <label htmlFor="repass"> Nhập lại mật khẩu </label>
                <input type="password" name="pass" id="repass" required onChange={e => reWritePassHandler(e)}></input>
                <p className={repassIsValid? classes['green-alert'] : classes['red-alert']}> {repassAlert} </p>
                <button disabled={!submitActive} className={submitActive&& "primary"}> Đăng ký </button>
            </form>
        </div>
    )
}
export default Signup