const setUpHeader = (() => {
   const header = document.querySelector('header')
   let idInterval;

   let counter = -1;

   const sliderTextArr = [
      `<a class="bg-red-900 card-link mt-2 p-2 text-gray-50 hover:text-gray-100 hover:bg-red-600 border-2 border-red-600 transition-all " href="/cennik.html#Damski">Fryzjer Damski</a>`,
      `<a class="bg-red-900 card-link mt-2 p-2 text-gray-50 hover:text-gray-100 hover:bg-red-600 border-2 border-red-600 transition-all " href="/cennik.html#Męski">Fryzjer Męski</a>`,
      `<a class="bg-red-900 card-link mt-2 p-2 text-gray-50 hover:text-gray-100 hover:bg-red-600 border-2 border-red-600 transition-all " href="/cennik.html#Pielęgnacja dłoni i stóp">Pielęgnacja&nbsp;dłoni&nbsp;i&nbsp;stóp</a>`,
      `<a class="bg-red-900 card-link mt-2 p-2 text-gray-50 hover:text-gray-100 hover:bg-red-600 border-2 border-red-600 transition-all " href="/cennik.html#Solarium">Solarium</a>`,
   ]

   let dotElements;
   let imgs = header.querySelectorAll('#backgroundImgContainer img');
   let leftSlider = header.querySelector('#slider-left')
   let rightSlider = header.querySelector('#slider-right')
   let sliderText = document.querySelector('header h3');

   const changeSliderText = () => {

      sliderText.innerHTML = sliderTextArr[counter % imgs.length];
   }

   const createInterval = (duration) => {
      clearInterval(idInterval);
      changeSliderText();
      manageDots(counter % imgs.length);
      idInterval = setInterval(() => {
         setImgsOpacity()
         changeSliderText();
         // console.log(counter)
         manageDots(counter % imgs.length);


      }, duration)
   }

   const manageDots = (i) => {
      dotElements.forEach(el => {
         el.classList.remove('bg-red-600');
         el.classList.add('bg-gray-50');
      })
      dotElements[i].classList.add('bg-red-600');
   }

   const setImgsOpacity = () => {
      counter++;
      counter >= imgs.length ? counter = 0 : null;

      imgs.forEach(img => img.style.opacity = 0);
      imgs[counter % imgs.length].style.opacity = 1;
      // console.log(counter % imgs.length)




   }

   const swapImg = (n) => {

      counter = n;
      imgs.forEach(img => img.style.opacity = 0);

      counter < 0 ? counter += imgs.length : null;
      counter >= imgs.length ? counter = 0 : null;

      imgs[counter % imgs.length].style.opacity = 1;



   }

   const appendDots = (duration) => {
      const dotElement = `
      <div class="dotElement hover:bg-red-400 transition-all w-4 h-4 mx-1 rounded-full border border-gray-900"></div>
      `
      const dotContainer = `
     
         

         <div class="z-50 absolute dotContainer flex flex-col" >
         
            <a href="#o-nas"
            class="hidden md:block z-50 mb-10  transform-gpu  origin-center transition-all hover:scale-105">
            <div id="wrapper">
               <div id="wrapper-inner">
                  <div id="scroll-down">
                     <span class="arrow-down">
                        <!-- css generated icon -->
                     </span>
                     <span id="scroll-title">
                        Scroll down
                     </span>
                  </div>
               </div>
            </div>
         </a>
         <div class="flex flex-row justify-center mb-4">
         
         ${dotElement.repeat(imgs.length)}
         
         </div>
         </div>
      
      
      `
      header.innerHTML += dotContainer;

      dotElements = document.querySelectorAll('.dotElement')
      imgs = header.querySelectorAll('#backgroundImgContainer img');
      leftSlider = header.querySelector('#slider-left')
      rightSlider = header.querySelector('#slider-right')
      sliderText = document.querySelector('header h3')

      dotElements.forEach((el, i) => {

         el.addEventListener('click', () => {
            swapImg(i);
            createInterval(duration)

         })
      })

   }

   const start = ({ duration = 10 * 1000 }) => {
      setImgsOpacity();
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

