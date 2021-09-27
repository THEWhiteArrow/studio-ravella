

setUpHeader.start({ duration: 8 * 1000 });

setUpNavbar.start();

customGallery.start3();

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

})().start();