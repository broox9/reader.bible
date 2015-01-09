Reader.module('SelectModule', function (SelectModule, App, Backbone, Marionette, $, _) {


  function formatNumber (num) {
    if (num > 9) {
      return "0"+num;
    } else if (num > 99) {
      return num;
    }

    return "00"+num;
  }

  function arrayIndexAdjust (idx) {
    return idx + 1;
  }

  SelectModule.LayoutView = Backbone.Marionette.LayoutView.extend({
    id: "select-section",
    template: "#select_layout_template",

    regions: {
      book: '#book-select-region',
      chapter: '#chapter-select-region',
      verse: '#verse-select-region'
    }
  });


  /* = #### INDIVIDUAL MODEL VIEWS ############################################ */
  SelectModule.SelectBookItemView = Backbone.Marionette.ItemView.extend({
    tagName: "option",

    template: function (serializedModel) {
      Handlebars.registerHelper('formatNumber', formatNumber);
      var text = $('#select_book_item_template').text();
      var template = Handlebars.compile(text);
      return template(serializedModel);

    },

    onRender: function () {
      // Get rid of that pesky wrapping-div.
      // Assumes 1 child element present in template.
      this.$el = this.$el.children();
      // Unwrap the element to prevent infinitely
      // nesting elements during re-render.
      this.$el.unwrap();
      this.setElement(this.$el);
    }
  });



  SelectModule.SelectChapterItemView = Backbone.Marionette.ItemView.extend({
    tagName: "option",
    template: '#select_chapter_item_template'
  });



  /* = #### COLLECITON/COMPOSITE VIEWS ############################################ */
  SelectModule.SelectBookView = Backbone.Marionette.CompositeView.extend({
    tagName: 'select',
    childView: SelectModule.SelectBookItemView,

    initialize: function (options) {},

    template: function (bookModel) {
      var html = $('#select_book_template').html();
      var template = Handlebars.compile(html)
      return template(bookModel)
    },

    delegateEvents: function () {
      var self = this;

      this.$el.on('change', function (e) {
        self.handleBookSelection(e);
      })

      return this;
    },

    onShow: function () {
      this.el.selectedIndex = this.options.selected;
    },

    handleBookSelection: function (e) {
      //make this an app wide controller event
      var book_id = parseInt(e.target.value, 10);
      App.vent.trigger('selected:book', book_id);
    }
  });



  SelectModule.SelectChapterView = Backbone.Marionette.ItemView.extend({
    tagName: 'select',
    name: 'chapter',

    templateHelpers: function () {
      return {
        chaps: _.keys(this.options.grouped),
        name: this.options.name
      }
    },

    template: function (groupedData) {
      Handlebars.registerHelper("formatNumber", formatNumber);
      Handlebars.registerHelper('arrayIndexAdjust', arrayIndexAdjust);
      var html = $('#select_chapter_template').text();
      var template = Handlebars.compile(html)
      return template(groupedData);
    },

    delegateEvents: function () {
      var self = this;

      this.$el.on('change', function (e) {
        self.handleChapterSelection(e);
      })

      return this;
    },

    onShow: function () {
      this.el.selectedIndex = this.options.selected;
    },

    handleChapterSelection: function (e) {
      chapter_id = parseInt(e.target.value, 10);
      App.vent.trigger('selected:chapter', chapter_id);
    }
  });



  SelectModule.SelectVerseView = Backbone.Marionette.ItemView.extend({
    tagName: 'select',
    //className: 'scripture-select',
    //model: App.Entities.Book,
    childView: SelectModule.SelectChapterItemView,

    initialize: function (options) {},

    templateHelpers: function () {},

    template: function (serializedModel) {},

    delegateEvents: function () {},

    handleSelection: function (e) {}
  });


});
