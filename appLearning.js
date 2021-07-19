const learningInput = document.querySelector('.learningInput');
const learningAddBtn = document.querySelector('.learningAddBtn');
const learningList = document.querySelector('.learningList');
const container3 = document.querySelector('.listContainer3');
const learningSection = document.getElementById('learning');

// const todos = [];

// FUNCTIONS
const addLearning = () => {
    event.preventDefault();
    // add new div with input content
    const createLearningDiv = document.createElement('div'); // create a new div to hold the input project
    createLearningDiv.classList.add('item3'); // give the div a class selector
    const learningItem = document.createElement('h3');
    learningItem.innerText = learningInput.value; // add input text to newly created div
    container3.appendChild(createLearningDiv); // append the newly created div to the existing container div
    createLearningDiv.appendChild(learningItem);
    // add project to local storage
    saveLocalLearning(learningInput.value);
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('item-button-container3');
    // create check button and functionality
    const checkButton3 = document.createElement('button');
    checkButton3.innerText = 'Done';
    checkButton3.classList.add("complete-Btn3");
    buttonDiv.appendChild(checkButton3);
    checkButton3.addEventListener('click', learningComplete); // eventlistener has to be declared within this function in order to reference the checkButton variable
    // create delete button
    const deleteButton3 = document.createElement('button');
    deleteButton3.innerText = 'Del';
    deleteButton3.classList.add("delete-Btn3");
    buttonDiv.appendChild(deleteButton3);
    deleteButton3.addEventListener('click', deleteLearning); // eventlistener has to be declared within this function in order to reference the checkButton variable
    createLearningDiv.appendChild(buttonDiv);
    document.getElementById('input3').value = "";
};



const learningComplete = (event) => { // event must be passed in. This is the click event from the eventlistner. It contains 'target'. See mouseEvent in console
    event.target.parentElement.parentElement.classList.toggle('complete'); // 'complete' added to parent element of the content so that 'complete-Btn' styles remain, which is why
    // we use event.target.parent.element.
};
// DELETE PROJECT ITEM
const deleteLearning = (event) => {
    const removeItem3 = event.target.parentElement.parentElement;
    event.target.parentElement.parentElement.classList.add('fall');
    removeItem3.addEventListener('transitionend', function (){
        removeItem3.remove();
    })
    removeLearning(removeItem3);
};
// SAVE TO LOCAL STORAGE
const saveLocalLearning = (newLearning) => {
    let learning;
    if(localStorage.getItem('item3') === null) {
        learning = [];
    } else {
        learning = JSON.parse(localStorage.getItem('item3'));
    }
    console.log(learning);
    learning.push(newLearning);
    localStorage.setItem('item3', JSON.stringify(learning));
}
// RE-RENDER PROJECTS FROM STORAGE ON REFRESH
const getLearning = () => {
    let learning;
    if(localStorage.getItem('item3') === null) {
        learning = [];
    } else {
        learning = JSON.parse(localStorage.getItem('item3'));
    }
    learning.forEach(function(learning){
        const createLearningDiv = document.createElement('div'); 
        createLearningDiv.classList.add('item3');
        const learningItem = document.createElement('h3');
        learningItem.innerText = learning; // this should match the argument passed in to the forEach function. An arbitray name for the elemnt in the data array.
        container3.appendChild(createLearningDiv); 
        createLearningDiv.appendChild(learningItem);
        //crate button div for styling
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('item-button-container3');
        // create check button and functionality
        const checkButton3 = document.createElement('button');
        checkButton3.innerText = 'Done';
        checkButton3.classList.add("complete-Btn3");
        buttonDiv.appendChild(checkButton3);
        checkButton3.addEventListener('click', learningComplete); 
        // create delete button
        const deleteButton3 = document.createElement('button');
        deleteButton3.innerText = 'Del';
        deleteButton3.classList.add("delete-Btn3");
        buttonDiv.appendChild(deleteButton3);
        deleteButton3.addEventListener('click', deleteLearning);
        createLearningDiv.appendChild(buttonDiv); 
})
};

const removeLearning = (learny) => {  // this function is required to remove item from storage based on the delete button functioning
    let learning;
    if(localStorage.getItem('item3') === null){
        learning = [];
    } else {
        learning = JSON.parse(localStorage.getItem('item3'));
    }
    const learningIndex = learny.children[0].innerText; // find item in to do lits based on their index in the stored array
    learning.splice(learning.indexOf(learningIndex), 1); // splices the array at the index
    localStorage.setItem("item3", JSON.stringify(learning)); // recreates the array without the spliced item
}

getLearning();

const moveLearningToFront = () => {
    document.getElementById("learning").style.zIndex = "3"; 
    document.getElementById("tasks").style.zIndex = "2"; 
    document.getElementById("projects").style.zIndex = "1"; 
    document.getElementById("learning").style.gridArea = "3 / 1 / 7 / 1"; 
    document.getElementById("tasks").style.gridArea = "2 / 1 / 6 / 1";  
    document.getElementById("projects").style.gridArea = "1 / 1 / 5 / 1";  
}

// EVENT LISTENERS
learningAddBtn.addEventListener('click', addLearning);

learningSection.addEventListener('click', moveLearningToFront); // change to touch end when functionality works




