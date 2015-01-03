Reader.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {
    this.startWithParent = false;

    Entities.Verse = Backbone.Model.extend({
      // defaults: {
      //   b: 1,
      //   c: 1,
      //   id: 01001001,
      //   t: 'In the beginning God created the heaven and the earth.',
      //   v: 1
      // }
    });


    //a book comes back as a collection of verse objects
    Entities.Book = Backbone.Collection.extend({
      model: Entities.Verse
    });

    //a chapter is an book collection grouped by Chapter
    Entities.Chapter = Backbone.Collection.extend({
      //model: Entities.Verse
    });


    Entities.BookItem = Backbone.Model.extend({
      defaults: {}
    })

    //this is a collection of all of the books from the KeyEnglish class/table
    Entities.BookList = Backbone.Collection.extend({
      model: Entities.BookItem,
      url: App.constants.getAPIbase() + "/api/books"
    });


    Entities.on('start', function () {
      //stuff
    })

});
