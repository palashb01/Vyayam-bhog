import Product from "../models/product";

//! Add product at /product/add-product
export const addProduct = (req, res, next) => {
  const {} = req.body;

  //TODO: complete product model
  const product = new Product({});

  product.save();

  return res.status(201).json({
    message: `Product created successfully`,
    data: {
      id: product._id,
      product: product,
    },
  });
};

//! Delete a product at /product/delete-product/:productID
export const deleteProduct = (req, res, next) => {
  const { productID } = req.params.productID;

  Product.findByIdAndDelete({ productID })
    .then((res) => {
      res.status(200).json({
        message: `Product deleted successfully`,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};

//! Update a product at /product/update-product/:productID
export const updateProduct = async (req, res, nex) => {
  const { productID } = req.params.productID;
  const { name } = req.body;

  try {
    const product = await Product.findOne({ _id: productID });
    //TODO: Update the products as per the fields here
    product.name = name ?? product.name;
    product.amount = amount ?? product.amount;
    product.description = description ?? product.description;
    product.imageURL = imageURL ?? product.imageURL;
    product.availability = availability ?? product.availability;
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
export const changeProductAvailability = (req, res, next) => {
  const { productID } = req.params.productID;
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
export const getProductsFromVendor = (req, res, next) => {
  const vendor = req.params.vendorID;

  Product.populate("vendor")
    .execPopulate()
    .find({ vendor: vendor })
    .then((products) => {
      res.status(200).json({
        message: `Products fetched successfully`,
        data: {
          vendor: vendor,
          products: products,
          count: products.length,
        },
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};
