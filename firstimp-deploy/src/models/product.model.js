const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        section: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 2000,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        material: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        design: {
            type: String,
            required: true,
        },
        application: {
            type: String,
            required: true,
        },
        instruction: {
            type: String,
            required: true,
        },
        width: {
            type: Number,
        },
        length: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        repeatLength: {
            type: Number,
        },
        rollLength: {
            type: Number,
        },
        property: {
            type: String,
        },
        style: {
            type: String,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32,
        },
        delivery: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32,
        }, 
        gst: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32,
            default: 0,
        },
        review:{
            type:Number,
            default:5
            },
        parameter:{
            type:String,
            default:"meters"
            },
        quantiyleft:{
            type:Number
            },
        discount:{
            type:Number,
            default:0
            },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
