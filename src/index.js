import '../dist/style.css'
import storeTask from './storeModals'
//import addTask from './objectContructor'


//index.js functions
const taskBtn = document.getElementById('taskBtn');
const projectBtn = document.getElementById('projectBtn');

const taskDialog = document.getElementById('taskDialog');
const projectDialog = document.getElementById('projectDialog');

taskBtn.addEventListener('click', () => {
    taskDialog.showModal();
    
});

projectBtn.addEventListener('click', () => {
    projectDialog.showModal();
});



// storeModals functions
const taskConfirm = document.getElementById('taskConfirm');
const projectConfirm = document.getElementById('projectConfrim');

taskConfirm.addEventListener('click', event => {
    
    event.preventDefault();
    storeTask();
    
});

// closeBtn
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', event => {
    event.preventDefault();
    taskDialog.close();
}  )
//projectConfirm.addEventListener('click',projectStoreObject())



