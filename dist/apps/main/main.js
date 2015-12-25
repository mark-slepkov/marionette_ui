(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(['marionette'], function() {
    var Marionette, main;
    Marionette = require('marionette');
    main = (function(superClass) {
      extend(main, superClass);

      function main() {
        return main.__super__.constructor.apply(this, arguments);
      }

      main.prototype.__module__ = '';

      main.prototype.__file__ = 'main';

      main.prototype.initialize = function() {
        this.generate_template();
        return this;
      };

      return main;

    })(Marionette.LayoutView);
    return main;
  });

}).call(this);
