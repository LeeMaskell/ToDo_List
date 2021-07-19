const taskInput = document.querySelector('.taskInput');
const taskAddBtn = document.querySelector('.taskAddBtn');
const taskList = document.querySelector('.taskList');
const container2 = document.querySelector('.listContainer2');
const taskSection = document.getElementById('tasks');

// const todos = [];

// FUNCTIONS
const addTask = () => {
    event.preventDefault();
    // add new div with input content
    const createTaskDiv = document.createElement('div'); // create a new div to hold the input project
    createTaskDiv.classList.add('item2'); // give the div a class selector
    const taskItem = document.createElement('h3');
    taskItem.innerText = taskInput.value; // add input text to newly created div
    container2.appendChild(createTaskDiv); // append the newly created div to the existing container div
    createTaskDiv.appendChild(taskItem);
    // add project to local storage
    saveLocalTask(taskInput.value);
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('item-button-container2');
    // create check button and functionality
    const checkButton2 = document.createElement('button');
    checkButton2.innerText = 'Done';
    checkButton2.classList.add("complete-Btn2");
    buttonDiv.appendChild(checkButton2);
    checkButton2.addEventListener('click', taskComplete); // eventlistener has to be declared within this function in order to reference the checkButton variable
    // create delete button
    const deleteButton2 = document.createElement('button');
    deleteButton2.innerText = 'Del';
    deleteButton2.classList.add("delete-Btn2");
    buttonDiv.appendChild(deleteButton2);
    deleteButton2.addEventListener('click', deleteTask); // eventlistener has to be declared within this function in order to reference the checkButton variable
    createTaskDiv.appendChild(buttonDiv);
    document.getElementById('input2').value = "";
};



const taskComplete = (event) => { // event must be passed in. This is the click event from the eventlistner. It contains 'target'. See mouseEvent in console
    event.target.parentElement.parentElement.classList.toggle('complete'); // 'complete' added to parent element of the content so that 'complete-Btn' styles remain, which is why
    // we use event.target.parent.element.
};
// DELETE PROJECT ITEM
const deleteTask = (event) => {
    const removeItem2 = event.target.parentElement.parentElement;
    event.target.parentElement.parentElement.classList.add('fall');
    removeItem2.addEventListener('transitionend', function (){
        removeItem2.remove();
    })
    removeTask(removeItem2);
};
// SAVE TO LOCAL STORAGE
const saveLocalTask = (newTask) => {
    let task;
    if(localStorage.getItem('item2') === null) {
        task = [];
    } else {
        task = JSON.parse(localStorage.getItem('item2'));
    }
    console.log(task);
    task.push(newTask);
    localStorage.setItem('item2', JSON.stringify(task));
}
// RE-RENDER PROJECTS FROM STORAGE ON REFRESH
const getTask = () => {
    let task;
    if(localStorage.getItem('item2') === null) {
        task = [];
    } else {
        task = JSON.parse(localStorage.getItem('item2'));
    }
    task.forEach(function(task){
        const createTaskDiv = document.createElement('div'); 
        createTaskDiv.classList.add('item2');
        const taskItem = document.createElement('h3');
        taskItem.innerText = task; // this should match the argument passed in to the forEach function. An arbitray name for the elemnt in the data array.
        container2.appendChild(createTaskDiv); 
        createTaskDiv.appendChild(taskItem);
        //crate button div for styling
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('item-button-container2');
        // create check button and functionality
        const checkButton2 = document.createElement('button');
        checkButton2.innerText = 'Done';
        checkButton2.classList.add("complete-Btn2");
        buttonDiv.appendChild(checkButton2);
        checkButton2.addEventListener('click', taskComplete); 
        // create delete button
        const deleteButton2 = document.createElement('button');
        deleteButton2.innerText = 'Del';
        deleteButton2.classList.add("delete-Btn2");
        buttonDiv.appendChild(deleteButton2);
        deleteButton2.addEventListener('click', deleteTask);
        createTaskDiv.appendChild(buttonDiv); 
})
};

const removeTask = (tasky) => {  // this function is required to remove item from storage based on the delete button functioning
    let task;
    if(localStorage.getItem('item2') === null){
        task = [];
    } else {
        task = JSON.parse(localStorage.getItem('item2'));
    }
    const taskIndex = tasky.children[0].innerText; // find item in to do lits based on their index in the stored array
    task.splice(task.indexOf(taskIndex), 1); // splices the array at the index
    localStorage.setItem("item2", JSON.stringify(task)); // recreates the array without the spliced item
}

getTask();

const moveTaskToFront = () => {
    document.getElementById("tasks").style.zIndex = "3"; // move to front  proj
    document.getElementById("projects").style.zIndex = "2"; // move to middle learn
    document.getElementById("learning").style.zIndex = "1"; // move to bottom  tasks
    document.getElementById("tasks").style.gridArea = "3 / 1 / 7 / 1"; // move to bottom  proj
    document.getElementById("projects").style.gridArea = "2 / 1 / 6 / 1";  // learn
    document.getElementById("learning").style.gridArea = "1 / 1 / 5 / 1"; // tasks
}

// EVENT LISTENERS
taskAddBtn.addEventListener('click', addTask);

taskSection.addEventListener('click', moveTaskToFront); // change to touch end when functionality works




