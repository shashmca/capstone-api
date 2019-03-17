'use strict';

var app = require('../../server/server');
var async = require("async");

var populateProducts = function (dataObj, cb) {

  var productModel = app.models.Product;
  var wishlistProducts = dataObj.products.slice();

  async.eachOfSeries(wishlistProducts, function (productObj, index, callback) {
    var productId = productObj.product;
    var sku = productObj.sku;
    productModel.findById(productId, function (err, product) {
      if (!err) {
        var filteredVariants = product.variants.filter(function (variant) {
          return variant.sku === sku;
        });
        product.variants = filteredVariants;
        dataObj.products[index].productDetails = product;
        callback();
      } else {
        console.log("Product not found");
        callback();
      }
    });
  }, function () {
    // final callback after loop finished
    cb();
  });

};


module.exports = function (Wishlist) {

  //should be removed, redundant
  Wishlist.afterRemote('replaceById', function (context, wishlist, next) {
    populateProducts(wishlist, function () {
      next();
    });
  });

  Wishlist.afterRemote('findById', function (context, wishlist, next) {
    populateProducts(wishlist, function () {
      next();
    });
  });
};
