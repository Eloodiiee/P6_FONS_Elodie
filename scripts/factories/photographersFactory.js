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
    const portraitUrl = `assets/photographers/${portrait}`;         // J'ajoute l'URL du portrait de chaque photographes
    
    //Lien du phothographe basé sur l'ID
    linkPhotos.href = `photographer.html?id=${id}`; //Je créer un lien href pour chaque photographes basé sur l'ID
    
    //classList / setAttribute // J'ajoute des classes et des attributes pour les container des portraits et img de portraits
    imgContainer.classList.add("imgContainer"); 
    img.classList.add("imgPortrait");
    img.setAttribute("id", country);
    img.setAttribute("src", portraitUrl);
    img.setAttribute("alt", name);

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
