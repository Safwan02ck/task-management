document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const taskForm = document.getElementById('taskForm');
    const newTaskInput = document.getElementById('newTaskInput');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <div>
                    <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
                    <label for="task-${index}">${task.text}</label>
                </div>
                <button class="delete-btn" data-index="${index}">🗑️</button>
            `;
            taskList.appendChild(li);
        });
    }

    function addTask(e) {
        e.preventDefault();
        const text = newTaskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            saveTasks();
            newTaskInput.value = '';
            renderTasks();
        }
    }

    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function toggleDarkMode() {
        appContainer.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', darkModeToggle.checked);
    }

    taskForm.addEventListener('submit', addTask);

    taskList.addEventListener('click', (e) => {
        if (e.target.type === 'checkbox') {
            const index = e.target.id.split('-')[1];
            toggleTask(index);
        }
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            deleteTask(index);
        }
    });

    darkModeToggle.addEventListener('change', toggleDarkMode);

    // Initialize dark mode
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        darkModeToggle.checked = true;
        appContainer.classList.add('dark-mode');
    }

    // Initial render
    renderTasks();
});