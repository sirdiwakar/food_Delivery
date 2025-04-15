import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://food-delivery-backend-dai4.onrender.com";
    const [token, setToken] = useState("");
    const [email, setEmail] = useState(null);
    const [food_list, setFoodlist] = useState([]);


    const addToCart = async (itemId) => {
        if (cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        }
        if(token){
            await axios.patch(url+"/api/cart/add", {itemId}, {headers:{token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems(prev => {
            const updatedCart = { ...prev };

            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }

            return updatedCart;
        });
        if(token){
            await axios.patch(url+"/api/cart/remove", {itemId}, {headers:{token}});
        }
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

    const loadCartData = async (token) => {
        const response = await axios.get(url+"/api/cart/get", {headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect( ()=>{
        (async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
            if(localStorage.getItem("email")){
                setEmail(localStorage.getItem("email"));
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
        email,
        setEmail,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
