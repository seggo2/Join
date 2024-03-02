
let ID = "";

let editTaskBuffer = [];

function showBoardModal() {
    const dialog = document.getElementById("board_modal");
    dialog.classList.remove('visually-hidden');
    dialog.classList.add('d-flex');
    dialog.showModal();
}

async function getTaskBoardModalValue(id) {
    chosenTask = USERS[ACTIVEUSERKEY].tasks[id];
    let title = chosenTask["title"];
    let description = chosenTask["description"];
    let user = chosenTask["user"];
    let date = chosenTask["date"];
    let prio = chosenTask["prio"];
    let category = chosenTask["category"];
    let subtasks = chosenTask["subtasks"].subtaskContent;
    let status = chosenTask["status"];
    ID = id
    showBoardModal();
    loadBoardModal(id, title, description, date, category);
    loadBoardModalPrio(prio);
    loadBoardModalAssignedUsers(user);
    loadBoardModalSubtasks(subtasks, id);
}

async function loadBoardModal(id, title, description, date, category) {
    document.getElementById("board_modal_category").innerHTML = category;
    document.getElementById("board_modal_title").innerHTML = title;
    document.getElementById("board_modal_description").innerHTML = description;
    document.getElementById("board_modal_date").innerHTML = date;
    document.getElementById("board_modal_edit_task_button").innerHTML = `
        <div onclick="openBoardModalEditTask('${id}')" class="task_card_button">
            <img src="/assets/img/board/edit.png" alt="edit">
                <span class="task_category_font">Edit</span>
        </div>`;
    document.getElementById("subtask_button_input_modal").innerHTML = `
    <button class="add_task_inputs_modal" id="task_subtask_button_modal" onclick="transformSubtaskButtonModal('${id}')" type="text"><span>Add new Subtask</span><img src="/assets/img/addTask/add_subtask.png" alt=""></button>
    `;
    document.getElementById("modal_edit_task_finish").innerHTML = `
    <button id="create_task_button" value="Create Task " onclick="formValidationModal('${id}')"><span>OK</span><img src="/assets/img/addTask/check_icon.png" alt=""></button>
    `;
}

async function loadBoardModalPrio(prio) {
    let prioSpan = document.getElementById("board_modal_prio_span")
    let prioImg = document.getElementById("board_modal_prio_img")
    if (prio == "urgent") {
        prioSpan.innerHTML = "Urgent";
        prioImg.innerHTML = `<img src="/assets/img/board/prio_high.png" alt="Prio High">`;
    }

    if (prio == "medium") {
        prioSpan.innerHTML = "Medium";
        prioImg.innerHTML = `<img src="/assets/img/board/prio_medium.png" alt="Prio Medium">`;
    }

    if (prio == "low") {
        prioSpan.innerHTML = "Low";
        prioImg.innerHTML = `<img src="/assets/img/board/prio_low.png" alt="Prio Low">`;
    }
}

async function loadBoardModalSubtasks(subtasks, id) {
    const subtaskContainer = document.getElementById("board_modal_subtasks");
    subtaskContainer.innerHTML = "";
    if (subtasks != "undefined") {
        for (let i = 0; i < subtasks.length; i++) {
            if (USERS[ACTIVEUSERKEY].tasks[id].subtasks.subtaskStatus[i] != 1) {
                subtaskContainer.innerHTML += `
            <div class="task_card_subtask">
            <img id="board_modal_subtask_status_${i}" onclick="finishSubtasks('${id}', ${i})" src="/assets/img/board/check_empty.png" alt="checkbox empty">
            <span>${subtasks[i]}</span>
          </div>`;
            } else if (USERS[ACTIVEUSERKEY].tasks[id].subtasks.subtaskStatus[i] == 1){
                subtaskContainer.innerHTML += `
            <div class="task_card_subtask">
            <img id="board_modal_subtask_status_${i}" class="board_modal_subtask_status_img" onclick="finishSubtasks('${id}', ${i})" src="/assets/img/board/check_checked.png" alt="checkbox empty">
            <span>${subtasks[i]}</span>
          </div>`;
            }
        }
    }
}

/**
 * This function changes the subtask status
 * 
 * 
 */
function finishSubtasks(id, i) {
    let img = document.getElementById(`board_modal_subtask_status_${i}`);

    if (img.src.endsWith('/assets/img/board/check_empty.png')) {
        img.src = '/assets/img/board/check_checked.png';
        img.classList.add("board_modal_subtask_status_img");
        USERS[ACTIVEUSERKEY].tasks[id].subtasks.subtaskStatus[i] = 1;
    }
    else if (img.src.endsWith('/assets/img/board/check_checked.png')) {
        img.src = '/assets/img/board/check_empty.png';
        img.classList.remove("board_modal_subtask_status_img");
        USERS[ACTIVEUSERKEY].tasks[id].subtasks.subtaskStatus[i] = 0;
    }
    pushUSERS()
    updateBoardHTML()
}

/**
 * This function loads the users
 * 
 * 
 */
function loadBoardModalAssignedUsers(user) {
    const selectElement = document.getElementById("board_modal_assigned_user");
    selectElement.innerHTML = "";
    for (let i = 0; i < user.length; i++) {
        const initial = user[i]["initials"];
        const name = user[i]["name"];
        const color = user[i]["color"];
        selectElement.innerHTML += `
            <li class="assigned_user_li">
                <div class="task_contacts_name_initials">
                    <div id="modal_initials_img${i}" class="assigned_initials" style="background-color:#${color};">${initial}</div>
                    <span id="assigned_name_span">${name}</span>
                </div>
            </li>`;
    }
}

/**
 * This function closes the modal
 * 
 * 
 */
function closeBoardModal() {
    const dialog = document.getElementById("board_modal");
    dialog.classList.add('visually-hidden');
    dialog.classList.remove('d-flex');
    dialog.close();
    updateBoardHTML()
}

/**
 * This function closes the modal
 * 
 * 
 */
function closeBoardModalTask() {
    const dialog = document.getElementById("board_modal_task");
    dialog.classList.add('visually-hidden');
    dialog.classList.remove('d-flex');
    dialog.close();
    assignedToTask = [];
    assignedInitial = [];
    updateBoardHTML()
}

/**
 * This function adds the event that hides the board_modal when clicking somewhere else
 * 
 * 
 */
function eventCloseBoardModal(event) {
    const dialog = document.getElementById("board_modal");
    if (!event.target.contains(dialog)) return;
    closeBoardModal()
}

/**
 * This function adds the event that hides the board_modal_task when clicking somewhere else
 * 
 * 
 */
function eventCloseBoardModalTask(event) {
    const dialogTask = document.getElementById("board_modal_task");
    if (!event.target.contains(dialogTask)) return;
    closeBoardModalTask()
}

/**
 * This is an event when you click
 * 
 * 
 */
document.addEventListener("click", eventCloseBoardModal);
document.addEventListener("click", eventCloseBoardModalTask);



///////////////////////////////////edit Task Modal///////////////////////////////////////////////////



/**
 * This function opens the editor for the Task
 * 
 * 
 */
function openBoardModalEditTask(id) {
    const dialogTask = document.getElementById("board_modal_task");
    closeBoardModal()
    dialogTask.classList.toggle('visually-hidden');
    dialogTask.classList.add('d-flex');
    dialogTask.showModal();
    modalTaskFillValues(id);
    modalTaskAddPrio(id);
    // modalTaskAddContacts(id);
    editTaskLoadUsers();
    modalTaskAddSubtasks(id);
}

/**
 * This function fills the edit task modal with title, description, date and category
 * 
 * 
 */
function modalTaskFillValues(id) {
    let chosenTask = USERS[ACTIVEUSERKEY].tasks[id];
    document.getElementById('modal_task_title').value = chosenTask["title"];
    document.getElementById('modal_task_description').value = chosenTask["description"];
    document.getElementById('modal_task_date').value = chosenTask["date"];
    document.getElementById('modal_task_category').value = chosenTask["category"];
}

/**
 * This function toggles the visibility of the tasks_contacts_container
 * 
 * 
 */
function toggleSelectModal() {
    document.getElementById('modal_tasks_contacts_container').classList.toggle('d-none');
}

/**
 * This function adds the event that hides the contact selection when clicking somewhere else than the contact selection
 * 
 * 
 */
function hideContactSelect(event) {
    let nameContainer = document.getElementById('modal_tasks_contacts_container');
    if (nameContainer) {
        if (event.target.id !== "modal_task_user" && event.target.id !== "modal_assigned_user" && !event.target.classList.contains('assigned_user_li') && !event.target.classList.contains('assigned_user_li_toggled') && !event.target.classList.contains('checkbox') && !event.target.classList.contains('assigned_initials') && event.target.id !== "assigned_name_span") {
            nameContainer.classList.add("d-none");
        }
    }
}

/**
 * This function loads all users in the edit Task modal 
 * 
 * 
 */
function editTaskLoadUsers() {
    const selectElement = document.getElementById("modal_assigned_user");
    editTaskBuffer = USERS[ACTIVEUSERKEY].tasks[ID].user; // Ehemals assignedToTask
    let user = USERS[ACTIVEUSERKEY].contacts;
    selectElement.innerHTML = "";
    
    for (let i = 0; i < user.length; i++) {
        const initial = user[i]["initials"];
        const name = user[i]["name"];
        const color = user[i]["color"];
        const userID = user[i]["contactId"];

        selectElement.innerHTML += `
            <li onclick="chooseContactModal('${i}', '${userID}')" id="toggle_name_modal${userID}" class="assigned_user_li">
                <div class="task_contacts_name_initials">
                    <div id="modal_initials_img${userID}" class="assigned_initials" style="background-color:#${color};">${initial}</div>
                    <span id="assigned_name_span">${name}</span>
                </div>
                <img class="checkbox" id="checkboxModal${userID}" src="/assets/img/addTask/check_empty.png">
            </li>`;
            for (let j = 0; j < editTaskBuffer.length; j++){
                const taskUserID = editTaskBuffer[j]["contactId"];
                if (taskUserID == userID ){
                    document.getElementById(`toggle_name_modal${userID}`).classList.add('assigned_user_li_toggled')
                    document.getElementById(`checkboxModal${userID}`).src = '/assets/img/addTask/check_checked.png';
                }
            }
        }
        modalEditTaskAddInitials()
}

/**
 * This function fills the edit task modal with the assigned user initials
 * 
 * 
 */
function modalEditTaskAddInitials() {
    const container = document.getElementById("modal_task_assigned_user");
    container.innerHTML = "";
    for (let j = 0; j < editTaskBuffer.length; j++) {
        let displayedInitial = editTaskBuffer[j].initials;
        let color = editTaskBuffer[j].color;
        let id = editTaskBuffer[j].contactId;
        container.innerHTML += `<span id="assigned_initials${id}" class="assigned_initials" style="background-color:#${color};">${displayedInitial}</span>`;
    }
}

/**
 * This is an event when you click
 * 
 * 
 */
document.addEventListener("click", hideContactSelect);

function chooseContactModal(i, id) {
    let li = document.getElementById(`toggle_name_modal${id}`);
    let checkbox = document.getElementById(`checkboxModal${id}`);
    let checkedUser = USERS[ACTIVEUSERKEY].contacts[i];

    li.classList.toggle('assigned_user_li_toggled');

    if (checkbox.src.endsWith('/assets/img/addTask/check_empty.png')) {
        checkbox.src = '/assets/img/addTask/check_checked.png';
        const userAlreadyInBuffer = editTaskBuffer.some(user => user.contactId === id);

        if (!userAlreadyInBuffer) {
            editTaskBuffer.push(checkedUser);
        }
    } else {
        checkbox.src = '/assets/img/addTask/check_empty.png';
        editTaskBuffer = editTaskBuffer.filter(user => user.contactId !== id);
    }
    modalEditTaskAddInitials()
}

/**
 * This function fills the edit task modal with the priority
 * 
 * 
 */
function modalTaskAddPrio(id) {
    let prio = USERS[ACTIVEUSERKEY].tasks[id].prio;
    const urgentButton = document.getElementById('urgent_button_modal');
    const mediumButton = document.getElementById('medium_button_modal');
    const lowButton = document.getElementById('low_button_modal');
    const urgentImage = document.getElementById('task_prio_img_urgent_modal');
    const mediumImage = document.getElementById('task_prio_img_medium_modal');
    const lowImage = document.getElementById('task_prio_img_low_modal');
    
    if (prio == 'urgent') {
        modalTaskPrioUrgent(urgentButton, mediumButton, lowButton, urgentImage, mediumImage, lowImage)
    } else if (prio == 'medium') {
        modalTaskPrioMedium(urgentButton, mediumButton, lowButton, urgentImage, mediumImage, lowImage)
    } else if (prio == 'low') {
        modalTaskPrioLow(urgentButton, mediumButton, lowButton, urgentImage, mediumImage, lowImage)
    }
}

/**
 * This function is used to change the images from button for prio urgent
 * 
 *  
 */
function modalTaskPrioUrgent(urgentButton, mediumButton, lowButton, urgentImage, mediumImage, lowImage){
    urgentButton.classList.add('urgent_button_active');
    mediumButton.classList.remove('medium_button_active');
    lowButton.classList.remove('low_button_active');
    urgentImage.src = '/assets/img/addTask/high_nocolor.png';
    mediumImage.src = '/assets/img/addTask/prio_medium.png';
    lowImage.src = '/assets/img/addTask/prio_low.png';
}

/**
 * This function is used to change the images from button for prio medium
 * 
 *  
 */
function modalTaskPrioMedium(urgentButton, mediumButton, lowButton, urgentImage, mediumImage, lowImage){
    mediumButton.classList.add('medium_button_active');
    urgentButton.classList.remove('urgent_button_active');
    lowButton.classList.remove('low_button_active');
    urgentImage.src = '/assets/img/addTask/prio_high.png';
    mediumImage.src = '/assets/img/addTask/Medium_nocolor.png';
    lowImage.src = '/assets/img/addTask/prio_low.png';
}

/**
 * This function is used to change the images from button for prio low
 * 
 *  
 */
function modalTaskPrioLow(urgentButton, mediumButton, lowButton, urgentImage, mediumImage, lowImage){
    lowButton.classList.add('low_button_active');
    urgentButton.classList.remove('urgent_button_active');
    mediumButton.classList.remove('medium_button_active');
    urgentImage.src = '/assets/img/addTask/prio_high.png';
    mediumImage.src = '/assets/img/addTask/prio_medium.png';
    lowImage.src = '/assets/img/addTask/low_nocolor.png';
}

/**
 * This function is used to fetch the chosen priority
 * 
 *  
 */
function getPriorityModal() {
    const urgentButton = document.getElementById('urgent_button_modal');
    const mediumButton = document.getElementById('medium_button_modal');
    const lowButton = document.getElementById('low_button_modal');

    if (urgentButton.classList.contains('urgent_button_active')) {
        return 'urgent';
    } else if (mediumButton.classList.contains('medium_button_active')) {
        return 'medium';
    } else if (lowButton.classList.contains('low_button_active')) {
        return 'low';
    }
}

/**
 * This function is used to set the priority to urgent and set the urgent button active
 * 
 * 
 */
function urgentButtonModal() {
    setPriority('urgent_button_modal', 'task_prio_img_urgent_modal', 'urgent_button_active', '/assets/img/addTask/prio_high.png', '/assets/img/addTask/high_nocolor.png', [
        { img: 'task_prio_img_medium_modal', src: '/assets/img/addTask/prio_medium.png', button: 'medium_button_modal', activeClass: 'medium_button_active' },
        { img: 'task_prio_img_low_modal', src: '/assets/img/addTask/prio_low.png', button: 'low_button_modal', activeClass: 'low_button_active' }
    ]);
}

/**
 * This function is used to set the priority to low and set the low button active
 * 
 * 
 */
function mediumButtonModal() {
    setPriority('medium_button_modal', 'task_prio_img_medium_modal', 'medium_button_active', '/assets/img/addTask/prio_medium.png', '/assets/img/addTask/Medium_nocolor.png', [
        { img: 'task_prio_img_urgent_modal', src: '/assets/img/addTask/prio_high.png', button: 'urgent_button_modal', activeClass: 'urgent_button_active' },
        { img: 'task_prio_img_low_modal', src: '/assets/img/addTask/prio_low.png', button: 'low_button_modal', activeClass: 'low_button_active' }
    ]);
}

/**
 * This function is used to set the priority to low and set the low button active
 * 
 * 
 */
function lowButtonModal() {
    setPriority('low_button_modal', 'task_prio_img_low_modal', 'low_button_active', '/assets/img/addTask/prio_low.png', '/assets/img/addTask/low_nocolor.png', [
        { img: 'task_prio_img_urgent_modal', src: '/assets/img/addTask/prio_high.png', button: 'urgent_button_modal', activeClass: 'urgent_button_active' },
        { img: 'task_prio_img_medium_modal', src: '/assets/img/addTask/prio_medium.png', button: 'medium_button_modal', activeClass: 'medium_button_active' }
    ]);
}