import {addTask, addProject} from './objectContructor';
import {linkProjectName, colorTask} from "./link-ProjectTask";
import { taskDone,deleteTask, projectDone } from './dlt-archv';
import filterTasks from './filter';
import { editTask} from './edit';



const taskCardArrays = [];
const projectDivArray = [];
const projectsContainer = document.getElementById('projectsContainer');
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
            taskCheckbox.value = null;

            taskCheckbox.addEventListener('click', (event) => {
                taskDone(event)
            });
            
            const openTask = document.createElement('div');
            openTask.textContent = "↗️";
            openTask.classList.add("openTask")
            
            openTask.addEventListener("click",(event) => {
                    editTask(accessTask);
                })
            
            
            rightSide.appendChild(taskCheckbox)    
            rightSide.appendChild(createInfoDiv("taskRemoveBtn", "🗑️" ));
            rightSide.appendChild(openTask)

    
    //appending all the divs created
    bottomCard.append(centerInfo);
    bottomCard.append(rightSide);
    
    taskCard.appendChild(bottomCard);
    
    taskCardArrays.push(taskCard);
    
    
    

    

    filterTasks();
    
}


function loadProject (title, description, dueDate, color) {
    let accessProject = addProject(title, description, dueDate, color);

    const projectItem = createNamedDiv("projectItem");
    
    projectItem.style.backgroundColor = color;
    
    const topProjectItem = createNamedDiv("topProjectItem");
    
        topProjectItem.appendChild(createInfoDiv("projectTitle", accessProject.newProjectObj.title));
        const projectTools = createNamedDiv("projectTools");
            const openProject = createNamedDiv("openProject", "↗️");

            openProject.addEventListener("click",(event) => {
                editProject(accessProject);
            })

            const projectCheckbox = document.createElement("input");
            projectCheckbox.type = "checkbox";
            projectCheckbox.classList.add("projectCheckbox");
            projectCheckbox.value = null;

            projectCheckbox.addEventListener('click', event => {
                projectDone(event, accessProject) 
            })
            

            projectTools.appendChild(projectCheckbox);
            projectTools.appendChild(createInfoDiv("projectRemoveBtn", "🗑️" ));
            projectTools.appendChild(openProject);
        
        topProjectItem.appendChild(projectTools);


    projectItem.appendChild(topProjectItem)
    
    projectItem.appendChild(createInfoDiv('projectDueDate', accessProject.newProjectObj.dueDate));

    linkProjectName(title);

    projectDivArray.push(projectItem);

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
        }

        if (cssClass === "projectRemoveBtn") {
            div.addEventListener('click', event => {
                deleteProject(event)
            })
        }

        
    return div
}

// quick createNamedDiv
function createNamedDiv (name, text) {
    const divsObjects = {};
    divsObjects[name] = document.createElement('div');
    divsObjects[name].classList.add(name);
    divsObjects[name].textContent = text;
    return divsObjects[name]
}



function countDays (div, accessTask) {
    const today = new Date();
    const objDate = new Date (accessTask.newTaskObj.dueDate);
    div.textContent = ` Due in: ${ Math.ceil(( objDate - today)/ (1000 * 60 * 60 * 24))} days`;

    if ((objDate - today) < 0) {
        div.style.color = "red";
    } else {
        div.style.color = 'black';
    }
}


export {loadTask, loadProject, taskCardArrays, projectDivArray, countDays }
//