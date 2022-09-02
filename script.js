const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready =false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
initalLoad =true;

// // Unsplash API
const count = 5;
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API

function imageLoaded(){
  imagesLoaded++;
  if(imagesLoaded === totalImages){
    ready =true;
    loader.hidden =true;
    count =30;
    
  }
}

 // Helper Function to set attribute on DOM Elements

function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

 //Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded=0;
  totalImages = photosArray.length;

  
  // Run forEach method in photosArray
  photosArray.forEach((photo) => {
    // Create anchor element to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
      });
        // Create Img for photo
    const image = document.createElement("img");
    setAttributes(image, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });
      // Event Listener, check when each is finished loading
      image.addEventListener('load',imageLoaded)

     // put <img> inside <a> , then put both inside imageContainer Element
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch error
    
  }
}

// Check to see if scrolling near bottom of page, Load more photos

window.addEventListener('scroll', ()=>{
  if(window.innerHeight +window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready =false;
    getPhotos();
  
  }
});

// // On Load

getPhotos();
