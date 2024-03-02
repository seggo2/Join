// function init() {
//     updateDashBoard();
// }

/**
 * main functions for updating the drag & drop fields for tasks objects
 */
async function updateDashBoard() {
    BOARDTASKS = null;
    await updateToDoWidget();
    await updateUrgentWidget();
    await updateFeedbackWidget();
    await updateInProgressWidget();
    await updateNameWidget();
    await updateDoneWidget();
    updateAllInBoardWidget();
}


/**
 * Functions uses two arguments in order to update the number widget in the summary. It updates the size of tasks of a specific status.
 * 
 * @param {string} targetElement 
 * @param {string} status 
 */
function updateStatusWidget (targetElement, status) {
    let element = document.getElementById(targetElement);
    element.innerHTML = clear();
    let filteredTasks = getFilteredTasksByStatus(status);
    let size = Object.keys(filteredTasks).length;
    BOARDTASKS += size;
    element.innerHTML = `<b>${size}</b>`;
}



/**
 * function filters all tasks with status todo from active user tasks object
 * 
 */
function updateToDoWidget() {
    updateStatusWidget('j36_todo','todo');
}

/**
 * function filters all tasks with status "inprogress" from active user tasks object
 * 
 */
function updateInProgressWidget() {
    updateStatusWidget('j36_progress','inprogress');
}

/**
 * function filters all taks with status "feedback" from active user tasks object
 * 
 */
function updateFeedbackWidget() {
    updateStatusWidget('j36_feedback','feedback');
}

/**
 * function filters all tasks with status "done" from active user tasks object
 * 
 */
function updateDoneWidget() {
    updateStatusWidget('j36_done','done');
}

/**
 * update task in board; adds up all tasks on the board and saves it within the global variable BOARDTASKS
 * @param {number} number 
 */
function updateAllInBoardWidget() {
    let board = document.getElementById('j36_board');
    board.innerHTML = clear();
    board.innerHTML = `<b>${BOARDTASKS}</b>`;
}

/**
 * functions searches userTasks for objects with status as target value
 * 
 * @param {string} targetValue 
 * @returns filtered object with tasks with status targetValue
 */
function getFilteredTasksByStatus(targetValue) {
    let inputObject = userTasks;
    let targetKey = 'status';
    let filteredObject = filterNestedObject(inputObject, targetValue, targetKey);
    return filteredObject;
}


/**
 * function changes the urgent widget data. It searches for the number of tasks which are urgent and the next upcoming dead line date.
 * 
 */
function updateUrgentWidget() {
    let deadlineDate, nextDate, urgentWidget, size;
    urgentWidget = document.getElementById('j36_Urgent');
    urgentWidget.innerHTML = clear();
    urgentTaskIds = Object.keys(filterNestedObject(userTasks, 'urgent', 'prio'));
    size = Object.keys(urgentTaskIds).length;
    deadlineDate = 'No';
    if (size > 0) {
        deadlineDate = checkUrgentDates(urgentTaskIds);
    }
    urgentWidget.innerHTML = generateUrgentWidgetHTML(size, deadlineDate);
}

/**
 * functions compares dates. It will return the nearest urgent date as string. Format: "Fri Dec 29 2023"
 * 
 * @param {array} urgentTasks 
 * @returns {string} deadline 
 */
function checkUrgentDates(urgentTaskIds) {
    deadlineDate = new Date(USERS[ACTIVEUSERKEY].tasks[urgentTaskIds[0]].date);
    for (const taskId of urgentTaskIds) {
        nextDate = new Date(USERS[ACTIVEUSERKEY].tasks[taskId].date);
        if (nextDate < deadlineDate) {
            deadlineDate = nextDate;
        }
    };
    deadlineDate = deadlineDate.toLocaleDateString('de-DE', { month: 'long', day: 'numeric', year: 'numeric' });;
    return deadlineDate;
}

function generateUrgentWidgetHTML(size, deadlineDate) {
    return /*html*/` 
        <div class="j360_urgentImg">
        </div>
        <div class="j36_numberPosition">
            <b>${size}</b>
            <p class="j36_todoText">Urgent</p>
        </div>
        <div class="j36_partingLine"></div>
        <div class="j36_Date">
            <h2 class="j_36UserDate">${deadlineDate}</h2>  
            <p class="j36_dateText">Upcoming Deadline</p>
        </div>
    `
}


function updateNameWidget() {//die funktion soll den namen raus suchen
    let nameWidget = document.getElementById('j36_person-Name');
    nameWidget.innerHTML = clear();
    let name = USERS[ACTIVEUSERKEY].userData.name;
    // String has shortened for forename
    nameWidget.innerHTML = `  
    <h2 id="j36_person-Name" class="j36_person-Name">dear ${name}</h2>`;
}

function myfunction() {
    return true
}


