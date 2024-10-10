let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 


const addtask = () => {
    const taskinput = document.getElementById('taskinput');
    const text = taskinput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskinput.value = "";
        updateTaskList(); 
        saveTasks(); 
        updateProgress(); 
    }
};


const updateTaskList = () => {
    const tasklist = document.getElementById('task-list');
    tasklist.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskitem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./images/edit.png" onClick="edittask(${index})" />
                <img src="./images/bin.png" onClick="deletetask(${index})" />
            </div>
        </div>
        `;

       
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        tasklist.append(listItem);
    });
    updateProgress(); 
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    saveTasks();  
    updateProgress();  
};

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));  
};


const edittask = (index) => {
    const newTaskText = prompt('Edit your task:', tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText.trim();
        updateTaskList();
        saveTasks();  
    }
};

const deletetask = (index) => {
    tasks.splice(index, 1);  
    updateTaskList();
    saveTasks();  
    updateProgress();  
};

const updateProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressElement = document.getElementById('progress');
    const statsElement = document.getElementById('numbers');

    statsElement.textContent = `${completedTasks}/${totalTasks}`;

    const progressPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    progressElement.style.width = `${progressPercentage}%`;

    if (completedTasks === totalTasks && totalTasks > 0) {
        launchConfetti(); 
    }
};

const launchConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
};


document.getElementById("newtask").addEventListener('click', function(e) {
    e.preventDefault();
    addtask();
});


updateTaskList();
updateProgress();
