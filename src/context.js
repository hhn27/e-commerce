import React, {useState, useContext, useReducer, useEffect} from "react";
import reducer from "./reducer";
import { auth } from "./firebase-config";
import { onAuthStateChanged, getAuth } from "firebase/auth"
import axios from "axios";

const AppContext = React.createContext()

const initialState = {
    loading: false,
    items: [],
    cartItems: [],
    total: 0,
    amount: 0,
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const itemsDisplay = async () => {
        dispatch({ type: 'LOADING' })
        try{
        const response = await fetch('https://e-commerce-fda6a-default-rtdb.firebaseio.com/items.json')
        const responseData = await response.json();
    
        const loadedItems = [];
        if(responseData){
        for (const key in responseData) {
            const photo = [];
            const size = [];
            for (const i in responseData[key].photo){
                photo.push(responseData[key].photo[i].url);
            }
            for (const i in responseData[key].size){
                size.push(responseData[key].size[i]);
            }
            loadedItems.push({
                id: key,
                name: responseData[key].name,
                category: responseData[key].category,
                material: responseData[key].material,
                photo: photo,
                price: responseData[key].price,
                size: size,
                detail: responseData[key].detail
            });
        }
        console.log(loadedItems)
        dispatch({ type: 'DISPLAY_ITEMS', payload: loadedItems})
        }
        }
        catch(err){
            console.log(err)
        }
    }

    const cart = []
    const cartDisplay = (ca) =>{
        dispatch({ type: 'CART_BY_USER', payload: ca})
    }
    async function cartByUser (userEmail){
        const response = await fetch('https://e-commerce-fda6a-default-rtdb.firebaseio.com/cart.json')
        const responseData = await response.json();
        for (const key in responseData) {
            console.log(key)
            cart.push({
                key: key,
                userId: responseData[key].userId,
                id: responseData[key].id,
                name: responseData[key].name,
                photo: responseData[key].photo,
                amount: responseData[key].amount,
                price: responseData[key].price,
                size: responseData[key].size
            });
        }
        cartDisplay(cart.filter(item => item.userId===userEmail))
        // dispatch({ type: 'CART_BY_USER', payload: cart.filter(item => item.userId===userEmail)})
        dispatch({type:'GET_TOTALS'})
    }

    useEffect(() => {
        itemsDisplay();
        onAuthStateChanged(auth, (currentUser) => {
            // console.log(currentUser.email)
            const a =currentUser
            setUser(currentUser)
            if(a){
                cartByUser(a.email)
            }
            else{
                const cart = localStorage.getItem("cart")
                if(cart){
                    cartDisplay(JSON.parse(cart))
                }
            }
            }
        )
            // cartByUser(currentUser.email);
    },[])

    // const deleteItemCartByUSer = async (itemId) => {
    //         const response = await axios
    //           .delete(`https://e-commerce-fda6a-default-rtdb.firebaseio.com/cart/${itemId}.json`)
    //           .catch((error) => console.log("Error: ", error));
    //         if (response && response.data) {
    //           console.log(response);
    //           console.log(response.data);
    //         }
    //       };

    const add = (i, s, q) => {
        dispatch({ type: 'ADD', payload: {id: i, size: s, quantity: q}})
    }
    const increase = (i, s) => {
        dispatch({ type: 'INCREASE', payload: {id: i, size: s}})
    }
    const decrease = (i, s) => {
        dispatch({ type: 'DECREASE', payload: {id: i, size: s}})
    }
    const deleteItem = (i, s) => {
        // if(user){
        //     cart.map
        //     deleteItemCartByUSer(i)
        // }
        dispatch({ type: 'DELETE', payload: {id: i, size: s}})
    }
    useEffect(() => {
        dispatch({type:'GET_TOTALS'});
        console.log(state.cartItems)
        if(!user && state.cartItems.length>0){
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
        }
        // dispatch({type:'SAVE_CART_TO_LOCAL'});
        // console.log(state.cartItems)
    },[state.cartItems])

    const [user,setUser] = useState({})
    // useEffect(() => {
    // setUser(auth.currentUser)
    // }, [])

    return (
        <AppContext.Provider
            value={{
                ...state,  
                add,
                increase,
                decrease,
                deleteItem,
                user,
                itemsDisplay,
                cartDisplay
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider}