let assignedToTask = [];
let assignedInitial = [];

let tasks = {};

let subtasksArray = {
    'subtaskContent': [],
    'subtaskStatus': []
};

/**
 * This function is used to fetch all the data for the new task from inputs and functions
 * 
 * @param {string} inputStatus This variable sets the status
 */
async function getTaskValue(inputStatus) {
    let dateCreated = new Date().getTime();
    let id = randomString();
    let title = document.getElementById('task_title').value;
    let description = document.getElementById('task_description').value;
    let user = assignedToTask;
    let date = document.getElementById('task_date').value;
    let prio = getPriority();
    let category = document.getElementById('task_category').value;
    let subtasks = subtasksArray;
    let status;
    status = 'To Do';
    if (inputStatus !== 'todo' ) {
        status = inputStatus;
    };
    pushTask(dateCreated, id, title, description, user, date, prio, category, subtasks, status);
}

/**
 * This function is used to push all the data for the new task in the tasks object
 * 
 * @param {object} tasks this is the object where the task is compiled
 */
function pushTask(dateCreated, id, title, description, user, date, prio, category, subtasks, status) {
    tasks[id] = {
        dateCreated: dateCreated,
        id: id,
        title: title,
        description: description,
        prio: prio,
        date: date,
        category: category,
        user: user,
        subtasks: subtasks,
        status: status
    }
    pushUSERS();
    resetTask();
}

/**
 * This function is used to push the object tasks to guest and active User
 * 
 * 
 */
function pushUSERS(){
    if (!USERS[ACTIVEUSERKEY].tasks) {
        // add tasks object to active user object
        USERS[ACTIVEUSERKEY]["tasks"] = {};
    }
    let tasksBuffer = USERS[ACTIVEUSERKEY].tasks;
    USERS[ACTIVEUSERKEY].tasks = Object.assign(tasksBuffer, tasks);
    USERS["guest"].tasks = Object.assign(USERS["guest"].tasks, tasks);
    setLocalStorage ("localUserTasks", tasks);
    setLocalStorage ("localGuestTasks", tasks);
    updateStorageData("users", USERS);
}

/**
 * This function is used to reset the add task inputs, images, classes and divs
 * 
 * 
 */
function resetTask() {
    document.getElementById('task_title').value = '';
    document.getElementById('task_title').style.border = '1px solid #d1d1d1';
    document.getElementById('title_is_required').classList.add('d-none');
    document.getElementById('task_description').value = '';
    document.getElementById('task_user').value = '';
    document.getElementById('task_date').value = '';
    document.getElementById('task_date').style.border = '1px solid #d1d1d1';;
    document.getElementById('date_is_required').classList.add('d-none');
    document.getElementById('urgent_button').classList.remove('urgent_button_active');
    document.getElementById('task_prio_img_urgent').src = '/assets/img/addTask/prio_high.png';
    document.getElementById('medium_button').classList.add('medium_button_active');
    document.getElementById('task_prio_img_medium').src = '/assets/img/addTask/Medium_nocolor.png';
    document.getElementById('low_button').classList.remove('low_button_active');
    document.getElementById('task_prio_img_low').src = '/assets/img/addTask/prio_low.png';
    document.getElementById('task_category').value = '';
    document.getElementById('task_category').style.border = '1px solid #d1d1d1';;
    document.getElementById('category_is_required').classList.add('d-none');
    document.getElementById('assigned_user_initials').innerHTML = '';
    document.getElementById('tasks_contacts_container').classList.add('d-none');
    document.getElementById('new_subtask_list').innerHTML = '';
    assignedToTask = [];
    assignedInitial = [];
    const checkboxes = document.getElementsByClassName('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].src = '/assets/img/addTask/check_empty.png';
    }
    const assignedNameLI = document.getElementsByClassName('assigned_user_li');
    for (let i = 0; i < assignedNameLI.length; i++) {
        assignedNameLI[i].classList.remove('assigned_user_li_toggled');}
    subtasksArray = {
        'subtaskContent': [],
        'subtaskStatus': []
    };
}

/**
 * This function is used to fetch the chosen priority
 * 
 *  
 */
function getPriority() {
    const urgentButton = document.getElementById('urgent_button');
    const mediumButton = document.getElementById('medium_button');
    const lowButton = document.getElementById('low_button');

    if (urgentButton.classList.contains('urgent_button_active')) {
        return 'urgent';
    } else if (mediumButton.classList.contains('medium_button_active')) {
        return 'medium';
    } else if (lowButton.classList.contains('low_button_active')) {
        return 'low';
    } else {return 'medium'}
}

/**
 * This function is used to set the variables for the pririty buttons
 * 
 * 
 */
function setPriority(buttonId, imgId, activeClass, inactiveImgSrc, activeImgSrc, resetIds) {
    let img = document.getElementById(imgId);
    const button = document.getElementById(buttonId);

    if (!button.classList.contains(activeClass)) {
        button.classList.add(activeClass);
        img.src = activeImgSrc;
    } else {
        button.classList.remove(activeClass);
        img.src = inactiveImgSrc;
    }

    for (const resetId of resetIds) {
        document.getElementById(resetId.img).src = resetId.src;
        document.getElementById(resetId.button).classList.remove(resetId.activeClass);
    }
}

/**
 * This function is used to set the priority to urgent and set the urgent button active
 * 
 * 
 */
function urgentButton() {
    setPriority('urgent_button', 'task_prio_img_urgent', 'urgent_button_active', '/assets/img/addTask/prio_high.png', '/assets/img/addTask/high_nocolor.png', [
        { img: 'task_prio_img_medium', src: '/assets/img/addTask/prio_medium.png', button: 'medium_button', activeClass: 'medium_button_active' },
        { img: 'task_prio_img_low', src: '/assets/img/addTask/prio_low.png', button: 'low_button', activeClass: 'low_button_active' }
    ]);
}

/**
 * This function is used to set the priority to low and set the low button active
 * 
 * 
 */
function mediumButton() {
    setPriority('medium_button', 'task_prio_img_medium', 'medium_button_active', '/assets/img/addTask/prio_medium.png', '/assets/img/addTask/Medium_nocolor.png', [
        { img: 'task_prio_img_urgent', src: '/assets/img/addTask/prio_high.png', button: 'urgent_button', activeClass: 'urgent_button_active' },
        { img: 'task_prio_img_low', src: '/assets/img/addTask/prio_low.png', button: 'low_button', activeClass: 'low_button_active' }
    ]);
}

/**
 * This function is used to set the priority to low and set the low button active
 * 
 * 
 */
function lowButton() {
    setPriority('low_button', 'task_prio_img_low', 'low_button_active', '/assets/img/addTask/prio_low.png', '/assets/img/addTask/low_nocolor.png', [
        { img: 'task_prio_img_urgent', src: '/assets/img/addTask/prio_high.png', button: 'urgent_button', activeClass: 'urgent_button_active' },
        { img: 'task_prio_img_medium', src: '/assets/img/addTask/prio_medium.png', button: 'medium_button', activeClass: 'medium_button_active' }
    ]);
}

/**
 * This function is used to transform the addSubtask button into an input and focus it
 * 
 * 
 */
function transformSubtaskButton() {
    const subtaskButton = document.getElementById('subtask_button_input');

    subtaskButton.innerHTML = `
    <div class="add_task_inputs">
        <input onkeyup="handleKeyUp(event)" id="subtask_input" class="subtask_input" placeholder="Add new Subtask">
        <div class="delete_and_check">
            <img onclick="revertBackToButton()" class="exit" id="exit" src="/assets/img/addTask/subtask_delete.png">
            <img src="/assets/img/addTask/subtask_divide.png">
            <img onclick="addNewSubtaskToList()" class="tick" id="tick" src="/assets/img/addTask/subtask_check.png">
        </div>
    </div>
    `;

    document.getElementById('subtask_input').focus();
}

/**
 * This function is used as means to confirm your new subtask with an 'enter' command on the keyboard
 * 
 * 
 */
function handleKeyUp(event) {
    // Überprüfe, ob die gedrückte Taste die Enter-Taste ist
    if (event.key === 'Enter' || event.keyCode === 13) {
        // Überprüfe, ob das Dialog-Element mit der ID "board_modal_task" offen ist
        var boardModalTask = document.getElementById("board_modal_task");
        
        if (boardModalTask && boardModalTask.open) {
            // Wenn Enter gedrückt wurde und der Dialog offen ist, führe die Funktion aus
            addNewSubtaskToListModal(ID);
        } else {
            // Andernfalls führe die andere Funktion aus
            addNewSubtaskToList();
        }
    }
}

/**
 * This function pushes the new subtask to the subtasks arrays
 * 
 * 
 */
function addNewSubtaskToList() {
    let newSubtask = document.getElementById('subtask_input').value;

    if (newSubtask != '') {
        subtasksArray.subtaskContent.push(newSubtask);
        subtasksArray.subtaskStatus.push(0);
        renderSubtaskContainer();
        revertBackToButton();
    } else {
        document.getElementById('subtask_is_required').classList.remove('d-none');
    }
}

/**
 * This function renders the subtask container with the subtasks in the subtask arrays
 * 
 * 
 */
function renderSubtaskContainer() {
    let subtaskContainer = document.getElementById('new_subtask_list');
    subtaskContainer.innerHTML = '';
    for (let i = 0; i < subtasksArray.subtaskContent.length; i++) {
        const addedTask = subtasksArray.subtaskContent[i];
        subtaskContainer.innerHTML +=
            `<li id="subtask_list_item${i}" class="add_subtask_list">
        <div style="display: flex; align-items: center; gap: 8px;">
            <input readonly id="readonly_input${i}" value="${addedTask}"
                class="input_edit_subtask"></input>
            <div id="edit_and_delete${i}" class="edit_and_delete">
                <img id="edit${i}" onclick="editSubtask(${i})" src="/assets/img/addTask/edit.png">
                <img src="/assets/img/addTask/subtask_divide.png">
                <img id="delete${i}" onclick="deleteSubtaskItem(${i})" class="delete" src="/assets/img/addTask/delete.png"
            </div>
        </div>
    </li>`;
    }
    loadAssignableNames()
}

/**
 * This function is used to edit an existing subtask
 * 
 * 
 */
function editSubtask(i) {
    const editIcons = document.getElementById(`edit_and_delete${i}`);
    editIcons.innerHTML = "";
    editIcons.innerHTML = `
        <img id="delete${i}" onclick="deleteSubtaskItem(${i})" class="delete" src="/assets/img/addTask/delete.png"
        <img src="/assets/img/addTask/subtask_divide.png">
        <img src="/assets/img/addTask/subtask_divide.png">
        <img onclick="acceptChanges(${i})" src="/assets/img/addTask/subtask_check.png">
    `;
    const changeBackground = document.getElementById('new_subtask_list')
    changeBackground.classList.add('edit_subtask_list');

    const listItem = document.getElementById(`subtask_list_item${i}`);
    listItem.classList.add('editable_list_element');
    listItem.classList.remove('addsubtask_list_element');

    const input = document.getElementById(`readonly_input${i}`);
    input.removeAttribute('readonly');
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
}

/**
 * This function is used to confirm the changes to the subtask and close the edit input
 * 
 *  
 */
function acceptChanges(i) {
    let replacingElement = document.getElementById(`readonly_input${i}`).value;
    subtasksArray.subtaskContent.splice(i, 1, replacingElement);
    document.getElementById('new_subtask_list').classList.remove('edit_subtask_list');
    renderSubtaskContainer();
}

/**
 * This function is used to delete a subtask
 * 
 * 
 */
function deleteSubtaskItem(i) {
    subtasksArray.subtaskContent.splice(i, 1);
    subtasksArray.subtaskStatus.splice(i, 1);
    document.getElementById('new_subtask_list').classList.remove('edit_subtask_list');
    renderSubtaskContainer();
}

/**
 * This function is used to revert the subtask input into a button
 * 
 * 
 */
function revertBackToButton() {
    const subtaskButton = document.getElementById('subtask_button_input');

    subtaskButton.innerHTML = `
    <button class="add_task_inputs" id="task_subtask_button" onclick="transformSubtaskButton()" type="text">
    <span>Add new Subtask</span>
    <img src="/assets/img/addTask/add_subtask.png" alt=""></button>
    `;
}

/**
 * This function is used to filter by variables
 * 
 * 
 */
function filterByVariable(array, variable, value) {
    return array.find(item => item[variable] == value);
  }


/**
 * This function toggles the visibility of the tasks_contacts_container
 * 
 * 
 */
function toggleSelect() {
    document.getElementById('tasks_contacts_container').classList.toggle('d-none');
}

/**
 * This function adds the event that hides the contact selection when clicking somewhere else than the contact selection
 * 
 * 
 */
function hideContactSelect(event) {
    let nameContainer = document.getElementById('tasks_contacts_container');
    if (nameContainer) {
        if (event.target.id !== "task_user" && event.target.id !== "assigned_user" && !event.target.classList.contains('assigned_user_li') && !event.target.classList.contains('assigned_user_li_toggled') && !event.target.classList.contains('checkbox') && !event.target.classList.contains('assigned_initials') && event.target.id !== "assigned_name_span") {
            nameContainer.classList.add("d-none");
        }
    }
}

/**
 * This is an event when you click
 * 
 * 
 */
document.addEventListener("click", hideContactSelect);


/**
 * This function loads the users
 * 
 * 
 */
function loadAssignableNames() {
    const selectElement = document.getElementById("assigned_user");
    selectElement.innerHTML = "";
    let user = USERS[ACTIVEUSERKEY].contacts
    for (let i = 0; i < user.length; i++) {
        const initial = user[i]["initials"];
        const name = user[i]["name"];
        const color = user[i]["color"];
        const id = user[i]["contactId"];
        selectElement.innerHTML += `
            <li onclick="chooseContact('${i}', '${id}')" id="toggle_name${id}" class="assigned_user_li">
                <div class="task_contacts_name_initials">
                    <div id="initials_img${id}" class="assigned_initials" style="background-color:#${color};">${initial}</div>
                    <span id="assigned_name_span">${name}</span>
                </div>
                <img class="checkbox" id="checkbox${id}" src="/assets/img/addTask/check_empty.png">
            </li>`;
    }
}

/**
 * This function is used to assign a user and show it with css and images
 * 
 * 
 */
function chooseContact(i, id) {
    let li = document.getElementById(`toggle_name${id}`);
    let checkbox = document.getElementById(`checkbox${id}`);

    li.classList.toggle('assigned_user_li_toggled');

    if (checkbox.src.endsWith('/assets/img/addTask/check_empty.png')) {
        checkbox.src = '/assets/img/addTask/check_checked.png';
    } else {
        checkbox.src = '/assets/img/addTask/check_empty.png';
    }

    pushAssignedContact(i, id, li);
}

/**
 * This function is used to push the assigned user in userContacts
 * 
 * 
 */
async function pushAssignedContact(i, id, li) {
    const name = await userContacts[i];
    const index = await assignedToTask.indexOf(name);

    if (li.classList.contains('assigned_user_li_toggled')) {
        assignedToTask.push(name);
    } else { assignedToTask.splice(index, 1) }
    getAssignedInitials(i, id);
}

/**
 * This function shows the initials of the chosen user with his colors
 * 
 * 
 */
function getAssignedInitials(i, id) {
    const toBeAssigned = userContacts[i];
    const index = assignedInitial.indexOf(toBeAssigned);
    let checkbox = document.getElementById(`checkbox${id}`);


    if (checkbox.src.endsWith('check_checked.png') && index === -1) {
        assignedInitial.push(toBeAssigned);
    } else {
        if (index !== -1) {
            assignedInitial.splice(index, 1);
        }
    }
    showAssignedInitials(i, id);
}

function showAssignedInitials(i, id) {
    let container = document.getElementById('assigned_user_initials');
    container.innerHTML = "";  
    for (let j = 0; j < assignedInitial.length; j++) {
        const displayedInitial = assignedInitial[j]['initials'];
        let color = assignedInitial[j]["color"];
        container.innerHTML += `<span id="assigned_initials${id}" class="assigned_initials" style="background-color:#${color};">${displayedInitial}</span>`;
    }
}


/**
 * This function validates if every required input was filled out and marks them if not
 * 
 * 
 */
async function formValidation(status) {
    let title = document.getElementById('task_title');
    let date = document.getElementById('task_date');
    let category = document.getElementById('task_category');

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
    ) if(board_add_task.open) {
        await getTaskValue(status);
        await showSuccess();
        await closeCreateTaskModal();
    } else {
        await getTaskValue(status);
        await showSuccess();
        await openSection("sectionBoard");
        await updateBoardHTML();
    }
}

/**
 * This function shows the succes of adding the task with a dialog
 * 
 * 
 */
function showSuccess() {
    const dialog = document.getElementById("succes_alert_addedTask");
    dialog.classList.add('d-flex');
    dialog.showModal();
    setTimeout(() => dialog.close(), 1000);
    dialog.classList.toggle('d-flex');
}