import { articlePhotographer } from '../factories/photographersFactory.js';

class photographers {
    constructor() {
        this.data = [];
    }
 
    async getPhotographers() {
        const response = await fetch("/data/photographers.json");
        const res = await response.json();
        this.data = res.photographers;
        console.log(this.data);
        this.displayData();
       
    }
 
    displayData() {
        const photographers = this.data;
        const photographersSection = document.querySelector(".photographer_section");
 
        photographers.forEach((photographer) => {
            const photographerModel = articlePhotographer(photographer);
            photographersSection.appendChild(photographerModel);
        });
    }
}
 
const photographersInfo = new photographers();
photographersInfo.getPhotographers();
