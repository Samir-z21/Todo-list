import { projectArray } from "./objectContructor";
const projectList = document.getElementById("projectList");

function linkProjectName (title){
    const projectOption = document.createElement('option');

    projectOption.value = title;
    projectOption.text = title;
    projectList.appendChild(projectOption);

    console.log(title)
}

function colorTask (projectTitle) {
    const matchingObj = projectArray.find(obj => obj.title === projectTitle);
    console.log(matchingObj)
    
    if (matchingObj) {
    return matchingObj.color
    } else return
}
export {linkProjectName, colorTask}