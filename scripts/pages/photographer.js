
/*import { articlePhotographer } from '../factories/photographersFactory.js';*/

// Je crée une classe qui va fetch les photographes en ne gardant que le photographe selectionné
// Je dois encore gérer l'affichage sur la page "photographer.html"
class thePhotographer { 
    constructor() {
        this.data = []; // initialisation du this.data grace au constructor
    }


    //Fonction asynchrone de fetch et de tri des photographes
    async getPhotographer() {
        const currentUrl = (new URL(document.location)).searchParams ; // Permet de récupérer les informations dans l'URL
        const _id = currentUrl.get('id'); // Récupération de l'ID dans l'URL
        console.log(_id); // Affichage de l'ID grâce a l'URL
        const response = await fetch(`/data/photographers.json`)  
        const res = await response.json(); 
        this.data = res.photographers; // Séparation du JSON pour ne garder que les photographes
        let photographer = []; // Initialisation de l'Array qui va accueillir les données du photographe unique
        console.log(this.data); // Affichage de tout les photographes
        for (let i = 0; i < this.data.length; i++) { // Boucle for qui permet de naviguer dans l'Array des photographes
            if (this.data[i].id == _id) { // Vérification du photographe grâce à son ID
                photographer = this.data[i]; // Récupération du photographe recherché  
            }
        }
        console.log(photographer); // Affichage du photographe de la page actuelle 
    }   
}
//J'instencie le photographe dans la classe "thePhotographer"
const photographerInfos = new thePhotographer();
photographerInfos.getPhotographer(); // Appel de la fonction getPhotographer pour récuperer le photographe