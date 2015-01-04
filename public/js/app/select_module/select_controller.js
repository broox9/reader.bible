Reader.module('SelectModule', function (SelectModule, App, Backbone, Marionette, $, _) {
  this.startWithParent = false;

  var API = {
      initialize: function () {
        SelectModule.Layout = new SelectModule.LayoutView;
        SelectModule.Layout.render();
        App.selector.show(SelectModule.Layout);

        this.setBookChapterView({collection: new App.Entities.Chapter});
        //this.setBookVerseView();
        this.setBookKeyView();
      },

      setBookKeyView: function () {
        var self = this;
        var bookKey = this.getBooks(); //returns a promise object
        var view;

        bookKey.done(function (books) {
          App.bookKey = books

          view = new SelectModule.SelectBookView({collection: books});
          SelectModule.Layout.book.show(view);
        });
      },

      setBookChapterView: function (options) {
        var options = {
          collection: App.current.chapter,
          grouped: options.grouped || {}
        }
        var view = new SelectModule.SelectChapterView(options);
        SelectModule.Layout.chapter.show(view);
      },

      setBookVerseView: function () {
        // App.current.book = new App.Entities.Book();
        var options = {
          name: 'Verse',
        }

        var view = new SelectModule.SelectVerseView(options);
        SelectModule.Layout.chapter.show(view);
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

        var books = new App.Entities.BookList;
        books.fetch(options);

        return fetchPromise.promise();
      },

      fetchBookData: function (book_id) {
        var url = App.constants.getAPIbase() + '/api/book/' + book_id;

        $.get(url).done(function (bookData) {
          API.bookIsGo(bookData)
        })
      },

      bookIsGo: function (bookData) {
        var book = new App.Entities.Book();
        book.reset(bookData);
        App.current.book = book;

        var chapterData = book.groupBy('c')
        var chapter = new App.Entities.Chapter();
        chapter.reset(chapterData);

        App.current.chapter = chapter
        App.current.chapterID = 1;
        App.vent.trigger('set:chapter')

        this.setBookChapterView({grouped: chapterData, collection: chapter});
        //this.setBookVerseView();
      }
  };


  SelectModule.on('start', function () {
    API.initialize();
    console.log("Select Module started")


    App.reqres.setHandler('selection:book', API.fetchBookData);

  })
});
