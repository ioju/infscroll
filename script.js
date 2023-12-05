let imagesCounter = 5
const apiKey = '';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesCounter}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photos = []
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;

        //after first load = 5, load more
        imagesCounter = 30;
    }
}

//helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//create elements for links and photos and add that to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photos.length;

    photos.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        img.addEventListener('loaded', imageLoaded);


        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photos = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch error here
    }
}

//title
window.addEventListener('scroll', () => {
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
       && ready) {
       ready = false;
       getPhotos();
   }
});

//get photos
getPhotos();