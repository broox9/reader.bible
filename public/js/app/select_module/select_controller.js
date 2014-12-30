Reader.module('SelectModule', function (SelectModule, App, Backbone, Marionette, $, _) {
  this.startWithParent = false;

  API = {
      initialize: function () {
        var self = this;
        //this.getBooks();
        var books = this.getBooks(); //returns a promise object

        books.done(function (data) {
          self.setSelectModuleView(data);
        })

      },

      setSelectModuleView: function (books) {
        console.log("books", books)
        var view = new SelectModule.SelectView({collection: books});
        App.selector.show(view);
      },

      getBooks: function () {
        var self = this;
        //Request Event will be here at some point
        var fetchPromise = $.Deferred();
        var options = {
          success: function (data) {
            fetchPromise.resolve(data);
            return data;
          }
        }

        var books = new App.Entities.Books;
        books.fetch(options);

        return fetchPromise.promise();
      }
  };


  SelectModule.on('start', function () {
    API.initialize();
    console.log("Select Module started")
  })
});
