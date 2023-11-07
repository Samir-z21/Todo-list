import { colorTask } from "./link-ProjectTask";
import {taskArray} from "./objectContructor";
import {countDays, taskCardArrays} from "./loadConent";
import {archivedTasks, archive} from "./dlt-archv"
import filterTasks from "./filter";

const taskEdit = document.getElementById('taskEdit');
const closeModifyTask = document.querySelector('.closeModifyTask');
const clickedCards = {};
const clickedObjs = {}
let counter = 1;

function editTask(accessTask) {
    console.log(archivedTasks);
    console.log(taskCardArrays);
    taskEdit.showModal();

    const taskModify = document.querySelector('#taskModify');
    const editTaskTitle = document.getElementById('editTaskTitle');
    const editTaskDescription = document.getElementById('editTaskDescription');
    const editTaskDueDate = document.getElementById('editTaskDueDate');
    const modifyProjectList = document.getElementById('modifyProjectList');
    const modifyCheckbox = document.getElementById("modifyCheckbox");
    
    editTaskTitle.value = accessTask.newTaskObj.title;
    editTaskDescription.value = accessTask.newTaskObj.description;
    editTaskDueDate.value = accessTask.newTaskObj.dueDate;
    modifyProjectList.value = accessTask.newTaskObj.projectTitle;
    

    const clickedObj = `clickedObj${counter}`;
    const clickedObjValue = taskArray.find(obj => obj.title === editTaskTitle.value && obj.description === editTaskDescription.value && obj.dueDate === editTaskDueDate.value);
    
    clickedObjs[clickedObj] = clickedObjValue
    
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

    taskModify.addEventListener('click', () => {

        clickedObjs[clickedObj].title = editTaskTitle.value;
        clickedObjs[clickedObj].description = editTaskDescription.value;
        clickedObjs[clickedObj].dueDate = editTaskDueDate.value;
        clickedObjs[clickedObj].projectTitle = modifyProjectList.value;
        
        //console.log(archivedTasks)

        const clickedCardIndex = taskCardArrays.indexOf(clickedCards[clickedCard]);
        const archivedIndex = archivedTasks.indexOf(clickedCards[clickedCard]);
    
    
        if (clickedCardIndex !== -1) {
            clickedCards[clickedCard].getElementsByClassName('projectName')[0].textContent = modifyProjectList.value;
            countDays(clickedCards[clickedCard].getElementsByClassName('dayCount')[0], accessTask);
            clickedCards[clickedCard].getElementsByClassName('taskTitle')[0].textContent = editTaskTitle.value;
            clickedCards[clickedCard].getElementsByClassName('taskDueDate')[0].textContent = editTaskDueDate.value;
            clickedCards[clickedCard].getElementsByClassName('taskCheckbox')[0].checked = modifyCheckbox.checked;
            clickedCards[clickedCard].style.backgroundColor = colorTask(clickedObjs[clickedObj].projectTitle);
            //console.log(taskCardArrays[clickedCardIndex].getElementsByClassName('projectName')[0])
        };
    
        //if (archivedIndex !== -1) {
        //    archivedTasks.splice(archivedIndex, 1);
        //};
    
        
        taskEdit.close();
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
    
        console.log(archivedTasks)
    
        filterTasks();
        archive();
    });
};




  



export {editTask}