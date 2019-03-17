'use strict';

var app = require('../../server/server');

module.exports = function(Product) {

        Product.search = function(search, cb) {
            var productModel = app.models.Product;
            var regex = new RegExp(search, "i");            
            productModel.find({where:{or:[
                {name:{"regexp":regex}},
                {long_desc:{"regexp":regex}}
            ]}}, function ( err, response ){
               // res.send(response);
               cb(null, response);
            })
          
        }
    
        Product.remoteMethod('search', {
            http: {path: '/search', verb: 'get'},
            accepts: {arg: 'search', type: 'string',http: { source: 'query' }},
            returns: {arg: 'data', type: 'Array'}
        });
};
