module "MappingDSL",
  setup: ->
    @subject = EDEK.MappingDSL

test "create simpe mapping", ->
  expect 1
  mapping = @subject.mapping ->
    @mapping "user", ->
      @mapping "firstName", type: "string"
      @mapping "lastName", type: "string"
  
  deepEqual mapping,
    mappings:
      user:
        properties:
          firstName:
            type: "string"
          lastName:
            type: "string"

test "create two type mapping", ->
  expect 1
  mapping = @subject.mapping ->
    @mapping "user", ->
      @mapping "firstName", type: "string"
      @mapping "lastName", type: "string"
    @mapping "action", ->
      @mapping "type", type: "string"

  deepEqual mapping,
    mappings:
      user:
        properties:
          firstName:
            type: "string"
          lastName:
            type: "string"
      action:
        properties:
          type:
            type: "string"

test "create mapping with nested", ->
  expect 1
  mapping = @subject.mapping ->
    @mapping "user", ->
      @mapping "firstName", type: "string"
      @mapping "lastName", type: "string"
      @mapping "avatar", type: "nested", ->
        @mapping "id", type: "long"
        @mapping "url", type: "string"

  deepEqual mapping,
    mappings:
      user:
        properties:
          firstName:
            type: "string"
          lastName:
            type: "string"
          avatar:
            type: "nested"
            properties:
              id:
                type: "long"
              url:
                type: "string"

test "create mapping with settings", ->
  expect 1
  settings = @subject.mapping {
      analysis:
        analyzer:
          lc:
            filter: ["lowercase"]
            type: "custom"
            tokenizer: "keyword"
    }, ->
      @mapping "user", ->
        @mapping "firstName", type: "string"

  deepEqual settings,
    settings:
      analysis:
        analyzer:
          lc:
            filter: ["lowercase"]
            type: "custom"
            tokenizer: "keyword"
    mappings:
      user:
        properties:
          firstName:
            type: "string"

test "create mapping", ->
  expect 1
  mapping = @subject.mapping ->
    @mapping "testUser", ->
      @mapping "firstName", type: "string"
      @mapping "lastName", type: "string"
  responce = @subject.create("http://localhost:9200/test_index", mapping)
  deepEqual(responce, {acknowledged: true})

test "delete index", ->
  expect 1
  responce = @subject.delete("http://localhost:9200/test_index")
  deepEqual(responce, {acknowledged: true})
