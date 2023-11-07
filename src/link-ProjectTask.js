import { projectArray } from "./objectContructor";
const projectList = document.getElementById("projectList");
const projectColor = document.getElementById('projectColor');

const modifyProjectList = document.getElementById('modifyProjectList');

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
export {linkProjectName, colorTask, removeColorOpt}