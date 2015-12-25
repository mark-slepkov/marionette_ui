(function() {
  var $, Marionette;

  $ = require('jquery');

  Marionette = require('marionette');

  require('script!nunjucks');

  console.log(nunjucks);

  nunjucks.configure('/dist', {
    autoescape: true
  });

  Marionette.TemplateCache.prototype.loadTemplate = function(templatePath, options) {
    return nunjucks.render(templatePath, options);
  };

  Marionette.Renderer.render = function(templatePath, options) {
    options.yourself = Users(0).toJSON();
    return nunjucks.render(templatePath, options);
  };

  Marionette.View.prototype.generate_template = function(options) {
    var app_name, attributes, module_name, root, template_name, template_url;
    if (!options) {
      options = {};
    }
    root = options.__root__ || this.__root__ || 'apps';
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
    return alert('...Ъ');
  });

}).call(this);
