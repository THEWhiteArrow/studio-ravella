const setUpNavbar = (() => {

   let isOpen = false;
   const toggler = document.querySelector('#nav-toggler');
   const togglerDivs = toggler.querySelectorAll('div')
   const toggable = document.querySelector('#nav-toggable');

   const start = () => {

      toggler.addEventListener('click', () => {
         isOpen = !isOpen;
         if (isOpen) {
            // window.scroll(0, 0);
            // document.body.style.overflowY = "hidden";
            toggable.classList.remove('nav-toggable-hidden')
            togglerDivs[0].classList.add('translate-y-1', 'rotate-45');
            togglerDivs[1].classList.add('-translate-x-4', 'scale-0');
            togglerDivs[2].classList.add('-translate-y-2', '-rotate-45');

         } else {
            // document.body.style.overflowY = "auto";
            toggable.classList.add('nav-toggable-hidden')
            togglerDivs[0].classList.remove('translate-y-1', 'rotate-45');
            togglerDivs[1].classList.remove('-translate-x-4', 'scale-0');
            togglerDivs[2].classList.remove('-translate-y-2', '-rotate-45');

         }

      })

   }

   return { start };

})().start();