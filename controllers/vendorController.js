import Product from "../models/product.js";

//! Add product at /vendor/add-product
//? working endpoint
export const addProduct = (req, res, next) => {
  const {
    categoryid,
    vendorid,
    name,
    price,
    description,
    imageURL,
    availability,
  } = req.body;

  //TODO: complete product model
  const product = new Product({
    category: categoryid,
    vendor: vendorid,
    name: name,
    price: price,
    description: description,
    imageURL: imageURL,
    availability: availability,
  });

  product.save();

  return res.status(201).json({
    message: `Product created successfully`,
    data: {
      id: product._id,
      product: product,
    },
  });
};

//! Delete a product at /vendor/delete-product/:productID
//? working endpoint
export const deleteProduct = (req, res, next) => {
  const productID = req.params.productID;
  console.log(productID);

  // Product.findOne({_id:productID})
  //   .then((res) => {
  //     res.status(200).json({
  //       message: `Product deleted successfully`,
  //     });
  //   })
  //   .catch((err) => {
  //     return res.status(400).json({
  //       message: err,
  //     });
  //   });
  Product.findOneAndDelete({ _id: productID })
    .then((product) => {
      return res.status(200).json({
        message: `Product deleted successfully`,
        data: {
          id: productID,
        },
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};

//! Update a product at /product/update-product/:productID
//? working endpoint
export const updateProduct = async (req, res, nex) => {
  const productID = req.params.productID;
  const { name, amount, description, imageURL, availability } = req.body;

  try {
    const product = await Product.findOne({ _id: productID });
    console.log(product);
    //TODO: Update the products as per the fields here
    product.name = name ? name : product.name;
    product.amount = amount ? amount : product.amount;
    product.description = description ? description : product.description;
    product.imageURL = imageURL ? imageURL : product.imageURL;
    product.availability = availability ? availability : product.availability;
    product.save();
    return res.status(200).json({
      message: `Product updated successfully`,
      data: {
        product: product,
      },
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

//! Update availability of product at /product/update-product-availability/:productID
//? workine endpoint
export const changeProductAvailability = (req, res, next) => {
  const productID = req.params.productID;
  const { availability } = req.body;

  Product.findOne({ _id: productID })
    .then((product) => {
      product.availability = availability;
      product.save();
      return res.status(200).json({
        message: `Product availability altered successfully`,
        data: {
          product: product,
        },
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};


//! Fetch Products of a specific vendor /vendor/fetch-product/:vendorID
//? Working Endpoint
export const getProductsFromVendor = (req, res, next) => {
  const vendorID = req.params.vendorID;
  // Product.populate("vendor")
  //   .execPopulate()
  //   .find({ vendor: vendorID })
  //   .then((products) => {
  //     res.status(200).json({
  //       message: `Products fetched successfully`,
  //       data: {
  //         // vendor: vendor,
  //         products: products,
  //         count: products.length,
  //       },
  //     });
  //   })
  //   .catch((err) => {
  //     return res.status(400).json({
  //       message: err,
  //     });
  //   });
  
  Product.find({vendor:vendorID}).then((vendors)=>{
    return res.status(200).json({
      message:"data fetched successfully",
      vendors:vendors
    })
  }).catch((err)=>{
    return res.status(400).json({
      message:err
    })
  })
};
