class Task {
    constructor (title, description, dueDate, checklist) {
        this.title = title,
        this.description = description;
        this.dueDate = dueDate;
        this.checklist = checklist;
    }
}

function addTask (title, description, dueDate, checklist) {
    let newTaskObj = new Task (title, description, dueDate, checklist);
    console.log(newTaskObj)
}


class Project extends Task {
    constructor (title, description, dueDate, checklist, color) {
     super (title, description, dueDate, checklist);
     this.color = color;
    }
}



const example = new Task ("read book", "Quran pages 10-23", "12 jan 2023", "3", false)

export default addTask