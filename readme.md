#JSONPathCLI

A cli program wrapping [JSONPath](https://github.com/s3u/JSONPath)

##Installation

Will be on npm in a few minutes

##Usage

Accepts a jsonpath query as a parameter, and an optional filename to operate on

    jsonpath $..* albums.json

If no file is provided it acts on stdin

    cat albums.json | jsonpath $..*

Use the ````-c```` option to display a jsonpath cheatsheet

    jsonpath -c


