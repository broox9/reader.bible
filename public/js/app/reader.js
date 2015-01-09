(function (module) {

  var App = new Backbone.Marionette.Application();

  App.constants = {
    getAPIBase: function () {
      return "http://localhost:4567";
    },
    appDirectory: '/',
    bible: {
      bookList: {} //filled with a collection
    }
  }

  //stored upon selection
  App.current  = {
    translation: 'kjv',
    book: null, //collection
    book_id: 0,
    book_name: '',
    chapters: null, //modified collection
    chapter_id: 1,
    verse_number: null,
    selected_verse_ids: []
  };

  App.addRegions({
    reader: "#reader-region",
    selector: "#selector-region"
  });

  App.on('before:start', function () {
    App.module('Entities').start(); //bible and booklist will fetch themselves
  });

  App.on('start', function () {
    App.module("SelectModule").start();
    App.module("ReadModule").start();

    Backbone.history.start({root: App.constants.appDirectory})
  });

  //Events
  module.Reader = App;
}) (window);





$(function() {
  Reader.start();
});
