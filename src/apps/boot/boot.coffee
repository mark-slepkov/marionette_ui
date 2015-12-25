define(
  (require, exports, module)->
    Marionette = require('marionette')


    class main extends Marionette.LayoutView
      __module__: 'main'
      __file__: 'main'

      initialize: ()->
        console.log('main sdfsdf')
        this.generate_template()
        return this

    return main
)