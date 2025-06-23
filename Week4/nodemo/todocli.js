import fs from 'fs'
import {Command} from 'commander'
import chalk from 'chalk'


const program = new Command();

function readTodo(){
  const data = fs.readFileSync('data.json','utf-8')
  return JSON.parse(data);
}

function saveTodo(todo){
  fs.writeFileSync('data.json',JSON.stringify(todo,null,2),'utf-8')
}

function checkTodo(task,time){
  const data=readTodo();
  const match = data.find(t=>t.todotask===task && t.time===time)
  if(match){
    console.log(chalk.blue(`${task} Already Exist !`))
    return false;
  }
  else{
    return true;
  }
}

program
.name('ToDo')
.description('Simple ToDo')
.version('1.0.0')

program
.command('add')
.description('Add New Todo')
.option('-T,--task <task>','Task to be added')
.option('-t,--time <time>','Scheduled Time ')
.action((options)=>{
  const data = readTodo();
  const notmatch = checkTodo(options.task,options.time);
  if(notmatch){
    const todo ={
      id:Date.now(),
      done:false,
      todotask:options.task,
      time:options.time
    }
    data.push(todo);
    saveTodo(data);
    console.log(chalk.green.bold(`${options.task} at ${options.time} Added `));
  }

})


program
.command('delete')
.description('Delete Todo')
.option('-T,--task <task>','Task to be added')
.option('-t,--time <time>','Scheduled Time ')
.action((options)=>{
  const data = readTodo();
const filtered = data.filter(t => !(t.todotask === options.task && t.time === options.time));

if (data.length === filtered.length) {
  console.log(chalk.blue(`Task Not Found`));
} else {
  saveTodo(filtered);
  console.log(chalk.red.bold(`${options.task} at ${options.time} Deleted `));
}
})



program
.command('done')
.description('Todo Task Completed')
.option('-T,--task <task>','Task to be added')
.option('-t,--time <time>','Scheduled Time ')
.action((options)=>{
  const data = readTodo();
  const match = data.find(t=> (t.todotask===options.task && t.time === options.time))
if(match){
  if(match.done){
    console.log(chalk.yellow(`Task Already Marked Done`));
  }else{
  match.done=true;
  saveTodo(data);
   console.log(chalk.green(`${options.task} at ${options.time} Marked Done `))
}}else{
  console.log(chalk.blue(`Task Not Found`))
}
})

program
.command('list')
.description('list all todo')
.action(()=>{
  const data = readTodo();
if(!data.length){
  console.log(chalk.yellow(`No Task Found`))
}else{
  data.forEach((task,i)=>{
    const status = task.done ? chalk.green.bold(`Done`) : chalk.red.bold(` Not Done`);
    console.log(`${i+1}. ${task.todotask} at ${task.time } : ${status} `);
  })
}
})

program.parse();
