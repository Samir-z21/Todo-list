import { taskCardArrays } from "./loadConent";
import { archive } from "./dlt-archv";

const tasksContainer = document.getElementById('tasks-container');
const filter = document.getElementById("filter");

function filterTasks () {

    // Clear current cards
    const currentTaskCards = tasksContainer.querySelectorAll('.taskCard');
    currentTaskCards.forEach(div => {
        tasksContainer.removeChild(div)
    })
    
    
    
    //sort by filter
    switch (filter.value) {
        case "oldest":
            appendChilds(taskCardArrays);
        break;
        
        case "newest":
            const newestArray = taskCardArrays.slice().reverse();
            appendChilds(newestArray);
        break;

        case "dueDate":
            function compareByDate(a, b) {
                const dateA = new Date(a.querySelector('.taskDueDate').textContent);
                const dateB = new Date(b.querySelector('.taskDueDate').textContent);
              
                return dateA - dateB;
            }
            
            const dateSortedArray = taskCardArrays.slice().sort(compareByDate);
            appendChilds(dateSortedArray);
        break;
            
        case "project":
            function compareByProject (a,b) {
                const stringA = a.querySelector('.projectName').textContent;
                const stringB = b.querySelector('.projectName').textContent;

                return stringA.localeCompare(stringB);
            }

            const projectSortedArray = taskCardArrays.slice().sort(compareByProject);
            appendChilds(projectSortedArray);
        break;
    };
    archive();

}

function appendChilds (namedArray) {
    namedArray.forEach(div => {
        tasksContainer.appendChild(div)
    })
}

export default filterTasks