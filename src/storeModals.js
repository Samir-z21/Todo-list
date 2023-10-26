import addTask from './objectContructor'

function storeTask () {
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const taskDueDate = document.getElementById('taskDueDate');
    const taskCheckList = document.getElementById('taskCheckList');

    if (!taskTitle.checkValidity() || !taskDescription.checkValidity()) {
        alert("Please don't exceed more than 30 charachters");
        return
    }

    let title = taskTitle.value;
    let description = taskDescription.value;
    let dueDate = taskDueDate.value;
    let checklist = taskCheckList.checked; 
    console.log(taskCheckList.checked);
    console.log(checklist);

    addTask(title, description, dueDate, checklist)
}

export default storeTask