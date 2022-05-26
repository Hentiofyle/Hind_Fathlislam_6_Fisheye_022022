// ===========      LIGHTBOX         ============= //

// function qui va generer le lien href du media
export default class Lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
    const gallery = links.map((link) => link.getAttribute('href'));
    links.forEach((link) => link.addEventListener('click', (e) => {
      e.preventDefault();
      new Lightbox(e.currentTarget.getAttribute('href'), gallery);
    }));
  }

  constructor(url, gallery) {
    this.element = this.buildDOM(url);
    this.medias = gallery;
    this.loadMedia(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.querySelector('.lightbox__close').focus();
    document.addEventListener('keydown', this.onKeyUp);
  }

  // function qui va generer le media selon dataType
  loadMedia(url) {
    if (url.endsWith('.jpg')) {
      this.url = null;
      const image = new Image();
      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = '';
      image.onload = () => {
        container.appendChild(image);
        this.url = url;
      };
      image.src = url;
    } else {
      this.url = null;
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.width = 950;
      video.height = 520;
      video.setAttribute('tabindex', '3');
      video.classList.add('lightbox__video');
      const videoSource = document.createElement('source');
      videoSource.setAttribute('src', `${url}`);
      videoSource.setAttribute('type', 'video/mp4');
      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = '';
      video.innerHTML = videoSource;

      container.appendChild(video);

      const containerVideo = this.element.querySelector('.lightbox__container video');
      containerVideo.appendChild(videoSource);

      this.url = url;
      video.src = url;
    }
  }

// s'occupe de laction de la lightbox avec touche clavier 

  onKeyUp(e) {
    if (e.key === 'Escape') {
      this.close(e);
    } else if (e.key === 'ArrowLeft') {
      this.prev(e);
    } else if (e.key === 'ArrowRight') {
      this.next(e);
    } else if (e.key === 'Tab') {
      if (document.activeElement === document.querySelector('.lightbox__prev')) {
        e.preventDefault();
        document.querySelector('.lightbox__close').focus();
      }
    }
  }

  close(e) {
    e.preventDefault();
    this.element.classList.add('fadeOut');
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  next(e) {
    e.preventDefault();
    let i = this.medias.findIndex((image) => image === this.url);
    if (i === this.medias.length - 1) {
      i = -1;
    }
    this.loadMedia(this.medias[i + 1]);
    const imageDomList = [...document.querySelectorAll('.photographer__portfolio--media--content')];
    const videoSourceDomList = [...document.querySelectorAll('.photographer__portfolio--media--video > source')];
    const selectedMediaDom = [
      ...imageDomList, ...videoSourceDomList].find((img) => img.src.includes(this.medias[i + 1]));

    document.querySelector('.lightbox__title').textContent = selectedMediaDom.title;
  }

  prev(e) {
    e.preventDefault();
    let i = this.medias.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.medias.length;
    }
    this.loadMedia(this.medias[i - 1]);
    const imageDomList = [...document.querySelectorAll('.photographer__portfolio--media--content')];
    const videoSourceDomList = [...document.querySelectorAll('.photographer__portfolio--media--video > source')];
    const selectedMediaDom = [
      ...imageDomList, ...videoSourceDomList].find((img) => img.src.includes(this.medias[i - 1]));

    document.querySelector('.lightbox__title').textContent = selectedMediaDom.title;
  }

  buildDOM(url) {
    const dom = document.createElement('div');
    const imageDomList = [...document.querySelectorAll('.photographer__portfolio--media--content')];
    const videoSourceDomList = [...document.querySelectorAll('.photographer__portfolio--media--video > source')];

    const selectedMediaDom = [
      ...imageDomList, ...videoSourceDomList].find((img) => img.src.includes(url));

    dom.classList.add('lightbox');
    dom.innerHTML = `<button class="lightbox__close" tabindex="1"></button>
   <button class="lightbox__next" tabindex="2"></button>
   <button class="lightbox__prev" tabindex="4"></button>
   <div class="lightbox__container"></div>
   <div class="lightbox__title">${selectedMediaDom.title}</div>`;
   
// s'occupe de laction de la lightbox avec click

    dom.querySelector('.lightbox__close').addEventListener(
      'click',
      this.close.bind(this),
    );
    dom.querySelector('.lightbox__next').addEventListener(
      'click',
      this.next.bind(this),
    );
    dom.querySelector('.lightbox__prev').addEventListener(
      'click',
      this.prev.bind(this),
    );
    return dom;
  }
}

Lightbox.init();
