import { projectArray, taskArray } from "./objectContructor";
import { taskCardArrays, projectDivArray } from "./loadConent";
import { archivedTasks, archive } from "./dlt-archv";
import filterTasks from "./filter";

const projectList = document.getElementById("projectList");
const projectColor = document.getElementById('projectColor');
const modifyProjectList = document.getElementById('modifyProjectList');
const projectsContainer = document.getElementById('projectsContainer');

const checkboxArchive = document.getElementById('checkboxArchive');

let allTasksInProject = [];
let objsFound =[];


const tasksContainer = document.getElementById('tasks-container')

let elementCount = 1;

function linkProjectName (title){
    const projectOption = document.createElement('option');
    const modifyProjectOption = document.createElement('option');

    modifyProjectOption.value = title;
    modifyProjectOption.text = title;
    modifyProjectList.appendChild(modifyProjectOption);

    projectOption.value = title;
    projectOption.text = title;
    projectList.appendChild(projectOption);

   


}

function colorTask (projectTitle) {
    const matchingObj = projectArray.find(obj => obj.title === projectTitle);
    
    
    if (matchingObj) {
    return matchingObj.color
    } else return "blue"
}

function removeColorOpt (color) {
    const options = Array.from(projectColor.getElementsByTagName('option'));

    const chosenOption = options.find(option => option.value === color)

   

    if (!(projectColor.contains(chosenOption))) {
        return true
    } 

}


function rmvTasksArchProj (projectTitle, clickedProject) {
    const tasksInProject = taskCardArrays.filter(card => card.querySelector('.projectName').textContent === projectTitle);
    const archivedTasksInProject = archivedTasks.filter(card => card.querySelector('.projectName').textContent === projectTitle);

    allTasksInProject = tasksInProject.concat(archivedTasksInProject);

    

    for (const item of taskCardArrays) {
        const index = tasksInProject.indexOf(item);
        if (index !== -1) {
            taskCardArrays.splice(index, 1);
        }
    }

    for (const item of archivedTasks) {
        const index = archivedTasksInProject.indexOf(item);
        if (index !== -1) {
            archivedTasks.splice(index, 1);
        }
    }

    objsFound = taskArray.filter(item => item.projectTitle.includes(projectTitle));

    for (const obj of taskArray) {
        const index = objsFound.indexOf(obj);
        if (index !== -1) {
            taskArray.splice(index, 1);
        }
    };

    tasksInProject.forEach(div => { 
        tasksContainer.removeChild(div);
    });

    if(checkboxArchive.checked) {
        archivedTasksInProject.forEach(div => { 
            tasksContainer.removeChild(div);
        });
    }


    const projectOptions = Array.from(projectList.getElementsByTagName('option'));
    const modifyProjectOptions = Array.from(modifyProjectList.getElementsByTagName('option'));

    const chosenOption = projectOptions.find(opt => opt.value === projectTitle);
    const chosenModifyOption = modifyProjectOptions.find(opt => opt.value === projectTitle);
    projectList.removeChild(chosenOption);
    modifyProjectList.removeChild(chosenModifyOption);
    
    
}

function addTasksArchProj (projectTitle, autoColor) {
    const clickedProjectTasks = allTasksInProject.filter(task => task.querySelector('.projectName').textContent === projectTitle);
    const clickedProjectTasksNonArchvied = clickedProjectTasks.filter(task => task.querySelector('.taskCheckbox').value == false);
    const clickedCardProjectTasksArchived = clickedProjectTasks.filter(task => task.querySelector('.taskCheckbox').value === "true"); 

    

    clickedProjectTasksNonArchvied.forEach(item => {
        if (!taskCardArrays.includes(item)) {
            taskCardArrays.push(item)
        }
    })
    

    clickedCardProjectTasksArchived.forEach(item => {
        if (!archivedTasks.includes(item)) {
            archivedTasks.push(item)
        }
    })

    const objsFoundPerProject = objsFound.filter(item => item.projectTitle === projectTitle);

    objsFoundPerProject.forEach(item => {
        if (!taskArray.includes(item)) {
            taskArray.push(item)
        }
    })


    clickedProjectTasksNonArchvied.forEach(div => {
        tasksContainer.appendChild(div)
        div.style.backgroundColor = autoColor;
    });

    clickedCardProjectTasksArchived.forEach(div => {
        if(checkboxArchive.checked) {
        tasksContainer.appendChild(div)
        div.style.backgroundColor = "rgb(153, 105, 105)";
        }
    });

   
    

    const projectOptions = Array.from(projectList.getElementsByTagName('option'));
    const modifyProjectOptions = Array.from(modifyProjectList.getElementsByTagName('option'));

    const bringBackProjectOptionModify = document.createElement('option');
    bringBackProjectOptionModify.value = projectTitle;
    bringBackProjectOptionModify.text = projectTitle;


    const bringBackProjectOption = document.createElement('option');
    bringBackProjectOption.value = projectTitle;
    bringBackProjectOption.text = projectTitle;
    

    if (!modifyProjectOptions.includes(bringBackProjectOptionModify)) {
        modifyProjectList.appendChild(bringBackProjectOptionModify)
    }
    
    if (!projectOptions.includes(bringBackProjectOption)) {
        projectList.appendChild(bringBackProjectOption);
    }

 
 
}

export {linkProjectName, colorTask, removeColorOpt, rmvTasksArchProj, addTasksArchProj}