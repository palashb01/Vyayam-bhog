import Product from "../models/product.js";

//! All products paginated at /product/fetch-all?index=${}&pages=${}
//? Working Endpoint
export const getProducts = (req, res, next) => {
  const options = {
    index: +req.query.index || 0,
    perPage: Math.min(+req.query.pages, 100) || 25,
  };
  try{

    Product.find({})
      .skip(options.index * options.perPage)
      .limit(options.perPage)
      .then((products) => {
        res.status(200).json({
          message: `Products fetched successfully`,
          data: {
            products: products,
            index: `${options.index}`,
            total: products.length,
          },
        })
      })
      .catch((err) => {
        res.status(400).json({
          message: err,
        });
      });
  }catch(err){
    res.status(404).send("error database")
  }
};

//! Specific product at /product/fetch/:productID
//? Working Endpoint
export const getProduct = async (req, res, next) => {
  const productID = req.params.productID;
  Product.findOne({ _id: productID })
    .then((product) => {
      return res.status(200).json({
        message: `Product fetched successfully`,
        data: {
          id: productID,
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

//! Filter product on basis of availability at /product/available-products
//? Working Endpoint
export const getAvailableProducts = async (req, res, next) => {
  Product.find({ availability: true })
    .then((products) => {
      return res.status(200).json({
        message: `Available products fetched successfully`,
        data: {
          products: products,
        },
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err,
      });
    });
};

//! Sort products based of fields /product/sort-products?field=&sorts=
/*
  -> field : price | name
  -> sorts : asc | desc
*/
//? Working Endpoint
export const getSortedProducts = (req, res, next) => {
  const sort = req.query.sorts || "asc";
  const field = req.query.field || "price";
  const handleError = (err) => {
    return res.status(400).json({
      message: err,
    });
  };

  const sendResponce = (products) => {
    return res.status(200).json({
      message: `Available products fetched successfully`,
      data: {
        products: products,
      },
    });
  };

  switch (field) {
    case 'price':
      Product.find({})
        .sort({ price: sort })
        .then(sendResponce)
        .catch(handleError);
      break;
    case 'name':
      Product.find({})
        .sort({ name: sort })
        .then(sendResponce)
        .catch(handleError);
      break;
    default:
      Product.find({})
        .sort({ price: sort, name: sort })
        .then(sendResponce)
        .catch(handleError);
      break;
  }
};
