const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productid: {
            type: String,
        },
        section: {
            type: String,
        },
        name: {
            type: String,
            trim: true,
            maxlength: 32,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 2000,
        },
        brand: {
            type: String,
        },
        material: {
            type: String,
        },
        color: {
            type: String,
        },
        design: {
            type: String,
        },
        application: {
            type: String,
        },
        instruction: {
            type: String,
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
            maxlength: 32,
        },
        delivery: {
            type: Number,
            trim: true,
            maxlength: 32,
        },
        gst: {
            type: Number,
            trim: true,
            maxlength: 32,
            default: 0,
        },
        review: {
            type: Number,
            default: 5
        },
        parameter: {
            type: String,
            default: "meters"
        },
        quantiyleft: {
            type: Number
        },
        discount: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
);
productSchema.index({ section: 'text', name: 'text' });



// module.exports = Product;



const orderSchema = new mongoose.Schema(
    {
        // section: {
        //     type: String,

        // },
        // name: {
        //     type: String,
        //     trim: true,

        //     maxlength: 32,
        // },
        // description: {
        //     type: String,
        //     trim: true,
        //     maxlength: 2000,

        // },
        // brand: {
        //     type: String,

        // },
        // material: {
        //     type: String,

        // },
        // color: {
        //     type: String,

        // },
        // design: {
        //     type: String,

        // },
        // application: {
        //     type: String,

        // },
        // instruction: {
        //     type: String,

        // },
        // width: {
        //     type: Number,
        // },
        // length: {
        //     type: Number,
        // },
        // weight: {
        //     type: Number,
        // },
        // repeatLength: {
        //     type: Number,
        // },
        // rollLength: {
        //     type: Number,
        // },
        // property: {
        //     type: String,

        // },
        // style: {
        //     type: String,
        // },
        // photo: {
        //     data: Buffer,
        //     contentType: String,
        // },
        // price: {
        //     type: Number,
        //     trim: true,

        //     maxlength: 32,
        // },
        // delivery: {
        //     type: Number,
        //     trim: true,

        //     maxlength: 32,
        // },
        // gst: {
        //     type: Number,
        //     trim: true,

        //     maxlength: 32,
        //     default: 0,
        // },

        product: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Product"
        }],
        del_address: {
            type: String,
        },
        mode_pay: {
            type: String,
        }
    },
    { timestamps: true }
);
orderSchema.index({ section: 'text', name: 'text' });

const Order = mongoose.model('Order', orderSchema);
const Product = mongoose.model('Product', productSchema);




module.exports = {
    Product: Product,
    Order: Order
};
