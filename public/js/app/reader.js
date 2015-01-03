(function (module) {

  var App = new Backbone.Marionette.Application();

  App.constants = {
    getAPIbase: function () {
      return "http://localhost:4567";
    }
  }


  App.addRegions({
    reader: "#reader-region",
    selector: "#selector-region"
  });

  App.on('before:start', function () {
    App.module('Entities').start();

    //stored upon selection/navigation
    App.current  = {
      book: "",
      chapter: "",
      verse: "",
      bookID: "",
      chapterID: "",
      verseID: '',
      bookName: ''
    };

    App.bookKey = {};
  });

  App.on('start', function () {
    App.module("SelectModule").start();
    App.module("ReadModule").start();
  });

  //Events


  module.Reader = App;
}) (window);





$(function() {
  Reader.start();
});
