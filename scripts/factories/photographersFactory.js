export function articlePhotographer(data) {
    
    const { portrait, name, country, city, tagline, price, id } = data;
    //const createElements
    const article = document.createElement("article");
    const linkPhotos = document.createElement("a");
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const nameContainer = document.createElement("h2");
    const placeContainer = document.createElement("h3");
    const taglineContainer = document.createElement("h4");
    const priceElement = document.createElement("span");
    const portraitUrl = `assets/photographers/${portrait}`;
    
    //URL portrait
    linkPhotos.href = `photographer.html?id=${id}`;
    
    //classList / setAttribute
    imgContainer.classList.add("imgContainer");
    img.classList.add("imgPortrait");
    img.setAttribute("src", portraitUrl);
    img.setAttribute("alt", name);

    //textContent
    nameContainer.textContent = name;
    placeContainer.textContent = `${city}, ${country}`;
    taglineContainer.textContent = tagline;
    priceElement.textContent = `${price}€/jour`;
    
    
    //appenChild
    imgContainer.appendChild(img);
    linkPhotos.appendChild(imgContainer);
    linkPhotos.appendChild(nameContainer);
    article.appendChild(linkPhotos);
    article.appendChild(placeContainer);
    article.appendChild(taglineContainer);
    article.appendChild(priceElement);
    return article;
  
}