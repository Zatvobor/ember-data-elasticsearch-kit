module 'Facets',
  setup: ->
    @subject = EDEK.QueryDSL

test 'custom facet name', ->
  expect 1
  facet = @subject.query ->
    @terms {tags: ["java", "erlang"]}
  json = @subject.query ->
    @match {title: "T*"}
    @facets ->
      {global_tags: $.extend({global: true}, facet.query)}
  deepEqual(json, {query:{match: {title: 'T*'}}, facets: {global_tags: {global: true, terms: {tags: ['java', 'erlang']}}}}, 'json ok')
