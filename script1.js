 // Retrieve tasks from local storage
 const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

 // Function to save tasks to local storage
 function saveTasks() {
   localStorage.setItem('tasks', JSON.stringify(tasks));
 }

 // Function to render tasks on the page
 function renderTasks() {
   const taskList = document.getElementById('task-list');
   taskList.innerHTML = '';

   tasks.forEach((task, index) => {
     const taskItem = document.createElement('li');
     taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
     taskItem.innerHTML = `
       <span class="description">${task.description}</span>
       <div class="actions">
         <button onclick="completeTask(${index}) ">Complete</button>
         <button onclick="deleteTask(${index})">Delete</button>
       </div>
     `;
     taskList.appendChild(taskItem);
   });
 }

 // Function to add a new task
 function addTask(description) {
   const task = {
     description: description,
     completed: false
   };

   tasks.push(task);
   saveTasks();
   renderTasks();
 }

 // Function to mark a task as completed
 function completeTask(index) {
   tasks[index].completed = true;
   saveTasks();
   renderTasks();
 }

 // Function to delete a task
 function deleteTask(index) {
   tasks.splice(index, 1);
   saveTasks();
   renderTasks();
 }

 // Event listener for the task form submission
 document.getElementById('task-form').addEventListener('submit', function (event) {
   event.preventDefault();
   const taskInput = document.getElementById('task-input');
   const taskDescription = taskInput.value.trim();

   if (taskDescription !== '') {
     addTask(taskDescription);
     taskInput.value = '';
     taskInput.focus();
   }
 });

 // Initial rendering of tasks
 renderTasks();
