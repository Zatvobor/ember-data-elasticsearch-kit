describe 'MappingDSL', ->

  beforeEach ->
    @subject = MappingDSL

  it "create simpe mapping", ->
    mapping = @subject.mapping ->
      @mapping "user", ->
        @mapping "firstName", type: "string"
        @mapping "lastName", type: "string"

    expect(mapping).toEqual({
      mappings: {
        user: {
          properties:{
            firstName: {type: "string"},
            lastName: {type: "string"}
          }
        }
      }
    })

  it 'create two type mapping', ->
    mapping = @subject.mapping ->
      @mapping "user", ->
        @mapping "firstName", type: "string"
        @mapping "lastName", type: "string"
      @mapping "action", ->
        @mapping "type", type: "string"

    expect(mapping).toEqual({
      mappings: {
        user: {
          properties:{
            firstName: {type: "string"},
            lastName: {type: "string"}
          }
        },
        action: {
          properties: {
            type: {type: "string"}
          }
        }
      }
    })

  it 'create mapping with nested', ->
    mapping = @subject.mapping ->
      @mapping "user", ->
        @mapping "firstName", type: "string"
        @mapping "lastName", type: "string"
        @mapping "avatar", type: "nested", ->
          @mapping "id", type: "long"
          @mapping "url", type: "string"

    expect(mapping).toEqual({
      mappings: {
        user: {
          properties:{
            firstName: {type: "string"},
            lastName: {type: "string"},
            avatar:{
              type: "nested",
              properties: {
                id: {type: "long"},
                url: {type: "string"}
              }
            }
          }
          }
        }
    })

  it 'create mapping with settings', ->
    settings = @subject.mapping {
        analysis: {
          analyzer: {
            lc: {
              filter: ["lowercase"],
              type: "custom",
              tokenizer: "keyword"
            }
          }
        }
      }, ->
        @mapping "user", ->
          @mapping "firstName", type: "string"

    expect(settings).toEqual({
      settings: {
        analysis: {
          analyzer: {
            lc: {
              filter: ["lowercase"],
              type: "custom",
              tokenizer: "keyword"
            }
          }
        }
      },
      mappings: {
        user: {
          properties:{
            firstName: {type: "string"}
          }
        }
      }
    })

  it 'delete index', ->
    responce = @subject.delete("http://localhost:9200/test_index"
    expect(responce).toEqual({
      ok : true, acknowledged : true
    })

  it "create mapping", ->
    mapping = @subject.mapping ->
      @mapping "testUser", ->
        @mapping "firstName", type: "string"
        @mapping "lastName", type: "string"
    responce = @subject.create("http://localhost:9200/test_index", mapping)
    expect(responce).toEqual({
      ok : true, acknowledged : true
    })
