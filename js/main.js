
window.onload = function () {
  setTimeout(function () {
    document.getElementById("preview").classList.add("hidden");
  }, 600);
};


//для смены header
window.onscroll = function () {
  const headerTop = document.querySelector('.header_top');

  if (window.innerWidth > 1026) {
    if (window.scrollY < 50) {
      headerTop.classList.remove('tiny');
    } else {
      headerTop.classList.add('tiny');
    }
  } else {
    headerTop.classList.remove('tiny');
  }
};



//для клика по вкусу и появления контента

document.addEventListener('DOMContentLoaded', () => {
  const tastesList = document.querySelectorAll('.tastes__list-item');

  tastesList.forEach((taste) => {
    taste.addEventListener('click', (event) => {
      const currentTaste = event.currentTarget;
      const currentTasteClass = currentTaste.classList[1];


      tastesList.forEach((item) => {
        if (item !== currentTaste) {
          item.classList.remove('active');
        }
      });


      currentTaste.classList.add('active');

      const choosenTaste = currentTasteClass;
      const choosenBlock = document.querySelector('.tastes__choosen');
      const videos = choosenBlock.querySelectorAll('video');

      videos.forEach((video) => {
        video.currentTime = 0;
        video.pause();
        video.removeAttribute('autoplay');
        video.load();
      });

      choosenBlock.classList.forEach((className) => {
        if (className.startsWith('tastes__chosen-') && !className.endsWith(choosenTaste)) {
          choosenBlock.classList.remove(className);
        }
      });

      const newClassName = `tastes__chosen-${choosenTaste}`;
      choosenBlock.className = 'tastes__choosen';
      choosenBlock.classList.add(choosenTaste.replace('tastes__list-item_', ''));

      videos.forEach((video) => {
        video.addEventListener('canplay', () => {
          video.play();
        });
      });

    });
  });
});





// кнопка развернуть в карточке
const buttons = document.querySelectorAll('.taste__choosen-info-nutritional-btn');
const contents = document.querySelectorAll('.taste__choosen-info-nutritional-content');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    const span = buttons[i].querySelector('span');
    const isActive = buttons[i].classList.contains('taste__choosen-info-nutritional-btn_active');

    if (isActive) {
      span.textContent = 'Развернуть';
      buttons[i].classList.remove('taste__choosen-info-nutritional-btn_active');
      contents[i].style.minHeight = '0px';
    } else {
      span.textContent = 'Свернуть';
      buttons[i].classList.add('taste__choosen-info-nutritional-btn_active');
      contents[i].style.minHeight = contents[i].scrollHeight + 'px';
    }
  });
}



//бургер-меню

const mobileMenuBtn = document.querySelector('.header__mobile-menu-btn');
const mobileOverlay = document.querySelector('.header__mobile-overlay');
const hiddenMenu = document.querySelector('.hidden-menu');
const body = document.querySelector('body');

function toggleMenu() {
  hiddenMenu.classList.toggle('hidden-menu_active');
  mobileOverlay.classList.toggle('header__mobile-overlay_active');
  body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
}
function closeMenu() {
  hiddenMenu.classList.remove('hidden-menu_active');
  mobileOverlay.classList.remove('header__mobile-overlay_active');
  body.style.overflow = '';
}

const menuItems = document.querySelectorAll('.hidden-menu__item');
menuItems.forEach(item => {
  item.addEventListener('click', (event) => {
    closeMenu();

    const href = item.getAttribute('href');
    const section = document.querySelector(href);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

mobileMenuBtn.addEventListener('click', toggleMenu);
mobileOverlay.addEventListener('click', closeMenu);


const prevButton = document.querySelector('.slider-button-prev');
const nextButton = document.querySelector('.slider-button-next');

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  slidesPerView: 1,
  clickable: true,
  centeredSlides: true,
  speed: 1000,
  loop: false,
  breakpoints: {
    280: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    800: {
      slidesPerView: 1.9,
      slidesPerColumn: 1,
    }
  },
  navigation: {
    nextEl: "#tastes .slider-button-next",
    prevEl: "#tastes .slider-button-prev",
  },
});


window.addEventListener("load", function () {
  const firstSlide = document.querySelector(".swiper-slide:first-child");
  const firstSlideVideo = firstSlide.querySelector(".video-inner video");

  firstSlideVideo.play();

});


swiper.on('slideChangeTransitionEnd', function () {
  const activeSlideVideos = this.slides[this.activeIndex].querySelectorAll('.video-inner video');

  // Остановим воспроизведение видео на других слайдах
  const allVideos = document.querySelectorAll('.video-inner video');
  allVideos.forEach(video => {
    if (!video.paused) {
      video.pause();
      video.currentTime = 0;
    }
  });

  // Запустим воспроизведение видео только на активном слайде
  activeSlideVideos.forEach(video => {
    video.currentTime = 0;
    video.play();
  });

});


//код для модальных окон в кнопках "подробнее"

const moreButtons = document.querySelectorAll('.products__slider-item-more');
const closeBtn = document.querySelectorAll('.modal-close');
const modal = document.querySelector('.modal');

moreButtons.forEach(button => {
  button.addEventListener('click', () => {
    modal.classList.add('modal_active');
    document.body.classList.add('modal-open')
  });
});

modal.addEventListener('click', () => {
  document.body.classList.remove('modal-open');
});

closeBtn.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    document.body.classList.remove('modal-open');
  });
});


modal.addEventListener('click', (event) => {
  if (modal.classList.contains('modal_active') && !event.target.closest('.modal__body')) {
    modal.classList.remove('modal_active');
    document.body.classList.remove('modal-open');

  }
});

moreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const flavorClass = button.dataset.flavor;
    modal.classList.forEach(className => {
      if (className.startsWith('flavor-')) {
        modal.classList.remove(className);
      }
    });
    modal.classList.add(`flavor-${flavorClass}`);
  });
});

/*IMAGE LAZY LOAD*/
window.imageLoading = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.tagName === 'IMG') {
        entry.target.src = entry.target.dataset.src;
        entry.target.classList.remove('lazy');
        entry.target.classList.remove('swiper-lazy');
      } else if (entry.target.tagName === 'SOURCE') {
        entry.target.srcset = entry.target.dataset.srcset;
        entry.target.removeAttribute('data-srcset');
      }

      imageLoading.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('img[data-src], source[data-srcset]').forEach(element => {
  window.imageLoading.observe(element);
});


/*VIDEO LAZY LOAD*/
let lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));
if ("IntersectionObserver" in window) {
  window.videoLoading = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (video) {
      if (video.isIntersecting) {
        for (let source in video.target.children) {
          let videoSource = video.target.children[source];
          if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE" && !videoSource.className) {
            videoSource.src = videoSource.dataset.src;
          }
          if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE" && window.innerWidth > 991) {
            videoSource.src = videoSource.dataset.src;
          }
          if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE" && window.innerWidth < 992) {
            videoSource.src = videoSource.dataset.src;
          }
        }

        video.target.load();
        video.target.classList.remove("lazy");
        videoLoading.unobserve(video.target);
        if (video.target.autoplay || video.target.getAttribute('data-autoplay')) {
          video.target.play();
        }
      }
    });
  });

  lazyVideos.forEach(function (lazyVideo) {
    videoLoading.observe(lazyVideo);
  });
}
















