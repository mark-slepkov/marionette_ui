$ = require('jquery')
_ = require('underscore')


Marionette = require('marionette')
require('script!nunjucks')
console.log(nunjucks);
nunjucks.configure('/dist', {autoescape: true});

Marionette.TemplateCache.prototype.loadTemplate =
    (templatePath, options)->
        return nunjucks.render(templatePath, options);

Marionette.Renderer.render =
    (templatePath, options)->
        options.yourself = Users(0).toJSON();
        return nunjucks.render(templatePath, options);


Marionette.View.prototype.generate_template =
    (options)->
        if not options
            options = {}
        root = options.__root__ || this.__root__ || 'apps'
        module_name = options.__module__ || this.__module__
        app_name = options.__application__ || this.__application__
        template_name = options.__template__ || this.__template__ || 'default'
        template_url = 'apps/' + module_name + '/tmpl/' + app_name + '/' + template_name + '/template.html';
        this.template = template_url;
        attributes =
            'data-module': module_name
            'data-application': app_name
            'data-template': template_name
        if not this.attributes
            this.attributes = {}
        _.extend(this.attributes, attributes)
        this.$el.attr(attributes)
        # console.log(this.attributes)

        return template_url;

$(document).on(
    'ready',
    ()->
        MarionetteSelect = require('marionette-select')
        items = [
            {key: "Mark", value: 1},
            {key: "Vasya", value: 2},
            {key: "Artem", value: 3},
            {key: "John Connor", value: 4},
            {key: "T-800", value: 5},
            {key: "Gandalf", value: 6}
        ]
        select = new MarionetteSelect(items)
        $('body').append(select.$el)
        select.render()
    )
