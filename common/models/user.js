'use strict';

module.exports = function (User) {
  // create user cart and wishlist when user is created
  User.afterRemote('create', function (context, user, next) {
    var cartObj = {
      userId: user.id,
      products: []
    };
    var wishlistObj = {
      userId: user.id,
      products: []
    };
    user.carts.create(cartObj, function (err, cart) {
      if (!err) {
        user.wishlists.create(wishlistObj, function (err, wishlist) {
          next();
        });
      } else {
        next();
      }
    });
  });
};
