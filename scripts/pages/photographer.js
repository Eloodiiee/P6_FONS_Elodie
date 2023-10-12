
/*import { articlePhotographer } from '../factories/photographersFactory.js';*/

// Je crée une classe qui va fetch les photographes en ne gardant que le photographe selectionné
// Je dois encore gérer l'affichage sur la page "photographer.html"
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

photographerInfos.headerData = function (){
    const headerInfo = document.querySelector(".photograph-header .infoContainer");

    const titlePhotograph = document.createElement("h1");
    titlePhotograph.textContent = this.photographer.name;
    console.log(titlePhotograph);

    const locationPhotograph = document.createElement("h2");
    locationPhotograph.textContent = `${this.photographer.city}, ${this.photographer.country}`;
    console.log(locationPhotograph);

    const tagline = document.createElement("span");
    tagline.textContent = this.photographer.tagline;
    console.log(tagline);

    headerInfo.appendChild(titlePhotograph);
    headerInfo.appendChild(locationPhotograph);
    headerInfo.appendChild(tagline);

    const headerPortrait = document.querySelector(".photograph-header .photoContainer");

    const portraitPhotograph = `assets/photographers/${this.photographer.portrait}`;
    const imgPhotograph = document.createElement("img");
    imgPhotograph.setAttribute("src", portraitPhotograph);
    imgPhotograph.setAttribute("alt",  `portrait of ${this.photographer.name}`);

    headerPortrait.appendChild(imgPhotograph);

}