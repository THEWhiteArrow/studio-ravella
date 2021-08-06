import '../stylesheets/tailwind.css'
import '../stylesheets/app.css'


const setUpNavbar = (() => {

   let isOpen = false;
   const toggler = document.querySelector('#nav-toggler');
   const togglerDivs = toggler.querySelectorAll('div')
   const toggable = document.querySelector('#nav-toggable');

   const start = () => {

      toggler.addEventListener('click', () => {
         isOpen = !isOpen;
         if (isOpen) {
            window.scroll(0, 0);
            document.body.style.overflowY = "hidden";
            toggable.classList.remove('nav-toggable-hidden')
            togglerDivs[0].classList.add('translate-y-1', 'rotate-45');
            togglerDivs[1].classList.add('-translate-x-4', 'scale-0');
            togglerDivs[2].classList.add('-translate-y-2', '-rotate-45');

         } else {
            document.body.style.overflowY = "auto";
            toggable.classList.add('nav-toggable-hidden')
            togglerDivs[0].classList.remove('translate-y-1', 'rotate-45');
            togglerDivs[1].classList.remove('-translate-x-4', 'scale-0');
            togglerDivs[2].classList.remove('-translate-y-2', '-rotate-45');

         }

      })

   }

   return { start };

})()



const setUpHeader = (() => {
   const header = document.querySelector('header')
   let idInterval;

   let counter = 0;

   let dotElements;
   let imgs = header.querySelectorAll('img');
   let leftSlider = header.querySelector('#slider-left')
   let rightSlider = header.querySelector('#slider-right')

   const createInterval = (duration) => {
      clearInterval(idInterval);
      idInterval = setInterval(() => {
         setImgsOpacity()
         // console.log(counter)

      }, duration)
   }

   const manageDots = (i) => {
      dotElements.forEach(el => {
         el.classList.remove('bg-red-600');
      })
      dotElements[i].classList.add('bg-red-600');
   }

   const setImgsOpacity = () => {
      counter++;
      counter >= imgs.length ? counter = 0 : null;

      imgs.forEach(img => img.style.opacity = 0);
      imgs[counter % imgs.length].style.opacity = 1;

      manageDots(counter % imgs.length);


   }

   const swapImg = (n) => {

      counter = n;
      imgs.forEach(img => img.style.opacity = 0);

      counter < 0 ? counter += imgs.length : null;
      counter >= imgs.length ? counter = 0 : null;

      imgs[counter % imgs.length].style.opacity = 1;
      manageDots(counter % imgs.length);


   }

   const appendDots = (duration) => {
      const dotElement = `
      <div class="dotElement hover:bg-red-400 transition-all w-4 h-4 mx-1 rounded-full border border-gray-900"></div>
      `
      const dotContainer = `
      <div class="absolute dotContainer flex" >
      ${dotElement.repeat(imgs.length)};
      
      </div>
      `
      header.innerHTML += dotContainer;

      dotElements = document.querySelectorAll('.dotElement')
      imgs = header.querySelectorAll('img');
      leftSlider = header.querySelector('#slider-left')
      rightSlider = header.querySelector('#slider-right')

      dotElements.forEach((el, i) => {

         el.addEventListener('click', () => {
            swapImg(i);
            createInterval(duration)

         })
      })

   }

   const start = ({ duration = 10 * 1000 }) => {

      appendDots(duration);

      manageDots(0);
      createInterval(duration)


      leftSlider.addEventListener('click', () => {
         swapImg(counter - 1);
         createInterval(duration)
         console.log('prev slide')

      })
      rightSlider.addEventListener('click', () => {
         swapImg(counter + 1);
         createInterval(duration)
         console.log('next slide')
      })

   }

   const stop = () => {
      clearInterval(idInterval);
   }

   return { start, stop };

})()

const setUpGaleria = (() => {
   const galeria = document.querySelector('#galeria')
   const imgs = galeria.querySelectorAll('img');

   const start = () => {

      imgs.forEach(el => {
         el.addEventListener('click', (e) => {
            e.stopPropagation();
            imgs.forEach(el => {

               const style = el.style;
               style.position = '';
               style.transform = '';
               style.zIndex = 0;
            })

            const style = el.style;
            style.position = 'absolute';
            style.transform = 'scale(5)';
            style.zIndex = 2000;
         })
      })

      window.addEventListener('click', () => {

         imgs.forEach(el => {

            const style = el.style;
            style.position = '';
            style.transform = '';
            style.zIndex = 0;
         })


      })

   }

   const start2 = () => {
      imgs.forEach(el => {
         el.addEventListener('click', () => {
            location.href = el.src;
         })
      })
   }

   const start3 = () => {
      imgs.forEach((el, i) => {
         el.addEventListener('click', () => {
            const imageShow = document.createElement('section');
            imageShow.innerHTML = `
               <section id="image-show"  style="z-index:11000;" class="fixed w-screen h-screen bg-gray-900 bg-opacity-1">
               
                  <button id="image-show-close" class="mt-10 ml-10">
                     <div class="transform-gpu transition-transform m-1 w-8 h-1 bg-red-500 rounded translate-y-1 rotate-45"></div>
                     <div class="transform-gpu transition-transform m-1 w-8 h-1 bg-red-500 rounded -translate-x-4 scale-0"></div>
                     <div class="transform-gpu transition-transform m-1 w-8 h-1 bg-red-500 rounded -translate-y-2 -rotate-45"></div>
                  </button>
                  
                  <img id="${i}" src="${el.src}" class="object-contain z-50 w-3/4 h-3/4 absolute top-1/2 left-1/2" style="transform:translate3d(-50%,-50%,0);">
               
               </section>
            `

            document.body.prepend(imageShow)
            document.body.style.borderLeftWidth = "0px";
            document.body.style.overflowY = "hidden";


            document.getElementById('image-show-close').addEventListener('click', () => {
               imageShow.remove()
               document.body.style.borderLeftWidth = "18px";
               document.body.style.overflowY = "auto";
            })

         })
      })
   }


   return { start, start2, start3 }

})()

const validateForms = (() => {
   const forms = document.querySelectorAll('.needs-validation');


   const start = () => {

      forms.forEach(el => {
         el.addEventListener('submit', (e) => {
            console.dir(e.preventDefault)
            e.preventDefault()
            const passedInputs = checkFields(el.querySelectorAll('input'))
            const passedTextarea = checkFields(el.querySelectorAll('textarea'))

            if (passedInputs && passedTextarea) {

            } else {
               e.preventDefault();

               alert('form error')
            }
         })
      })
   }

   const checkFields = (arr) => {
      arr.forEach((el, i) => {
         console.log(el.type)
         if (el.type === 'number') {
            if (el.value === null || el.value === undefined || el.value === '') return false;
            if (el.value < el.min || el.value > el.max) return false;
         }
         if (el.type === 'email') {
            if (el.value === null || el.value === undefined || el.value === '') return false;
            if (el.value.indexOf('@') === -1 || el.value.indexOf('@') === el.value.length - 1) return false;
         }
         if (el.type === 'text') {
            if (el.value === null || el.value === undefined) return false;
         }



      })

      return true;
   }

   return { start };

})();

setUpNavbar.start();
setUpHeader.start({ duration: 8 * 1000 });
setUpGaleria.start3();
validateForms.start();
