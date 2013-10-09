class EDEK.MappingDSL
  @mapping: (options, fun) ->
    @_mappings = {mappings: {}}
    if fun
      @_mappings.settings = options
    else
      fun = options
    fun.call(new EDEK.MappingDSL(@_mappings.mappings))
    @_mappings

  @create: (url, json) ->
    @responce = undefined

    hash = {}
    hash.url = url
    hash.type = "PUT"
    hash.dataType = 'json'
    hash.async = false
    hash.contentType = 'application/json; charset=utf-8'
    hash.data = JSON.stringify(json)
    hash.success = (data) => @responce = data
    Ember.$.ajax(hash)
    @responce

  @delete: (url) ->
    @responce = undefined
    hash = {}
    hash.url = url
    hash.type = "DELETE"
    hash.async = false
    hash.success = (data) => @responce = data
    Ember.$.ajax(hash)
    @responce

  constructor: (@_mappings) ->

  mapping: (type, options, fun) ->
    mappings = {}
    if fun || typeof options == 'function'
      if typeof options != 'function'
        options.properties = {}
        mappings = options
      else
        fun = options
        mappings.properties = {}
      @_mappings[type] = mappings
      fun.call(new EDEK.MappingDSL(mappings.properties))
    else
      @_mappings[type] = (options || mappings)

