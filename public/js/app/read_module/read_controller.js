Reader.module('ReadModule', function (ReadModule, App, Backbone, Marionette, $, _) {
  this.startWithParent = false;


  var API = {
    initialize: function () {

    },

    displayCurrentChapter: function () {
      var verses = App.current.chapter.at(0).get(App.current.chapterID);
      var view = new ReadModule.ChapterView({verses: verses, chapter: App.current.chapterID, bookName: App.current.bookName});
      App.reader.show(view);
    }
  }

  ReadModule.on("start", function () {
    console.log('Read Module started');

    //Events
    App.vent.on({
      'set:chapter': function () {
        API.displayCurrentChapter();
      }
    });
  })
});
