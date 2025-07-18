let taskList = document.getElementById('taskList');
let taskInput = document.getElementById('taskInput');

window.onload = loadTasks;

function addTask() {
  let task = taskInput.value.trim();
  if (task === '') return;

  createTaskElement(task);
  saveTask(task);

  taskInput.value = '';
}

function createTaskElement(task) {
  let li = document.createElement('li');
  li.textContent = task;

  li.onclick = function () {
    li.classList.toggle('completed');
  };

  let deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.onclick = function (e) {
    e.stopPropagation();
    taskList.removeChild(li);
    removeTask(task);
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(createTaskElement);
}

function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
