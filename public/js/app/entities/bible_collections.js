Reader.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {


  //this is a collection of all of the books from the KeyEnglish class/table
  Entities.BookList = Backbone.Collection.extend({
    model: Entities.BookListItem,
    url: App.constants.getAPIBase() + "/api/booklist"
  });

  // This is the Bible, Verse By Verse (not split into chapters)
  Entities.Book = Backbone.Collection.extend({
    model: Entities.Verse,
    url_base: App.constants.getAPIBase() + '/api/book/',

    initialize: function (options) {
      // if (options && options.book_id) {
      //   this.url = this.url_base + options.book_id;
      // } else {
      //   this.url = this.url_base + 1;
      // }
    },

    fetchBook: function (options) {
      this.url = this.url_base + options.book_id;
      this.fetch(options);
    },

    chapterize: function () {
      return this.groupBy('c')
    }
  });


  /* = Events */

  Entities.on('start', function (options) {
    var bookListPromise = $.Deferred();
    var bookPromise = $.Deferred();
    //var bookVersesPromise = new Entities.Book();
    var bookList = new Entities.BookList();

    bookList.fetch({
      success: function (data) {
        bookListPromise.resolve(data)
      }
    });

    // bookVerses.fetch({
    //   book_id: App.current.book_id,
    //   success: function (data) {
    //     //var chaptered = bookVerses.chapterize();
    //     bookVersesPromise.resolve(bookVerses)
    //   }
    // });

    $.when(bookListPromise).then(function (booklist) {
      App.constants.bible.bookList = booklist;

      App.vent.trigger('app:ready')
    })
  })

});
