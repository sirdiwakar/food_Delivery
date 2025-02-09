import foodModel from "../models/foodModel.js";
import fs from 'fs';

export const addFood = async (req, res)=>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    });
    try {
        const newFood = await food.save();
        res.status(201).json({
            success: true,
            message: 'Food added successfully',
            data: newFood
        });
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
}  

export const listFood = async (req, res) =>{
    try{
        const foods = await foodModel.find({});
        res.status(200).json({success: true, data: foods});
    }catch(errro){
        res.json({success: false, message: "Error"});
    }
};

// remove food item.
export const removeFood = async(req, res) => {
    try{
        const { id } = req.params;
        const food = await foodModel.findById(id);
        fs.unlink(`uploads/${food.image}`, (err)=>{
            console.log(err)
        });

        await foodModel.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Food Remove"});
    }catch(error){
        res.status(500).json({success: false, message: "Error Removing the food"});
    }
}