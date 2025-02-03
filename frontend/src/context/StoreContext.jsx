import { createContext, useEffect, useState } from 'react'
import { food_list } from '../assets/assets'

export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})

    const addToCart = (itemId) => {
        if(cartItems[itemId]) {
            setCartItems(prev=>({...prev, [itemId]:prev[itemId] + 1}))
        } else {
            setCartItems(prev=>({...prev, [itemId]:1}))
        }
    }
    useEffect(()=>{ console.log(cartItems)},[cartItems]);
    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const updatedCart = { ...prev };
    
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
    
            return updatedCart;
        });
    };
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
