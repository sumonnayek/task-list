//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const ClearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput =document.querySelector('#task');

//load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
    //DOM load event
    // document.addEventListener('DOMContentloaded', getTasks);
    //Add task   
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click',removeTask);
    //Clear task events
    ClearBtn.addEventListener('click',clearTasks);
    //Filter task events
    filter.addEventListener('keyup', filterTasks);
    
}

//Get tasks from LS
 
(function getTasks(){
   let tasks;
   if(localStorage.getItem('tasks')=== null){
       tasks = [];
   } else {
       tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   
   tasks.forEach(function(task){
   //Create li element
   const li = document.createElement('li');
   //Add class
   li.className = 'collection-item';
   //Create text node and append to li
   li.appendChild(document.createTextNode(task));
   //Create new link element
   const link =document.createElement('a');
   //Add class
   link.className='delete-item secondary-content';
   //Add icon html
   link.innerHTML = '<i class="fa fa-remove"></i>';
   //Append the link to li
   li.appendChild(link);
   
   //Append li to ul
   taskList.appendChild(li);
   
   });
           
})();
//Add Task
function inputLength() {
    return taskInput.value.length;
}
function addTask(e) {
    if(inputLength() > 0) {
       addItem(e);
    }
    e.preventDefault();
}

function addItem(e) {
    // if(taskInput.value === ''){
    //     alert('Add a task');
    // }
    
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link =document.createElement('a');
    //Add class
    link.className='delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);
    
    //Append li to ul
    taskList.appendChild(li);
    
    //Store in LS
    storeTaskInLocalStorage(taskInput.value);
    
    //clear input
    taskInput.value = '';
    
    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.push(task);
    
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
       if(confirm('Are U Sure?')) {   
        e.target.parentElement.parentElement.remove();  
       }
    }
    removeTask = e.target.parentElement.parentElement.textContent;

    tasks = JSON.parse(localStorage.getItem('tasks'));
    
    let index = 0;
    // tasks.forEach(function(task){
        for(let i=0; i<tasks.length; i++) {
        
        if(removeTask == tasks[i]) {
          index = i;
        }
    }

    tasks.splice(index,1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
    //taskList.innerHTML = '';
    
    //Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    if(localStorage.tasks) {
        localStorage.removeItem("tasks");
    }
}

//Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

