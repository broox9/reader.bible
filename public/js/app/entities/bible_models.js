Reader.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {
    this.startWithParent = false;

    Entities.Verse = Backbone.Model.extend({
      defaults: {
        b: 1,
        c: 1,
        id: 1001001,
        t: 'In the beginning God created the heaven and the earth.',
        v: 1
      }
    });



    Entities.BookListItem = Backbone.Model.extend({
      defaults: {
        b: 1,
        n: 'Genesis'
      },

      initialize: function (data) {
        this.set('id', data.b);
      }
    })

});
