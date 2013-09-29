class @DatabaseCleaner
  @reset: ->
    @destroy()
    @create()

  @create: ->
    MappingDSL.create("http://localhost:9200/test_adapter")

  @destroy: ->
    MappingDSL.delete("http://localhost:9200/test_adapter")

class @TestEnv

  constructor: ->
    DatabaseCleaner.reset()

    unless window.Fixture
      @models()

      mapping = {user: User}
      window.Fixture = window.setupStore(mapping)
    @


  models: ->
    window.User = DS.Model.extend
      name: DS.attr('string')
      job: DS.attr('string')

  loadData: ->
    BulkDSL.store {host: "http://localhost:9200/test_adapter", index: "test_adapter", type: "user"}, ->
      @create {id: 2, name: "bar2", job: "foo bar test"}
      @create {id: 3, name: "bar3", job: "foo bar test"}
      @create {id: 4, name: "bar4", job: "foo bar test"}
      @create {id: 5, name: "bar5", job: "foo bar test"}
    BulkDSL.refresh('http://localhost:9200/test_adapter')

  loadFacets: ->
    MappingDSL.delete("http://localhost:9200/test_adapter")
    mapping = MappingDSL.mapping ->
      @mapping "user", ->
        @mapping "title", type: "string", boost: 2.0, analyzer: "snowball"
        @mapping "tags", type: "string", analyzer: "keyword"
    MappingDSL.create("http://localhost:9200/test_adapter", mapping)
    BulkDSL.store {host: "http://localhost:9200/test_adapter", index: "test_adapter", type: "user"}, ->
      @create id: 1, title: "One", tags: ["elixir"]
      @create id: 2, title: "Two", tags: ["elixir", "ruby"]
      @create id: 3, title: "Three", tags: ["java"]
      @create id: 4, title: "Four", tags: ["erlang"]
    BulkDSL.refresh('http://localhost:9200/test_adapter')

window.setupStore = (options) ->
  env = {}

  options = options or {}
  container = env.container = new Ember.Container()
  adapter = env.adapter = DS.ElasticSearchAdapter.extend(host: "http://localhost:9200", url: "test_adapter/user")

  delete options.adapter

  for prop of options
    container.register "model:" + prop, options[prop]
  container.register "serializer:_default", DS.RESTSerializer
  container.register "store:main", DS.Store.extend(adapter: adapter)

  container.register 'transform:boolean', DS.BooleanTransform
  container.register 'transform:date', DS.DateTransform
  container.register 'transform:number', DS.NumberTransform
  container.register 'transform:string', DS.StringTransform

  container.injection "serializer", "store", "store:main"

  env.serializer = container.lookup("serializer:_default")
  env.restSerializer = container.lookup("serializer:_rest")
  env.store = container.lookup("store:main")
  env.adapter = env.store.get("defaultAdapter")

  env