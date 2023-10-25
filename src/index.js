import '../dist/style.css'
//import showTaskModel() from 
//import showProjectModel() from
// import Task from objecConstructor.js

const taskBtn = document.getElementById('taskBtn');
const projectBtn = document.getElementById('projectBtn');

const taskDialog = document.getElementById('taskDialog');
const projectDialog = document.getElementById('projectDialog');



taskBtn.addEventListener('click', () => {
    taskDialog.showModal()
})
//projectBtn.addEventListener('click', showProjectModel());

class Task {
    constructor (title, description, dueDate, priority, checklist) {
        this.title = title,
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checklist = false;
    }
}

const example = new Task ("read book", "Quran pages 10-23", "12 jan 2023", "3", false)

console.log(example)

