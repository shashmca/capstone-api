module.exports = function (server) {

  var ds = server.dataSources.gifts;
  var mongoShemas = ['Category', 'Product'];
  ds.autoupdate(mongoShemas, function (er) {
    if (er) throw er;
    console.log('Loopback tables [' + mongoShemas + '] created in mongodb');
    //ds.disconnect();
  });

  /*server.dataSources.gifts.automigrate('Category', function (err) {
    if (err) throw err;

    server.models.Category.create([{
      "name": "Anniversary",
      "image": "images/anni11.png",
      "creation_date": "2019-03-02T15:36:23.533Z",
      "last_modified_date": "2019-03-02T15:36:23.533Z",
      "is_active": true,
      "is_featured": true
    }], function (err, Category) {
      if (err) throw err;

      console.log('Models created: \n', Category);
    });
  });*/
};
