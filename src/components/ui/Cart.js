import React, { useEffect } from "react";
import classes from "../ui/Cart.module.css"
import { useGlobalContext } from "../../context";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { padding } from "@mui/system";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from "react-router-dom";
import axios from "axios";
const Cart = () => {
    const {cartItems, increase, decrease, deleteItem, total, user} = useGlobalContext()

    const deleteItemCartByUser = async (key) => {
        const response = await axios
          .delete(`https://e-commerce-fda6a-default-rtdb.firebaseio.com/cart/${key}.json`)
          .catch((error) => console.log("Error: ", error));
        if (response && response.data) {
          console.log(response);
          console.log(response.data);
        }
      };

    const decreaseItemCartByUser = async (key) => {
        const itemIncre = cartItems.find(item => item.key===key)
        try {
            const response = await axios.put(
                `https://e-commerce-fda6a-default-rtdb.firebaseio.com/cart/${key}.json`,
                {
                    userId: itemIncre.userId,
                    id: itemIncre.id,
                    name: itemIncre.name,
                    photo: itemIncre.photo,
                    amount: itemIncre.amount-1,
                    price: itemIncre.price,
                    size: itemIncre.size
                }
            );
            console.log(response.status);
            console.log(response.data);
        } catch (e) {
            console.log('something went wrong :(', e);
        }
    }

    const increaseItemCartByUser = async (key) => {
        const itemIncre = cartItems.find(item => item.key===key)
        try {
            const response = await axios.put(
                `https://e-commerce-fda6a-default-rtdb.firebaseio.com/cart/${key}.json`,
                {
                    userId: itemIncre.userId,
                    id: itemIncre.id,
                    name: itemIncre.name,
                    photo: itemIncre.photo,
                    amount: itemIncre.amount+1,
                    price: itemIncre.price,
                    size: itemIncre.size
                }
            );
            console.log(response.status);
            console.log(response.data);
        } catch (e) {
            console.log('something went wrong :(', e);
        }
    }

    const decreaseItemCart = (key,itemId,itemSize) => {
        const itemdec = cartItems.find(item => item.key===key)
        if(user){
            if(itemdec.amount>1)
            decreaseItemCartByUser(key)
        }
        decrease(itemId,itemSize)     
    }

    const increaseItemCart = (key,itemId,itemSize) => {
        if(user)
            increaseItemCartByUser(key)
        increase(itemId,itemSize)     
    }

    const deleteItemByUser = (key,itemId,itemSize) => {
        if(user){
            deleteItemCartByUser(key)
        }
        deleteItem(itemId,itemSize)
    }
    return(
        <div className={classes.cart}>
            <h2 className="textCenter"> Giỏ hàng của bạn </h2>
            {cartItems.length>0 &&
            <>
            <div className={classes['cart-items']}>
                {cartItems.map((item) =>{ 
                    return(
                    <div className={classes['cart-item']}>
                        <div className={classes['cart-item-info']}>
                            <img src={item.photo}></img>
                            <div>
                                <h3> {item.name} </h3>
                                <p> {item.size} </p>
                            </div>
                            </div>
                        <div>
                            <button className="secondary" onClick={() => decreaseItemCart(item.key,item.id,item.size)}> - </button>
                            <span> {item.amount} </span>
                            <button className="secondary" onClick={() => increaseItemCart(item.key,item.id,item.size)}> + </button>
                            <button className= {classes['delete-button']} onClick={() => deleteItemByUser(item.key,item.id,item.size)}> <DeleteOutlineIcon></DeleteOutlineIcon> </button>
                        </div>
                    </div>
                    )
                 })}
            </div>
            <p className={classes.total}> Tổng tiền: {total}</p>
            <div className={classes.purchase}> 
                <Link to='/thanhtoan'> <button className="primary"> Thanh toán </button> </Link> 
            </div> 
            </>
            }
        </div>
    )
    
}

export default Cart;