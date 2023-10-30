import {addTask, addProject} from './objectContructor';

// adding Task content
const tasksContainer = document.getElementById('tasks-container');

function loadTask(title, description, dueDate) {
    let accessTask = addTask(title, description, dueDate);

    

    const taskCard = createNamedDiv("taskCard");
    

    //const topDetailsCard = document.createElement('div');
    //const projectTitle = document.createElement('div');
    //const dayCount = document.createElement('div');
    //topDetailsCard.appenndChild(projecTitle, dayCount)

    const bottomCard = createNamedDiv("bottomCard");
    
        const centerInfo = createNamedDiv("centerInfo");

            centerInfo.appendChild(createInfoDiv("taskTitle", accessTask.newTaskObj.title));
            centerInfo.appendChild(createInfoDiv("taskDescription", accessTask.newTaskObj.description));

            centerInfo.appendChild(createInfoDiv("taskDueDate", accessTask.newTaskObj.dueDate));

        const rightSide = createNamedDiv("rightSide");

            rightSide.appendChild(createInfoDiv("taskCheckMark"));
            rightSide.appendChild(createInfoDiv("taskRemoveBtn", "🗑️" ));

    
    //appending all the divs created
    bottomCard.append(centerInfo);
    bottomCard.append(rightSide);
    
    taskCard.appendChild(bottomCard);

    tasksContainer.appendChild(taskCard);

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

    projectsContainer.appendChild(projectItem);

    
}



// quick createInfoDiv 
function createInfoDiv (cssClass, text) {
    const div = document.createElement('div');
    div.classList.add(cssClass);
    div.textContent = text;
    return div
}

// quick createNamedDiv
function createNamedDiv (name) {
    const divsObjects = {};
    divsObjects[name] = document.createElement('div');
    divsObjects[name].classList.add(name);
    return divsObjects[name]
}



export {loadTask, loadProject}
//