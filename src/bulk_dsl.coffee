class @BulkDSL
  @store: (options, fun) ->
    @documents = []
    fun.call(new BulkDSL(options, @documents))
    @request(options, @documents)

  @url: (options) ->
    "%@/%@".fmt(options.host, "_bulk")

  @request: (options, json)->
    @responce = undefined
    hash = {}
    hash.url = @url(options)
    hash.type = "POST"
    hash.dataType = 'json'
    hash.async = false
    hash.contentType = 'application/json; charset=utf-8'
    hash.data = json.join("\n")
    hash.success = (data) => @responce = data
    Ember.$.ajax(hash)
    @responce

  @refresh: (url) ->
    hash = {}
    hash.url = "%@/_refresh".fmt(url)
    hash.async = false
    hash.type = 'POST'
    hash.contentType = 'application/json; charset=utf-8'
    Ember.$.ajax(hash)

  constructor: (@options, @documents) ->
    @meta = ["_type", "_index"]
    @_index = @options.index
    @_type  = @options.type || "document"

  create: (options) ->
    @documents.push(JSON.stringify({create: @_createHeader(options)}))
    @documents.push(JSON.stringify(options))

  delete: (options) ->
    @documents.push(JSON.stringify({delete: @_createHeader(options)}))
    @documents.push(JSON.stringify(options))

  index: (options) ->
    @documents.push(JSON.stringify({index: @_createHeader(options)}))
    @documents.push(JSON.stringify(options))

  update: (options) ->
    @documents.push(JSON.stringify({update: @_createHeader(options)}))
    @documents.push(JSON.stringify(options))

  _createHeader: (options) ->
    headers = {}
    ["_type", "_index", "_version", "_routing", "_refresh", "_percolate", "_parent", "_timestamp", "_ttl"].forEach (type) =>
      if @meta.indexOf(type) >= 0
        if !options[type]
          headers[type] = @[type]
        else
          headers[type] = options[type]
          delete options[type]
      else
        if options[type]
          headers[type] = options[type]
          delete options[type]

      headers._id = options.id
    headers