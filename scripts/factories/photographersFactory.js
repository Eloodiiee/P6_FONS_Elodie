export function articlePhotographer(data) {                             // Fonction Factory qui s'exporte sur le "index.js"
    
    const { portrait, name, country, city, tagline, price, id } = data;  // Compilation des données dans un objet
    //const createElements créer les éléments du Html
    const article = document.createElement("article");
    const linkPhotos = document.createElement("a");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const nameContainer = document.createElement("h2");
    const placeContainer = document.createElement("h3");
    const taglineContainer = document.createElement("h4");
    const priceElement = document.createElement("span");
    const portraitUrl = `assets/photographers/${portrait}`; // J'ajoute l'URL du portrait de chaque photographes
    
    //Lien du phothographe basé sur l'ID
    linkPhotos.href = `photographer.html?id=${id}`;  //Je créer un lien href pour chaque photographes basé sur l'ID
    
    //classList / setAttribute // J'ajoute des classes et des attributes pour les container des portraits et img de portraits
    imgContainer.classList.add("imgContainer"); 
    img.classList.add("imgPortrait");
    img.setAttribute("id", country);
    img.setAttribute("src", portraitUrl);
    img.setAttribute("alt", " "/*`portrait of ${name}`*/); // Ajout du texte "portrait of {}" pour éviter la redondance (accessibilité) pour les lecteurs d'écrans

    //textContent // Contenu des cartes ajoutées grâce aux données récupérées
    nameContainer.textContent = name;
    placeContainer.textContent = `${city}, ${country}`;
    taglineContainer.textContent = tagline;
    priceElement.textContent = `${price}€/jour`;
    
    
    //appenChild // Assigne les Parentés
    imgContainer.appendChild(img);
    linkPhotos.appendChild(imgContainer);
    linkPhotos.appendChild(nameContainer);
    article.appendChild(linkPhotos);
    article.appendChild(placeContainer);
    article.appendChild(taglineContainer);
    article.appendChild(priceElement);
    return article; // Retourne l'article une fois qu'il est construit
  
}

export function photographerPage(data){

    const { portrait, name, country, city, tagline, price, id } = data; // Compilations des données dans un objet

    const headerPhotograph = document.querySelector(".photograph-header"); // Je selectionne le header 
    
    const headerInfo = document.querySelector(".photograph-header .infoContainer"); // Je sélectionne le container des informations du photographe

    const titlePhotograph = document.createElement("h1"); // Je crée un élément "h1"
    titlePhotograph.textContent = name; // Je renseigne le nom du photographe dans le "h1"

    const locationPhotograph = document.createElement("h2"); // Je crée un élément "h2"
    locationPhotograph.textContent = `${city}, ${country}`;  // J'assigne le texte de la ville et du pays du photographe

    const taglinePhotograph = document.createElement("span");  // Je crée un élément span
    taglinePhotograph.textContent = tagline; // J'assigne le texte de la tagline au span

    headerInfo.appendChild(titlePhotograph);  // J'assigne le parent du titre au container des infos du photographe
    headerInfo.appendChild(locationPhotograph); // J'assigne le parent du localisation au container des infos du photographe
    headerInfo.appendChild(taglinePhotograph); // J'assigne le parent du tagline au container des infos du photographe

    const headerPortrait = document.querySelector(".photograph-header .photoContainer"); // Je sélectionne le container du portrait du photographe

    const portraitPhotograph = `assets/photographers/${portrait}`; // J'assgine l'URL du portrait
    const imgPhotograph = document.createElement("img"); // Je crée un élément HTML img
    imgPhotograph.setAttribute("src", portraitPhotograph); // J'ajoute en source l'URL du portrait
    imgPhotograph.setAttribute("alt", " " /*`portrait of ${this.photographer.name}`*/); // Ajout du texte alternatif pour le portrait (accessibilité)

    headerPortrait.appendChild(imgPhotograph); // J'assigne le parent de l'image du photographe au container de la photo
    return headerPhotograph // Retourne le header une fois qu'il est construit
}