import Category from "../models/category.js";
import Product from "../models/product.js";

//! fetching all categories /category/fetch-all
//? working Endpoint
export const getCategories = (req, res, next) => {
  Category.find({})
    .sort({ name: 1 })
    .then((categories) => {
      res.status(200).json({
        message: `Categories fetched successfully`,
        data: {
          categories: categories,
          count: categories.length,
        },
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};

//! Fetch Products having a specific category /category/fetch-products?category=${}
export const getProductsFromCategories = (req, res, next) => {
  const category = req.body.category;

  Product.populate("category")
    .execPopulate()
    .find({ category: category })
    .then((products) => {
      res.status(200).json({
        message: `Products fetched successfully`,
        data: {
          category: category,
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
