const reducer =(state, action) => {
    if (action.type === 'LOADING'){
        return {...state, loading: true}
    }
    if (action.type === 'DISPLAY_ITEMS'){
        return {...state, loading: false, items: action.payload}
    }
    if (action.type== 'CART_BY_USER'){
        return {...state, cartItems: action.payload}
    }
    // if (action.type== 'SAVE_CART_TO_LOCAL'){
    //     localStorage.setItem("cart", JSON.stringify(state.cartItems))
    // }
    if (action.type === 'ADD'){
        // let cartItem = {}
        // if(state.cartItems){
        //     cartItem = state.cartItems.find((cartItem) => cartItem.id === action.payload.id)
        // }
        const item = state.items.find((item) => item.id === action.payload.id)
        const cartItem = {
            id: item.id,
            name: item.name,
            photo: item.photo[0],
            amount: action.payload.quantity,
            price: item.price,
            size: action.payload.size
        }
        console.log(cartItem)
        let tempCart = []
        // console.log(state.cartItems.length)
        if(state.cartItems.length>0){
            // let cartItem = state.cartItems.find((cartItem) => cartItem.id === action.payload.id)
            let check = false
            tempCart = state.cartItems.map((cartIte, key) => {
                if (cartIte.id === action.payload.id && cartIte.size=== action.payload.size) {
                    check = true
                    // state.cartItems[key].amount= + action.payload.quantity
                    return {...cartIte, amount: cartIte.amount+action.payload.quantity}
                }
                return cartIte
            })
            if(!check){
                tempCart.push(cartItem)
            }
        }
        else{
            tempCart.push(cartItem)
        }
        return {...state, cartItems: tempCart,amount: state.amount+action.payload.quantity}
    }
    if (action.type === 'INCREASE'){
        let tempCart = state.cartItems.map((cartItem) => {
            if (cartItem.id === action.payload.id && cartItem.size=== action.payload.size) {
                return {...cartItem, amount: cartItem.amount +1}
            }
            return cartItem
        })
        return {...state, cartItems: tempCart, amount: state.amount+1}
    }
    if (action.type === 'DECREASE'){
        let amount = state.amount
        let tempCart = state.cartItems.map((cartItem) => {
            if (cartItem.id === action.payload.id && cartItem.size=== action.payload.size) {
                if (cartItem.amount>1){
                    amount = state.amount-1
                    return {...cartItem, amount: cartItem.amount -1}
                }
            }
            return cartItem
        })
        return {...state, cartItems: tempCart, amount: amount}
    }
    if (action.type === 'DELETE'){
        const cItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id || cartItem.size!== action.payload.size)
        const itemDelete = state.cartItems.find((cartItem) => cartItem.id === action.payload.id && cartItem.size === action.payload.size)
        return {...state, cartItems: cItems, amount: state.amount-itemDelete.amount}
    }
    if (action.type === 'GET_TOTALS'){
        let totalPrice = 0
        let amount = 0
        state.cartItems.map((cartItem) => {
            totalPrice = totalPrice + cartItem.price*cartItem.amount
            amount = amount + cartItem.amount
        })
        return {...state, amount: amount, total: totalPrice}
    }
}
export default reducer;