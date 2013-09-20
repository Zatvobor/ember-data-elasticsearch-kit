class @MappingDSL
  @mapping: (options, fun) ->
    @_mappings = {mappings: {}}
    if fun
      @_mappings.settings = options
    else
      fun = options
    fun.call(new MappingDSL(@_mappings.mappings))
    @_mappings

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
      fun.call(new MappingDSL(mappings.properties))
    else
      @_mappings[type] = (options || mappings)