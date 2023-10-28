import '../dist/style.css'
import storeTask from './storeModals'
//import addTask from './objectContructor'


// taskbtn
const taskBtn = document.getElementById('taskBtn');
const taskDialog = document.getElementById('taskDialog');
taskBtn.addEventListener('click', () => {
    taskDialog.showModal();
    
});


// projectBtn
const projectBtn = document.getElementById('projectBtn');
const projectDialog = document.getElementById('projectDialog');
projectBtn.addEventListener('click', () => {
    projectDialog.showModal();
});



// confirm functions
const taskConfirm = document.getElementById('taskConfirm');
const projectConfirm = document.getElementById('projectConfrim');

taskConfirm.addEventListener('click', event => {
    event.preventDefault();
    storeTask();
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

//projectConfirm.addEventListener('click',projectStoreObject())



