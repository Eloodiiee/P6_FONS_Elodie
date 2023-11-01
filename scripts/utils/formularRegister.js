export function contactName(data){
  const {name} = data;
  const photographerNameHeader = document.getElementById("photographerName");
  photographerNameHeader.innerHTML = `${name}`;
}
export function contactForm() { // J'exporte la fonction contactForm
    //Elements du formulaire

    const firstNameInput = document.getElementById("first"); //Prénom
    const lastNameInput = document.getElementById("last"); //Nom
    const emailInput = document.getElementById("email"); //Email
    const messageInput = document.getElementById("message"); // Message 
    const contactButton = document.getElementById("contactForm"); //Bouton de validation du formulaire
    const regexNames = /^[A-Za-zÀ-ÖØ-öø-ÿ]+((\s)?((\'|\-|\.)?([A-Za-zÀ-ÖØ-öø-ÿ])+))*$/ // Regex du nom et du prenom
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ // Regex de l'email

    console.log("Enregistrement des données");

    //Variables booléennes pour savoir si les champs sont bien remplis 

    let firstChecked = false; 
    let lastChecked = false;
    let emailChecked = false;
    let messageChecked = false;

    //Messages d'erreurs du formulaire
    let firstNameErrorMess = document.getElementById('firstNameErrorMsg');
    let lastNameErrorMess = document.getElementById('lastNameErrorMsg');
    let emailErrorMess = document.getElementById('emailErrorMsg');
    let messageErrorMsg = document.getElementById('messageErrorMsg');
  
  
    //Ajout d'un événement pour chaque champ du formulaire en fonction de s'il est bien rempli ou non 
    firstNameInput.addEventListener("input", (e) => {
      e.preventDefault();
      const firstNameT = firstNameInput.value;
      let fnameChecked = regexNames.test(firstNameT);
      if (fnameChecked == true && firstNameT.length >= 2) {
        firstNameErrorMess.textContent = ("");
        firstNameInput.style.border = "thick solid green";  // Ajoute une bordure verte si c'est vrai
        firstChecked = true;
      }
      else {
        firstNameErrorMess.style.color = "red";
        firstNameErrorMess.style.fontSize ="0.6em"
        firstNameErrorMess.textContent = (`Le champ "Prénom" renseigné n'est pas valide !`);
        firstNameInput.style.border = "thick solid red"; // Ajoute une bordure rouge si c'est faux
        firstChecked = false; 
      };
    });
    lastNameInput.addEventListener("input", (e) => {
      e.preventDefault();
      const lastNameT = lastNameInput.value;
      let lnameChecked = regexNames.test(lastNameT);
      if (lnameChecked == true && lastNameT.length >= 2) {
        lastNameErrorMess.textContent = ("");
        lastNameInput.style.border = "thick solid green";
        lastChecked = true;
      }
      else {
        lastNameErrorMess.style.color = "red";
        lastNameErrorMess.style.fontSize ="0.6em"
        lastNameErrorMess.textContent = (`Le champ "Nom" renseigné n'est pas valide !`);
        lastNameInput.style.border = "thick solid red";
        lastChecked = false; 
      };
    });
    emailInput.addEventListener("input", (e) => {
      e.preventDefault();
      const emailT = emailInput.value;
      let emailCheck = regexEmail.test(emailT)
      if(emailCheck) { 
        emailErrorMess.textContent = ("");
        emailInput.style.border = "thick solid green";
        emailChecked = true;
      }
      else {
        emailErrorMess.style.color = "red";
        emailErrorMess.style.fontSize = "0.6em";
        emailErrorMess.textContent = (`Le champ "Email" renseigné n'est pas valide !`);
        emailInput.style.border = "thick solid red";
        emailChecked = false; 
      };
    });
    messageInput.addEventListener("input", (e) => {
      e.preventDefault();
      const messageT = messageInput.value;
      if (messageT.length >= 10) {
        messageErrorMsg.textContent = ("");
        messageInput.style.border = "thick solid green";
        messageChecked = true;
      }
      else {
        messageErrorMsg.style.color = "red";
        messageErrorMsg.style.fontSize ="0.6em"
        messageErrorMsg.textContent = (`Le message doit contenir au moins 10 caractères !`);
        messageInput.style.border = "thick solid red";
        messageChecked = false; 
      };
    });
  //A l'appuie du bouton "envoyer", actionne la fonction validate
  contactButton.addEventListener("submit", (e) => {
    e.preventDefault();
    //Si tout les champs sont correctemment remplis, le formulaire s'enregistre et passe au modal suivant
    if (firstChecked == true && lastChecked == true && emailChecked == true && messageChecked == true){
      //Enregistrement des donnés du formulaire
      const submit = {
        contact: {
          firstName: firstNameInput.value,
          lastName: lastNameInput.value,
          email: emailInput.value,
          message: messageInput.value
        }
      }
      console.log(JSON.parse(JSON.stringify(submit))); //Données récupérées
    }
    else {
        return
    }
    contactButton.reset();
    firstNameInput.style.border = "none";
    lastNameInput.style.border = "none";
    emailInput.style.border = "none";
    messageInput.style.border = "none";
  });
}
