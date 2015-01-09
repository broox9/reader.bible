Reader.module('SelectModule', function (SelectModule, App, Backbone, Marionette, $, _) {
  this.startWithParent = false;

  var SelectRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'read/:book_id(/:chapter)(/:verse)' : 'setBookChapter'
    }
  });


  var API = {
      initialize: function () {
        SelectModule.Layout = new SelectModule.LayoutView;
        SelectModule.Layout.render();
        App.selector.show(SelectModule.Layout);

        this.setBookListView();
        this.setChapterView();
        //this.setBookVerseView();

      },

      setBookChapter: function (book_id, chapter_id, verse_number) {
        var self = this;

        App.current.book_id = book_id;
        App.current.chapter_id = chapter_id || 1;
        App.current.verse_number = verse_number || null;

        //if page was loaded with a book/chapter no this happens
        if (!App.current.book) {
          App.current.book = new App.Entities.Book();
        }

        this.fetchBookData(book_id).done(function (bookData) {
          var chapterGroup = App.current.book.chapterize()
          App.current.book_name = App.constants.bible.bookList.get(book_id).get('n')
          App.current.chapters = chapterGroup;

          var options = {
            grouped: App.current.chapters,
            selected: App.current.chapter_id
          };

          self.setChapterView(options)
          App.vent.trigger('app:set:scripture');
        });
      },

      setBookListView: function () {
        var view = new SelectModule.SelectBookView({collection: App.constants.bible.bookList, selected: App.current.book_id});
        SelectModule.Layout.book.show(view);
      },

      setChapterView: function (options) {
        var view = new SelectModule.SelectChapterView(options);
        SelectModule.Layout.chapter.show(view);
      },

      //
      // setBookVerseView: function () {
      //   // App.current.book = new App.Entities.Book();
      //   var options = {
      //     name: 'Verse',
      //   }
      //
      //   var view = new SelectModule.SelectVerseView(options);
      //   SelectModule.Layout.chapter.show(view);
      // },
      //
      //
      handleBookSelection: function (book_id) {
        App.current.book_id = book_id;
        var nav_url = '/read/' + book_id + '/1'

        SelectModule.router.navigate(nav_url, {trigger: true, replace: true})
        App.vent.trigger('app:set:scripture');
      },

      handleChapterSelection: function (chapter_id) {
        App.current.chapter_id = chapter_id;
        var nav_url = '/read/' + App.current.book_id + '/' + chapter_id

        SelectModule.router.navigate(nav_url, {trigger: true, replace: true})

      },

      fetchBookData: function (book_id) {
        var fetchPromise = $.Deferred();
        var options = {
          book_id: book_id,
          success: function (bookData) {
            fetchPromise.resolve(bookData);
          }
        };

        App.current.book.fetchBook(options);
        return fetchPromise.promise();
      }
  };





  SelectModule.on('start', function () {
    this.router = new SelectRouter({
      controller: API
    });

    console.log("Select Module started")

    /* = Events -------- */
    App.vent.on({
      'app:ready': function () {
        API.initialize();
      },

      'selected:book': function (book_id) {
        API.handleBookSelection(book_id)
      },

      'selected:chapter': function (chapter_id) {
        API.handleChapterSelection(chapter_id)
      }
    });

  })
});
