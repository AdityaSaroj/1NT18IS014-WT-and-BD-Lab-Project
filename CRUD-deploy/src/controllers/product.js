const {Product,Order} = require('../models/product.model');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: 'Product not ffound',
            });
        }
        req.product = product;
        next();
    });
};

exports.list = (req, res) => {
    // console.log(req._id)
    Product.find({})
        .select('-photo')
        .exec((err, products) => {
            if (err) {
                res.status(400).json({
                    error: 'Products not found',
                });
            }
            res.json(products);
        });
};


exports.allorders = (req, res) => {
    Order.find({})
        // .select('-photo')
        .populate('product')
        .exec((err, orders) => {
            if (err) {
                res.status(400).json({
                    error: 'Products not found',
                });
            }
            console.log(orders)
            res.json(orders);
        });
};


exports.orderedprod = (req, res) => {
    let form = new formidable.IncomingForm();
     form.parse(req, (err, fields) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }
    form.keepExtensions = true;
    Product.find({
        _id: req.params.productId
    }).exec(function (err, docs) {
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'error',
            });
        } else {
            console.log(docs)
            fields['product']=docs;            

            let order = new Order(fields);
            order.save((err, result) => {

                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err),
                    });
                }
                return res.status(200).json(result);            
            });
            
        }
    });



   

        // const {
        //     section,
        //     name,
        //     description,
        //     brand,
        //     material,
        //     color,
        //     design,
        //     application,
        //     instruction,
        //     price,
        //     delivery,
        //     gst,
        // } = fields;
        // if (
        //     !section ||
        //     !name ||
        //     !description ||
        //     !brand ||
        //     !material ||
        //     !color ||
        //     !design ||
        //     !application ||
        //     !instruction ||
        //     !price ||
        //     !delivery ||
        //     !gst
        // ) {
        //     return res.status(400).json({
        //         error: 'Please fill the required fields',
        //     });
        // }

        // let order = new Order(fields);

        // if (files.photo) {
        //     if (files.photo.size > 1000000) {
        //         return res.status(400).json({
        //             error: 'Image size must be less than 1MB',
        //         });
        //     }
        //     product.photo.data = fs.readFileSync(files.photo.path);
        //     product.photo.contentType = files.photo.type;
        // }

        // order.save((err, result) => {
        //     if (err) {
        //         return res.status(400).json({
        //             error: errorHandler(err),
        //         });
        //     }
        //     res.json(result);
        // });
});
};



exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }

        const {
            section,
            name,
            description,
            brand,
            material,
            color,
            design,
            application,
            instruction,
            price,
            delivery,
            gst
        } = fields;
        if (
            !section ||
            !name ||
            !description ||
            !brand ||
            !material ||
            !color ||
            !design ||
            !application ||
            !instruction ||
            !price ||
            !delivery ||
            !gst 
        ) {
            return res.status(400).json({
                error: 'Please fill the required fields',
            });
        }

        let product = new Product(fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image size must be less than 1MB',
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            res.json(result);
        });
    });
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.viewProduct = (req, res) => {
    req.product.photo = undefined;
    console.log(res.json(req.product))
    return res.json(req.product);
};

exports.viewOrder = (req, res) => {
    req.order.photo = undefined;
    console.log(res.json(req.order))
    return res.json(req.order);
};

//small modification to fix search
exports.searchProduct = (req, res) => {
    Product.find({
        name: { $regex: '^' + req.params.pName, $options: 'i' },
    }).exec(function (err, docs) {
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: 'error',
            });
        } else {
            return res.status(200).json(docs);
        }
    });
};

exports.updated = async (req, res) => {
    const pId = req.params.pId;
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        } else {
            let updatedata = {};
            if (files.photo) {
                if (files.photo.size > 1000000) {
                    return res.status(400).json({
                        error: 'Image size must be less than 1MB',
                    });
                }
                let photodata = fs.readFileSync(files.photo.path);
                let photocontent = files.photo.type;
                let photo = { data: photodata, contentType: photocontent };
                updatedata = { ...fields, photo };
            } else {
                updatedata = fields;
            }

            await Product.findByIdAndUpdate(pId, updatedata, (err, prod) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(prod);
                }
            });
        }
    });
};

exports.deleted = async (req, res) => {
    Product.findOne({ _id: req.params.pId }).exec((err, product) => {
        if (product) {
            product.remove();
            return res.status(200).json({
                message: 'Deleted Product!',
            });
        }

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Could not delete product',
            });
        }
    });
};


exports.deletedord = async (req, res) => {
    Order.findOne({ _id: req.params.orderId }).exec((err, order) => {
        
        if (order) {
            order.remove();
            return res.status(200).json({
                message: 'Deleted Product!',
            });
        }

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Could not delete product',
            });
        }
    });
};


exports.dropdownList = (req, res) => {
    Product.find({})
        .select('-photo')
        .exec((err, list) => {
            if (err) {
                res.status(400).json({
                    error: 'dropdown not found',
                });
            }

            let context = {};
            context.material = [];
            context.property = [];
            context.color = [];
            allSection = [];
            allMaterial = [];
            allProperty = [];
            allColor = [];
            allBrand = [];
            list.forEach((item) => {
                //console.log(item);
                allMaterial.push(item.material);
                //const productInstructions = item.instru;
                // productInstructions.forEach((instruction) => {
                //     context.instructions.push(instruction);
                // });
                allSection.push(item.section);
                allColor.push(item.color);
                allProperty.push(item.property);
                allBrand.push(item.brand);
            });

            context.section = Array.from(new Set(allSection)).sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            context.material = Array.from(new Set(allMaterial)).sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            context.property = Array.from(new Set(allProperty)).sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            context.color = Array.from(new Set(allColor)).sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            context.brand = Array.from(new Set(allBrand)).sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            res.json(context);
        });
};

// router.post('/', (req, res) => {
//     const newProd = new Product({
//         section: req.body.section,
//         productId: req.body.productId,
//         productName: req.body.productName,
//         desc: req.body.desc,
//         brand: req.body.brand,
//         material: req.body.material,
//         color: req.body.color,
//         design: req.body.design,
//         application: req.body.application,
//         instru: req.body.instru,
//         width: req.body.width,
//         length: req.body.length,
//         height: req.body.height,
//         weight: req.body.weight,
//         repeatLength: req.body.repeatLength,
//         rollLength: req.body.rollLength,
//         property: req.body.property,
//         style: req.body.style,
//         image: req.body.image,
//         price: req.body.price,
//         delivery: req.body.delivery,
//         gst: req.body.gst,
//     });

//     newProd.save();

//     res.send({ message: 'successfully inserted!', status: 200 });
// });
