//J'importe la Factory

import { articlePhotographer } from '../factories/photographersFactory.js';

// Je crée une classe qui va fetch les photographes et les afficher sur la page d'accueil
class photographers {
    constructor() { // initialisation du this.data grace au consturctor
        this.data = [];
    } // mettre dans factory
 
    //Fonction asynchrone de fetch et appel de la fonction d'affichage des données
    async getPhotographers() {
        const response = await fetch("/data/photographers.json");
        const res = await response.json();
        this.data = res.photographers; // Séparation du JSON pour ne garder que les photographes
        console.log(this.data);
        this.displayData(); //appelle la fonction displaydata une fois que le fetch est fait
       
    }
 
    //Fonction d'affichage des photographes dans la class photographersSection
    displayData() {
        const photographers = this.data; // Assignation de la data des photographers
        const photographersSection = document.querySelector(".photographer_section"); // Appel de la DIV "photographer_section"
 
        // Affiche les données pour chaque photographes à la suite
        photographers.forEach((photographer) => {
            const photographerModel = articlePhotographer(photographer); // Appel le code de la Factory pour gérer l'affichage des données
            photographersSection.appendChild(photographerModel); // Placement des cartes dans la DIV
        });
    }
}
 // J'instancie chaque photographes dans la class
const photographersInfo = new photographers();
photographersInfo.getPhotographers(); // Appel de la fonction getPhotographers pour chaque photographes fetch
