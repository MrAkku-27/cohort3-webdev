const {Command} = require('commander');
const program = new Command();
const fs = require('fs')

program
.name('Read File')
.description('A simple cli to read file')
.version('1.0.0')

program
.command('count')
.description('To count the number of Lines')
.argument('<fileName>','Name Of the File ')
.action((file)=>{
  fs. readFile(file,'utf-8',(err,data)=>{
    const arr = data.split('\n');
    const len = arr.length;
    console.log(`No Of Lines in ${file} is ${len}`);  
  })
})


program.parse();