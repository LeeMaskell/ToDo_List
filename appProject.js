// SELECTORS
const projectInput = document.querySelector('.projectInput');
const projectAddBtn = document.querySelector('.projectAddBtn');
const projectList = document.querySelector('.projectList');
const container = document.querySelector('.listContainer');
const projectSection = document.getElementById('projects');

// const todos = [];

// FUNCTIONS
const universalAddFunction = () => {}

const addProject = () => {
    event.preventDefault();
    // add new div with input content
    const createProjectDiv = document.createElement('div'); // create a new div to hold the input project
    createProjectDiv.classList.add('item'); // give the div a class selector
    const projectItem = document.createElement('h3');
    projectItem.innerText = projectInput.value; // add input text to newly created div
    container.appendChild(createProjectDiv); // append the newly created div to the existing container div
    createProjectDiv.appendChild(projectItem);
    // add project to local storage
    saveLocal(projectInput.value);
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('item-button-container');
    // create check button and functionality
    const checkButton = document.createElement('button');
    checkButton.innerText = 'Done';
    checkButton.classList.add("complete-Btn");
    buttonDiv.appendChild(checkButton);
    checkButton.addEventListener('click', projectComplete); // eventlistener has to be declared within this function in order to reference the checkButton variable
    // create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Del';
    deleteButton.classList.add("delete-Btn");
    buttonDiv.appendChild(deleteButton);
    deleteButton.addEventListener('click', deleteProject); // eventlistener has to be declared within this function in order to reference the checkButton variable
    createProjectDiv.appendChild(buttonDiv);
    document.getElementById('input').value = "";
};

const projectComplete = (event) => { // event must be passed in. This is the click event from the eventlistner. It contains 'target'. See mouseEvent in console
    event.target.parentElement.parentElement.classList.toggle('complete'); // 'complete' added to parent element of the content so that 'complete-Btn' styles remain, which is why
    // we use event.target.parent.element.
};
// DELETE PROJECT ITEM
const deleteProject = (event) => {
    const removeItem = event.target.parentElement.parentElement;
    event.target.parentElement.parentElement.classList.add('fall');
    removeItem.addEventListener('transitionend', function (){
        removeItem.remove();
    })
    removeProjects(removeItem);
};
// SAVE TO LOCAL STORAGE
const saveLocal = (newProject) => {
    let projects;
    if(localStorage.getItem('item') === null) {
        projects = [];
    } else {
        projects = JSON.parse(localStorage.getItem('item'));
    }
    console.log(projects);
    projects.push(newProject);
    localStorage.setItem('item', JSON.stringify(projects));
}
// RE-RENDER PROJECTS FROM STORAGE ON REFRESH
const getProjects = () => {
    let projects;
    if(localStorage.getItem('item') === null) {
        projects = [];
    } else {
        projects = JSON.parse(localStorage.getItem('item'));
    }
    projects.forEach(function(project){
        const createProjectDiv = document.createElement('div'); 
        createProjectDiv.classList.add('item');
        const projectItem = document.createElement('h3');
        projectItem.innerText = project; // this should match the argument passed in to the forEach function. An arbitray name for the elemnt in the data array.
        container.appendChild(createProjectDiv); 
        createProjectDiv.appendChild(projectItem);
        //crate button div for styling
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('item-button-container');
        // create check button and functionality
        const checkButton = document.createElement('button');
        checkButton.innerText = 'Done';
        checkButton.classList.add("complete-Btn");
        buttonDiv.appendChild(checkButton);
        checkButton.addEventListener('click', projectComplete); 
        // create delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Del';
        deleteButton.classList.add("delete-Btn");
        buttonDiv.appendChild(deleteButton);
        deleteButton.addEventListener('click', deleteProject);
        createProjectDiv.appendChild(buttonDiv); 
})
};

const removeProjects = (project) => {  // this function is required to remove item from storage based on the delete button functioning
    let projects;
    if(localStorage.getItem('item') === null){
        projects= [];
    } else {
        projects = JSON.parse(localStorage.getItem('item'));
    }
    const projectIndex = project.children[0].innerText; // find item in to do lits based on their index in the stored array
    projects.splice(projects.indexOf(projectIndex), 1); // splices the array at the index
    localStorage.setItem("item", JSON.stringify(projects)); // recreates the array without the spliced item
}

getProjects();

const moveProjectToFront = () => {
    document.getElementById("projects").style.zIndex = "3"; // move to front
    document.getElementById("learning").style.zIndex = "2"; // move to middle
    document.getElementById("tasks").style.zIndex = "1"; // move to bottom
    document.getElementById("projects").style.gridArea = "3 / 1 / 7 / 1"; // move to bottom
    document.getElementById("learning").style.gridArea = "2 / 1 / 6 / 1";
    document.getElementById("tasks").style.gridArea = "1 / 1 / 5 / 1";
}

// EVENT LISTENERS
projectAddBtn.addEventListener('click', addProject);

projectSection.addEventListener('click', moveProjectToFront); // change to touch end when functionality works




