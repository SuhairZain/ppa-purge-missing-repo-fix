#!/usr/bin/env node
const argv = require('yargs')
    .usage('Usage: $0 --verbose [bool] --ask [bool] --input [file] --output [file]')
    .boolean(['verbose', 'ask'])
    .default({
        verbose: false,
        ask: false,
        input: 'input.txt',
        output: 'output.txt'
    })
    .argv;

const
    fs = require('fs'),
    LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(argv.input);

//Clears the output, and writes the for i in part
fs.writeFile(argv.output, 'for i in', function(){console.log(argv.output + ' cleared')});

//Strips away the numbers and opening parenthesis
const stripUnwantedChars = function (dep){
    return dep.substr(dep.indexOf(')') + 2).trim();
};

lr.on('error', function (err){
    console.log(err);
});

//Appends each package followed by a space
lr.on('line', function (line){
    fs.appendFile(argv.output, ' ' + stripUnwantedChars(line));
    if(argv.verbose)
        console.log(stripUnwantedChars(line));
});

//Writes the actual install part, writing -y only if ask is false
lr.on('end', function (){
    fs.appendFile(
        argv.output,
        '; do sudo apt-get install' + (argv.ask===true?' ':' -y ') + '$i; done'
    );
    console.log('Done.');
});