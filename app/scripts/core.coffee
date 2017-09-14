class core
  @randomPost:(value)->
    url=arguments[0]
    if arguments.length==2
      fun=arguments[1]
      param="{random:'"+@getGuid()+"'}"
      param=eval('(' + param + ')')
    else if arguments.length >=3
      fun=arguments[2]
      if arguments[1] is undefined or arguments[1].length is 0
        param="{random:'"+@getGuid()+"'}"
        param=eval('(' + param + ')')
      else
        param=arguments[1]
        param=eval(param);
        param.random=@getGuid();
    $.post(url,param,fun);

  @getGuid: ->
    arr=[1..32]
    guid=""
    for a,i in arr
      n = Math.floor(Math.random()*16.0).toString(16)
      guid += n
      if i is 8 or i is 12 or i is 16 or i is 20
        guid += "-"
    return guid;

module.exports = core