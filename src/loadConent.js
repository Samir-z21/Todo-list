import addTask from './objectContructor'

const tasksContainer = document.getElementById('tasks-container');
const projectsContainer = document.getElementById('sidebar');

function loadTask(title, description, dueDate, checklist) {
    let accessTask = addTask(title, description, dueDate, checklist);

    const taskCard = document.createElement('div');
    taskCard.classList.add('taskCard');

    //const topDetailsCard = document.createElement('div');
    //const projectTitle = document.createElement('div');
    //const dayCount = document.createElement('div');
    //topDetailsCard.appenndChild(projecTitle, dayCount)

    const bottomCard = document.createElement('div');
    bottomCard.classList.add('bottomCard');
    
        const centerInfo = document.createElement('div');
        centerInfo.classList.add('centerInfo')

            centerInfo.appendChild(createInfoDiv("taskTitle", accessTask.newTaskObj.title));
            centerInfo.appendChild(createInfoDiv("taskDescription", accessTask.newTaskObj.description));

            centerInfo.appendChild(createInfoDiv("taskDueDate", accessTask.newTaskObj.dueDate));

        const rightSide = document.createElement('div');

            rightSide.appendChild(createInfoDiv("taskCheckMark"));
            rightSide.appendChild(createInfoDiv("taskRemoveBtn", "🗑️" ));

    

    bottomCard.append(centerInfo);
    bottomCard.append(rightSide);
    

    //append details to card
    taskCard.appendChild(bottomCard);



    //apend to container
    tasksContainer.appendChild(taskCard);
    return taskCard
}

// quick createInfoDiv 
function createInfoDiv (cssClass, text) {
    const div = document.createElement('div');
    div.classList.add(cssClass);
    div.textContent = text;
    return div
}



export default loadTask
//