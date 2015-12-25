(function() {
  var $, Marionette, _;

  $ = require('jquery');

  _ = require('underscore');

  Marionette = require('marionette');

  require('script!nunjucks');

  console.log(nunjucks);

  nunjucks.configure('marionette_ui/dist', {
    autoescape: true
  });

  Marionette.TemplateCache.prototype.loadTemplate = function(templatePath, options) {
    return nunjucks.render(templatePath, options);
  };

  Marionette.Renderer.render = function(templatePath, options) {
    return nunjucks.render(templatePath, options);
  };

  Marionette.View.prototype.generate_template = function(options) {
    var app_name, attributes, module_name, template_name, template_url;
    if (!options) {
      options = {};
    }
    module_name = options.__module__ || this.__module__;
    app_name = options.__application__ || this.__application__;
    template_name = options.__template__ || this.__template__ || 'default';
    template_url = 'apps/' + module_name + '/tmpl/' + app_name + '/' + template_name + '/template.html';
    this.template = template_url;
    attributes = {
      'data-module': module_name,
      'data-application': app_name,
      'data-template': template_name
    };
    if (!this.attributes) {
      this.attributes = {};
    }
    _.extend(this.attributes, attributes);
    this.$el.attr(attributes);
    return template_url;
  };

  $(document).on('ready', function() {
    var MarionetteSelect, items, select;
    MarionetteSelect = require('marionette-select');
    items = [
      {
        key: "Mark",
        value: 1
      }, {
        key: "Vasya",
        value: 2
      }, {
        key: "Artem",
        value: 3
      }, {
        key: "John Connor",
        value: 4
      }, {
        key: "T-800",
        value: 5
      }, {
        key: "Gandalf",
        value: 6
      }
    ];
    select = new MarionetteSelect(items);
    $('body').append(select.$el);
    return select.render();
  });

}).call(this);
