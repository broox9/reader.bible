Reader.module('ReadModule', function (ReadModule, App, Backbone, Marionette, $, _) {
  this.startWithParent = false;

  var Router = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      //'read/:book/(:chapter/:verse)': 'selectVerse'
    }
  });

  var API = {
    initialize: function () {

    },

    displayCurrentChapter: function () {
      var verses = App.current.chapters[App.current.chapter_id];
      var view = new ReadModule.ChapterView({
        verses: verses,
        chapter: App.current.chapter_id,
        bookName: App.current.book_name
      });
      App.reader.show(view);
    },
  }

  ReadModule.on("start", function () {
    console.log('Read Module started');

    this.router = new Router({
      controller: API
    })
    //Events
    App.vent.on({
      'app:set:scripture': function () {
        API.displayCurrentChapter();
      }
    });
  })
});
