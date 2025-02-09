import mongoose from 'mongoose';

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});
const foodModel = mongoose.models.food || mongoose.model('Food', foodSchema); 

export default foodModel;
