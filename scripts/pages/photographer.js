
// Je crée une classe qui va fetch les photographes en ne gardant que le photographe selectionné
class thePhotographer { 
    constructor() {
        this.data = []; // initialisation du this.data grace au constructor
        this.photographer = null; //Initialisation du this.photographer grace au constructor
    }


    //Fonction asynchrone de fetch et de tri des photographes
    async getPhotographer() {
        const currentUrl = (new URL(document.location)).searchParams ; // Permet de récupérer les informations dans l'URL
        const _id = currentUrl.get('id'); // Récupération de l'ID dans l'URL
        console.log(_id); // Affichage de l'ID grâce a l'URL
        const response = await fetch(`/data/photographers.json`)  
        const res = await response.json(); 
        this.data = res.photographers; // Séparation du JSON pour ne garder que les photographes
        console.log(this.data); // Affichage de tout les photographes
        this.data.forEach((photographerData) => { // Boucle forEach qui permet de naviguer dans l'array des photographes
            if(photographerData.id == _id){ // Vérifications du photographe grâce à son ID
                photographerInfos.photographer = photographerData; //Récupération du photographe recherché
                console.log(photographerData); // Affichage du photographe de la page actuelle 
            }

        }) 
        photographerInfos.headerData(); // Appel de la fonction headerData() à partir des infos du photographe
    }   
}
//J'instencie le photographe dans la classe "thePhotographer"
const photographerInfos = new thePhotographer();
photographerInfos.getPhotographer(); // Appel de la fonction getPhotographer pour récuperer le photographe

photographerInfos.headerData = function (){// Function d'affichage du data du photographe
    
    const headerInfo = document.querySelector(".photograph-header .infoContainer"); // Je sélectionne le container des informations du photographe

    const titlePhotograph = document.createElement("h1"); // Je crée un élément "h1"
    titlePhotograph.textContent = this.photographer.name; // Je renseigne le nom du photographe dans le "h1"
    console.log(titlePhotograph);

    const locationPhotograph = document.createElement("h2"); // Je crée un élément "h2"
    locationPhotograph.textContent = `${this.photographer.city}, ${this.photographer.country}`;  // J'assigne le texte de la ville et du pays du photographe

    const tagline = document.createElement("span");  // Je crée un élément span
    tagline.textContent = this.photographer.tagline; // J'assigne le texte de la tagline au span
    console.log(tagline);

    headerInfo.appendChild(titlePhotograph);  // J'assigne le parent du titre au container des infos du photographe
    headerInfo.appendChild(locationPhotograph); // J'assigne le parent du localisation au container des infos du photographe
    headerInfo.appendChild(tagline); // J'assigne le parent du tagline au container des infos du photographe

    const headerPortrait = document.querySelector(".photograph-header .photoContainer"); // Je sélectionne le container du portrait du photographe

    const portraitPhotograph = `assets/photographers/${this.photographer.portrait}`; // J'assgine l'URL du portrait
    const imgPhotograph = document.createElement("img"); // Je crée un élément HTML img
    imgPhotograph.setAttribute("src", portraitPhotograph); // J'ajoute en source l'URL du portrait
    imgPhotograph.setAttribute("alt",  `portrait of ${this.photographer.name}`); // Ajout du texte alternatif pour le portrait (accessibilité)

    headerPortrait.appendChild(imgPhotograph); // J'assigne le parent de l'image du photographe au container de la photo


   
}