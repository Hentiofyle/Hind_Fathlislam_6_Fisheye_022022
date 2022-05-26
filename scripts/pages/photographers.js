/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */

// ici j'import les fonction display et close modal du fichier contact form js
import { displayModal, closeModal } from '../utils/contactForm.js';
// j'import egalement la Media factory faite des dexu classes medias et video
import MediaFactory from '../factories/medias.js';
import Lightbox from '../utils/lightbox.js';

// Ici je fetch les information des photographes
async function fetchPhotographers() {
  return fetch('./data/photographers.json')
    .then((result) => {
      if (result.ok) {
        return result.json();
      }
    });
}

const getPhotographerData = async (UserId) => {
  const data = await fetchPhotographers(); // recup la function fetch pour avoir les data
  const selectedPhotographer = data.photographers.filter((photographer) => photographer.id === UserId)[0];
  // filter les donnée selon la data "photographerId" qui trie les images selon l'id du photographe
  return selectedPhotographer;
  // je return le resultat du filtrage
};

async function photographerHeader(photographer) {
  // function qui permet de crée le header du photographe, avec les infos perso
  const photographerheaderSection = document.querySelector('.photographer-header');
  const photographerHeaderContent = document.createElement('div');
  photographerHeaderContent.className = 'photographer__header__content';
  photographerHeaderContent.innerHTML = `
  <div class="photographer__info"> 
    <h1 class="photographer__h1"  tabindex="2"  aria-label="${photographer.name}">${photographer.name}</h1>
    <p class="photographer__local"   tabindex="3" aria-label="localisation du photographe">${photographer.city}, ${photographer.country}</p>
    <p class="photographer__tagline"  tabindex="4"  aria-label="slogan du photographe">${photographer.tagline}</p>
  </div>
  <button class="contact_button" aria-label="formulaire de contact" tabindex="5">Contactez-moi</button>
  <img class="photographer__portrait" src="Sample_Photos/Photographers_ID_Photos/${photographer.portrait}"  tabindex="6" alt="portrait de ${photographer.name}" aria-label="portrait de ${photographer.name}"> `;

  photographerheaderSection.appendChild(photographerHeaderContent);
}

//   Fetch data + filtre images selon photographerID     //

// ici je reutilise la function fetch pour ensuite récuprer que les images selon le photographerID et le display dans la page du photograph en question

const getMediaData = async (photographerMediaId) => {
  const data = await fetchPhotographers();
  const selectedMediaFilter = data.media.filter((media) => media.photographerId === photographerMediaId);
  return selectedMediaFilter;
};

//      LIKES          //

// function qui donne la somme des likes de chaque media et l'affiche dans le footer

function totalLikes(medias) {
  const totalLikesDom = document.querySelector('.footer__total_likes');
  const totalLikesArray = [];

  for (const media of medias) {
    totalLikesArray.push(media.getLike());

    // ici on push dans l'array vide les info recuperer par media.getlikes qui est une function qui recupere les données dans le json
    // plus particulierement l'object "likes"

    const sum = totalLikesArray.reduce((partialSum, a) => partialSum + a);
    // sum est une variable qui a pour valeur la valeur de this.likes + la valeur de "a" qui est dec() ou inc()
    totalLikesDom.innerHTML = `${sum}`;
  }
}

//  ===========================           PORTFOLIO          ========================= //

async function photographerPortfolio(medias) {
  // ici on loop a travers tous les medias et on retourne et affiche la function render()
  // ( voir media.js) qui est la function crée dans les class Video ou Media et qui structure l'affichage des medias
  for (const media of medias) {
    media.render();
  }

  // on appel la function totalLikes qui prend comme parametre media
  totalLikes(medias);

  const dataLikes = document.querySelectorAll('.photographer__portfolio--media--info--like');

  dataLikes.forEach((dataLike, index) => {
    const likesQuantity = dataLike.querySelector('.photographer__portfolio--media--info--like--count');
    const likeHeart = dataLike.querySelector('#like__heart');
    // function qui reduit ou augmente au click la valeur de likesQuantity
    const likeAction = () => {
      medias[index].isLiked = !medias[index].isLiked;

      if (medias[index].isLiked) {
        medias[index].inc();
        likeHeart.classList.remove('far');
        likeHeart.classList.add('fas');
        totalLikes(medias);
      } else {
        medias[index].dec();
        likeHeart.classList.remove('fas');
        likeHeart.classList.add('far');
        totalLikes(medias);
      }

      likesQuantity.textContent = medias[index].getLike();
    };
    dataLike.addEventListener('click', likeAction);
    dataLike.addEventListener('enter', likeAction);
  });
}

async function photographerFooter(photographer) {
  document.querySelector('.footer__price').innerHTML = `${photographer.price}/jours`;
}

//  ===========================           TRI         ========================= //

const photographerId = Number(new URLSearchParams(window.location.search).get('id'));
// pour avoir un certain query d'un URL

const selectedPhotographer = await getPhotographerData(photographerId);

let selectedMedia = await getMediaData(photographerId);
// ici j'ai crée une variable qui va prendre les mediadData du photographID et map over et c'est avec ces data qu'on va pouvoir faire les tries
selectedMedia = selectedMedia.map((data) => {
  const mediaFactory = new MediaFactory();
  // console.log(mediaFactory);
  // return data;
  return mediaFactory.createMedia(data);
});

// concretement, on a deux paramettre le media a et le media  b, si la date du media b est inf donc plus ancienne que la date du media a
// alors il est en position -1 donc apres le media a sinon il est en position 1
// meme sys pour les autres critère de trie
function mediaSortDate() {
// trie par date
  selectedMedia.sort((a, b) => (b.date < a.date ? -1 : 1));
}

function mediaSortpopularity() {
// trie par nombre de likes
  selectedMedia.sort((a, b) => (b.likes < a.likes ? -1 : 1));
}

function mediaSortTitle() {
// trie par ordre alphabetique du titre
  selectedMedia.sort((a, b) => (b.title < a.title ? 1 : -1));
}

photographerHeader(selectedPhotographer);
// on invoque la function avec le paramettre du selected photographer

photographerPortfolio(selectedMedia);
// on invoque la function avec le paramettre de ses medias

// ======== BTN TRIE MEDIA ====== //

document.querySelector('.photographer__selectOption').addEventListener('change', (e) => {
// switch qui invoque la bonne function selon le choix de l'utilisateur dans le trie
  switch (e.target.value) {
    case 'date':
      mediaSortDate();
      break;
    case 'popularité':
      mediaSortpopularity();
      break;
    case 'titre':
      mediaSortTitle();
      break;
    default:
      mediaSortpopularity();
  }

  const photographerMediaSection = document.querySelector('.photographer__portfolio');
  photographerMediaSection.innerHTML = '';

  photographerPortfolio(selectedMedia);
  Lightbox.init();
});

photographerFooter(selectedPhotographer);
// call the lighbox class on the photographer selected page
Lightbox.init();

//  ===========================           CONTACT          ========================= //
document.querySelector('.contact_button')
  .addEventListener('click', () => {
    displayModal(selectedPhotographer.name);
  });

const closecross = document.querySelectorAll('.closeCross');

closecross.forEach((elem) => {
  elem.addEventListener('click', () => {
    closeModal();
  });
});
