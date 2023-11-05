import {taskCardArrays} from "./loadConent";
import filterTasks from './filter';
import { colorTask } from "./link-ProjectTask";


//const deleteTask = document.getElementsByClassName("taskRemoveBtn");

const tasksContainer = document.getElementById('tasks-container');
const checkboxArchive = document.getElementById("checkboxArchive");
const archivedTasks = []

function taskDone(event) {
    const clickedCard = findCardInArray(taskCardArrays) || findCardInArray(archivedTasks);

    function findCardInArray(array) {
      return array.find(card => card.querySelector('.taskCheckbox') === event.target);
    }
  
    const archivedIndex = archivedTasks.indexOf(clickedCard);
    const clickedCardIndex = taskCardArrays.indexOf(clickedCard);

    console.log(clickedCard)
    const clickedCardProjectTitleDiv = clickedCard.getElementsByClassName("projectName");
    const clickedCardProjectTitle = clickedCardProjectTitleDiv[0].textContent;

    if (event.target.checked) {
        if (!archivedTasks.includes(clickedCard)) {
          archivedTasks.push(clickedCard);
        }

        if (clickedCardIndex !== -1) {
          taskCardArrays.splice(clickedCardIndex, 1);
        }

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


    console.log(clickedCard,clickedCardIndex, archivedIndex)

    if (clickedCardIndex !== -1) {
        taskCardArrays.splice(clickedCardIndex, 1);
    };

    if (archivedIndex !== -1) {
        archivedTasks.splice(archivedIndex, 1);
    };

    filterTasks();
}

export {taskDone, archive, deleteTask}