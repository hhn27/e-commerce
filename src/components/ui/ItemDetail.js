import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import classes from './ItemDetail.module.css'
import parse from 'html-react-parser';
import ItemsSlider from "../items/ItemsSlider";

const ItemDetail = () => {
    const {items, add, user} = useGlobalContext()
    const {itemId} = useParams()
    let item = {}
    let index 
    let randomItems = []
    let indexArray = []
    const checkRandomNumber = (r) => {
        for(let i=0; i < indexArray.length;i++){
            if(r===indexArray[i] || r=== index){
                return false
            }
        }
        return true
    }
    if (items.length>0){
        console.log(item)
        index = items.findIndex(item => item.id===itemId)
        console.log(index)
        for(let i=0; i<5;i++){
            let randomNumber = Math.floor(Math.random() * items.length)
            if(i===0 || checkRandomNumber(randomNumber)){
                indexArray[i]=randomNumber
                randomItems[i]=items[randomNumber]
            }
            else{
                i=i-1
            }
        }
    }
    item = items.find((it) => it.id===itemId)
    // item = items.find((it) => it.id===itemId)
    console.log(item)
    const [imgIndex, setImgIndex] = useState(0)
    const [selectedImgStyle, setSelectedImgStyle] = useState({})
    const [selectedSize, setSelectedSize] = useState();
    const [quantity, setQuantity] = useState(1)
    const [alert, setAlert] = useState('')
    const sizeHandler = (s) => {
       setSelectedSize(s)
    }
    const increaseHandler = () => {
        setQuantity(quantity+1)
    }
    const decreaseHandler = () => {
        if(quantity>1)
            setQuantity(quantity-1)
    }
    async function addToCartByUser (cartItem) {
        const response = await fetch('https://e-commerce-fda6a-default-rtdb.firebaseio.com/cart.json', {
            method: 'POST',
            body: JSON.stringify(cartItem),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    }
    const addToCart = () => {
        if(selectedSize && item.size[selectedSize].quantity>0){
            if(user){
                const cartItem = {
                    userId: user.email,
                    id: item.id,
                    name: item.name,
                    photo: item.photo[0],
                    amount: quantity,
                    price: item.price,
                    size: item.size[selectedSize].name
                }
            addToCartByUser(cartItem)
            }
            add(item.id, item.size[selectedSize].name, quantity)
            setAlert("")
        }
        else{
            setAlert("Size đã hết hoặc bạn chưa chọn size !!")
        }
    }
    
    if(item){
        return(
            <div className={classes['item-detail']}>
                <div className={classes['item-detail-header']}>
                    <div className={classes.photo}>
                        <img src={item.photo[imgIndex]} className={classes.mainPhoto}></img>
                        {item.photo.map((photo, indx) => 
                            <img src={photo} style={indx===imgIndex? selectedImgStyle: null} onClick={() => {setImgIndex(indx); setSelectedImgStyle({border: 'solid 1px'})}}></img>
                        )}
                    </div>
                    <div className={classes['item-detail-header-right-side']}>
                        <h2>
                            {item.name}
                        </h2>
                        <div>
                            <span> Giá: </span>
                            {item.price}
                        </div>
                        <div>
                            <span> Số lượng: </span>
                            <button className="secondary" onClick={() => decreaseHandler()} > - </button>
                            <span> {quantity} </span>
                            <button className="secondary" onClick={() => increaseHandler()}> + </button>
                            <span> Còn lại: {selectedSize && item.size[selectedSize].quantity} </span>
                        </div>
                        <div className={classes.sizes}>
                            <span> Chọn size: </span>
                            {item.size.map((size,key) => 
                                <button className={selectedSize===key ? classes.active : 'secondary'} onClick={() => sizeHandler(key)}> {size.name} </button>
                            )}
                        </div>
                        <div>
                        </div>
                        <div className={classes['add-to-cart']}>
                            <button className="primary" onClick={() => addToCart()}> Thêm vào giỏ hàng </button>
                            <p> {alert} </p>
                        </div>
                    </div>
                </div>
                <div className={classes.characteristics}>
                    <img src="https://i.imgur.com/H8eoGri.png"></img>
                </div>
                <div className={classes.text}>
                    {parse(item.detail)}
                </div>
                <div>
                    <ItemsSlider items={randomItems}>
                    </ItemsSlider>
                </div>
            </div>
        )
    }
    else{
        return(
            <>
            </>
        )
    }
}
export default ItemDetail