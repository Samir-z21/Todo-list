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



