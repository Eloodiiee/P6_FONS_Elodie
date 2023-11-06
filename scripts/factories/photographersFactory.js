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

  const { portrait, name, country, city, tagline } = data; // Compilations des données dans un objet

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

export function displayMedia(data) {

  for (let i = 0; i < data.length; i++) {
    const mediaContainer = document.getElementById("mediaContainer")// Je sélectionne le container des medias
    const mediaBox = document.createElement("div"); // Je crée une DIV
    mediaBox.classList.add("mediaBox"); // J'ajoute la classe mediaBox à la DIV
    const mediaImage = document.createElement("img");// Je crée un élément HTML img
    const mediaVideo = document.createElement("video") // Je crée un élément HTML video
    const mediaSubBox = document.createElement("div"); // Je crée une DIV
    mediaSubBox.classList.add("mediaSubBox") // J'ajoute la classe mediaSubBox
    const mediaTitle = document.createElement("span");  // Je crée le span de titre 
    mediaTitle.classList.add("mediaTitle");// J'ajoute la classe mediaTitle
    const mediaLikes = document.createElement("span");// Je crée le span de like
    mediaLikes.classList.add("mediaLikes");// J'ajoute la classe mediaLikes
    const mediaLikesValue = document.createElement("span");// Je crée le span pour le total de like de la photo
    mediaLikesValue.classList.add("likeValue");// J'ajoute une classe "likeValue"
    const mediaLikesHeart = document.createElement("i");// Je crée un élément "i"
    mediaLikesHeart.classList.add("fa-regular");// J'ajoute la classe "fa-regular"
    mediaLikesHeart.classList.add("fa-heart");// J'ajoute la classe "fa-heart"
    mediaLikesHeart.classList.add("likeBtn");// J'ajoute la classe "likeBtn" qui me permettra de selectionner les coeurs comme bouton
      if (data[i].video) { // je teste si le media est une video ou une image
      const mediaUrl = `assets/medias/${data[i].photographerId}/${data[i].video}`; // J'assigne l'URL a une const
      mediaVideo.setAttribute("src", mediaUrl); // J'assigne l'URL a la video
      mediaVideo.setAttribute("title", data[i].title);// J'assigne le titre 
      mediaVideo.setAttribute("id", data[i].id);// J'assigne l'ID
      mediaImage.classList.remove("mediaImage"); // J'enlève la classe mediaImage, pour éviter d'avoir les deux classes
      mediaVideo.classList.add("mediaVideo"); // J'ajoute la classe mediaVideo
      mediaBox.appendChild(mediaVideo); // J'assigne le parent de mediaBox sur mediaVideo
      }
      else {
        const mediaUrl = `assets/medias/${data[i].photographerId}/${data[i].image}`;// J'assigne l'URL a une const
        mediaImage.setAttribute("src", mediaUrl);// J'assigne l'URL a l'image
        mediaImage.setAttribute("alt", data[i].title);// J'assigne le alt
        mediaImage.setAttribute("id", data[i].id);// J'assigne l'ID
        mediaVideo.classList.remove("mediaVideo");;// J'enlève la classe mediaVideo, pour éviter d'avoir les deux classes
        mediaImage.classList.add("mediaImage");// J'ajoute la classe mediaImage
        mediaBox.appendChild(mediaImage);// J'assigne le parent de mediaBox sur mediaImage
    }
    mediaTitle.innerHTML = `${data[i].title}`;// Je rempli le contenu du titre
    mediaLikesValue.innerHTML = `${data[i].likes} `;// Je rempli le contenu de la valeur des likes
    mediaLikes.appendChild(mediaLikesValue);// J'assigne le parent de mediaLikes a mediaLikesValue
    mediaLikes.appendChild(mediaLikesHeart);// J'assigne le parent de mediaLikes a mediaLikesHeart
    mediaContainer.appendChild(mediaBox);;// J'assigne le parent de mediaContainer a mediaBox
    mediaBox.appendChild(mediaSubBox);// J'assigne le parent de mediaBox a mediaSubBox
    mediaSubBox.appendChild(mediaTitle);// J'assigne le parent de mediaSubBox a mediaTitle
    mediaSubBox.appendChild(mediaLikes);// J'assigne le parent de mediaSubBox a mediaLikes
  };
}