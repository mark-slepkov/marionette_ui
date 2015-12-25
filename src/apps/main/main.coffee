define(
  ['marionette'],
  ()->
    Marionette = require('marionette')


    class main extends Marionette.LayoutView
      __module__: ''
      __file__: 'main'
      initialize: ()->
        this.generate_template()
        return this

    return main
)