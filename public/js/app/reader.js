(function (module) {

  var App = new Backbone.Marionette.Application();

  App.constants = {
    getAPIbase: function () {
      return "http://localhost:4567";
    }
  }

  App.addRegions({
    App: "#reader-region",
    selector: "#selector-region"
  });

  App.on('before:start', function () {
    App.module('Entities').start();
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
  console.log("started Reader App boy")
});
