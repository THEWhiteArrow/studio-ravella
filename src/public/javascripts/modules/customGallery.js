const customGallery = (() => {
   const galeria = document.querySelector('#galeria')
   const imgs = galeria.querySelectorAll('.grid-gallery img');
   let imgCounter = 0;

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
               <section id="image-show"  style="z-index:11000; pointer-events:all;" class="fixed w-screen h-screen bg-black bg-opacity-95 bg-opacity-1">
               
                  <button id="image-show-close" class="mt-10 ml-10">
                     <div class="transform-gpu transition-transform m-1 w-8 h-1 bg-red-500 rounded    translate-y-2 rotate-45"></div>
                     <div class="transform-gpu transition-transform m-1 w-8 h-1 bg-red-500 rounded   -translate-x-4 scale-0"></div>
                     <div class="transform-gpu transition-transform m-1 w-8 h-1 bg-red-500 rounded   -translate-y-2 -rotate-45"></div>
                  </button>
                  
                  <button id="image-show-right" class="transition-transform slider absolute top-1/2">
                  <div class="transform rotate-45 m-1 mb-2 w-5 h-1 rounded"></div>
                  <div class="transform -rotate-45 m-1 mt-2 w-5 h-1 rounded"></div>
               </button>
      
               <button id="image-show-left" class="transition-transform slider absolute top-1/2">
                  <div class="transform -rotate-45 m-1 mb-2 w-5 h-1 rounded"></div>
                  <div class="transform rotate-45 m-1 mt-2 w-5 h-1 rounded"></div>
               </button>

                  <img id="image-showed" src="${el.src}" class="object-contain z-50 w-3/4 h-3/4 absolute top-1/2 left-1/2" style="transform:translate3d(-50%,-50%,0);">
               
               </section>
            `
            imgCounter = i;

            document.body.prepend(imageShow)
            document.body.style.borderLeftWidth = "0px";
            document.body.style.overflowY = "hidden";

            const imgShowed = document.getElementById('image-showed')
            imgShowed.style.transition = 'var(--my-transition)';
            imgShowed.style.transitionDuration = '0.5s';
            // imgShowed.style.clipPath = 'circle(100% at 50% 50%)';

            document.getElementById('image-show-close').addEventListener('click', () => {
               imageShow.remove()
               document.body.style.borderLeftWidth = document.body.style.borderRightWidth;
               document.body.style.overflowY = "auto";
            })

            document.getElementById('image-show-right').addEventListener('click', () => {

               imgCounter++;
               imgShowed.style.opacity = 0;
               // imgShowed.style.clipPath = 'circle(0% at 50% 50%)';
               imgCounter >= imgs.length ? imgCounter = 0 : null;
               setTimeout(() => {
                  imgShowed.src = imgs[imgCounter].src;
                  imgShowed.style.opacity = 1;
                  // imgShowed.style.clipPath = 'circle(100% at 50% 50%)';

               }, 500)
            })
            document.getElementById('image-show-left').addEventListener('click', () => {
               imgCounter--;
               imgShowed.style.opacity = 0;
               // imgShowed.style.clipPath = 'circle(0% at 50% 50%)';
               imgCounter < 0 ? imgCounter = imgs.length - 1 : null;
               setTimeout(() => {
                  imgShowed.src = imgs[imgCounter].src;
                  imgShowed.style.opacity = 1;
                  // imgShowed.style.clipPath = 'circle(100% at 50% 50%)';
               }, 500)
            })



         })
      })
   }


   return { start, start2, start3 }

})()

export { customGallery }