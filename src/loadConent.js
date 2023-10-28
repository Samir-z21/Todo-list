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

    const centerInfo = document.createElement('div');
    centerInfo.classList.add('centerInfo')
    const taskTitle = document.createElement('div');
    taskTitle.classList.add('taskTitle');   
    taskTitle.textContent = accessTask.newTaskObj.title;

    const taskDescription = document.createElement('div');
    taskDescription.classList.add('taskDescription');   
    taskDescription.textContent = accessTask.newTaskObj.description;

    const taskDueDate = document.createElement('div');
    taskDueDate.classList.add('taskDueDate');
    taskDueDate.textContent = accessTask.newTaskObj.dueDate

    centerInfo.appendChild(taskTitle);
    centerInfo.appendChild(taskDescription);
    centerInfo.appendChild(taskDueDate);

    const rightSide = document.createElement('div');
    const taskCheckMark = document.createElement('div');
    taskCheckMark.classList.add('taskCheckMark')
    const taskRemoveBtn = document.createElement('div');
    taskRemoveBtn.textContent = "🗑️";

    rightSide.appendChild(taskCheckMark);
    rightSide.appendChild(taskRemoveBtn);

    const bottomCard = document.createElement('div');
    bottomCard.classList.add('bottomCard');

    bottomCard.append(centerInfo);
    bottomCard.append(rightSide);
    

    //append details to card
    taskCard.appendChild(bottomCard);



    //apend to container
    tasksContainer.appendChild(taskCard);
    return taskCard
}

export default loadTask
//