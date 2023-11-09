export function contactName(data){ // J'exporte la function contactName**
  const {name} = data;//ensuite je recupere le nom du photographe**
  const photographerNameHeader = document.getElementById("photographerName"); //  je selectionne le H2 dans lequel le nom va etre affiché**
  photographerNameHeader.innerHTML = `${name}`; // J'affiche le nom dand le H2 **
}

export function contactForm() {

    //Elements du formulaire

    const firstNameInput = document.getElementById("first"); //Prénom
    const lastNameInput = document.getElementById("last"); //Nom
    const emailInput = document.getElementById("email"); //Email
    const messageInput = document.getElementById("message");
    const contactButton = document.getElementById("contactForm"); //Bouton de validation du formulaire
    const regexNames = /^[A-Za-zÀ-ÖØ-öø-ÿ]+((\s)?((\'|\-|\.)?([A-Za-zÀ-ÖØ-öø-ÿ])+))*$/
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const errorMsgFontSize = "1em";
    
    console.log("Enregistrement des données");

    //Messages d'erreurs du formulaire
    let firstNameErrorMess = document.getElementById('firstNameErrorMsg');
    let lastNameErrorMess = document.getElementById('lastNameErrorMsg');
    let emailErrorMess = document.getElementById('emailErrorMsg');
    let messageErrorMsg = document.getElementById('messageErrorMsg');
  
    // Functions de regex du formulaire
    contactForm.firstNameCheck = function (){ 
      const firstNameT = firstNameInput.value;
      let fnameChecked = regexNames.test(firstNameT);
      if (fnameChecked == true && firstNameT.length >= 2) {
        firstNameErrorMess.textContent = ("");
        firstNameInput.style.border = "thick solid green";  // Ajoute une bordure rouge si faux, si vrai c'est vert
        return true
      }
      else {
        firstNameErrorMess.style.color = "red";
        firstNameErrorMess.style.fontSize = errorMsgFontSize;
        firstNameErrorMess.textContent = (`Le champ "Prénom" renseigné n'est pas valide !`);
        firstNameInput.style.border = "thick solid red";
        return false
      };
    }

    contactForm.lastNameCheck = function (){
      const lastNameT = lastNameInput.value;
      let lnameChecked = regexNames.test(lastNameT);
      if (lnameChecked == true && lastNameT.length >= 2) {
        lastNameErrorMess.textContent = ("");
        lastNameInput.style.border = "thick solid green";
        return true
      }
      else {
        lastNameErrorMess.style.color = "red";
        lastNameErrorMess.style.fontSize = errorMsgFontSize;
        lastNameErrorMess.textContent = (`Le champ "Nom" renseigné n'est pas valide !`);
        lastNameInput.style.border = "thick solid red";
        return false
      };
    }
    
    contactForm.emailCheck = function (){
      const emailT = emailInput.value;
      let emailCheck = regexEmail.test(emailT)
      if(emailCheck) { 
        emailErrorMess.textContent = ("");
        emailInput.style.border = "thick solid green";
        return true
      }
      else {
        emailErrorMess.style.color = "red";
        emailErrorMess.style.fontSize = errorMsgFontSize;
        emailErrorMess.textContent = (`Le champ "Email" renseigné n'est pas valide !`);
        emailInput.style.border = "thick solid red";
        return false
      };
    }

    contactForm.messageCheck = function (){
      const messageT = messageInput.value;
      if (messageT.length >= 10) {
        messageErrorMsg.textContent = ("");
        messageInput.style.border = "thick solid green";
        return true
      }
      else {
        messageErrorMsg.style.color = "red";
        messageErrorMsg.style.fontSize = errorMsgFontSize;
        messageErrorMsg.textContent = (`Le message doit contenir au moins 10 caractères !`);
        messageInput.style.border = "thick solid red";
        return false
      };
    }
    //Ajout d'un événement pour chaque champ du formulaire en fonction de s'il est bien rempli ou non 
    firstNameInput.addEventListener("input", (e) => {
      e.preventDefault();
      contactForm.firstNameCheck();
    });
    lastNameInput.addEventListener("input", (e) => {
      e.preventDefault();
      contactForm.lastNameCheck();
    });
    emailInput.addEventListener("input", (e) => {
      e.preventDefault();
      contactForm.emailCheck();
    });
    messageInput.addEventListener("input", (e) => {
      e.preventDefault();
      contactForm.messageCheck();
    });
    // Function du reset du formulaire
    contactForm.resetFormular = function () {
      firstNameErrorMess.textContent = ("");
      lastNameErrorMess.textContent = ("");
      emailErrorMess.textContent = ("");
      messageErrorMsg.textContent = ("");
      firstNameInput.style.border = "none";
      lastNameInput.style.border = "none";
      emailInput.style.border = "none";
      messageInput.style.border = "none";
      contactButton.reset();
    }

   /* // A la fermeture du formulaire avec le bouton de fermeture, reset le formulaire    
    const closeModalBtn = document.querySelector("#closeModalBtn");
    closeModalBtn.addEventListener("click", () =>{
      contactForm.resetFormular();
    });*/
     //A l'appuie du bouton "envoyer", vérifie tout les champs et si tout est bon, enregistre les données, les affiche en console.log et reset le formulaire
     contactButton.addEventListener("submit", (e) => {
      e.preventDefault();

      //Execution des functions de regex à l'appui du bouton "envoyer"
      contactForm.firstNameCheck();
      contactForm.lastNameCheck();
      contactForm.emailCheck();
      contactForm.messageCheck();

      //Si tout les champs sont correctemment remplis, le formulaire s'enregistre et reset le formulaire
      if (contactForm.firstNameCheck() == true && contactForm.lastNameCheck() == true && contactForm.emailCheck() == true && contactForm.messageCheck() == true){
        
        //Enregistrement des données du formulaire
        const submit = {
          contact: {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            message: messageInput.value,
          }
        }
        console.log(JSON.parse(JSON.stringify(submit))); //Données récupérées
        //Reset du formulaire
        contactForm.resetFormular();
      }
      else {
          return // Interrompt l'enregistrement des données si les test regex retournent faux
      }
    });
}
