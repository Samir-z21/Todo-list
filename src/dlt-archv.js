import {taskCardArrays, projectDivArray} from "./loadConent";
import filterTasks from './filter';
import { colorTask, rmvTasksArchProj, addTasksArchProj } from "./link-ProjectTask";
import { projectArray } from "./objectContructor";
import {changeColorOptions} from "./edit"


const tasksContainer = document.getElementById('tasks-container');
const checkboxArchive = document.getElementById("checkboxArchive");
const listProjectColor = document.getElementById("projectColor");
const projectsContainer = document.getElementById('projectsContainer')
const archivedProjectsContainer = document.getElementById("archivedProjectsContainer");

const archivedTasks = [];
const archivedProject = [];
const archivedProjectObjs = [];
let nameTrackerNonArchived = [];
let nameTrackerArchived = []

function taskDone(event) {
    
    const clickedCard = findCardInArray(taskCardArrays) || findCardInArray(archivedTasks);

    function findCardInArray(array) {
      return array.find(card => card.querySelector('.taskCheckbox') === event.target);
    }
    
    const archivedIndex = archivedTasks.indexOf(clickedCard);
    const clickedCardIndex = taskCardArrays.indexOf(clickedCard);

    console.log(clickedCard);
   
    const clickedCardProjectTitleDiv = clickedCard.getElementsByClassName("projectName");
    const clickedCardProjectTitle = clickedCardProjectTitleDiv[0].textContent;

    if (event.target.checked) {
        if (!archivedTasks.includes(clickedCard)) {
          archivedTasks.push(clickedCard);
        }

        if (clickedCardIndex !== -1) {
          taskCardArrays.splice(clickedCardIndex, 1);
        }
        
        clickedCard.getElementsByClassName('taskCheckbox')[0].value = true;
        
    
        clickedCard.style.backgroundColor =  "rgb(153, 105, 105)";
    } else {
        
        if (!taskCardArrays.includes(clickedCard)) {
            taskCardArrays.push(clickedCard);
        }

        if (archivedIndex !== -1) {
            archivedTasks.splice(archivedIndex, 1);
        }

        clickedCard.style.backgroundColor = colorTask(clickedCardProjectTitle);
        if (!colorTask(clickedCardProjectTitle)) {
            clickedCard.style.backgroundColor = "blue"
        } 

        clickedCard.getElementsByClassName('taskCheckbox')[0].value = null;
    };

    

    filterTasks();
    archive();
}
  
function archive (){
    if (checkboxArchive.checked) {
        archivedTasks.forEach(div => {
            tasksContainer.appendChild(div)
        }); 
    } else { 
        archivedTasks.forEach(div => {
            tasksContainer.appendChild(div);
            tasksContainer.removeChild(div);
        })
    };
};


function deleteTask (event) {
    
    const clickedCard = findCardInArray(taskCardArrays) || findCardInArray(archivedTasks);

    function findCardInArray(array) {
      return array.find(card => card.querySelector('.taskRemoveBtn') === event.target);
    }
    
    const clickedCardIndex = taskCardArrays.indexOf(clickedCard);
    const archivedIndex = archivedTasks.indexOf(clickedCard);

    

    if (clickedCardIndex !== -1) {
        taskCardArrays.splice(clickedCardIndex, 1);
    };

    if (archivedIndex !== -1) {
        archivedTasks.splice(archivedIndex, 1);
    };

    filterTasks();
}


function projectDone (event, accessProject) {
        const clickedProject = findProjectInArray(projectDivArray) || findProjectInArray(archivedProject);

        function findProjectInArray(array) {
          return array.find(project => project.querySelector('.projectTitle').textContent === accessProject.newProjectObj.title && project.querySelector('.projectDueDate').textContent === accessProject.newProjectObj.dueDate );
        }
        
        const projectTitle = clickedProject.getElementsByClassName("projectTitle")[0].textContent
        const options = Array.from(listProjectColor.getElementsByTagName('option'));
        
        
        const clickedObjProject = findProjectObjInArray(projectArray) || findProjectObjInArray(archivedProjectObjs)
        
        function findProjectObjInArray(array) {
            return array.find((obj) => obj.title === projectTitle);
        }


        console.log(clickedObjProject)

        if (event.target.checked)  {
            if (checkArchivedNames (clickedObjProject)) {
                console.log(checkArchivedNames (clickedObjProject))
                event.preventDefault()
                clickedProject.querySelector('.projectCheckbox').checked = false;
                alert("Can't add project to archived. This project name is already in use");
                return  
            } 
            console.log(checkArchivedNames (clickedObjProject))
            const clickedProjectIndex = projectDivArray.indexOf(clickedProject);
            const clickedObjProjectIndex = projectArray.indexOf(clickedObjProject);
            

            if (!archivedProject.includes(clickedProject)) {
                archivedProject.push(clickedProject);
            }

     
            if (!archivedProjectObjs.includes(clickedObjProject)) {
                archivedProjectObjs.push(clickedObjProject);
            }



            if (clickedProjectIndex !== -1) {
                projectDivArray.splice(clickedProjectIndex, 1);
            }


            if (clickedObjProjectIndex !== -1) {
                projectArray.splice(clickedObjProjectIndex, 1);
            }
            
            
            projectsContainer.removeChild(clickedProject);
            archivedProjectsContainer.appendChild(clickedProject);

            const colorReturns = document.createElement('option');

            colorReturns.value = accessProject.newProjectObj.color;

            colorReturns.style.backgroundColor = accessProject.newProjectObj.color;

            listProjectColor.appendChild(colorReturns);
            clickedProject.style.backgroundColor =  "grey";

            rmvTasksArchProj(projectTitle, clickedProject);
            
        } else {

            const archivedProjectIndex = archivedProject.indexOf(clickedProject);
            const archivedObjProjectIndex = archivedProjectObjs.indexOf(clickedObjProject);

            if (projectDivArray.length >= 10) {
                event.preventDefault()
                clickedProject.querySelector('.projectCheckbox').checked = true;
                alert("Can't add archived project. Project limit reached");
                return
            }else if (checkCurrentNames (clickedObjProject)) {
                event.preventDefault()
                clickedProject.querySelector('.projectCheckbox').checked = true;
                alert("Can't add archived project. This project name is already in use");
                return  
            } else { 
                if (archivedProjectIndex !== -1) {
                    archivedProject.splice(archivedProjectIndex, 1);
                }

             
                if (archivedObjProjectIndex !== -1) {
                    archivedProjectObjs.splice(archivedObjProjectIndex, 1)
                }

               

                if (!projectDivArray.includes(clickedProject)) {
                    projectDivArray.push(clickedProject);
                }

               

                if (!projectArray.includes(clickedObjProject)) {
                    projectArray.push(clickedObjProject)
                }
            
                
                const autoColor = options[0].value;
                listProjectColor.removeChild(options[0]);


                clickedProject.style.backgroundColor = autoColor
                accessProject.newProjectObj.color = autoColor
                clickedObjProject.color = autoColor

                archivedProjectsContainer.removeChild(clickedProject);
                projectsContainer.appendChild(clickedProject);

                addTasksArchProj(projectTitle, autoColor)
        
            }

            
        };
        
        const clickedModifyProjectColor = document.createElement('option');
        clickedModifyProjectColor.value = accessProject.newProjectObj.color;
        clickedModifyProjectColor.style.backgroundColor = accessProject.newProjectObj.color;

        changeColorOptions(clickedModifyProjectColor, event);
        
    }

    function deleteProject (accessProject, event, editProjectTitle, editProjectDueDate) {

        let clickedProject = findProjectInArray(projectDivArray) || findProjectInArray(archivedProject);
    
        function findProjectInArray(array) {
          return array.find(project => project.querySelector('.projectTitle').textContent === accessProject.newProjectObj.title && project.querySelector('.projectDueDate').textContent === accessProject.newProjectObj.dueDate );
        }

        if (!clickedProject) {
            clickedProject = findProjectInArrayEdit(projectDivArray) || findProjectInArrayEdit (archivedProject)
        }

        function findProjectInArrayEdit (array) {
            return array.find(project => project.querySelector('.projectTitle').textContent === editProjectTitle.value  && project.querySelector('.projectDueDate').textContent === editProjectDueDate.value  )
        }

        const projectTitle = clickedProject.getElementsByClassName("projectTitle")[0].textContent;
        const projectDueDate1 = clickedProject.getElementsByClassName("projectDueDate")[0].textContent;
        const options = Array.from(listProjectColor.getElementsByTagName('option'));


        const clickedObjProject = findProjectObjInArray(projectArray) || findProjectObjInArray(archivedProjectObjs)
        
        function findProjectObjInArray(array) {
            return array.find((obj) => obj.title === projectTitle && obj.dueDate === projectDueDate1 );
        }

        console.log(archivedProjectObjs)
        console.log(clickedObjProject)
        
        const archivedProjectIndex = archivedProject.indexOf(clickedProject);
        const archivedObjProjectIndex = archivedProjectObjs.indexOf(clickedObjProject);
        const clickedProjectIndex = projectDivArray.indexOf(clickedProject);
        const clickedObjProjectIndex = projectArray.indexOf(clickedObjProject);

        console.log(archivedObjProjectIndex)

        if (archivedProjectIndex !== -1 ) {
            archivedProject.splice(archivedProjectIndex, 1);
        }
 
        
        if (archivedObjProjectIndex !== -1 ) {
            archivedProjectObjs.splice(archivedObjProjectIndex, 1);
            console.log("hey")
        }

        console.log(archivedProjectObjs)

        if (clickedProjectIndex !== -1) {
            projectDivArray.splice(clickedProjectIndex, 1);
        }


        if (clickedObjProjectIndex !== -1) {
            projectArray.splice(clickedObjProjectIndex, 1);
        }

        if (clickedProject.parentNode === projectsContainer) {
            projectsContainer.removeChild(clickedProject);
        } else {
            archivedProjectsContainer.removeChild(clickedProject);
        }

        
        if (!(clickedProject.querySelector('.projectCheckbox').checked)) {
            const colorReturns = document.createElement('option');
            colorReturns.value = accessProject.newProjectObj.color;
            colorReturns.style.backgroundColor = accessProject.newProjectObj.color;
            listProjectColor.appendChild(colorReturns);
        }

        rmvTasksArchProj (projectTitle, clickedProject, event);

        const clickedModifyProjectColor = document.createElement('option');
        clickedModifyProjectColor.value = accessProject.newProjectObj.color;
        clickedModifyProjectColor.style.backgroundColor = accessProject.newProjectObj.color;
            
        changeColorOptions(clickedModifyProjectColor, event);

    }

    function checkCurrentNames (clickedObjProject) {
        nameTrackerNonArchived = projectArray.map(obj => obj.title)
        console.log(nameTrackerNonArchived);
        console.log(projectArray);
        console.log(clickedObjProject)
        return nameTrackerNonArchived.includes(clickedObjProject.title)
    }

    function checkArchivedNames (clickedObjProject) {
        nameTrackerArchived = (archivedProjectObjs.map(obj => obj.title))
        console.log(nameTrackerArchived);
        console.log(archivedProjectObjs);
        console.log(clickedObjProject)
        return nameTrackerArchived.includes(clickedObjProject.title)
    }


export {archive, taskDone, deleteTask, archivedTasks, projectDone, deleteProject, archivedProject, archivedProjectObjs}