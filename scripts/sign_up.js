'use-strict';

let colorForBadges = ['#02CF2F', '#EE00D6', '#0190E0', '#FF7200', '#FF2500', '#AF1616', '#FFC700', '#3E0099', '#462F8A', '#FF7A00', '#000000'];
let initials;
let color;

const initSignUp = async () => {
	setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever');
	await load();
};

/**
 * Checks sign up form
 * @returns
 */
const checkSignUpForm = () => {
	const { name, email, password } = getInputValues();
	createInitials(name);
	setColorBadge();
	userObject(name, email, password, initials, color, (phone = 'N/A'));

	if (!noDuplicateEmail(email)) {
		showFeedbackMessage('signIn-email-feedback');
		return;
	}

	checkAddNewUser(name, email, password, initials, color, (phone = 'N/A'));

	logInUser(email, password);
};

/**
 * Logs in user (after sign up)
 * @param {string} email
 * @param {string} password
 */
const logInUser = async (email, password) => {
	const user = allUsers.findIndex((user) => user.email === email && user.password === password);
	logInUserIndex = user;
	await saveLoginUserIndex();
	setTimeout(() => {
		window.location.href = 'summary.html';
	}, 125);
};

/**
 * Gets the values of the input fields
 * @returns {object} - returns an object with the values of the input fields
 */
const getInputValues = () => {
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	return { name: name, email: email, password: password };
};

/**
 *
 * @param {string} name
 * @returns
 */
const createInitials = (name) => {
	initials = name
		.split(' ')
		.map((n) => n[0])
		.join('');
	if (initials.length == 1) initials = initials + initials;
	return initials;
};

/**
 *
 * @param {string} initials
 * @returns number - returns the sum of the ascii values of the initials
 */
const transformInitialsIntoAscii = (initials) => {
	let asciifirstLetter = initials.charCodeAt(0);
	let asciisecondLetter = initials.charCodeAt(1);
	let asciiSum = asciifirstLetter + asciisecondLetter;
	return asciiSum;
};

/**
 * Sets the color of the badge of user initials
 */
const setColorBadge = () => {
	let colorIndex = calculateColorIndex();
	getColor(colorIndex);
};

/**
 * Calculates the color index of the user badge
 * @returns {number} - returns a number between 0 and 11
 */
const calculateColorIndex = () => {
	let colorIndex = transformInitialsIntoAscii(initials) % colorForBadges.length;
	return colorIndex;
};

/**
 * Sets the color of the badge of user initials
 * @param {string} colorIndex
 */
const getColor = (colorIndex) => {
	color = colorForBadges[colorIndex];
};

/**
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {object} - returns an object with the user's name, email, password and phone number
 */
const userObject = (name, email, password = '', initials, color, phone = 'N/A') => {
	return {
		name: name,
		email: email,
		password: password,
		phone: phone,
		initials: initials,
		color: color,
	};
};

/**
 * @param {string} email
 * @returns {boolean} - returns true if the email is already in the database, else returns false
 */
const noDuplicateEmail = (email) => {
	if (allUsers.length == 0) return true;
	const noDuplicateEmail = allUsers.findIndex((user) => user.email === email);
	if (noDuplicateEmail === -1) return true;
	return false;
};

//placeholder in email input field "Email is not available"
const checkMessageEmailNotAvailable = (email) => {
	if (!noDuplicateEmail(email)) {
		const emailInput = document.getElementById('email');
		emailInput.value = '';
		emailInput.placeholder = 'Email is not available';
		emailInput.style.border = '1px solid red';
		emailInput.style.color = 'red';
	}
};

/**
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {object} - adds a new user to the database
 */
const checkAddNewUser = async (name, email, password, initials, color, phone = 'N/A') => {
	if (!noDuplicateEmail(email)) return;
	allUsers.push(userObject(name, email, password, initials, color, phone));
	await save();
	if (password !== '' || inContactsAddTask == true) return;
	checkLogInUser(email, password); //log in user after successful sign up
};
