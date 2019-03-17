'use strict';

var app = require('../../server/server');
var async = require("async");

var populateCartProducts = function (cart, cb) {

  var productModel = app.models.Product;
  var cartProducts = cart.products.slice();

  async.eachOfSeries(cartProducts, function (productObj, index, callback) {
    var productId = productObj.product;
    var sku = productObj.sku;
    productModel.findById(productId, function (err, product) {
      if (!err) {
        var filteredVariants = product.variants.filter(function (variant) {
          return variant.sku === sku;
        });
        product.variants = filteredVariants;
        cart.products[index].productDetails = product;
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

module.exports = function (Cart) {

  /*Cart.beforeRemote('replaceById', function (context, user, next) {
    var userId = context.req.body.userId;
    var productObj = context.req.body.products[0];
    // get cart by user id
    var filterObj = { where: { userId: userId } };
    Cart.findOne(filterObj, function (err, cart) {
      if (!err) {
        var cartObj = cart;
        cartObj.products.push(productObj);
        context.req.body.products = cartObj.products;
        next();
      } else {
        console.log("cart for user does not exist");
      }
    });
  });*/

  //should be removed, redundant
  Cart.afterRemote('replaceById', function (context, cart, next) {
    populateCartProducts(cart, function () {
      next();
    });
  });


  Cart.afterRemote('findById', function (context, cart, next) {
    populateCartProducts(cart, function () {
      next();
    });
  });

  /*Cart.removeProduct = function (id, data, cb) {
    var productId = data.productId;
    Cart.findById(id, function (err, cart) {
      if (!err) {
        cart.products = cart.products.filter(function (prodObj) {
          return prodObj.product !== productId;
        });
        cart.save(function (err, cart) {
          if (!err) {
            populateCartProducts(cart, function () {
              cb(null, cart);
            });
          } else {
            cb(null, { 'error': err });
          }
        });
      } else {
        cb(null, { 'error': 'cart not found' });
      }
    });
}*/

  /*Cart.remoteMethod('removeProduct', {
    accepts: [
      { arg: 'id', type: 'string', required: true },
      { arg: 'data', type: 'object', http: { source: 'body' }, default: '{"userId": "string", "producId":"string"}' }
    ],
    returns: { arg: 'res', type: 'object', http: { source: 'res' } },
    http: { 'verb': 'post', 'path': '/:id/removeProduct' }
  });*/
}
