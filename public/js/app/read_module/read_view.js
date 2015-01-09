Reader.module('ReadModule', function (ReadModule, App, Backbone, Marionette, $, _) {

  ReadModule.ChapterView = Backbone.Marionette.ItemView.extend({
    id: 'verse-box',

    events: {
      'click .verse' : 'handleClickVerse'
    },

    initialize: function (options) {},

    templateHelpers: function () {
      return this.options
    },

    template: function (data) {
      Handlebars.registerHelper('isSelected', function (id) {
        return (id == App.current.verse_number)
      });

      var html = $('#read_verse_item_template').html();
      var template = Handlebars.compile(html);
      return template(data)
    },

    handleClickVerse: function (e) {
      var element = $(e.currentTarget);
      element.toggleClass('highlight')
    },

    clearSelectedVerses: function () {
      this.$el.find('selected').removeClass('selected')
    }
  });


});
