
async function includeHTML() {
	let includeElements = document.querySelectorAll('[w3-include-html]');
	for (let i = 0; i < includeElements.length; i++) {        
		const element = includeElements[i];
	         file = element.getAttribute("w3-include-html"); // "includes/header.html"
		let resp = await fetch(file);
		if (resp.ok) {
			element.innerHTML = await resp.text();
	        } else {
	                    element.innerHTML = 'Page not found';
                    }
            }
}

async function init() {
	await includeHTML();
	await getVariables();
	await loadAssignableNames();
	await updateDashBoard();
	loadHeaderInitials();
}

function toggleHeaderModal(){
	const dialog = document.getElementById("header_modal_container");
    dialog.classList.toggle('visually-hidden');
    dialog.classList.toggle('d-flex');
    dialog.show();
}