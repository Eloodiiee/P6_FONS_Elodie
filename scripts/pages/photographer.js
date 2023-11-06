import { photographerPage } from "../factories/photographersFactory.js"; // Importation de la factory pour l'affichage des infos du photographe
import { displayMedia } from "../factories/photographersFactory.js"; // Importation de la factory pour l'affichage des medias
import { contactForm } from "../utils/formularRegister.js"; // Importation de l'utils pour le fonctionnement du formulaire
import { contactName } from "../utils/formularRegister.js"; // Importation de l'utils pour le nom du photographe sur le formulaire**

// Je crée une classe qui va fetch les photographes en ne gardant que le photographe selectionné
class thePhotographer { 
    constructor() {
        this.data = []; // initialisation du this.data grace au constructor
        this.photographer = null; //Initialisation du this.photographer grace au constructor
        this.dataMedia = [] ; // Initialisation du this.dataMedia grace au constructor
        this.media = []; // Initialisation du this.media grace au constructor
        this.likes = 0; //  Initialisation du this.likes grace au constructor
        this.eInit(); // Initialisation du this.enit grace au constructor
        this.index = 0;
    }
    eInit() { // Function d'initialisation du fonctionnement du formulaire
        const formModal = document.getElementById("modalRegistering") // Je sélectionne le h2 contactez-moi 
        formModal.addEventListener("click", (e) => { // au click du h2 
          e.preventDefault(); 
          contactForm(this); // Exécute la function contactForm sur le formulaire
        });
    }

    //Fonction asynchrone de fetch et de tri des photographes
    async getPhotographer() {
        const currentUrl = (new URL(document.location)).searchParams ; // Permet de récupérer les informations dans l'URL
        const _id = currentUrl.get('id'); // Récupération de l'ID dans l'URL
        console.log("Photographer ID : ", _id); // Affichage de l'ID grâce a l'URL
        const response = await fetch("./data/photographers.json")  ////////////////////////////////////////////////////
        const res = await response.json(); 
        this.data = res.photographers; // Séparation du JSON pour ne garder que les photographes
        console.log("Photographers Array : ", this.data); // Affichage du photographes
        this.dataMedia = res.media; // Séparation du JSON pour ne garder que les medias
        console.log("Medias Array : ", this.dataMedia); // Affichage de tout les medias
        

        this.data.forEach((photographerData) => { // Boucle forEach qui permet de naviguer dans l'array des photographes
            if(photographerData.id == _id){ // Vérifications du photographe grâce à son ID
                photographerInfos.photographer = photographerData; //Récupération du photographe recherché
                console.log("Photographer's Data : ", photographerData); // Affichage du photographe de la page actuelle 
                this.dataMedia.forEach((media) => { //  Boucle forEach qui permet de naviguer dans l'array des medias du photographe
                    if(media.photographerId == _id){ // Vérifications des medias grâce à l'ID du photographe
                        this.media.push(media);// J'ajoute le contenu des medias dans this.media
                        this.likes += media.likes; // Somme de tout les likes du photographe
                    }
                });
                console.log("Photographer's Medias : ", this.media);// Affichage des medias en log
                console.log("Photographer's total likes : ", this.likes); // Affichage de la somme des likes
                
            }
        }) 
        photographerInfos.headerData(); // Appel de la fonction headerData() à partir des infos du photographe
        photographerInfos.sortMedia(); // Appel de la fonction sortMedia() pour trier les medias
        photographerInfos.mainFunctions(); // Appel de la fonction mainFunctions() pour l'affichage du reste de la page
        photographerInfos.contactName();// Appel de la function contactName pour l'affichage du nom du photographe sur le formulaire**
    }   
}
//J'instencie le photographe dans la classe "thePhotographer"
const photographerInfos = new thePhotographer();
photographerInfos.getPhotographer(); // Appel de la fonction getPhotographer pour récuperer le photographe

photographerInfos.headerData = function (){// Function d'affichage du data du photographe
    photographerPage(this.photographer)   // Appel de la factory pour l'affichage des data du photographe
}
photographerInfos.mainFunctions = function () { // Function d'affichage principale qui permet d'appeler plusieurs function à la fois
    photographerInfos.displayMedia(); // Function d'affichage des medias
    photographerInfos.bottomRightContainer(); //  Function d'affichage du container en bas à droite des likes
    photographerInfos.updateLikes(); // Function de mise à jour des likes
    photographerInfos.lightbox();
}

photographerInfos.bottomRightContainer = function () { // Function de l'affichage du container fixé dans le coin de page en bas à droite
    const mainSection = document.getElementById("main"); // Je sélectionne le main de la page du photographe
    const bottomRightContainer = document.createElement("div"); // Je crée une DIV 
    bottomRightContainer.classList.add("bottomRightContainer"); // J'ajoute la classe bottomRightContainer à la DIV

    const likesSpan = document.createElement("span"); // Je crée un span  pour les likes totaux en bas de la page
    likesSpan.classList.add("likes"); // J'ajoute la classe likes
    const likesSpanValue =  document.createElement("span"); // Je crée un span  pour la valeur des likes totaux en bas de la page
    likesSpanValue.classList.add("likesSpanValue");// J'ajoute la classe "likesSpanValue"
    likesSpanValue.innerHTML = `${this.likes} `; // J'assigne le texte des likes 
    const likesHeart = document.createElement("i");// Je crée un élément "i"
    likesHeart.classList.add("fa-solid")// J'ajoute la classe "fa-solid"
    likesHeart.classList.add("fa-heart")// J'ajoute la classe "fa-heart"
    const pricePerDaySpan = document.createElement("span"); // Je crée un span pour le prix par jour en bas de la page
    pricePerDaySpan.classList.add("priceDay"); // J'ajoute la classe priceDay
    pricePerDaySpan.innerHTML = `${this.photographer.price}$ / jour`; // J'assigne le texte du prix du photographe

    likesSpan.appendChild(likesSpanValue); // J'assigne le parent de likesSpan a likesSpanValue
    likesSpan.appendChild(likesHeart) // J'assigne le parent de likesSpan a likesHeart
    bottomRightContainer.appendChild(likesSpan); // J'assigne le parent du span des likes au container du bas de page
    bottomRightContainer.appendChild(pricePerDaySpan); // J'assigne le parent du prix par jour au container du bas de page

    mainSection.appendChild(bottomRightContainer) // J'assigne le parent du container du bas de page au main 
}
photographerInfos.sortMedia = function () { // function de tri des medias par filtre
    const mediaContainer = document.getElementById("mediaContainer"); // Je selectionne le container des media
    this.media.sort((a, b) => b.likes - a.likes) // Par défaut les medias sont rangés par popularité
    const selectedBox = document.querySelector(".selectedBox"); //Je selectionne le texte dans le container filtre
    const chevronCursor = document.querySelector(".fa-chevron-down"); // Je selectionne le cheveron a coté du texte
    const filters = document.querySelector(".filters"); // Je selectionne la liste des filtres 
    const options = document.querySelectorAll(".filters li"); // Je selectionne les options de filtres
    const selected = document.querySelector(".selected"); // Je selectionne le filtre selectionné
    selectedBox.addEventListener("click", () =>{ // L'évenement au click sur le container des filtres
        chevronCursor.classList.toggle("chevron-rotate"); // Active l'animation de rotation du cheveron**
        filters.classList.toggle("filters-open"); // Ouvre le menu des filtres
    });
    options.forEach(option => { // Boucle forEach pour parcourir les options de filtre
        option.addEventListener("click", () => { // L'évenement au click sur l'un des filtres
            selected.innerText = option.innerText; // Remplace le texte du container de filtre par le nouveau filtre
            chevronCursor.classList.remove("chevron-rotate"); // Remet le cheveron dans sa position originale**
            filters.classList.remove("filters-open"); // Ferme le menu des filtres
            options.forEach(option => { // Boucle forEach qui permet de retirer la classe active du filtre qui était actif
                option.classList.remove("active");
            });
            option.classList.add("active"); // Ajoute la classe active au filtre selectionné
            console.log(selected.innerText); 
            if(selected.innerText == "Popularité"){ // Si le texte dans le container de filtre est "popularité", alors ça va les ranger comme par defaut via les likes
                this.media.sort((a, b) => b.likes - a.likes) // Function de tri avec les likes
            }
            if(selected.innerText == "Date"){ // Si c'est sur la date alors ça va les ranger via les dates
                this.media.sort((a, b) => new Date(b.date) - new Date(a.date)) // Function de tri avec les dates
            }
            if(selected.innerText == "Titre"){ // si c'est sur le titre alors ça va les ranger par titre
                this.media.sort((a, b) => a.title.localeCompare(b.title)) // Function de tri avec les titres
            }
            mediaContainer.innerHTML = ""; // Clean du mediacontainer
            photographerInfos.mainFunctions(); // Appel à nouveau des function d'affichage principales 
        });
    });
}
photographerInfos.displayMedia = function () { // Appel de la fonction displayMedia 
    displayMedia(this.media) // Appel de la fatory displayMedia
}
photographerInfos.updateLikes = function () { // Appel de la fonction updateLikes 
    const likeBtn = document.querySelectorAll(".likeBtn"); // Je selectionne les boutons des coeurs pour les likes
    const likeBottomRight = document.querySelector(".likesSpanValue"); // Je selectionne la valeur des likes totaux en bas a droite 
    const likeValue = document.getElementsByClassName("likeValue"); // Je selectionne la valeur des coeurs des medias 
    for(let i = 0; i < likeBtn.length; i++){ // J'assigne un chiffre selecteur pour les boutons like à l'aide de la boucle for
        likeBtn[i].addEventListener("click", () => { // J'assigne un événement au click du bouton like
            if(likeBtn[i].classList.contains("fa-regular") === true){ // Si le bouton like ne contient pas la classe liked, alors 
                likeBtn[i].classList.remove("fa-regular"); // je retire la classe "fa-regular"
                likeBtn[i].classList.add("fa-solid"); // j'ajoute la classe "fa-solid"
                this.media[i].likes++; // J'ajoute un like sur le media concerné
                this.likes++; // J'ajoute un like sur le total de like
                console.log("Liké ! ", this.media[i].likes); // console log pour montrer que ça a liké
            }
            else  if(likeBtn[i].classList.contains("fa-solid") === true){ // Si le bouton like  contient  la classe liked, alors
                likeBtn[i].classList.remove("fa-solid"); // je retire la classe "fa-solid"
                likeBtn[i].classList.add("fa-regular"); // j'ajoute la classe "fa-regular"
                this.media[i].likes--; // Je retire un like sur le media concerné
                this.likes--; // Je retire un like sur le total de like
                console.log("Like enlevé ! ", this.media[i].likes); // console log pour montrer que ça a enlevé le like
                
            }
            likeValue[i].innerHTML = `${this.media[i].likes} `; // J'affiche le like du media concerné
                likeBottomRight.innerHTML = `${this.likes} `; //  J'affiche le total des likes des medias en bas de la page
        })
    }
}
photographerInfos.contactName = function (){ // appel la function contactName que j'importe plus haut**
    contactName(this.photographer);
}
photographerInfos.lightbox = function (){
    const medias = document.querySelectorAll(".mediaBox");
    console.log(medias);
    this.index=0;
    const lightbox = document.querySelector("#lightbox");
    const closeBtn = document.querySelector("#closeBtn");
    const rightArrow = document.querySelector(".fa-chevron-right");
    const leftArrow = document.querySelector(".fa-chevron-left");
    const mediaContainerLightbox = document.querySelector(".mediaContainerLightbox");
    for (let i = 0; i < medias.length; i++) {
        const selectedMedia = medias[i].firstChild;
        selectedMedia.addEventListener("click", () =>{
            this.index=i;
            photographerInfos.displayLightbox(this.index);
        })
    }
    rightArrow.addEventListener("click", () => {
        this.index++
        if(this.index > medias.length-1){
            this.index--
            return
        }
        else{
            mediaContainerLightbox.removeChild(mediaContainerLightbox.firstChild);
            mediaContainerLightbox.removeChild(mediaContainerLightbox.lastChild);
            photographerInfos.displayLightbox(this.index)
        }
    })
    leftArrow.addEventListener("click", () => {
        this.index--
        if(this.index<0){
            this.index=0;
            return
        }
        else{
            mediaContainerLightbox.removeChild(mediaContainerLightbox.firstChild);
            mediaContainerLightbox.removeChild(mediaContainerLightbox.lastChild);
            photographerInfos.displayLightbox(this.index)
        } 
    })
    closeBtn.addEventListener("click", () =>{
        mediaContainerLightbox.removeChild(mediaContainerLightbox.firstChild);
        mediaContainerLightbox.removeChild(mediaContainerLightbox.lastChild);
        lightbox.classList.remove("active");
    })
}
photographerInfos.displayLightbox = function (index) {
    const medias = document.querySelectorAll(".mediaBox");
    const lightbox = document.querySelector("#lightbox");
    const mediaContainerLightbox = document.querySelector(".mediaContainerLightbox");
    lightbox.classList.add("active");
    let media = "";
    if(medias[index].firstChild.classList.contains("mediaImage")){
        media = medias[index].firstChild
        const img = document.createElement("img");
        img.src = media.src;
        let imgName = document.createElement("span");
        imgName.textContent = media.alt;
        mediaContainerLightbox.appendChild(img);
        mediaContainerLightbox.appendChild(imgName);
    }
    else if(medias[index].firstChild.classList.contains("mediaVideo")){
        media = medias[index].firstChild
        const video = document.createElement("video");
        let videoName = document.createElement("span");
        videoName.textContent = media.title;
        video.src = media.src;
        video.setAttribute("controls", true);
        mediaContainerLightbox.appendChild(video);
        mediaContainerLightbox.appendChild(videoName);
    }
}