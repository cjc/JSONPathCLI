#!/usr/bin/env node
require('colorsafeconsole')(console)
var fs = require('fs')
  , jsonpath = require('JSONPath').eval
  , util = require('util')
  , colors = require('colors')
  , _ = require('underscore')
  , opt = require('optimist')
    .usage('Usage: $0 ' + 'query '+ '[file (optional, otherwise stdin)]')
    .boolean('j').alias('j','json').describe('j','Force json formatted output even when results are primitive values')
    .boolean('h').alias('h','help').describe('h','Show this help')
    .boolean('c').alias('c','cheat').describe('c','Show a jsonpath cheatsheet')
  , argv = opt.argv

if (argv.h) {
  opt.showHelp(console.log)
  process.exit()
} else if (argv.c) {
  var cheats = [
    ['/store/book/author','$.store.book[*].author','the authors of all books in the store'],
    ['//author','$..author','all authors'],
    ['/store/*','$.store.*','all things in store, which are some books and a red bicycle.'],
    ['/store//price','$.store..price','the price of everything in the store.'],
    ['//book[3]','$..book[2]','the third book'],
    ['//book[last()]','$..book[(@.length-1)]','the last book in order.'],
    ['','$..book[-1:]',''],
    ['//book[position()<3]','$..book[0,1]','the first two books'],
    ['','$..book[:2]',''],
    ['//book[isbn]','$..book[?(@.isbn)]','filter all books with isbn number'],
    ['//book[price<10]','$..book[?(@.price<10)]','filter all books cheapier than 10'],
    ['//*','$..*','all Elements in XML document. All members of JSON structure.']
  ] 
  var Table = require('cli-table')
  var table = new Table({
    head : ['XPath','JSONPath','Description']
    , colWidths: _.reduce(cheats, function(memo, val) {var m = [];_.times(memo.length, function(i){m[i] = Math.max(memo[i],val[i].length+2)});return m}, [0,0,0])
  })
  table.push.apply(table,cheats)
  console.log('Cheatsheet data taken from ' + 'https://github.com/s3u/JSONPath'.yellow)
  console.log(table.toString())
  process.exit()
}

var query = argv._[0]
if (argv._.length == 0) {
  opt.showHelp()
  process.exit()
} else if (argv._.length > 1) {
  var t = fs.readFileSync(argv._[1], 'utf8')
  queryJSONString(query, t)
} else {
  var t = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function(chunk) {
    t+=chunk  
  })
  process.stdin.on('end',function() {
    queryJSONString(query,t)
  })
  process.stdin.resume()
}


function queryJSONString(query, json) {
  var obj = JSON.parse(json)
  var results = jsonpath(obj,query)
  if (!argv.j && results.length > 0 && ['string','number','boolean'].indexOf(typeof(results[0])) >= 0) {
    for(var i=0;i<results.length;i++) {
      if (typeof(results[i]) == 'string') {
        console.log(results[i].green)
      } else if (typeof(results[i]) == 'boolean') {
        console.log((results[i] + '')[results[i] ? 'blue' : 'red'])
      } else {
        console.log((results[i] + '').yellow)
      }
    }
  } else {
    console.log(util.inspect(results, false, null, true))
  }
}

