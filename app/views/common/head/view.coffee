Core = require "core"

class head
  that = @
  constructor:->
    that = @
    @$btnHead = $("#btnHead")
    @bindEvents()

  bindEvents:->
    @$btnHead.on "click", @btnAlert

# 前往地图选房
  btnAlert:=>
    Core.randomPost "api/selectById",{id:1},(data)->
      alert data.result.username

module.exports = head