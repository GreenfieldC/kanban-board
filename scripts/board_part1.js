'use strict';

let currentDraggedCard;
let workflow;

const initBoard = async () => {
	await includeHTML();
	highlightSideMenuButton('board');
	await load();
	await loadLoginUserIndex();
	setMenuBadgeOfLoggedInUser();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	renderCards();
	addTaskMainSite = false;
};

/**
 * Renders the cards in the board
 */
const renderCards = () => {
	renderCardsOf('todo', 'todo');
	renderCardsOf('in-progress', 'in-progress');
	renderCardsOf('awaiting-feedback', 'awaiting-feedback');
	renderCardsOf('done', 'done');
};

/**
 * Renders the cards of a specific workflow
 * @param {string} container
 * @param {string} workflow
 */
const renderCardsOf = async (container, workflow) => {
	const cardsContainer = document.getElementById(container);
	cardsContainer.innerHTML = '';
	const cards = allTasks.filter((task) => task.workflow === workflow);

	sortAccordingToPriority(cards);
	renderSortedTasks(cardsContainer, cards);
	await save();
};

/**
 * Sorts the cards according to their priority
 * @param {object} cards
 */
const sortAccordingToPriority = (cards) => {
	cards.sort((a, b) => {
		if ((a.priority === 'urgent' && b.priority === 'low') || (a.priority === 'urgent' && b.priority === 'medium')) return -1;
		if ((a.priority === 'low' && b.priority === 'urgent') || (a.priority === 'medium' && b.priority === 'urgent')) return 1;
		return 0;
	});
};

/**
 * Renders the sorted tasks
 * @param {html} cardsContainer
 * @param {object} cards
 */
const renderSortedTasks = (cardsContainer, cards) => {
	cards.forEach((task) => {
		cardsContainer.innerHTML += generateCardHtml(task.color, task.category, task.title, task.description, task.taskIndex, task.priority);
		checkRenderProgressBar(task.taskIndex, task.subtasks.length, 'progress-bar-container', 'card');
		renderBadgesInCard(task, task.taskIndex);
		updateDoneSubtasks(task.taskIndex, task.subtasks.length, 'card');
	});
};

/**
 * Renders the progress bar in the card if there are subtasks
 * @param {number} id
 * @param {number} amountSubtasks
 */
const checkRenderProgressBar = (id, amountSubtasks, container, location) => {
	if (amountSubtasks > 0) {
		const progressBarContainer = document.getElementById(`${id}.${container}`);
		progressBarContainer.innerHTML = generateProgressBarHtml(id, location);
	}
};

/**
 * Renders the badges in the card
 * @param {object} task
 * @param {number} id
 */
const renderBadgesInCard = (task, id) => {
	const badgesContainer = document.getElementById(`${id}.badges-container-board`);
	for (let i = 0; i < task.taskForce.length; i++) {
		renderFirstThreeBadges(badgesContainer, task, i);
		checkRenderNumberBadges(badgesContainer, i, id);
	}
};

/**
 * Renders the first three badges
 * @param {string} badgesContainer
 * @param {object} task
 * @param {number} i
 */
const renderFirstThreeBadges = (badgesContainer, task, i) => {
	if (i < 3) {
		const assignee = task.taskForce[i];
		badgesContainer.innerHTML += generateBadgeHtml(assignee.initials, assignee.color, assignee.name);
	}
};

/**
 * Renders a +badge if there are more than 3 assignees
 * @param {string} badgesContainer
 * @param {number} i
 * @param {number} id
 */
const checkRenderNumberBadges = (badgesContainer, i, id) => {
	if (i === 3) badgesContainer.innerHTML += generatePlusBadgeHtml(id);
};

/**
 * Updates the progress bar in the card if there are subtasks
 * @param {number} id
 * @param {number} amountSubtasks
 */
const updateDoneSubtasks = (id, amountSubtasks, location) => {
	if (amountSubtasks == 0 && subtaskOnDisplay) {
		let subtasksContainer = document.getElementById(`${id}.progress-bar-overlay`);
		subtasksContainer.innerHTML = 'none';
	}
	if (amountSubtasks > 0) {
		const doneSubtasks = allTasks[id].subtasks.filter((subtask) => subtask.check === true).length;
		const progress = document.getElementById(`${id}.progress-${location}`);
		progress.style.width = `${(doneSubtasks / allTasks[id].subtasks.length) * 100}%`;
		const textProgress = document.getElementById(`${id}.text-progress-${location}`);
		textProgress.innerHTML = `${doneSubtasks}/${allTasks[id].subtasks.length} Done`;
	}
};

/**
 * Starts the dragging of a card
 * @param {number} id
 */
const startDragging = (id) => {
	currentDraggedCard = id;
};

/**
 * Allows the card to be dropped
 * @param {obj} ev
 */
const allowDrop = (ev) => {
	ev.preventDefault();
	const column = ev.target;
	column.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
};

/**
 * Sets the background of the column to the default color
 * @param {string} columnBoard
 */
const backgroundReset = (columnBoard) => {
	let column = document.getElementById(columnBoard);
	column.style.backgroundColor = 'var(--background-grey)';
};

/**
 * Moves the card to the new column and updates the workflow
 * @param {string} workflow
 */
const moveTo = (workflow) => {
	allTasks[currentDraggedCard].workflow = workflow;
	renderCards();
};

/**
 * Searches for the input in the cards and shows only the cards that contain the input
 */
const search = () => {
	const input = document.getElementById('search');
	const filter = input.value.toUpperCase();
	const cards = document.getElementsByClassName('task-card');

	for (let i = 0; i < cards.length; i++) {
		const card = cards[i];
		const category = card.getElementsByClassName('category')[0];
		let title = card.getElementsByClassName('task-card-title')[0];
		const description = card.getElementsByClassName('task-description-card')[0];
		if (categoryFound(category, filter) || descriptionFound(description, filter) || titleFound(title, filter)) card.style.display = '';
		if (categoryNotFound(category, filter) && descriptionNotFound(description, filter) && titleNotFound(title, filter)) card.style.display = 'none';
	}
};

/**
 * Returns true if the title contains the filter
 * @param {string} title
 * @param {string} filter
 * @returns
 */
const categoryFound = (category, filter) => {
	return category.innerHTML.toUpperCase().indexOf(filter) > -1;
};

/**
 * Returns true if the title does not contain the filter
 * @param {string} description
 * @param {string} filter
 * @returns
 */
const categoryNotFound = (category, filter) => {
	return category.innerHTML.toUpperCase().indexOf(filter) === -1;
};

/**
 * Returns true if the title contains the filter
 * @param {string} title
 * @param {string} filter
 * @returns
 */
const titleFound = (title, filter) => {
	return title.innerHTML.toUpperCase().indexOf(filter) > -1;
};

/**
 * Returns true if the title does not contain the filter
 * @param {string} title
 * @param {string} filter
 * @returns {boolean}
 */
const titleNotFound = (title, filter) => {
	return title.innerHTML.toUpperCase().indexOf(filter) === -1;
};

/**
 * Returns true if the description contains the filter
 * @param {string} description
 * @param {string} filter
 * @returns
 */
const descriptionFound = (description, filter) => {
	return description.innerHTML.toUpperCase().indexOf(filter) > -1;
};

/**
 * Returns true if the description does not contain the filter
 * @param {string} description
 * @param {string} filter
 * @returns
 */
const descriptionNotFound = (description, filter) => {
	return description.innerHTML.toUpperCase().indexOf(filter) === -1;
};

/**
 *Closes the overlay and clears the required values of the form
 */
const closeAddTaskOverlay = () => {
	document.getElementById('overlay').style.display = 'none';
	clearRequiredValues();
};

/**
 * Closes the overlay if the user clicks outside of it
 */
overlay.addEventListener('click', (e) => {
	if (e.target.id === 'overlay') {
		closeAddTaskOverlay();
	}
});

/* Edit Cards */

/**
 * Opens the card on display
 * @param {number} id
 */
const openCard = (id) => {
	let ondisplayOverlay = document.getElementById('details-task-overlay');
	ondisplayOverlay.style.display = 'flex';
	subtaskOnDisplay = true;
	/* addTaskMainSite = true; */
	renderCardOnDisplay(id);
};

let ondisplayOverlay = document.getElementById('details-task-overlay');

/**
 * Close the card on display
 * @param {} e
 */
const closeCard = (e) => {
	ondisplayOverlay.style.display = 'none';
	subtaskOnDisplay = false;
};

/**
 * Closes the card if the user clicks outside the card
 */
ondisplayOverlay.addEventListener('click', (e) => {
	if (e.target.id === 'details-task-overlay') {
		closeCard();
		editTaskCard = false;
		subtaskOnDisplay = false;
		clearAddTaskFormular();
	}
});

/**
 * Renders the card on display
 * @param {number} id
 */
const renderCardOnDisplay = (id) => {
	ondisplayOverlay.innerHTML = '';
	ondisplayOverlay.innerHTML = generateCardOnDisplayHtml(id);
	renderBadgesCardOnDisplay(id);
	checkRenderProgressBar(allTasks[id].taskIndex, allTasks[id].subtasks.length, 'progress-bar-overlay', 'card-on-display');
	updateDoneSubtasks(allTasks[id].taskIndex, allTasks[id].subtasks.length, 'card-on-display');
	renderSubtasksOnDisplay(allTasks[id].taskIndex);
};

/**
 * Renders the badges on the card on display
 * @param {number} id
 */
const renderBadgesCardOnDisplay = (id) => {
	let badgesContainer = document.getElementById('badges-card-on-display');
	badgesContainer.innerHTML = '';
	badgesContainer.innerHTML = generateBadgesCardOnDisplayHtml(id);
};

/**
 * Renders the subtasks on the card on display
 * @param {number} cardId
 * @returns
 */
const renderSubtasksOnDisplay = (cardId) => {
	let subTaskContainerOnDisplay = document.getElementById('subtasks-container-on-display');
	subTaskContainerOnDisplay.innerHTML = '';
	if (allTasks[cardId].subtasks.length === 0) return;
	allTasks[cardId].subtasks.forEach((subtask, subtaskId) => {
		generateSubTask(subtask.title, cardId, subtaskId, subTaskContainerOnDisplay);
	});
};

/**
 *
 * @param {*} cardId
 * @param {*} subtaskId
 */
const toggleCheckSubtask = async (cardId, subtaskId) => {
	allTasks[cardId].subtasks[subtaskId].check = !allTasks[cardId].subtasks[subtaskId].check;
	await save();
	renderCardOnDisplay(cardId);
	renderCards((subtaskOnDisplay = false));
	subtaskOnDisplay = true;
};

/**
 * Sets the card to edit
 * @param {number} taskId
 */
const editTask = (taskId) => {
	let onDisplayOverlay = document.getElementById('board-card-overlay');
	onDisplayOverlay.innerHTML = '';
	onDisplayOverlay.innerHTML = generateEditTaskHtml(taskId);
	const dropDownAssignedToListEditTask = document.getElementById('drop-down-list-assigned-to-edit-task');
	rendersAssignedToList(dropDownAssignedToListEditTask, 'edit-task');
	addCheckKeyToAllUsers();
	checkTrueForTaskForceMembera(taskId);
	selectPriorityBtnEditTask(taskId);
	updateCheckMarkAssignedToEditTask(taskId, 'edit-task');
	renderBadgesAddTask(taskId);
	selectedTaskToEditId = taskId;
	editTaskCard = true;
	taskForceToEdit(selectedTaskToEditId);
};

/**
 * Sets the check property of all users to true if they are assigned to the task
 * @param {number} taskId
 */
const checkTrueForTaskForceMembera = (taskId) => {
	allTasks[taskId].taskForce.forEach((user) => {
		allUsers[user.id].check = true;
	});
};

const taskForceToEdit = () => {
	taskForce.push(allTasks[selectedTaskToEditId].taskForce);
};

/**
 * Selects the priority button in 'Edit Task' section visually
 * @param {number} id of the task
 */
const selectPriorityBtnEditTask = (id) => {
	if (allTasks[id].priority == 'urgent') selectPriority('edit-task', 'urgent', '#ff3d00');
	if (allTasks[id].priority == 'medium') selectPriority('edit-task', 'medium', '#ffa800');
	if (allTasks[id].priority == 'low') selectPriority('edit-task', 'low', '#7ae229');
};

const updateCheckMarkAssignedToEditTask = (idTask, location) => {
	allTasks[idTask].taskForce.forEach((user) => {
		let userElement = document.getElementById(`${user.id}.-coworker-checkbox-${location}`);
		userElement.checked = true;
	});
};
