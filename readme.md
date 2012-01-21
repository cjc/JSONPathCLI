#JSONPathCLI

A cli program wrapping [JSONPath](https://github.com/s3u/JSONPath), for easily querying json data. For more information on jsonpath see [http://goessner.net/articles/JsonPath/](http://goessner.net/articles/JsonPath/)

##Installation

    npm install JSONPathCLI -g

##Usage

Accepts a jsonpath query as a parameter, and an optional filename to operate on

    jsonpath $..* albums.json

If no file is provided it acts on stdin

    cat albums.json | jsonpath $..*

Use the ````-c```` option to display a jsonpath cheatsheet

    jsonpath -c

##Output

If the results are of a primitive type (string, number, boolean), they are output separated by a newline.

    $ jsonpath $..author sample.json 
    Nigel Rees
    Evelyn Waugh
    Herman Melville
    J. R. R. Tolkien

    $ jsonpath $..price sample.json 
    8.95
    12.99
    8.99
    22.99
    19.95

If the results are javascript objects, or if the ````-j```` option is used to force json output, then the results are output as json (JSON.stringify)

    $ jsonpath $..author sample.json -j
    ["Nigel Rees","Evelyn Waugh","Herman Melville","J. R. R. Tolkien"]

    $ jsonpath $..book[2:] sample.json
    [{"category":"fiction","author":"Herman Melville","title":"Moby Dick","isbn":"0-553-21311-3","price":8.99},{"category":"fiction","author":"J. R. R. Tolkien","title":"The Lord of the Rings","isbn":"0-395-19395-8","price":22.99}]

The ````-p```` option can be used to pretty-print the json output in for readability (util.inspect)

    $ jsonpath $..book[2:] sample.json -p
    [ { category: 'fiction',
        author: 'Herman Melville',
        title: 'Moby Dick',
        isbn: '0-553-21311-3',
        price: 8.99 },
      { category: 'fiction',
        author: 'J. R. R. Tolkien',
        title: 'The Lord of the Rings',
        isbn: '0-395-19395-8',
        price: 22.99 } ]

##LICENSE

    MIT
