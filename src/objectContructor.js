//import loadTask from "./loadConent";


class Task {
    constructor (title, description, dueDate, checklist) {
        this.title = title,
        this.description = description;
        this.dueDate = dueDate;
        this.checklist = checklist;
    }
}

 function addTask (title, description, dueDate, checklist) {
    const newTaskObj = new Task (title, description, dueDate, checklist);
    console.log(newTaskObj.title)

    return {newTaskObj}
}


class Project extends Task {
    constructor (title, description, dueDate, checklist, color) {
     super (title, description, dueDate, checklist);
     this.color = color;
    }
}





export default addTask