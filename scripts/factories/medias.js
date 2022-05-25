function Image({ image }) {
  this.image = image;
  this.render = () => {
    const photographerMediaSection = document.querySelector(
      '.photographer__portfolio',
    );
    const photographerMediaContent = document.createElement('article');
    photographerMediaContent.className = 'photographer__portfolio--media';

    photographerMediaContent.innerHTML = `
      <a href="Sample_Photos/${this.image}">
        <img title="${
  this.title
}" class="photographer__portfolio--media--content" src="Sample_Photos/${
  this.image
}" alt="${this.title}">
      </a>  
      <div class="photographer__portfolio--media--info">
       <h3 class="photographer__portfolio--media--info--title">${
  this.title
}</h3>
       <div class="photographer__portfolio--media--info--like">
        <span class="photographer__portfolio--media--info--like--count">${
  this.likes
}</span>
        <button id="like__heart" class="${
  this.isLiked === true ? 'fas' : 'far'
} fa-heart photographer__portfolio--media--info--like--heart" ></button>
       </div>
      </div>`;

    photographerMediaSection.appendChild(photographerMediaContent);
  };
}

function Video({ video }) {
  this.video = video;
  this.render = () => {
    const photographerMediaSection = document.querySelector(
      '.photographer__portfolio',
    );
    const photographerMediaContent = document.createElement('article');
    photographerMediaContent.className = 'photographer__portfolio--media';

    photographerMediaContent.innerHTML = `
     <a href="Sample_Photos/${this.video}" alt="${this.title}"> 
      <video class="photographer__portfolio--media--video" poster="Sample_Photos/${
  this.video
} ">
        <source title="${this.title}" src="Sample_Photos/${
  this.video
}#t=0.1" type="video/mp4">
      </video> 
     </a>  
     <div class="photographer__portfolio--media--info">
      <h3 class="photographer__portfolio--media--info--title">${this.title}</h3>
      <div class="photographer__portfolio--media--info--like">
        <span class="photographer__portfolio--media--info--like--count">${
  this.likes
}</span>
        <button id="like__heart" class="${
  this.isLiked === true ? 'fas' : 'far'
} fa-heart photographer__portfolio--media--info--like--heart" 
        ></button>
      </div>
     </div>
    `;

    photographerMediaSection.appendChild(photographerMediaContent);
  };
}

const MediaFactory = function () {
  this.createMedia = (mediaData) => {
    let media;

    const type = mediaData.video ? 'video' : 'image';

    if (type === 'video') {
      media = new Video(mediaData);
    } else if (type === 'image') {
      media = new Image(mediaData);
    }

    media.id = mediaData.id;
    media.title = mediaData.title;
    media.isLiked = false;
    media.likes = mediaData.likes;
    media.date = mediaData.date;
    media.price = mediaData.price;

    media.dec = () => {
      media.likes -= 1;
    };

    media.inc = () => {
      media.likes += 1;
    };

    media.getLike = () => media.likes;

    return media;
  };
}

export default MediaFactory;
