Reader.module('ReadModule', function (App, ReadModule, Backbone, Marionette, $, _) {
  this.startWithParent = false;



  ReadModule.on("start", function () {
    console.log('Read Module started')
  })
});
