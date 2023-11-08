import { projectArray, taskArray } from "./objectContructor";
import { taskCardArrays, projectDivArray } from "./loadConent";


const projectList = document.getElementById("projectList");
const projectColor = document.getElementById('projectColor');
const modifyProjectList = document.getElementById('modifyProjectList');


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

    if (projectList.childElementCount === elementCount) {
        elementCount++;
        projectColor.removeChild(chosenOption);
    } else return

}


function tasksPerProject (projectTitle) {
    projectArray.forEach(() => {
        const tasksInProject = taskCardArrays.filter(card => card.querySelector('.projectName').textContent.includes(projectTitle));
    })
    
}

function rmvTasksArchProj (projectTitle) {
    const tasksInProject = taskCardArrays.filter(card => card.querySelector('.projectName').textContent.includes(projectTitle));
 
    tasksInProject.forEach(div => {
        tasksContainer.removeChild(div);
    });

    for (const item of taskCardArrays) {
        const index = tasksInProject.indexOf(item);
        if (index !== -1) {
            taskCardArrays.splice(index, 1);
        }
    }

    const objsFound = taskArray.filter(item => item.projectTitle.includes(projectTitle));

    for (const obj of taskArray) {
        const index = objsFound.indexOf(obj);
        if (index !== -1) {
            taskArray.splice(index, 1);
        }
    };

    const projectOptions = Array.from(projectList.getElementsByTagName('option'));

    const chosenOption = projectOptions.find(opt => opt.value === projectTitle);

    const modifyProjectOptions = Array.from(modifyProjectList.getElementsByTagName('option'));
    const chosenModifyOption = modifyProjectOptions.find(opt => opt.value === projectTitle);

    projectList.removeChild(chosenOption);
    modifyProjectList.removeChild(chosenModifyOption);
  



 
}

export {linkProjectName, colorTask, removeColorOpt, tasksPerProject, rmvTasksArchProj}