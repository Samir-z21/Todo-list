import {taskCardArrays, projectDivArray} from "./loadConent";
import filterTasks from './filter';
import { colorTask } from "./link-ProjectTask";


const tasksContainer = document.getElementById('tasks-container');
const checkboxArchive = document.getElementById("checkboxArchive");
const listProjectColor = document.getElementById("projectColor");
const projectsContainer = document.getElementById('projectsContainer')
const archivedProjectsContainer = document.getElementById("archivedProjectsContainer");

const archivedTasks = [];
const archivedProject = [];

function taskDone(event) {
    
    const clickedCard = findCardInArray(taskCardArrays) || findCardInArray(archivedTasks);

    function findCardInArray(array) {
      return array.find(card => card.querySelector('.taskCheckbox') === event.target);
    }
    
    const archivedIndex = archivedTasks.indexOf(clickedCard);
    const clickedCardIndex = taskCardArrays.indexOf(clickedCard);

   
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
    
    const clickedCard = findCardInArray(projectDivArray) || findCardInArray(archivedTasks);

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


function projectDone (event) {
        const clickedProject = findProjectInArray(projectDivArray) || findProjectInArray(archivedProject);
    
        function findProjectInArray(array) {
          return array.find(project => project.querySelector('.projectCheckbox') === event.target);
        }
        
        const archivedProjectIndex = archivedProject.indexOf(clickedProject);
        const clickedProjectIndex = projectDivArray.indexOf(clickedProject);
    
       
        const projectTitle = clickedProject.getElementsByClassName("projectTitle")[0].textContent
    
        if (event.target.checked) {
            if (!archivedProject.includes(clickedProject)) {
                archivedProject.push(clickedProject);
            }
    
            if (clickedProjectIndex !== -1) {
                projectDivArray.splice(clickedProjectIndex, 1);
            }
            
            //clickedProject.getElementsByClassName('projectCheckbox')[0].value = true;
            
            projectsContainer.removeChild(clickedProject);
            archivedProjectsContainer.appendChild(clickedProject);

            clickedProject.style.backgroundColor =  "grey";
        } else {
            if (projectDivArray.length >= 10) {
                alert("Can't add archived project. Project limit reached");
                return
            }else {
                if (!projectDivArray.includes(clickedProject)) {
                    projectDivArray.push(clickedProject);
                }
            
                if (archivedProjectIndex !== -1) {
                    archivedProject.splice(archivedProjectIndex, 1);
                }
                
                const options = Array.from(listProjectColor.getElementsByTagName('option'));

                clickedProject.style.backgroundColor = options[0].value;

                archivedProjectsContainer.removeChild(clickedProject);
                projectsContainer.appendChild(clickedProject);
            
                //clickedProject.getElementsByClassName('taskCheckbox')[0].value = null;
            }
        };
    

    }


export {taskDone, archive, deleteTask, archivedTasks, projectDone}