Reader.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {
    this.startWithParent = false;

    Entities.Book = Backbone.Model.extend({

    });

    Entities.Books = Backbone.Collection.extend({
      model: Entities.Book,
      url: App.constants.getAPIbase() + "/api/books"
    });


    Entities.on('start', function () {
      //stuff
    })

});
