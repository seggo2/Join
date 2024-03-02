/**
 * This function transform the Subtaskbutton to an Input
 * 
 * 
 */
function transformSubtaskButtonModal(id) {
    const subtaskButton = document.getElementById('subtask_button_input_modal');

    subtaskButton.innerHTML = `
    <div class="add_task_inputs_modal">
        <input onkeyup="handleKeyUp(event)" id="subtask_input_modal" class="subtask_input" placeholder="Add new Subtask">
        <div class="delete_and_check">
            <img onclick="revertBackToButtonModal('${id}')" class="exit" id="exit" src="/assets/img/addTask/subtask_delete.png">
            <img src="/assets/img/addTask/subtask_divide.png">
            <img onclick="addNewSubtaskToListModal('${id}')" class="tick" id="tick" src="/assets/img/addTask/subtask_check.png">
        </div>
    </div>
    `;

    document.getElementById('subtask_input_modal').focus();
}

/**
 * This function is used to revert the subtask input into a button
 * 
 * 
 */
function revertBackToButtonModal(id) {
    const subtaskButton = document.getElementById('subtask_button_input_modal');

    subtaskButton.innerHTML = `
    <button class="add_task_inputs_modal" id="task_subtask_button_modal" onclick="transformSubtaskButtonModal('${id}')" type="text">
    <span>Add new Subtask</span><img src="/assets/img/addTask/add_subtask.png" alt="">
    </button>
    `;
}

function addNewSubtaskToListModal(id) {
    let newSubtask = document.getElementById('subtask_input_modal').value;
    let subtasks = USERS[ACTIVEUSERKEY].tasks[id].subtasks;

    if (newSubtask != '') {
        subtasks.subtaskContent.push(newSubtask);
        subtasks.subtaskStatus.push(0);
        modalTaskAddSubtasks(id);
        revertBackToButton();
    } else {
        document.getElementById('subtask_is_required').classList.remove('d-none');
    }
}

/**
 * This function fills the edit task modal with the subtasks
 * 
 * 
 */
function modalTaskAddSubtasks(id) {
    let subtasks = USERS[ACTIVEUSERKEY].tasks[id].subtasks;
    let subtaskContainer = document.getElementById('modal_subtask_list');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < subtasks.subtaskContent.length; i++) {
        const addedTask = subtasks.subtaskContent[i];
        subtaskContainer.innerHTML +=
            `<li id="subtask_list_item${i}" class="add_subtask_list">
        <div style="display: flex; align-items: center;">
            <input readonly id="readonlyInputModal${i}" value="${addedTask}"
                class="input_edit_subtask"></input>
            <div id="editAndDeleteModal${i}" class="edit_and_delete">
                <img id="editModalSubtask${i}" onclick="editModalSubtask(${i}, '${id}')" src="/assets/img/addTask/edit.png">
                <img src="/assets/img/addTask/subtask_divide.png">
                <img id="deleteModalSubtask${i}" onclick="modalDeleteSubtask(${i}, '${id}')" class="delete" src="/assets/img/addTask/delete.png"
            </div>
        </div>
    </li>`;
    }
}

/**
 * This function is used to delete a subtask
 * 
 * 
 */
function modalDeleteSubtask(i, id) {
    let subtask = USERS[ACTIVEUSERKEY].tasks[id].subtasks;
    subtask.subtaskContent.splice(i, 1);
    subtask.subtaskStatus.splice(i, 1);
    document.getElementById('new_subtask_list').classList.remove('edit_subtask_list');
    modalTaskAddSubtasks(id);
}

/**
 * This function is used to edit an existing subtask
 * 
 * 
 */
function editModalSubtask(i, id) {
    const editIcons = document.getElementById(`editAndDeleteModal${i}`);
    editIcons.innerHTML = "";
    editIcons.innerHTML = `
        <img id="delete${i}" onclick="deleteSubtaskItem(${i})" class="delete" src="/assets/img/addTask/delete.png"
        <img src="/assets/img/addTask/subtask_divide.png">
        <img src="/assets/img/addTask/subtask_divide.png">
        <img onclick="acceptChangesModal(${i}, '${id}')" src="/assets/img/addTask/subtask_check.png">
    `;
    const changeBackground = document.getElementById('new_subtask_list')
    changeBackground.classList.add('edit_subtask_list');

    const listItem = document.getElementById(`subtask_list_item${i}`);
    listItem.classList.add('editable_list_element');
    listItem.classList.remove('addsubtask_list_element');

    const input = document.getElementById(`readonlyInputModal${i}`);
    input.removeAttribute('readonly');
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
}

/**
 * This function is used to confirm the changes to the subtask and close the edit input
 * 
 *  
 */
function acceptChangesModal(i, id) {
    let subtask = USERS[ACTIVEUSERKEY].tasks[id].subtasks;
    let replacingElement = document.getElementById(`readonlyInputModal${i}`).value;
    subtask.subtaskContent.splice(i, 1, replacingElement);
    document.getElementById('new_subtask_list').classList.remove('edit_subtask_list');
    modalTaskAddSubtasks(id);
}

async function boardModalDeleteTask() {
    if (!(ID in USERS[ACTIVEUSERKEY].tasks)) {
        console.log("Error, key can't be found")
        return false;
    };
    delete USERS[ACTIVEUSERKEY].tasks[ID];
    ID = null;
    closeBoardModal();
    await setStorageData("users", USERS);
    showSuccessInfo("3");
    // show modal task deleted
    // TODO set local user storage
}

async function formValidationModal(id) {
    let title = document.getElementById('modal_task_title');
    let date = document.getElementById('modal_task_date');
    let category = document.getElementById('modal_task_category');

    if (title.value == '') {
        title.style.border = '1px solid red';
        document.getElementById('title_is_required').classList.remove('d-none');
    };
    if (date.value == '') {
        date.style.border = '1px solid red';
        document.getElementById('date_is_required').classList.remove('d-none');
    };
    if (category.value == '') {
        category.style.border = '1px solid red';
        document.getElementById('category_is_required').classList.remove('d-none');
    };

    if (
        title.value !== '' &&
        date.value !== '' &&
        category.value !== ''
    ) {
        await getTaskValueModal();
        // closeBoardModalTask()
        await updateBoardHTML(); // TODO it does not work. Why? -> visually-hidden ? The elements can not be accessed? Onclick better?
    }
}

/**
 * This function is used to fetch all the data for the new task from inputs and functions
 * 
 * @param {string} inputStatus This variable sets the status
 */
async function getTaskValueModal(inputStatus) {
    let id = ID;
    let title = document.getElementById('modal_task_title').value;
    let description = document.getElementById('modal_task_description').value;
    let user = editTaskBuffer;
    let date = document.getElementById('modal_task_date').value;
    let prio = getPriorityModal();
    let category = document.getElementById('modal_task_category').value;
    let subtasks = USERS[ACTIVEUSERKEY].tasks[id].subtasks;
    let status = USERS[ACTIVEUSERKEY].tasks[id].status;
    let dateCreated = USERS[ACTIVEUSERKEY].tasks[id].dateCreated;

    pushTaskModal(id, title, description, user, date, prio, category, subtasks, status, dateCreated);
}

/**
 * This function is used to push all the data for the new task in the tasks object
 * 
 * @param {object} tasks this is the object where the task is compiled
 */
async function pushTaskModal(id, title, description, user, date, prio, category, subtasks, status, dateCreated) {
    tasks[id] = {
        id: id,
        title: title,
        description: description,
        prio: prio,
        date: date,
        category: category,
        user: user,
        subtasks: subtasks,
        status: status,
        dateCreated: dateCreated
    }
    await pushUSERS();
    await updateBoardHTML()
    await closeBoardModalTask()
}