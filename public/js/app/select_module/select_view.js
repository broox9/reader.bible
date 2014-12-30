Reader.module('SelectModule', function (SelectModule, App, Backbone, Marionette, $, _) {


  function formatNumber (num) {
    if (num > 9) {
      return "0"+num;
    } else if (num > 99) {
      return num;
    }

    return "00"+num;
  }

  SelectModule.SelectItemView = Backbone.Marionette.ItemView.extend({
    tagName: "option",

    template: function (serializedModel) {
      Handlebars.registerHelper('formatNumber', formatNumber);
      var text = $('#select_item_template').text();
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
    },
  });


  SelectModule.SelectView = Backbone.Marionette.CompositeView.extend({
    className: 'scripture-select',
    //model: App.Entities.Book,
    childView: SelectModule.SelectItemView,
    childViewContainer: '#book-selector',


    events: {
      'change #book-selector': 'handleBookSelection'
    },

    initialize: function (options) {
      this.collection = options.collection;
    },

    template: function (serializedModel) {
        var text = $('#select_template').text();
        var template = Handlebars.compile(text);
        return template(serializedModel);
    },

    handleBookSelection: function (e) {
      //make this an app wide controller event
      console.log("Selected", e.target.value);
      var url = App.constants.getAPIbase() + '/api/book/' + e.target.value;
      $.get(url, function (data) {
        console.log("BOOK DATA", data);
      });
    }
  });



});
