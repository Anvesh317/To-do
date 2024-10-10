let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskinput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTaskList();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskitem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./images/edit.png" onclick="editTask(${index})" />
                <img src="./images/bin.png" onclick="deleteTask(${index})" />
            </div>
        </div>
        `;

        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        taskList.append(listItem);
    });

    updateStats();
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
};

const editTask = (index) => {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText.trim();
        updateTaskList();
    }
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressBar = document.getElementById('progress');
    const numbers = document.getElementById('numbers');

    progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
    numbers.textContent = `${completedTasks}/${totalTasks}`;

    if (completedTasks === totalTasks && totalTasks > 0) {
        triggerCelebration();
    }
};

const triggerCelebration = () => {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';  

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.innerHTML = '';  // 5 seconds animation
    }, 5000);
};

document.getElementById("newtask").addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
