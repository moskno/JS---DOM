const taskInput = document.getElementById('taskInput')
const taskList = document.getElementById('taskList')

window.addEventListener('load', loadTasksFromStorage);

function addTask(){
    const taskText = taskInput.value.trim();
    if(taskText !== ''){
        const guid = generateGUID();
        const status = "perform";

        const row = createTaskRow(guid, taskText, status);
        taskList.appendChild(row);

        saveTasksToStorage();
        taskInput.value = '';
    }
}

function createTaskRow(guid, taskText, status){
    const tr = document.createElement('tr');
    const guidCell = document.createElement('td');
    guidCell.textContent = guid;
    const taskCell = document.createElement('td');
    taskCell.textContent = taskText
    const statusCell = document.createElement('td');
    statusCell.textContent = status;
    const actionsCell = document.createElement('td');
    const updateButton = document.createElement('button')
    updateButton.textContent = 'Update Status';
    updateButton.onclick = () => updateStatus(statusCell);
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(taskCell);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(tr);
    actionsCell.appendChild(updateButton);
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
    tr.appendChild(guidCell);
    tr.appendChild(taskCell);
    tr.appendChild(statusCell);
    tr.appendChild(actionsCell);
    return tr;
}

function updateStatus(statusCell){
    statusCell.textContent = (statusCell.textContent === "completed")?"Not completed": "Completed";
    saveTasksToStorage();
}

function editTask(taskCell){
    const newTaskText = prompt("Edit task:", taskCell.textContent);
    if(newTaskText !== null&&newTaskText.trim()!== ''){
        taskCell.textContent = newTaskText.trim();
        saveTasksToStorage();
    }
}

function deleteTask(row){
    taskList.removeChild(row);
    saveTasksToStorage();
}

function saveTasksToStorage(){
    const tasks = [];
    taskList.querySelectorAll('tr').forEach(row => {
        const task = {
            guid: row.cells[0].textContent,
            text: row.cells[1].textContent,
            status: row.cells[2].textContent
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const row = createTaskRow(task.guid, task.text, task.status);
        taskList.appendChild(row);
    });
}

function generateGUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
        const r = Math.random()*16 | 0, v = c === 'x'? r: (r& 0x3 | 0x8);
        return v.toString(16);
    });
}

