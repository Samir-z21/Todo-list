import { projectArray, taskArray } from "./objectContructor";
import { taskCardArrays } from "./loadConent";
const tasksContainer = document.getElementById('tasks-container');

const filter = document.getElementById("filter");
function filterTasks () {
    
    const currentTaskCards = Array.from(tasksContainer.getElementsByClassName('taskCard'));

    currentTaskCards.forEach(div => {
        tasksContainer.removeChild(div)
    })

    if (filter.value === "oldest") {
        taskCardArrays.forEach(div => {
            tasksContainer.appendChild(div);
        });
    };


    console.log(currentTaskCards)
    console.log(taskCardArrays);
    console.log(taskArray);
    console.log(projectArray);
}

export default filterTasks