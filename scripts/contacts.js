let elements = [document.getElementById('close-new-contact-btn'), overlay];
const overlayDetails = document.getElementById('overlay-details');
let editContactId = null;
const alphabetObj = {};

/**
 * ´Adds alphabet arrays to alphabetObj
 */
for (let i = 65; i <= 90; i++) {
	const letter = String.fromCharCode(i);
	alphabetObj[letter] = [];
}

/**
 * Generates the HTML and for the contacts page
 */
const initContacts = async () => {
	await includeHTML();
	highlightSideMenuButton('contacts');
	await load();
	await loadLoginUserIndex();
	setMenuBadgeOfLoggedInUser();
	inContactsAddTask = true;
	/* setURL('https://christian-greenfield.developerakademie.net/smallest_backend_ever'); */
	sortUsers();
	renderContactListExistingContacts();
	if (window.innerWidth >= 801) showContact(logInUserIndex);
	addTaskMainSite = false;
	inContacts = true;
};

/**
 * Renders the contact list
 */
const renderContactListExistingContacts = () => {
	for (let letter in alphabetObj) {
		if (alphabetObj[letter].length > 0) {
			document.getElementById('contact-list').innerHTML += generateLettersStructureHTML(letter);
			appendContactsToLetter(letter);
		}
	}
};

/**
 * Appends/Sorts contacts to the letter
 * @param {string} letter
 */
const appendContactsToLetter = (letter) => {
	const contacts = alphabetObj[letter];
	document.getElementById(letter).innerHTML = '';
	for (let i = 0; i < contacts.length; i++) {
		const name = contacts[i].name;
		const color = contacts[i].color;
		const email = contacts[i].email;
		const id = contacts[i].id;
		const initials = contacts[i].initials;
		const contactHtml = generateContactInListHtml(i, id, color, initials, name, email);
		const letterElement = document.getElementById(letter);
		letterElement.innerHTML += contactHtml;
	}
};

/**
 * Sorts the users according to the first letter of their surname
 */
const sortUsers = () => {
	allUsers.forEach((user, i) => {
		let id = i;
		const firstLetter = user.initials[1].toUpperCase();
		user.id = id;
		alphabetObj[firstLetter].push(user);
	});
};

/**
 * Clears the alphabetObj
 */
const clearAlphabetObj = () => {
	for (let letter in alphabetObj) {
		alphabetObj[letter] = [];
	}
};

/* Show Contact on Display (left of contact list/popup) */

/**
 * Shows the contact on the display (right of contact list/ on popup)
 * @param {number} id
 */
const showContact = (id) => {
	const color = allUsers[id].color;
	const initials = allUsers[id].initials;
	const name = allUsers[id].name;
	const email = allUsers[id].email;
	const phone = allUsers[id].phone;
	renderContactOnDisplay(id, color, initials, name, email, phone);
	overlayDetails.style.display = 'block';
};

/**
 * Renders the contact on the display (right of contact list/ on popup)
 * @param {string} color
 * @param {string} initials
 * @param {string} name
 * @param {string} email
 * @param {number} phone
 */
const renderContactOnDisplay = (id, color, initials, name, email, phone) => {
	const contactOnDisplayHtml = generateContactOnDisplayHtml(id, color, initials, name, email, phone);
	document.getElementById('contact-on-display').innerHTML = contactOnDisplayHtml;
};

/* Add New Contact */
/* 
!Keine doppelten Funktionen 07.03.2023 ist schon in signup.js */

/*========================= 
Window Management Contacts 
==========================*/

/**
 * Shows the new contact window
 */
const showsNewContactWindow = () => {
	overlay.style.display = 'block';
};

/**
 * Shows the new contact window
 */
const openNewContactBtn = document.getElementById('open-new-contact-btn');
openNewContactBtn.addEventListener('click', showsNewContactWindow);

/**
 * Hides the new contact window
 */
const hidesNewContactWindow = () => {
	overlay.style.display = 'none';
};

const closeNewContactBtn = document.getElementById('close-new-contact-btn');
elements.forEach((e) => e.addEventListener('click', hidesNewContactWindow));

/**
 * Prevents the card from closing when clicking inside the card
 */
const newContactsCard = document.getElementById('new-contacts-card');
newContactsCard.addEventListener('click', (e) => e.stopPropagation());

const closeContactDetailsBtn = document.getElementById('back-to-contact-list');
closeContactDetailsBtn.addEventListener('click', () => {
	overlayDetails.style.display = 'none';
});

const closeContactDetailsOverlay = () => {
	overlayDetails.style.display = 'none';
};

overlayDetails.addEventListener('click', () => {
	overlayDetails.style.display = 'none';
});

const contactDetailsCard = document.getElementById('contact-details-card');
contactDetailsCard.addEventListener('click', (e) => e.stopPropagation());

/**
 * Closes the add task overlay and clears the required values
 */
const closeAddTaskInContacts = () => {
	document.getElementById('add-task-overlay').style.display = 'none';
	clearRequiredValues();
};

let addTaskOverlay = document.getElementById('add-task-overlay');

/**
 * Closes the add task overlay when clicking outside the card
 */
addTaskOverlay.addEventListener('click', (e) => {
	if (e.target.id === 'add-task-overlay') closeAddTaskInContacts();
});

/**
 * Checks if the add new contact form is valid
 * and adds the new contact to the contact list and allUser's array
 
!UNBEDINGT ÜBERARBEITEN SCHAUE BEI SIGN IN!!*/
const checkAddNewContactForm = () => {
	const { name, email, phone } = getInputValuesForNewContact();
	createInitials(name);
	setColorBadge();
	userObject(name, email, phone);
	/* noDuplicateEmail(email);
	checkMessageEmailNotAvailable(email); */

	if (!noDuplicateEmail(email)) {
		showFeedbackMessage('new-contact-email');
		return;
	}

	checkAddNewUser(name, email, (password = ''), initials, color, phone);
	clearAlphabetObj();
	clearContactList();
	sortUsers();
	renderContactListExistingContacts();
	showContactCreatedMessage();
	setTimeout(() => {
		hidesNewContactWindow();
	}, 2000);
};

/**
 * Gets the input values for the new contact
 * @returns {object} newContact
 */
const getInputValuesForNewContact = () => {
	const name = document.getElementById('name-new-contact').value;
	const email = document.getElementById('email-new-contact').value;
	const phone = document.getElementById('phone-new-contact').value;

	const newContact = {
		name: name,
		email: email,
		phone: phone,
	};
	return newContact;
};

/**
 * Shows and hides the message that the contact was created
 */
const showContactCreatedMessage = () => {
	let message = document.getElementById('contact-created-message');
	message.classList.add('show-contact-created-message');
	setTimeout(() => {
		message.classList.remove('show-contact-created-message');
	}, 2000);
};

/**
 *
 * @param {number} id
 * @param {object} event
 *
 */
const deleteContact = async (id, event) => {
	event.stopPropagation();
	if (id === 0) {
		alert('You can not delete the guest!');
		return;
	}
	if (id === logInUserIndex) window.location.href = 'index.html';
	clearContactList();
	deletion(id);
	clearAlphabetObj();
	sortUsers(id);
	renderContactListExistingContacts();
	await save();
	if (window.innerWidth < 801) overlayDetails.style.display = 'none';
};

/**
 * Deletes the contact from allusers jsona and sets logInUserIndex to the new index
 */
const deletion = (id) => {
	email = allUsers[logInUserIndex].email;
	allUsers.splice(id, 1);
	logInUserIndex = allUsers.findIndex((user) => user.email === email);
	saveLoginUserIndex();
};

/**
 * Clears the contact list
 */
const clearContactList = () => {
	document.getElementById('contact-on-display').innerHTML = '';
	document.getElementById('contact-list').innerHTML = '';
};

/* Edit Contact */

let editContactOverlay = document.getElementById('edit-contact-overlay');

/**
 * Closes the edit contact window when clicking outside the card
 */
editContactOverlay.addEventListener('click', (e) => {
	if (e.target.id === 'edit-contact-overlay') closeEditContact();
});

/**
 * Closes the edit contact window
 */
const closeEditContact = () => {
	document.getElementById('edit-contact-overlay').style.display = 'none';
};

/**
 * Sets the values of the contact to the input fields
 * and opens the edit contact window
 * @param {number} userId
 */
const openEditContact = (userId) => {
	document.getElementById('edit-contact-overlay').style.display = 'block';
	let name = document.getElementById('name-edit-contact');
	let email = document.getElementById('email-edit-contact');
	let phone = document.getElementById('phone-edit-contact');
	name.value = allUsers[userId].name;
	email.value = allUsers[userId].email;
	phone.value = allUsers[userId].phone;
	editContactId = userId;
};

/**
 * Saves the edited contact if the form is valid
 * @param {number} userId
 */
const checkEditContactForm = async (editContactId) => {
	const { name, email, phone } = getInputValuesForEditContact();
	let initials = createInitials(name);
	createInitials(name);
	setColorBadge();

	editContact(editContactId, name, email, phone, initials);
	await save();

	clearAlphabetObj();
	clearContactList();
	sortUsers();
	renderContactListExistingContacts();
	closeEditContact();
};

/**
 * Contacts gets edited with new values
 * @param {number} userId
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 * @param {string} initials
 */
const editContact = (userId, name, email, phone, initials) => {
	allUsers[userId].name = name;
	allUsers[userId].email = email;
	allUsers[userId].phone = phone;
	allUsers[userId].initials = initials;
};

/**
 * Gets the input values for the new contact and returns them
 * @returns {object} newContact
 */
const getInputValuesForEditContact = () => {
	const name = document.getElementById('name-edit-contact').value;
	const email = document.getElementById('email-edit-contact').value;
	const phone = document.getElementById('phone-edit-contact').value;

	const newContact = {
		name: name,
		email: email,
		phone: phone,
	};
	return newContact;
};
