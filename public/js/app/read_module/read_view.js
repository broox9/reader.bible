Reader.module('ReadModule', function (ReadModule, App, Backbone, Marionette, $, _) {

  ReadModule.ChapterView = Backbone.Marionette.ItemView.extend({
    id: 'verse-box',
    initialize: function (options) {
      this.items = options.items
    },

    templateHelpers: function () {
      return this.options
    },

    template: function (data) {
      var html = $('#read_chapter_item_template').html();
      var template = Handlebars.compile(html);
      return template(data)
    }
  });


});
