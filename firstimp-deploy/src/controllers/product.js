const Product = require("../models/product.model");

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: "Product not found",
            });
        }
        req.product = product;
        next();
    });
};

exports.displayProducts = (req, res) => {
    // console.log(req._id)
    Product.find({})
        .select("-photo")
        .exec((err, products) => {
            if (err) {
                res.status(400).json({
                    error: "Products not found",
                });
            }
            res.json(products);
        });
};

exports.getProductsBySection = (req, res) => {
    console.log(req.body);

    const section = req.query["section"];

    const {
        color,
        brand,
        design,
        material,
        application,
        property,
        price,
    } = req.body;

    console.log(color);
    console.log(brand);
    console.log(design);
    console.log(material);
    console.log(application);
    console.log(property);

    //const colorRegex = new RegExp(getRegex(color), "i");

    const colour = req.body.color;
    let searchColor = new RegExp(colour, "i");

    const brandRegex = new RegExp(getRegex(brand), "i");
    const designRegex = new RegExp(getRegex(design), "i");
    const materialRegex = new RegExp(getRegex(material), "i");
    const appRegex = new RegExp(getRegex(application), "i");
    //const propertyRegex = new RegExp(getRegex(property), "i");

    // var query = { $and: [] };

    // if (property !== null) {
    //     query.$and.push({ property: propertyRegex });
    // }

    // console.log(property);

    if (
        color === "" &&
        !req.body.colorArray &&
        brand.length === 0 &&
        design.length === 0 &&
        material.length === 0 &&
        application.length === 0 &&
        property.length === 0
    ) {
        console.log("EVERYTHING MADAFAKAS");
        Product.find({
            $and: [
                { section: section },
                {
                    $and: [
                        { price: { $lte: price[1] } },
                        { price: { $gte: price[0] } },
                    ],
                },
            ],
        })
            .select("-photo")
            .exec((err, prods) => {
                if (err) {
                    res.status(400).json({
                        error: "products not found",
                    });
                } else {
                    // console.log(prods);
                    res.status(200).json(prods);
                }
            });
    } else if ("colorArray" in req.body) {
        console.log("PALETTE TIME MADAFAKAS");
        let colours = req.body.colorArray;
        console.log(req.body);
        console.log(typeof req.body);
        let stringBeforeRegex = "";
        if (colours.length > 1) {
            colours.forEach((colour) => {
                stringBeforeRegex = `${stringBeforeRegex}(${colour.trim()})|`;
            });
        }
        stringBeforeRegex = stringBeforeRegex.slice(0, -1);
        const colourRe = new RegExp(stringBeforeRegex, "i");

        Product.find({
            $and: [
                { section: section },
                { color: { $in: colourRe } },
                // { color: colorRegex },
                { brand: brandRegex },
                { design: designRegex },
                { material: materialRegex },
                { application: appRegex },
                // { property: propertyRegex },
                {
                    $and: [
                        { price: { $lte: price[1] } },
                        { price: { $gte: price[0] } },
                    ],
                },
            ],
        })
            .select("-photo")
            .exec((err, prods) => {
                if (err) {
                    res.status(400).json({
                        error: "products not found",
                    });
                } else {
                    res.status(200).json(prods);
                }
            });
    } else {
        console.log("NOT PALETTE MADAFAKAS");

        // const designRegex = getRegex(design);
        // const materialRegex = getRegex(material);
        // const appRegex = getRegex(application);
        // const propertyRegex = getRegex(property);

        Product.find({
            $and: [
                //     {
                //         $cond: {
                //             if: brand.length,
                //             then: { brand: brand },
                //             else: { brand: brand },
                //         },
                //     },
                { section: section },
                { color: { $in: searchColor } },
                // { color: colorRegex },
                { brand: brandRegex },
                { design: designRegex },
                { material: materialRegex },
                { application: appRegex },
                // { property: propertyRegex },
                {
                    $and: [
                        { price: { $lte: price[1] } },
                        { price: { $gte: price[0] } },
                    ],
                },
            ],
        })
            .select("-photo")
            .exec((err, prods) => {
                if (err) {
                    res.status(400).json({
                        error: "products not found",
                    });
                } else {
                    res.status(200).json(prods);
                }
            });
    }
};

const getRegex = (filterArray) => {
    let filterRegex = "";

    for (let i = 0; i < filterArray.length; i++) {
        filterRegex = `${filterRegex}(${filterArray[i]})|`;
    }

    filterRegex = filterRegex.slice(0, -1);
    // filterRegex = filterRegex.replace(" ", "\\s");

    console.log(filterRegex);

    return filterRegex;

    // const newRegex =  new RegExp(filterRegex, "i");

    // return newRegex
};

// exports.getProductsBySection = (req, res) => {
//     const section = req.query["section"];
//     const colour = req.body.color;
//     let color = new RegExp(colour, "i");

//     if ("colorArray" in req.body) {
//         console.log("PALETTE TIME MADAFAKAS");
//         let colours = req.body.colorArray;
//         console.log(req.body);
//         console.log(typeof req.body);
//         let stringBeforeRegex = "";
//         if (colours.length > 1) {
//             colours.forEach((colour) => {
//                 stringBeforeRegex = `${stringBeforeRegex}(${colour.trim()})|`;
//             });
//         }
//         stringBeforeRegex = stringBeforeRegex.slice(0, -1);
//         const colourRe = new RegExp(stringBeforeRegex, "i");

//         Product.find({
//             $and: [
//                 { section: section },
//                 {
//                     $or: [
//                         { color: { $in: colourRe } },
//                         { design: { $in: req.body.design } },
//                         { brand: { $in: req.body.brand } },
//                         { material: { $in: req.body.material } },
//                         { application: { $in: req.body.application } },
//                         { property: { $in: req.body.property } },
//                     ],
//                 },
//                 {
//                     $and: [
//                         { price: { $lte: req.body.price[1] } },
//                         { price: { $gte: req.body.price[0] } },
//                     ],
//                 },
//             ],
//         })
//             .select("-photo")
//             .exec((err, prod) => {
//                 if (err) {
//                     res.status(400).json({ error: "products not found" });
//                 } else {
//                     res.status(200).json(prod);
//                 }
//             });
//     } else {
//         if (req.body.color != "") {
//             console.log("SOME COLOR MADAFAKAS");
//             Product.find({
//                 $and: [
//                     { section: section },
//                     {
//                         $or: [
//                             { color: { $in: color } },
//                             { design: { $in: req.body.design } },
//                             { brand: { $in: req.body.brand } },
//                             { material: { $in: req.body.material } },
//                             { application: { $in: req.body.application } },
//                             { property: { $in: req.body.property } },
//                         ],
//                     },
//                     {
//                         $and: [
//                             { price: { $lte: req.body.price[1] } },
//                             { price: { $gte: req.body.price[0] } },
//                         ],
//                     },
//                 ],
//             })
//                 .select("-photo")
//                 .exec((err, prod) => {
//                     if (err) {
//                         res.status(400).json({ error: "products not found" });
//                     } else {
//                         res.status(200).json(prod);
//                     }
//                 });
//         } else {
//             console.log("IDEALLY EVERYTHING MADAFAKAS");
//             Product.find({
//                 $and: [
//                     {
//                         $or: [
//                             { color: color },
//                             { design: { $in: req.body.design } },
//                             { brand: { $in: req.body.brand } },
//                             { material: { $in: req.body.material } },
//                             { application: { $in: req.body.application } },
//                             { property: { $in: req.body.property } },
//                         ],
//                     },
//                     {
//                         $and: [
//                             { price: { $lte: req.body.price[1] } },
//                             { price: { $gte: req.body.price[0] } },
//                         ],
//                     },
//                 ],
//             })
//                 .select("-photo")
//                 .exec((err, prod) => {
//                     if (err) {
//                         res.status(400).json({
//                             error: "products not found",
//                         });
//                     } else {
//                         res.status(200).json(prod);
//                     }
//                 });
//         }
//     }
// };

exports.getMoreColors = (req, res) => {
    const name = req.query["name"];
    Product.find({ name: name })
        .select("-photo")
        .exec((err, prod) => {
            if (err) {
                res.status(400).json({
                    error: "products not found",
                });
            } else {
                res.status(200).json(prod);
            }
        });
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.viewProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

const flatten = (arr) => {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(
            Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
        );
    }, []);
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.filterProps = (req, res) => {
    Product.find({})
        .select("-photo")
        .exec((err, list) => {
            if (err) {
                res.status(400).json({
                    error: "filters not found",
                });
            }

            let context = {};
            context.material = [];
            context.property = [];
            context.application = [];
            context.color = [];
            context.brand = [];
            // allSection = [];
            const allApplication = [];
            const allMaterial = [];
            const allProperty = [];
            const allColor = [];
            const allBrand = [];
            const allDesign = [];
            list.forEach((item) => {
                item.material && allMaterial.push(item.material.trim());
                item.application &&
                    allApplication.push(item.application.split(","));
                // allSection.push(item.section);
                item.color && allColor.push(item.color.split(","));
                item.property && allProperty.push(item.property.split(","));
                item.brand && allBrand.push(item.brand.trim());
                item.design && allDesign.push(item.design.split(","));
            });
            // context.section = Array.from(new Set(allSection)).sort((a, b) => {
            //     return a.toLowerCase().localeCompare(b.toLowerCase());
            // });
            const allAppFlat = flatten(allApplication);
            const allAppTrim = allAppFlat.map((s) => s.trim());
            context.application = Array.from(new Set(flatten(allAppTrim))).sort(
                (a, b) => {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                }
            );
            // context.material = Array.from(new Set(flatten(allMaterial)));
            const allMatTrim = allMaterial.map((s) => s.trim());
            context.material = Array.from(new Set(allMatTrim)).sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            const allProFlat = flatten(allProperty);
            const allProTrim = allProFlat.map((s) => s.trim());
            context.property = Array.from(new Set(flatten(allProTrim))).sort(
                (a, b) => {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                }
            );
            const allColFlat = flatten(allColor);
            const allColTrim = allColFlat.map((s) => s.trim());
            const allColCaps = allColTrim.map((s) => capitalizeFirstLetter(s));
            context.color = Array.from(new Set(flatten(allColCaps))).sort(
                (a, b) => {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                }
            );
            const allBraTrim = allBrand.map((s) => s.trim());
            context.brand = Array.from(new Set(allBraTrim)).sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            const allDesFlat = flatten(allDesign);
            const allDesTrim = allDesFlat.map((s) => s.trim());
            context.design = Array.from(new Set(flatten(allDesTrim))).sort(
                (a, b) => {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                }
            );
            res.json(context);
        });
};

exports.filteredProducts = (req, res) => {
    console.log(req.params.pfilter);
    let buff = new Buffer.from(req.params.pfilter, "base64");
    let text = buff.toString("ascii");
    let text1 = JSON.parse(text);
    Product.find(text1)
        .select("-photo")
        .exec((err, products) => {
            if (err) {
                res.status(400).json({
                    error: "Products not found",
                });
            }
            res.json(products);
        });
};

exports.searchByColour = (req, res) => {
    const colours = req.body.colours;
    let stringBeforeRegex = "";

    colours.forEach((colour) => {
        stringBeforeRegex = `${stringBeforeRegex}(${colour.trim()})|`;
    });

    stringBeforeRegex = stringBeforeRegex.slice(0, -1);

    // console.log(stringBeforeRegex);

    const colourRe = new RegExp(stringBeforeRegex, "i");

    // console.log(colourRe);

    Product.find({ Color: colourRe })
        .select("-photo")
        .select("-Image")
        .exec((err, products) => {
            if (err) {
                res.status(400).json({
                    error: "Products not found",
                });
            }
            res.json(products);
        });

    // res.json({ regex: stringBeforeRegex });
};
