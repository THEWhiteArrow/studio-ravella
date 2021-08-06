const setUpHeader = (() => {
   const header = document.querySelector('header')
   let idInterval;

   let counter = 0;

   const sliderTextArr = [
      'Miejsce, w którym wypoczniesz i poczujesz się jak młody bóg.',
      'Zapomnij o wszelkich troskachi zrelaksujesz się.',
      'Poczuj swoje wewnętrzne piękno.',
      'Rozpocznij dzień z szerokim uśmiechem na twarzy.',
   ]

   let dotElements;
   let imgs = header.querySelectorAll('#backgroundImgContainer img');
   let leftSlider = header.querySelector('#slider-left')
   let rightSlider = header.querySelector('#slider-right')
   let sliderText = document.querySelector('header h3');

   const changeSliderText = () => {

      sliderText.innerText = sliderTextArr[counter % imgs.length];
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
      })
      dotElements[i].classList.add('bg-red-600');
   }

   const setImgsOpacity = () => {
      counter++;
      counter >= imgs.length ? counter = 0 : null;

      imgs.forEach(img => img.style.opacity = 0);
      imgs[counter % imgs.length].style.opacity = 1;




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
      <div class="absolute dotContainer flex" >
      ${dotElement.repeat(imgs.length)};
      
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

})().start({ duration: 8 * 1000 })

