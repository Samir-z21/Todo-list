import { colorTask } from "./link-ProjectTask";
import {taskArray, projectArray} from "./objectContructor";
import {countDays, taskCardArrays, projectDivArray} from "./loadConent";
import {archivedTasks, archive, archivedProject, deleteProject} from "./dlt-archv"
import filterTasks from "./filter";

const taskEdit = document.getElementById('taskEdit');
const closeModifyTask = document.querySelector('.closeModifyTask');
const clickedCards = {};
const clickedObjs = {};

const projectEdit = document.getElementById('projectEdit');
const closeModifyProject = document.querySelector('.closeModifyProject');
const modifyProjectColorList = document.getElementById('modifyProjectColorList');
const clickedProjectsModified = {};
const clickedProjectObjs = {};

let counter = 1;

function editTask(accessTask) {

    taskEdit.showModal();

    const taskModify = document.querySelector('#taskModify');
    const editTaskTitle = document.getElementById('editTaskTitle');
    const editTaskDescription = document.getElementById('editTaskDescription');
    const editTaskDueDate = document.getElementById('editTaskDueDate');
    const modifyProjectList = document.getElementById('modifyProjectList');
    const modifyCheckbox = document.getElementById('modifyCheckbox');
    const modifyDelete = document.getElementById('modifyDelete');
    
    editTaskTitle.value = accessTask.newTaskObj.title;
    editTaskDescription.value = accessTask.newTaskObj.description;
    editTaskDueDate.value = accessTask.newTaskObj.dueDate;
    modifyProjectList.value = accessTask.newTaskObj.projectTitle;
    

    const clickedObj = `clickedObj${counter}`;
    const clickedObjValue = taskArray.find(obj => obj.title === editTaskTitle.value && obj.description === editTaskDescription.value && obj.dueDate === editTaskDueDate.value);
    
    clickedObjs[clickedObj] = clickedObjValue;

    console.log(clickedObj);
    console.log(clickedObjValue);
    console.log(clickedObjs)
    
    const clickedCard = `clickedCard${counter}`;
    const clickedCardValue = findCardInArray(taskCardArrays) || findCardInArray(archivedTasks);
    

    function findCardInArray(array) {
        return array.find(card => card.querySelector('.projectName').textContent === modifyProjectList.value && card.querySelector('.taskTitle').textContent === editTaskTitle.value && card.querySelector('.taskDueDate').textContent === editTaskDueDate.value);
    }

    clickedCards[clickedCard] = clickedCardValue;

    if (clickedCards[clickedCard].getElementsByClassName('taskCheckbox')[0].value) {
        modifyCheckbox.checked = true;
    }else {
        modifyCheckbox.checked = false;
    }


    closeModifyTask.addEventListener('click', () => {
        taskEdit.close();  
    });

    modifyDelete.addEventListener('click', () => {
        const dltClickedCardIndex = taskCardArrays.indexOf(clickedCards[clickedCard]);
        const dltArchivedIndex = archivedTasks.indexOf(clickedCards[clickedCard]);
        taskEdit.close();
        if (dltClickedCardIndex !== -1) {
            taskCardArrays.splice(dltClickedCardIndex, 1);
        };
    
        if (dltArchivedIndex !== -1) {
            archivedTasks.splice(dltArchivedIndex, 1);
        };
        
        filterTasks();
    })

    taskModify.addEventListener('click', () => {

        clickedObjs[clickedObj].title = editTaskTitle.value;
        clickedObjs[clickedObj].description = editTaskDescription.value;
        clickedObjs[clickedObj].dueDate = editTaskDueDate.value;
        clickedObjs[clickedObj].projectTitle = modifyProjectList.value;
        
        //console.log(archivedTasks)

       
    
        clickedCards[clickedCard].getElementsByClassName('projectName')[0].textContent = modifyProjectList.value;
        countDays(clickedCards[clickedCard].getElementsByClassName('dayCount')[0], accessTask);
        clickedCards[clickedCard].getElementsByClassName('taskTitle')[0].textContent = editTaskTitle.value;
        clickedCards[clickedCard].getElementsByClassName('taskDueDate')[0].textContent = editTaskDueDate.value;
        clickedCards[clickedCard].getElementsByClassName('taskCheckbox')[0].checked = modifyCheckbox.checked;
        clickedCards[clickedCard].style.backgroundColor = colorTask(clickedObjs[clickedObj].projectTitle);
            
        taskEdit.close();

        const clickedCardIndex = taskCardArrays.indexOf(clickedCards[clickedCard]);
        const archivedIndex = archivedTasks.indexOf(clickedCards[clickedCard]);

        if (modifyCheckbox.checked) {
            if (!archivedTasks.includes(clickedCards[clickedCard])) {
                archivedTasks.push(clickedCards[clickedCard]);
            }
        
            if (clickedCardIndex !== -1) {
              taskCardArrays.splice(clickedCardIndex, 1);
            }
            
            clickedCards[clickedCard].getElementsByClassName('taskCheckbox')[0].value = true;
    
            clickedCards[clickedCard].style.backgroundColor =  "rgb(153, 105, 105)";
        } else {
            if (!taskCardArrays.includes(clickedCards[clickedCard])) {
                taskCardArrays.push(clickedCards[clickedCard]);
            }
    
            if (archivedIndex !== -1) {
                archivedTasks.splice(archivedIndex, 1);
            }
    
            clickedCards[clickedCard].style.backgroundColor = colorTask(clickedCards[clickedCard].getElementsByClassName('projectName')[0].textContent);
            
    
            clickedCards[clickedCard].getElementsByClassName('taskCheckbox')[0].value = null;
        }

        filterTasks();
        archive();
    });
};


function editProject (accessProject, event) {

    projectEdit.showModal();
    
        const editProjectTitle = document.getElementById('editProjectTitle');
        const editProjectDescription = document.getElementById('editProjectDescription');
        const editProjectDueDate = document.getElementById('editProjectDueDate');
        
        const modifyProjectCheckbox = document.getElementById('modifyProjectCheckbox');
        const modifyProjectDelete = document.getElementById('modifyProjectDelete');
        const projectModify = document.querySelector('#taskModify');
        
        const modifyProjectList = document.getElementById('modifyProjectList');
        const projectColor = document.getElementById('projectColor');

        
        editProjectTitle.value = accessProject.newProjectObj.title;
        editProjectDescription.value = accessProject.newProjectObj.description;
        editProjectDueDate.value = accessProject.newProjectObj.dueDate;
        
        const clickedModifyProjectColor = document.createElement('option');
        clickedModifyProjectColor.value = accessProject.newProjectObj.color;
        clickedModifyProjectColor.style.backgroundColor = accessProject.newProjectObj.color;
        
        changeColorOptions(clickedModifyProjectColor, event)

        const clickedProjectObj = `clickedObj${counter}`;
        const clickedProjectObjValue = projectArray.find(obj => obj.title === editProjectTitle.value && obj.description === editProjectDescription.value && editProjectDueDate.value === obj.dueDate && clickedModifyProjectColor.value === obj.color);
        
        clickedProjectObjs[clickedProjectObj] = clickedProjectObjValue
        
        const clickedModifyProject = `clickedModifyProject${counter}`;
        const clickedModifyProjectValue = findProjectInArray(projectDivArray) || findProjectInArray(archivedProject);
        
    
        function findProjectInArray(array) {
            return array.find(div => div.querySelector('.projectTitle').textContent === editProjectTitle.value && div.querySelector('.projectDueDate').textContent === editProjectDueDate.value);
        }
    
        clickedProjectsModified[clickedModifyProject] = clickedModifyProjectValue;
        
        

        if (clickedProjectsModified[clickedModifyProject].getElementsByClassName('projectCheckbox')[0].checked) {
            modifyProjectCheckbox.checked = true;
        }else {
            modifyProjectCheckbox.checked = false;
        }
    
    
        closeModifyProject.addEventListener('click', () => {
            projectEdit.close();  
        });
    
        modifyProjectDelete.addEventListener('click', () => {
            projectEdit.close();  
            deleteProject(accessProject, event, editProjectTitle );
        })
    
        projectModify.addEventListener('click', () => {
    
            clickedObjs[clickedObj].title = editTaskTitle.value;
            clickedObjs[clickedObj].description = editTaskDescription.value;
            clickedObjs[clickedObj].dueDate = editTaskDueDate.value;
            clickedObjs[clickedObj].projectTitle = modifyProjectList.value;
            
            //console.log(archivedTasks)
    
           
        
            clickedCards[clickedCard].getElementsByClassName('projectName')[0].textContent = modifyProjectList.value;
            countDays(clickedCards[clickedCard].getElementsByClassName('dayCount')[0], accessTask);
            clickedCards[clickedCard].getElementsByClassName('taskTitle')[0].textContent = editTaskTitle.value;
            clickedCards[clickedCard].getElementsByClassName('taskDueDate')[0].textContent = editTaskDueDate.value;
            clickedCards[clickedCard].getElementsByClassName('taskCheckbox')[0].checked = modifyCheckbox.checked;
            clickedCards[clickedCard].style.backgroundColor = colorTask(clickedObjs[clickedObj].projectTitle);
                
            taskEdit.close();
    
            const clickedCardIndex = taskCardArrays.indexOf(clickedCards[clickedCard]);
            const archivedIndex = archivedTasks.indexOf(clickedCards[clickedCard]);
    
            if (modifyCheckbox.checked) {
                if (!archivedTasks.includes(clickedCards[clickedCard])) {
                    archivedTasks.push(clickedCards[clickedCard]);
                }
            
                if (clickedCardIndex !== -1) {
                  taskCardArrays.splice(clickedCardIndex, 1);
                }
                
                clickedCards[clickedCard].getElementsByClassName('taskCheckbox')[0].value = true;
        
                clickedCards[clickedCard].style.backgroundColor =  "rgb(153, 105, 105)";
            } else {
                if (!taskCardArrays.includes(clickedCards[clickedCard])) {
                    taskCardArrays.push(clickedCards[clickedCard]);
                }
        
                if (archivedIndex !== -1) {
                    archivedTasks.splice(archivedIndex, 1);
                }
        
                clickedCards[clickedCard].style.backgroundColor = colorTask(clickedCards[clickedCard].getElementsByClassName('projectName')[0].textContent);
                
        
                clickedCards[clickedCard].getElementsByClassName('taskCheckbox')[0].value = null;
            }
    
            filterTasks();
            archive();
        });
    };

    function changeColorOptions (clickedModifyProjectColor, event) {
        const colorsLeft = Array.from(projectColor.getElementsByTagName('option'));    
        


        colorsLeft.forEach(colorDiv => {
            const existsInModify = Array.from(modifyProjectColorList.getElementsByTagName('option')).some(existingOption => {
                return existingOption.value === colorDiv.value;
            });
        
            if (!existsInModify) {
                modifyProjectColorList.appendChild(colorDiv.cloneNode(true));
            }
        });


        const colorsUsed = projectArray.map(obj => obj.color);
        const colorOptions = Array.from(modifyProjectColorList.getElementsByTagName('option'));

        console.log(colorsLeft)
        console.log(colorsUsed)

        colorsUsed.forEach(colorObj => {
            const colorsFound = colorOptions.filter(option => option.value === colorObj);
            colorsFound.forEach(option => {
                modifyProjectColorList.removeChild(option);
            });
        });

        if (event.target.textContent === "↗️") {
            const existsInModify = Array.from(modifyProjectColorList.getElementsByTagName('option')).some(existingOption => {
                return existingOption.value === clickedModifyProjectColor.value;
            });

            if (!existsInModify) { 
                modifyProjectColorList.appendChild(clickedModifyProjectColor)
            }
        }
    }
  



export {editTask, editProject, changeColorOptions}