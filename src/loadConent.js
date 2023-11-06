import {addTask, addProject} from './objectContructor';
import {linkProjectName, colorTask} from "./link-ProjectTask";
import { taskDone } from './dlt-archv';
import filterTasks from './filter';
import { deleteTask } from './dlt-archv';
import { editTask } from './edit';

const taskCardArrays = [];
// adding Task content

function loadTask(title, description, dueDate, projectTitle) {
    let accessTask = addTask(title, description, dueDate, projectTitle);

    const taskCard = createNamedDiv("taskCard");

    taskCard.style.backgroundColor = colorTask(projectTitle);

    const topDetailsCard = createNamedDiv('topDetailsCard');
        topDetailsCard.appendChild(createInfoDiv('projectName', accessTask.newTaskObj.projectTitle));

        const dayCount = document.createElement('div');
        const today = new Date();
        const objDate = new Date (accessTask.newTaskObj.dueDate);
        dayCount.textContent = ` Due in: ${ Math.ceil(( objDate - today)/ (1000 * 60 * 60 * 24))} days`;

            if ((objDate - today) < 0) {
                dayCount.style.color = "red"
            }
        topDetailsCard.appendChild(dayCount);

    taskCard.appendChild(topDetailsCard);



    //(a.querySelector('.taskDueDate').textContent);
    //topDetailsCard.appenndChild(projecTitle, dayCount)

    const bottomCard = createNamedDiv("bottomCard");
    
        const centerInfo = createNamedDiv("centerInfo");

            centerInfo.appendChild(createInfoDiv("taskTitle", accessTask.newTaskObj.title));
            //centerInfo.appendChild(createInfoDiv("taskDescription", accessTask.newTaskObj.description));

            centerInfo.appendChild(createInfoDiv("taskDueDate", accessTask.newTaskObj.dueDate));

        const rightSide = createNamedDiv("rightSide");

            const taskCheckbox = document.createElement("input");
            taskCheckbox.type = "checkbox";
            taskCheckbox.classList.add("taskCheckbox");
            

            
            rightSide.appendChild(taskCheckbox)    
            rightSide.appendChild(createInfoDiv("taskRemoveBtn", "🗑️" ));
            rightSide.appendChild(createInfoDiv("openTask", "↗️"));

    
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

        if (cssClass === "openTask") {
            div.addEventListener("click",event => {
                editTask(event);
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



export {loadTask, loadProject, taskCardArrays}
//