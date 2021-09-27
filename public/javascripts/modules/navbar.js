const setUpNavbar = (() => {

   let isOpen = false;
   const toggler = document.querySelector('#nav-toggler');
   const togglerDivs = toggler.querySelectorAll('div')
   const toggable = document.querySelector('#nav-toggable');

   const hideNavbarIfOpened = () => {
      if (isOpen) {
         isOpen = !isOpen;
         toggable.classList.add('nav-toggable-hidden')
         togglerDivs[0].classList.remove('translate-y-2', 'rotate-45');
         togglerDivs[1].classList.remove('-translate-x-4', 'scale-0');
         togglerDivs[2].classList.remove('-translate-y-2', '-rotate-45');
      }
   }

   const start = () => {



      toggler.addEventListener('click', (e) => {
         e.stopPropagation();
         isOpen = !isOpen;
         if (isOpen) {
            // window.scroll(0, 0);
            // document.body.style.overflowY = "hidden";
            toggable.classList.remove('nav-toggable-hidden')
            togglerDivs[0].classList.add('translate-y-2', 'rotate-45');
            togglerDivs[1].classList.add('-translate-x-4', 'scale-0');
            togglerDivs[2].classList.add('-translate-y-2', '-rotate-45');
            window.addEventListener('click', hideNavbarIfOpened)

         } else {
            // document.body.style.overflowY = "auto";
            toggable.classList.add('nav-toggable-hidden')
            togglerDivs[0].classList.remove('translate-y-2', 'rotate-45');
            togglerDivs[1].classList.remove('-translate-x-4', 'scale-0');
            togglerDivs[2].classList.remove('-translate-y-2', '-rotate-45');
            window.removeEventListener('click', hideNavbarIfOpened)

         }

      })

   }


   return { start };

})()


