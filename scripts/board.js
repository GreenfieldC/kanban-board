'use strict';

const initBoard = async () => {
	await loadAllTasks();
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	renderCards();
};

/**
 * Renders the cards in the board
 */
const renderCards = () => {
	renderToDoCards();
};

/**
 *! Change into generic function later!
 * Renders the cards in the todo column
 */
const renderToDoCards = () => {
	const todoContainer = document.getElementById('todo-container');
	todoContainer.innerHTML = '';

	allTasks.forEach((task, id) => {
		if (task.workflow === 'todo') {
			todoContainer.innerHTML += generateCardHtml(task.color, task.category, task.title, task.description, id, task.priority);
			checkRenderProgressBar(id, task.subtasks.length);
			renderBadgesInCard(task, id);
			updateDoneSubtasks(id, task.subtasks.length);
		}
	});
};

/**
 * Renders the progress bar in the card if there are subtasks
 * @param {number} id
 * @param {number} amountSubtasks
 */
const checkRenderProgressBar = (id, amountSubtasks) => {
	if (amountSubtasks > 0) {
		const progressBarContainer = document.getElementById(`${id}.progress-bar-container`);
		progressBarContainer.innerHTML = generateProgressBarHtml(id);
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
const updateDoneSubtasks = (id, amountSubtasks) => {
	if (amountSubtasks > 0) {
		const doneSubtasks = allTasks[id].subtasks.filter((subtask) => subtask.check === true).length;
		const progress = document.getElementById(`${id}.progress`);
		progress.style.width = `${(doneSubtasks / allTasks[id].subtasks.length) * 100}%`;
		const textProgress = document.getElementById(`${id}.text-progress`);
		textProgress.innerHTML = `${doneSubtasks}/${allTasks[id].subtasks.length} Done`;
	}
};
