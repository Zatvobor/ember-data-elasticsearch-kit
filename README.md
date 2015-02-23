ember-data-elasticsearch-kit
============================

You're able to use this library as `ember-data` adapter for working with `elasticsearch` appliance.
Works with elasticsearch v1.1.1.

Moreover, this library ships with useful DSL conviniences for creating `mappings` and `queries` and many other features such as `bulk` and so on.

Let's consider some partials from `spec/mapping_dsl_spec.coffee`:

```coffee
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
```

Other things and examples you could dig from `spec`s directory.

Instalation
===========

Install with bower
------------------

```
bower install ember-data-elasticsearch-kit
```

Ready to use as a regular JS assets
-----------------------------------

An `ember-data-elasticsearch-kit` ships with compiled assets which is plased in `dist` directory.

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
