function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
/** keyboardHandler permet de fermer le formmulaire à l'appui de la touche echap (accessibilité) **/
const keyboardHandler = (e) => {
    const modal = document.getElementById("contact_modal");
    if (e.key=== "Escape"){
        modal.style.display = "none";
    }
}
document.addEventListener("keydown", keyboardHandler);