'use strict';

module.exports = function (server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);

  // create collections in mongodb
  /*var ds = server.dataSources.gifts;
  var lbTables = ['category', 'product'];
  ds.automigrate(lbTables, function (er) {
    if (er) throw er;
    console.log('Loopback tables [' + lbTables + '] created in ', ds.database);
    //ds.disconnect();
  });*/
};
