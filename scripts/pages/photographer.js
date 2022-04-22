//Mettre le code JavaScript lié à la page photographer.html


//function photographerImages(data) {
//    const { title, image, likes, date, price, name } = data;
//
//    const picture = `medias/${name}/${image}`;
//        function getUserPhotographerImage() {
//        const article = document.createElement( 'article' );
//        const img = document.createElement( 'img' );
//        img.setAttribute("src", picture)
//        article.innerHTML = `
//       <img class="photographer_work__picture"
//       src="medias/${name}/${image}"
//       alt="${name}'s thumbnail picture" />
//      <h2 id ="personalPage"class="image__title">${title}</h2>
//      <span class="image__likes">${likes}</span>
//      <span class="images__heart"><3></span>`
//     
//        return (article);
//    }
//    return { title, image, likes, date, price, name,  photographerImages }   
//    
//}


function photographerPageHeader(){
    const { name, portrait, tagline, city, country,  } = data;

    const picture = `medias/${portrait}`;
    
    function getPhotographerHeader() {

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const main = document.getElementsByClassName("photograph-header").innerHTML = `
        <img class="photographer_thumbnail__picture"
       src="medias/${portrait}"
       alt="${name}'s thumbnail picture" />
      <h2 id ="personalPage"class="photographer_name">${name}</h2>
      <h3 class="photographer_location">${city}, ${country}</h3>
      <p class="photographer_desc">${tagline}</p>
  
        `
      return (main);
    }

    return { name, picture, tagline, city, country,  getPhotographerHeader }
}