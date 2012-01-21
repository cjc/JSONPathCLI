#JSONPathCLI

A cli program wrapping [JSONPath](https://github.com/s3u/JSONPath)

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

If the results are javascript objects, or if the -j option is used to force json output, then the results are output as colorised json (using util.inspect)

    $ jsonpath $..author sample.json -j
    [ 'Nigel Rees',
      'Evelyn Waugh',
      'Herman Melville',
      'J. R. R. Tolkien' ]


##LICENSE

````MIT````
