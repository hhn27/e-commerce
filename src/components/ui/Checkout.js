import React, { useRef, useState } from "react";
import { useGlobalContext } from "../../context";
import classes from './Checkout.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const {user,cartItems, deleteItem, cartDisplay} = useGlobalContext()
    const [name,setName] = useState('')
    const [address,setAddress] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const nameHandler = (e) => {
        setName(e.target.value)
    }
    const addressHandler = (e) => {
        setAddress(e.target.value)
    }
    const phonenumberHandler = (e) => {
        setPhoneNumber(e.target.value)
    }

    async function saveOrder (e) {
        e.preventDefault()
        const response = await fetch('https://e-commerce-fda6a-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({name: name, address: address, phonenumber: phonenumber, cartItems: cartItems}),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    }

    const deleteItemsCartByUser = async (key) => {
        const response = await axios
          .delete(`https://e-commerce-fda6a-default-rtdb.firebaseio.com/cart/${key}.json`)
          .catch((error) => console.log("Error: ", error));
        if (response && response.data) {
          console.log(response);
          console.log(response.data);
        }
      };

    const deleteItemsCart = () => {
        if(user){
            const cartItms = cartItems.filter(item => item.userId===user.email)
            cartItms.map((item) =>{
                deleteItemsCartByUser(item.key)
            })
        }
        cartDisplay([])
    }
    const navigate = useNavigate()
    const [isClicked, setisClicked] = useState(false)
    const a = () =>{
        navigate('/', {replace:true})
    }
    const navi= () =>{
        setisClicked(true)
        setStyle({transform: 'translateX(0)'})
        setTimeout(a, 3500)
    }

    const [style, setStyle] = useState({transform: 'translateX(100%)'})

    return(
        <div className={classes.checkout}>
            <form onSubmit={(e) =>{saveOrder(e); deleteItemsCart(); navi()}}>
                <label htmlFor="name"> Tên của bạn </label> 
                <input type="text" name='name' id='name' required onChange={nameHandler}></input>
                <label htmlFor="address"> Địa chỉ của bạn </label> 
                <input type="text" name="address" id="address" required onChange={addressHandler}></input>
                <label htmlFor="phonenumber"> Số điện thoại của bạn </label> 
                <input type="text" name="phonenumber" id="phonenumber" required onChange={phonenumberHandler}></input>
                <button className="primary"> Đặt hàng </button>
            </form>
            <div style={style} className={classes.thank}> Cảm ơn bạn vì đã đặt hàng </div>
        </div>
    )
}
export default Checkout