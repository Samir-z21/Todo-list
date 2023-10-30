//import addTask from './objectContructor'
import {loadTask , loadProject} from "./loadConent";

// reference to dialogs
const taskDialog = document.getElementById('taskDialog');
const projectDialog = document.getElementById('projectDialog');

// storing Task function
function storeTask () {
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const taskDueDate = document.getElementById('taskDueDate');
    

    if (!taskTitle.checkValidity() || !taskDescription.checkValidity() || !taskDueDate.checkValidity()) {
        alert("Please fill the inputs. The title and description can't exceed 30 charachters");
        return
    }

    taskDialog.close();
    let title = taskTitle.value;
    let description = taskDescription.value;
    let dueDate = taskDueDate.value;
   
    loadTask(title, description, dueDate)
}

// storing project function
function storeProject () {
    const projectTitle = document.getElementById('projectTitle');
    const projectDescription = document.getElementById('projectDescription');
    const projectDueDate = document.getElementById('projectDueDate');
    const projectColor = document.getElementById('projectColor');

    if (!projectTitle.checkValidity() || !projectDescription.checkValidity() || !projectDueDate.checkValidity()) {
        alert("Please fill the inputs. The title and description can't exceed 30 charachters");
        return
    }

    projectDialog.close();
    let title = projectTitle.value;
    let description = projectDescription.value;
    let dueDate = projectDueDate.value;
    let color = projectColor.value;


    loadProject(title, description, dueDate, color) 
}

export {storeTask, storeProject}