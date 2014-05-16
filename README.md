ember-data-elasticsearch-kit
============================

You're able to use this library as `ember-data` adapter for working with `elasticsearch` appliance.
Works with elasticsearch v1.1.1.

Moreover, this library ships with useful DSL conviniences for creating `mappings` and `queries` and many other features such as `bulk` and so on.

Let's consider some partials from `spec/mapping_dsl_spec.coffee`:

```coffee
  beforeEach ->
    @subject = EDEK.MappingDSL

  it "creates simpe mapping in general", ->
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

   it 'creates nested mapping', ->
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
          properties: {
            firstName: {type: "string"},
            lastName: {type: "string"},
            avatar: {
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
```

Other things and examples you could dig from `spec`s directory.

Instalation
===========

```bash
wget -O ember-data-elasticsearch-kit.min.js http://goo.gl/VXlbXx
```


MIT License
===========

The MIT License (MIT)

Copyright (c) 2013 Roundscope

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
