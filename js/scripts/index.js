        import { Task } from "../common/task.js";

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


        btnSubmit.onclick = addTaskToTaskList

        btnSubmitUpdate.onclick = updateTaskFromTaskList



        // TODO: remove this later
        let tempId = 0

        let tasksList = [];


        function addTaskToTaskList() {

            let id = tempId + 1;
            tempId++;

            let category = parseInt(inputCategory.value);
            let name = inputName.value;
            let desc = inputDesc.value;

            let task = new Task(id, category, name, desc);
            tasksList.push(task);


            createTaskCard()
        }


        function updateTaskFromTaskList() {

            let id = parseInt(inputIdUpdate.value);
            let category = parseInt(inputCategoryUpdate.value);
            let name = inputNameUpdate.value;
            let desc = inputDescUpdate.value;

            let task = new Task(id, category, name, desc);

            for (let index = 0; index < tasksList.length; index++) {

                if (tasksList[index].id === task.id) {
                    tasksList[index] = task;
                }

            }


            createTaskCard()
        }


        function createTaskCard() {
            // cleanup the containers, so that we don't have duplicate entries
            logTasksContainer.innerHTML = "";
            todoTasksContainer.innerHTML = "";
            inProgressTasksContainer.innerHTML = "";
            reviewTasksContainer.innerHTML = "";
            doneTasksContainer.innerHTML = "";

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

            console.log("tasks list", tasksList);


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

