module 'DS.ElasticSearchAdapter',
  setup: ->
    @subject = new TestEnv()
    @async = window.async

# find
test 'find: by id', ->
  expect 1
  @subject.loadData().then @async ->
    window.Fixture.store.find('user', 2).then @async (model) ->
      equal(model.get('name'), 'bar2', 'user name is ok')

test 'find: by query', ->
  expect 1
  @subject.loadData().then @async ->
    json = EDEK.QueryDSL.query ->
      @match {job: {query: "bar"}}
    window.Fixture.store.find('user', json).then @async (model) ->
      equal(model.toArray().length, 3, 'array length is ok')

test 'find: get total', ->
  expect 1
  model = undefined
  @subject.loadData().then @async ->
    json = EDEK.QueryDSL.query ->
      @match {job: {query: "bar"}}
    window.Fixture.store.find('user', json).then @async (_model) ->
      model = _model
      equal(model.total, 3, 'total is ok')

# create, update, delete
test 'create document', ->
  expect 2
  model = window.Fixture.store.createRecord('user', {name: "my name"})
  model.save().then @async ->
    ok(model.get('id')?, 'id is ok')
    equal(model.get('name'), 'my name', 'name is ok')

test 'update document', ->
  expect 1
  @subject.loadData().then @async ->
    window.Fixture.store.find('user', 2).then @async (found) ->
      found.set('name', "updated")
      found.save().then @async (saved) ->
        equal(saved.get('name'), 'updated', 'name is updated')

test 'delete document', ->
  expect 2
  @subject.loadData().then @async ->
    window.Fixture.store.find('user', 2).then (found) ->
      found.deleteRecord()
      equal(found.get('isDeleted'), true, 'isDeleted prop is true')
      found.save().then @async (saved) ->
        equal(saved.get('isDeleted'), true, 'isDeleted prop is true')

# facets
test 'return facets as json', ->
  expect 2
  @subject.loadFacets().then @async ->
    facet = EDEK.QueryDSL.query ->
      @terms {field: "tags"}
    json = EDEK.QueryDSL.filter ->
      @terms {tags: ["elixir", "ruby"]}
      @facets ->
        {global_tags: $.extend({global: true}, facet.query),
        current_tags: facet.query}
    window.Fixture.store.find('user', json).then @async (models) ->
      equal(models.get('global_tags').total, 4, '4 global_tags')
      equal(models.get('current_tags').total, 4, '4 current_tags')
