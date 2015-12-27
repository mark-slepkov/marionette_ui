define(
  (require, exports, module)->
    Marionette = require('marionette')


    class main extends Marionette.LayoutView
      __module__: 'main'
      __application__: 'main'

      initialize: ()->
        console.log('main')
        return this

    return main
)