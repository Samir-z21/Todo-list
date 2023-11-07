import {addTask, addProject} from './objectContructor';
import {linkProjectName, colorTask} from "./link-ProjectTask";
import { taskDone } from './dlt-archv';
import filterTasks from './filter';
import { deleteTask } from './dlt-archv';
import { editTask, modifyTask } from './edit';



const taskCardArrays = [];
// adding Task content

function loadTask(title, description, dueDate, projectTitle) {
   
    let accessTask = addTask(title, description, dueDate, projectTitle);

    const taskCard = createNamedDiv("taskCard");

    taskCard.style.backgroundColor = colorTask(projectTitle);

    const topDetailsCard = createNamedDiv('topDetailsCard');
        topDetailsCard.appendChild(createInfoDiv('projectName', accessTask.newTaskObj.projectTitle));

        const dayCount = document.createElement('div');
        dayCount.classList.add("dayCount")
        countDays(dayCount, accessTask);
        topDetailsCard.appendChild(dayCount);

    taskCard.appendChild(topDetailsCard);


    const bottomCard = createNamedDiv("bottomCard");
    
        const centerInfo = createNamedDiv("centerInfo");

            centerInfo.appendChild(createInfoDiv("taskTitle", accessTask.newTaskObj.title));
            //centerInfo.appendChild(createInfoDiv("taskDescription", accessTask.newTaskObj.description));

            centerInfo.appendChild(createInfoDiv("taskDueDate", accessTask.newTaskObj.dueDate));

        const rightSide = createNamedDiv("rightSide");

            const taskCheckbox = document.createElement("input");
            taskCheckbox.type = "checkbox";
            taskCheckbox.classList.add("taskCheckbox");
            
            const openTask = document.createElement('div');
            openTask.textContent = "↗️";
            openTask.classList.add("openTask")
            
            openTask.addEventListener("click",(event) => {
                    editTask(accessTask, projectTitle, event);
                })
            
            
            rightSide.appendChild(taskCheckbox)    
            rightSide.appendChild(createInfoDiv("taskRemoveBtn", "🗑️" ));
            rightSide.appendChild(openTask)

    
    //appending all the divs created
    bottomCard.append(centerInfo);
    bottomCard.append(rightSide);
    
    taskCard.appendChild(bottomCard);

    taskCardArrays.push(taskCard);

    

    taskCheckbox.addEventListener('click', (event) => {
        taskDone(event)
    });

    filterTasks();
    
}

// adding project content 
const projectsContainer = document.getElementById('sidebar');

function loadProject (title, description, dueDate, color) {
    let accessProject = addProject(title, description, dueDate, color);

    const projectItem = createNamedDiv("projectItem");

        projectItem.style.backgroundColor = color;

        //change color to white if black is backgroundColor

        projectItem.appendChild(createInfoDiv("projectTitle", accessProject.newProjectObj.title));

        projectItem.appendChild(createInfoDiv('projectDueDate', accessProject.newProjectObj.dueDate));

        linkProjectName(title);
        

    projectsContainer.appendChild(projectItem);
}



// quick createInfoDiv 
function createInfoDiv (cssClass, text) {
    const div = document.createElement('div');
    div.classList.add(cssClass);
    div.textContent = text;
        if (cssClass === "taskRemoveBtn"){
            div.addEventListener("click",event => {
                deleteTask(event);
            })
        };
    return div
}

// quick createNamedDiv
function createNamedDiv (name) {
    const divsObjects = {};
    divsObjects[name] = document.createElement('div');
    divsObjects[name].classList.add(name);
    return divsObjects[name]
}

function countDays (div, accessTask) {
    const today = new Date();
    const objDate = new Date (accessTask.newTaskObj.dueDate);
    div.textContent = ` Due in: ${ Math.ceil(( objDate - today)/ (1000 * 60 * 60 * 24))} days`;

    if ((objDate - today) < 0) {
        div.style.color = "red"
    }
}


export {loadTask, loadProject, taskCardArrays, countDays }
//