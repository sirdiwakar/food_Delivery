import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodlist] = useState([]);


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

    const fetchFoodList = async()=>{
        const response = await axios.get(url + "/api/food/list");
        setFoodlist(response.data.data);
    }

    useEffect( ()=>{
        (async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
        })();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
