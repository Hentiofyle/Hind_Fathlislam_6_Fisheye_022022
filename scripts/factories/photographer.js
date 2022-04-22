


function photographerFactory(data) {
    const { name, portrait, tagline, city, country, price } = data;

    const picture = `medias/${portrait}`;
    

    

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        article.innerHTML = `
       <img class="photographer_thumbnail__picture"
       src="medias/${portrait}"
       alt="${name}'s thumbnail picture" />
      <h2 id ="personalPage"class="photographer_name">${name}</h2>
      <h3 class="photographer_location">${city}, ${country}</h3>
      <p class="photographer_desc">${tagline}</p>
      <p class="photographer_price">${price}€/jour</p>`
     
        return (article);
    }
    return { name, picture, tagline, city, country, price,  getUserCardDOM }

    
     
    
}




//export default  photographerFactory

const personalPage = document.getElementById("personalPage")

personalPage.addEventListener("click", function (){
    

})