//import addTask from './objectContructor'
import loadTask from "./loadConent"
function storeTask () {
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const taskDueDate = document.getElementById('taskDueDate');
    const taskCheckList = document.getElementById('taskCheckList');

    if (!taskTitle.checkValidity() || !taskDescription.checkValidity() || !taskDueDate.checkValidity()) {
        alert("Please fill the inputs and the tilte and description can't exceed 30 charachters");
        return
    }
    taskDialog.close();
    let title = taskTitle.value;
    let description = taskDescription.value;
    let dueDate = taskDueDate.value;
    let checklist = taskCheckList.checked; 


    loadTask(title, description, dueDate, checklist)
    
}

export default storeTask