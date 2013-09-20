DS.ElasticSearchAdapter = DS.Adapter.extend

  buildURL: ->
    host = Ember.get(this, "host")
    namespace = Ember.get(this, "namespace")
    url = []
    url.push host  if host
    url.push namespace  if namespace
    url = url.join("/")
    url = "/" + url  unless host
    url

  ajax: (url, type, normalizeResponce, hash) ->
    @_ajax('%@/%@'.fmt(@buildURL(), url || ''), type, normalizeResponce, hash)

  _ajax: (url, type, normalizeResponce, hash={}) ->
    adapter = this
    return new Ember.RSVP.Promise((resolve, reject) ->
      if url.split("/").pop() == "" then url = url.substr(0, url.length - 1)
      hash.url = url
      hash.type = type
      hash.dataType = 'json'
      hash.contentType = 'application/json; charset=utf-8'

      hash.context = adapter

      if hash.data && type != 'GET'
        hash.data = JSON.stringify(hash.data)

      if adapter.headers
        headers = adapter.headers
        hash.beforeSend = (xhr) ->
          forEach.call Ember.keys(headers), (key) ->
            xhr.setRequestHeader key, headers[key]

      unless hash.success
        hash.success = (json) ->
          _modelJson = normalizeResponce.call(adapter, json)
          Ember.run(null, resolve, _modelJson)

      hash.error = (jqXHR, textStatus, errorThrown) ->
        if (jqXHR)
          jqXHR.then = null
        Ember.run(null, reject, jqXHR)

      Ember.$.ajax(hash)
    )

  find: (store, type, id) ->
    normalizeResponce = (data) ->
      _modelJson = {}
      _modelJson[type.typeKey] = data['_source']
      _modelJson
#    @ajax(id, 'GET', normalizeResponce)

  findMany: (store, type, ids) ->
    data =
      ids: ids

    normalizeResponce = (data) ->
      json = {}
      json[Ember.String.pluralize(type.typeKey)] = data['docs'].getEach('_source')
      json

    #url = [this.url, type.url, '_mget'].join('/');

#    @ajax('_all_docs?include_docs=true', 'POST', normalizeResponce, {
#      data: data
#    })

  findQuery: (store, type, query, modelArray) ->
#    url = [this.url, type.url, '_search'].join('/')

    normalizeResponce = (data) ->
      json = {}
      _type = Ember.String.pluralize(type.typeKey)
      json[_type] = data['hits']['hits'].getEach('_source')
      json[_type].forEach (item) =>
        if item._id && !item.id
          item.id = item._id
      json

  createRecord: (store, type, record) ->

  updateRecord: (store, type, record) ->

  deleteRecord: (store, type, record) ->


#    @ajax('_design/%@/_view/%@'.fmt(designDoc, query.viewName), 'GET', normalizeResponce, {
#      context: this
#      data: query.options
#    })