ember-data-elasticsearch-kit
============================

_This alpha-level software tested on elasticsearch `v1.1.1`._


This library ships with useful DSL conveniences for creating `mappings`, `queries` and doing `bulk` payload.

Let's take a look at `spec/mapping_dsl_spec.coffee`:

```coffee
module "MappingDSL",
  setup: ->
    @subject = EDEK.MappingDSL

test "create simple mapping", ->
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

Other things and examples you can dig from `spec`s directory.


Installation
============

```
bower install ember-data-elasticsearch-kit
```

Ready to use as a regular JS assets
-----------------------------------

An `ember-data-elasticsearch-kit` ships with compiled assets which is placed in `dist` directory.


MIT License
===========

The MIT License (MIT)

Copyright (c) 2013 by Aleksey Zatvobor

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
