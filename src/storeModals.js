//import addTask from './objectContructor'
import {loadTask , loadProject} from "./loadConent";
import { projectArray } from "./objectContructor";
import { removeColorOpt } from "./link-ProjectTask";
// reference to dialogs
const taskDialog = document.getElementById('taskDialog');
const projectDialog = document.getElementById('projectDialog');


// storing Task function
function storeTask () {
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const taskDueDate = document.getElementById('taskDueDate');

    const projectList = document.getElementById("projectList");
    const selectedProject = projectList.options[projectList.selectedIndex];

    taskTitle.focus();

    if (!taskTitle.checkValidity() || !taskDescription.checkValidity() || !taskDueDate.checkValidity() || /^\s*$/.test(taskTitle.value) || /^\s*$/.test(taskDescription.value)) {
        alert("Please fill the inputs. The title can't exceed 10 charachters. The description can't exceed 30 charachters");
        return
    }

    let title = taskTitle.value;
    let description = taskDescription.value;
    let dueDate = taskDueDate.value;
    let projectTitle = selectedProject.value
    
   

    taskDialog.close();
    loadTask(title, description, dueDate, projectTitle);

    taskTitle.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
}

// storing project function
function storeProject () {
    const projectTitle = document.getElementById('projectTitle');
    const projectDescription = document.getElementById('projectDescription');
    const projectDueDate = document.getElementById('projectDueDate');
    const projectColor = document.getElementById('projectColor');

    if (!projectTitle.checkValidity() || !projectDescription.checkValidity() || !projectDueDate.checkValidity() || /^\s*$/.test(projectTitle.value) || /^\s*$/.test(projectDescription.value)) {
        alert("Please fill the inputs. The title can't exceed 10 charachters. The description can't exceed 30 charachters");
        return
    }


    let title = projectTitle.value;
    let description = projectDescription.value;
    let dueDate = projectDueDate.value;
    let color = projectColor.value;
    
    
    
    const doubleNameCheck = projectArray.find(obj => obj.title === title);

    if (doubleNameCheck) {
        alert("can't use same project name");
        return
    }
    
    if (removeColorOpt(color)) {
        alert("Max amount of projects reached")
        return
    };

    projectDialog.close();

    loadProject(title, description, dueDate, color);

    projectTitle.value = '';
    projectDescription.value = '';
    projectDueDate.value = '';
}

export {storeTask, storeProject}