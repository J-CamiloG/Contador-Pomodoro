const tasks = [];
let time = 0;
let timer = null;
let timeBreak = null;
let current = null;

const bAdd = document.getElementById('bAdd');
const itTask = document.getElementById('itTask');
const form = document.getElementById('form');
const taskName = document.querySelector('#time #taskName');

renderTime();
renderTasks();

form.addEventListener('submit', e => {
    e.preventDefault();
    if(itTask.value !== ''){
        createTask(itTask.value);
        itTask.value = '';
        renderTasks();
    }
});

function createTask(value) {
    const newTask = {
        id:(Math.random() * 100).toString(36).slice(3),
        title: value,
        completed:false
    };

    tasks.unshift(newTask);
}

function renderTasks() {
    const html = tasks.map((task) => {
        return`
            <div class="task" >
                <div class="completed" >${
                    task.completed 
                    ? `<span class="done">Done</span>` 
                    : `<button class="start-button" data-id="${task.id}">Start</button>`
                }</div>
                <div class="title" >${task.title}</div>
            </div>
        `;
    });

    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = html.join("");

    const startButtons = document.querySelectorAll('.task .start-button');

    startButtons.forEach(button => {
        button.addEventListener('click', e => {
            if (!timer) {
                const id =  button.getAttribute('data-id');  // Corregir 'dato-id' a 'data-id'
                startButtonsHandler(id);
                button.textContent = 'In progress ...';
            }
        });
    });
}

function startButtonsHandler(id) {
    time = 25 * 60;
    current = id;
    const  taskIndex = tasks.findIndex(task => task.id == id);
    taskName.textContent = tasks[taskIndex].title;
    renderTime();
    timer = setInterval(()=>{
        timeHanlder(id);
    },1000);
}

function timeHanlder(id){
    time--;
    renderTime();

    if (time == 0) {
        clearInterval(timer);
        markCompleted(id);  // Pasar el ID correcto
        timer = null;
        renderTasks();
        startBreak();
    }
}

function startBreak() {
    time = 5*60;
    taskName.textContent = 'Break'
    renderTime();
    timeBreak = setInterval(() =>{
        timerBreakHanlder();
    },1000);
}

function timerBreakHanlder() {
    time--;
    renderTime();

    if (time == 0) {
        clearInterval(timeBreak);
        current =  null;
        timeBreak = null;
        taskName.textContent = '';
        renderTasks();
    }
}

function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutes < 10 ? '0':''}${minutes}:${seconds < 10 ? "0" : ''}${seconds}`;
}

function markCompleted(id){
    const  taskIndex = tasks.findIndex((task) => task.id == id);
    tasks[taskIndex].completed = true;
}
