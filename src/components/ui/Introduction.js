import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';
import classes from './Introduction.module.css'
import Loading from "../loading/Loading";

const Introduction = () => {
    const [loading, setLoading] = useState(true)
    const [introduction,setIntroduction] = useState('')
    const fetchIntroduction= async() =>{
        setLoading(true)
        try{
            const response = await fetch('https://e-commerce-fda6a-default-rtdb.firebaseio.com/introduction.json')
            const data = await response.json()
            setLoading(false)
            setIntroduction(data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        fetchIntroduction()
    },[])

    if(!loading){
        return(
            <div className={classes.introduction}>
                <h2 className="textCenter"> Về chúng tôi </h2>
                <div className={classes.info}> {parse(introduction)} </div>
            </div>
        )
    }
    else{
        return(
            <Loading></Loading>
        )
    }
}
export default Introduction