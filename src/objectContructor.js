//import loadTask from "./loadConent";


class Task {
    constructor (title, description, dueDate) {
        this.title = title,
        this.description = description;
        this.dueDate = dueDate;
    }
}

function addTask (title, description, dueDate) {
    const newTaskObj = new Task (title, description, dueDate);
    return {newTaskObj}
}


class Project extends Task {
    constructor (title, description, dueDate, color) {
     super (title, description, dueDate);
     this.color = color;
    }
}

function addProject (title, description, dueDate, color) {
    const newProjectObj = new Project (title, description, dueDate, color)
    return {newProjectObj}
}




export {addTask, addProject}