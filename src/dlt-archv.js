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

    const clickedCardProjectTitleDiv = clickedCard.getElementsByClassName("projectName");
    const clickedCardProjectTitle = clickedCardProjectTitleDiv[0].textContent;

    console.log(clickedCardProjectTitleDiv);
    console.log(clickedCardProjectTitle)

    console.log(clickedCard)


    if (event.target.checked) {
      if (!archivedTasks.includes(clickedCard)) {
        archivedTasks.push(clickedCard);
      }
      
      taskCardArrays.splice(clickedCardIndex, 1);

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
        console.log('archiveChecked')
    } else {
        console.log(archivedTasks)
        archivedTasks.forEach(div => {
            tasksContainer.appendChild(div);
            tasksContainer.removeChild(div);
        })
        console.log('archivedNotChecked')
    };
}

export {taskDone, archive}