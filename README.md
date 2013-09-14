ember-data-elasticsearch-kit
============================
```
    json =
      QueryDSL.filter ->
        @and ->
          @filters ->
            @or ->
              @filters ->
                @term  { requester: email }
                @term  { owner: email }
                @terms { people: [email] }
            @or ->
              @filters ->
                @not ->
                  @filter ->
                    @term {status: "Closed"}
                @range {updated_at: {gte: time}}
```
