import '../dist/style.css'
import  {storeTask, storeProject } from './storeModals'
import filterTasks from './filter';
import {archive} from './dlt-archv';


//focus divs
const taskTitle = document.getElementById('taskTitle');
const projectTitle = document.getElementById('projectTitle');


// taskbtn
const taskBtn = document.getElementById('taskBtn');
const taskDialog = document.getElementById('taskDialog');
taskBtn.addEventListener('click', () => {
    taskDialog.showModal();
    taskTitle.focus()
});


// projectBtn
const projectBtn = document.getElementById('projectBtn');
const projectDialog = document.getElementById('projectDialog');
projectBtn.addEventListener('click', () => {
    projectDialog.showModal();
    projectTitle.focus();
});



// confirm functions
const taskConfirm = document.getElementById('taskConfirm');
taskConfirm.addEventListener('click', event => {
    event.preventDefault();
    storeTask();
});

const projectConfirm = document.getElementById('projectConfirm');
projectConfirm.addEventListener('click', event => {
    event.preventDefault();
    storeProject(event);
});


// closeBtn
const closeBtn = document.querySelectorAll('.close-btn');
closeBtn.forEach((btn) => {
    btn.addEventListener('click', event => {
    event.preventDefault();
    taskDialog.close();
    projectDialog.close();
    });
});


// filter listener 
const filter = document.getElementById("filter");
filter.addEventListener('change', () => {
    filterTasks()
});

const checkboxArchive = document.getElementById("checkboxArchive");
checkboxArchive.addEventListener('click', () => {
    archive();
});