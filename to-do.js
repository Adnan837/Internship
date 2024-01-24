document.addEventListener('DOMContentLoaded', loadTasks);

// Function to load tasks from local storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    storedTasks.forEach(task => {
        const newTask = createTaskElement(task.text, task.priority, task.completed);
        taskList.appendChild(newTask);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('priority');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    const newTask = createTaskElement(taskInput.value, prioritySelect.value, false);
    taskList.appendChild(newTask);

    // Save tasks to local storage
    saveTasksToLocalStorage();

    // Clear the input fields
    taskInput.value = '';
    prioritySelect.value = 'low';
}

// Function to create a new task element
function createTaskElement(text, priority, completed) {
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} onclick="toggleTaskStatus(this)">
        <span class="${completed ? 'completed' : ''}">${text} (${priority} priority)</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="removeTask(this)">Remove</button>
    `;

    return newTask;
}

// Function to toggle task status (completed or pending)
function toggleTaskStatus(checkbox) {
    const taskText = checkbox.nextElementSibling;
    taskText.classList.toggle('completed');

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Function to edit a task
function editTask(button) {
    const taskText = button.previousElementSibling;
    const newText = prompt('Edit task:', taskText.textContent);

    if (newText !== null) {
        taskText.textContent = newText;

        // Save tasks to local storage
        saveTasksToLocalStorage();
    }
}

// Function to remove a task
function removeTask(button) {
    const taskList = document.getElementById('taskList');
    const taskItem = button.parentNode;
    taskList.removeChild(taskItem);

    // Save tasks to local storage
    saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children).map(task => {
        const text = task.querySelector('span').textContent;
        const priority = text.match(/\(([^)]+)\)/)[1];
        const completed = task.querySelector('.checkbox').checked;

        return { text, priority, completed };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}