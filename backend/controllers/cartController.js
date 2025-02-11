import userModel from "../models/userModel.js"

export const addToCart = async (req, res) =>{
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = userData.cartData;
        cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.status(200).json({success: true, message: "Added to cart"});
    }catch(err){
        res.status(500).json({success: false, message: "Internal Server Error"})
    }

}

export const removeFromCart = async (req, res) =>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if(cartData[req.body.itemId] > 1){
            cartData[req.body.itemId] -= 1;
        }else{
            delete cartData[req.body.itemId]; 
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.status(200).json({success: true, message: "Removed From Cart"});
    }catch (err){
        res.status(400).json({success: false, message: "Internal Server Error"});
    }
}

export const getCart = async (req, res) =>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        res.status(200).json({success: true, cartData}); 
    }catch(err){
        res.status(400).json({success: false, message: "Error"});
    }
}
