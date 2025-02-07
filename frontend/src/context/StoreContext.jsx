import { createContext, useEffect, useState } from 'react'
import { food_list } from '../assets/assets'

export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})

    const addToCart = (itemId) => {
        if (cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        }
    }

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

    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
            const itemInfo = food_list.find((product) => product._id === item);
            total += itemInfo.price * cartItems[item];
        }
        return total;
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
