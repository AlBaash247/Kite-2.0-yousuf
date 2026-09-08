        import { Task } from "../common/task.js";
        import { BASE_URL, fetchApiData, getHeaders, METHOD_GET, METHOD_POST, METHOD_PUT, STORAGE_KEY_TOKEN } from '../common/api.js';

        let logTasksContainer = document.getElementById("logTasksContainer");
        let todoTasksContainer = document.getElementById("todoTasksContainer");
        let inProgressTasksContainer = document.getElementById("inProgressTasksContainer");
        let reviewTasksContainer = document.getElementById("reviewTasksContainer");
        let doneTasksContainer = document.getElementById("doneTasksContainer");

        let templateTaskCard = document.getElementById("templateTaskCard");

        let inputCategory = document.getElementById("inputCategory");
        let inputName = document.getElementById("inputName");
        let inputDesc = document.getElementById("inputDesc");
        let btnSubmit = document.getElementById("btnSubmit");

        // update modal
        let inputIdUpdate = document.getElementById("inputIdUpdate");
        let inputCategoryUpdate = document.getElementById("inputCategoryUpdate");
        let inputNameUpdate = document.getElementById("inputNameUpdate");
        let inputDescUpdate = document.getElementById("inputDescUpdate");
        let btnSubmitUpdate = document.getElementById("btnSubmitUpdate");


btnSubmit.onclick = apiRequestTaskCreate

btnSubmitUpdate.onclick = apiRequestTaskUpdate


let tasksList = [];


function addTaskToTaskList(data) {
    let id = data.id;
    let category = parseInt(data.task_category_id);
    let name = data.name;
    let desc = data.description;

    let task = new Task(id, category, name, desc);
    tasksList.push(task);

    document.getElementById('createTaskModal').style.display = 'none';

    createTaskCard()
}


function updateTaskFromTaskList(data) {

    document.getElementById('updateTaskModal').style.display = 'none';


    apiRequestTaskIndex()


}


function createTaskCard() {
    cleanup();
    tasksList.forEach(task => {


        let clone = templateTaskCard.content.cloneNode(true);
        let taskCard = clone.getElementById("taskCard");
        let taskCardBtnUpdate = clone.getElementById("taskCardBtnUpdate");
        let taskCardBtnDelete = clone.getElementById("taskCardBtnDelete");
        let taskCardName = clone.getElementById("taskCardName");
        let taskCardDesc = clone.getElementById("taskCardDesc");

        taskCardName.innerText = `(${task.id}) ${task.name}`;
        taskCardDesc.innerText = task.description;


        taskCardBtnUpdate.onclick = function () {
            showUpdateModal(task);
        }

        taskCardBtnDelete.onclick = function () {
            deleteTask(task);
        }



        switch (parseInt(task.category)) {
            case 1:
                logTasksContainer.appendChild(clone);
                break;
            case 2:
                todoTasksContainer.appendChild(clone);
                break;
            case 3:
                inProgressTasksContainer.appendChild(clone);
                break;
            case 4:
                reviewTasksContainer.appendChild(clone);
                break;
            case 5:
                doneTasksContainer.appendChild(clone);
                break;

            default:
                break;
        }



    });

    // console.log("tasks list", tasksList);


}



function showUpdateModal(task) {

    inputIdUpdate.value = task.id;
    inputCategoryUpdate.value = task.category;
    inputNameUpdate.value = task.name;
    inputDescUpdate.value = task.description;

    document.getElementById('updateTaskModal').style.display = 'block';
}

function deleteTask(task) {

    // Trigger the dialog box
    const userConfirmed = window.confirm(`Are you sure you want to delete this task : (${task.id}) ${task.name}?`);

    // Handle the user's choice
    if (userConfirmed) {

        for (let index = 0; index < tasksList.length; index++) {

            if (tasksList[index].id === task.id) {
                tasksList.splice(index, 1);
            }

        }

        createTaskCard();
    }
}

function cleanup() {
    // clean up the containers, so that we don't have duplicate entries
    logTasksContainer.innerHTML = "";
    todoTasksContainer.innerHTML = "";
    inProgressTasksContainer.innerHTML = "";
    reviewTasksContainer.innerHTML = "";
    doneTasksContainer.innerHTML = "";

}

async function apiRequestTaskCreate() {

    const url = "/tasks";

    let data = {
        name: inputName.value,
        description: inputDesc.value,
        done: 0,
        task_category_id: parseInt(inputCategory.value),
    }

    let result = await fetchApiData(METHOD_POST, url, data);

    if (result.success) {
        addTaskToTaskList(result.data)
    }
    else {
        alert("Something went wrong with you!!!!");
    }

}
   
apiRequestTaskIndex();

async function apiRequestTaskIndex() {

    const url = "/tasks";

    let data = null

    let result = await fetchApiData(METHOD_GET, url, data);
    if (result.success) {
        tasksList = [];
        result.data.forEach(task => {
            addTaskToTaskList(task) 
        });

    }
    else {
        alert("Something went wrong with you!!!!");
    }

}


async function apiRequestTaskUpdate() {

    const url = `/tasks/${inputIdUpdate.value}`;

    let data = {
        id: inputIdUpdate.value,
        name: inputNameUpdate.value,
        description: inputDescUpdate.value,
        done: 0,
        task_category_id: parseInt(inputCategoryUpdate.value),
    }

    let result = await fetchApiData(METHOD_PUT, url, data);

    if (result.success) {
       updateTaskFromTaskList(result.data)
    }
    else {
        alert("Something went wrong with you!!!!");
    }

}

