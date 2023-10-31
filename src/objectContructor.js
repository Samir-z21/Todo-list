//import loadTask from "./loadConent";
const projectArray = [];
const taskArray = []

class Task {
    constructor (title, description, dueDate, projectTitle) {
        this.title = title,
        this.description = description;
        this.dueDate = dueDate;
        this.projectTitle = projectTitle;
    }  
}

class Project extends Task {
    constructor (title, description, dueDate, color) {
        super (title, description, dueDate);
        this.color = color;
    }
}

function addTask (title, description, dueDate, projectName) {
    const newTaskObj = new Task (title, description, dueDate, projectName);
    taskArray.push(newTaskObj);

    return {newTaskObj, taskArray}
}
function addProject (title, description, dueDate, color) {
    const newProjectObj = new Project (title, description, dueDate, color);
    projectArray.push(newProjectObj);
    
    return {newProjectObj, projectArray}
}




export {addTask, addProject , taskArray, projectArray}