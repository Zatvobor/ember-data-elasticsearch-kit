describe 'Facets', ->

  beforeEach ->
    @subject = EDEK.QueryDSL

  it "custom facet name", ->
    facet = @subject.query ->
      @terms {tags: ["java", "erlang"]}
    json = @subject.query ->
      @match {title: "T*"}
      @facets ->
        {global_tags: $.extend({global: true}, facet.query)}

    expect(json).toEqual({
      query:{match: {title: 'T*'}}, facets: {global_tags: {global: true, terms: {tags: ['java', 'erlang']}}}})
