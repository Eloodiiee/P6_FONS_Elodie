/** J'exporte la factory avec les profils des photographes **/
export function articlePhotographer(data) {
    
  const { portrait, name, country, city, tagline, price, id } = data;  
  const article = document.createElement("article");
  const linkPhotos = document.createElement("a");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const nameContainer = document.createElement("h2");
  const placeContainer = document.createElement("h3");
  const taglineContainer = document.createElement("h4");
  const priceElement = document.createElement("span");
  const portraitUrl = `assets/photographers/${portrait}`;

  linkPhotos.href = `photographer.html?id=${id}`;
  
  imgContainer.classList.add("imgContainer"); 
  img.classList.add("imgPortrait");
  img.setAttribute("id", country);
  img.setAttribute("src", portraitUrl);
  img.setAttribute("alt", " ");

  nameContainer.textContent = name;
  placeContainer.textContent = `${city}, ${country}`;
  taglineContainer.textContent = tagline;
  priceElement.textContent = `${price}€/jour`;
  
  imgContainer.appendChild(img);
  linkPhotos.appendChild(imgContainer);
  linkPhotos.appendChild(nameContainer);
  article.appendChild(linkPhotos);
  article.appendChild(placeContainer);
  article.appendChild(taglineContainer);
  article.appendChild(priceElement);
  return article;
}
/** J'exporte la factory du bandeau du photographe **/
export function photographerPage(data){

  const { portrait, name, country, city, tagline } = data;

  const headerPhotograph = document.querySelector(".photograph-header");
  const headerInfo = document.querySelector(".photograph-header .infoContainer");

  const titlePhotograph = document.createElement("h1");
  titlePhotograph.textContent = name; 

  const locationPhotograph = document.createElement("h2");
  locationPhotograph.textContent = `${city}, ${country}`;

  const taglinePhotograph = document.createElement("span");
  taglinePhotograph.textContent = tagline;

  headerInfo.appendChild(titlePhotograph);
  headerInfo.appendChild(locationPhotograph);
  headerInfo.appendChild(taglinePhotograph);

  const headerPortrait = document.querySelector(".photograph-header .photoContainer");

  const portraitPhotograph = `assets/photographers/${portrait}`; 
  const imgPhotograph = document.createElement("img"); 
  imgPhotograph.setAttribute("src", portraitPhotograph); 
  imgPhotograph.setAttribute("alt", "");

  headerPortrait.appendChild(imgPhotograph); 
  return headerPhotograph
}
/** J'exporte la factory des medias du photographe **/
export function displayMedia(data, displayLightboxCallback) {
  const mediaContainer = document.getElementById("mediaContainer");
  mediaContainer.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const mediaBox = document.createElement("div");
    mediaBox.classList.add("mediaBox");
    
    let mediaElement;
    let mediaUrl;

    if (data[i].video) {
      mediaElement = document.createElement("video");
      mediaUrl = `assets/medias/${data[i].photographerId}/${data[i].video}`;
      mediaElement.setAttribute("title", data[i].title);
      mediaElement.classList.add("mediaVideo");
      //mediaElement.setAttribute("controls", "");
    } else {
      mediaElement = document.createElement("img");
      mediaUrl = `assets/medias/${data[i].photographerId}/${data[i].image}`;
      mediaElement.setAttribute("alt", "");
      mediaElement.classList.add("mediaImage");
    }

    mediaElement.setAttribute("src", mediaUrl);
    mediaElement.setAttribute("id", data[i].id);
    mediaElement.dataset.index = i;

    
    mediaElement.addEventListener("click", (e) => {
      displayLightboxCallback(parseInt(e.target.dataset.index));
    });

    const mediaSubBox = document.createElement("div");
    mediaSubBox.classList.add("mediaSubBox");

    const mediaTitle = document.createElement("span");
    mediaTitle.classList.add("mediaTitle");
    mediaTitle.innerHTML = data[i].title;

    const mediaLikes = document.createElement("span");
    mediaLikes.classList.add("mediaLikes");

    const mediaLikesValue = document.createElement("span");
    mediaLikesValue.classList.add("likeValue");
    mediaLikesValue.innerHTML = `${data[i].likes} `;

    const mediaLikesHeart = document.createElement("i");
    mediaLikesHeart.classList.add("fa-regular", "fa-heart", "likeBtn");

    mediaLikes.appendChild(mediaLikesValue);
    mediaLikes.appendChild(mediaLikesHeart);

    mediaSubBox.appendChild(mediaTitle);
    mediaSubBox.appendChild(mediaLikes);

    mediaBox.appendChild(mediaElement);
    mediaBox.appendChild(mediaSubBox);

    mediaContainer.appendChild(mediaBox);
  }
}