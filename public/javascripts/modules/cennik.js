const setUpCennik = (() => {

   let historyPage = '';

   const data = {
      'Męski': [
         ['Strzyżenie boków ', '35'],
         ['Strzyżenie włosów bez mycia', '45'],
         ['Strzyżenie włosów z myciem', '50'],
         ['Strzyżenie jeża kwadratowego', '60'],
         ['Fade skine', '53'],
         ['Strzyżenie przedszkolaków ', '40'],
         ['Strzyżenie wąsów', '10'],
         ['Strzyżenie brody', '20-50'],
         ['Odsiwianie włosów', '115'],
         ['Modelowanie włosów z myciem', '30'],


      ],
      'Damski': [
         ['Modelowanie włosów', '55-80'],
         ['Strzyżenie włosów z modelowaniem', '80-100'],
         ['Strzyżenie dzieci', '45-70'],
         ['Strzyżenie grzywki', '10-20'],
         ['Upięcie lub fryzura wieczorowa', '70-200'],
         ['Fryzura ślubna', '120-250'],
         ['Farbowanie włosów 1 kolor', '170-270'],
         ['Kreatywne farbowanie włosów ', '200-350'],
         ['Balejaż ', '190-350'],
         ['Ombre/sombrer', '180-350'],
         ['Trwały skręt włosów', '180-280'],
         ['Sauna regenerująca / nawilżająca włosy', '30-50'],
         ['Zabieg regenerujący / odżywczy włosy', '30-80'],
         ['Botox na włosy', ' 70-200'],
         ['Laminacja włosów', ' 50-150'],
         ['Keratyna CocoChoco ', '200-450'],
         ['Strzyżenie po zabiegach chemicznych ', '20'],
         ['Przedłużanie / zagęszczanie włosów monofibra 1 pasemko', '10-15'],


      ],
      'Pielęgnacja dłoni i stóp': [
         ['Manicure klasyczny z malowaniem', '50'],
         ['Manicure hybrydowy', '85'],
         ['Malowanie paznokci ', '25'],
         ['Pedicure klasyczny lub frezarkowy ', '70-80'],
         ['Pedicure hybrydowy', '110'],
         ['Zdjęcie hybrydy', '30-40'],
         ['Przedłużanie paznokci żelem', '100-150'],
         ['Regeneracja dłoni ciepłą parafiną', '40'],
         ['Regeneracja paznokci IBX system', '25-35'],


      ],
      'Kosmetyka': [
         ['Henna na rzęsy', '30'],
         ['Henna na brwi', '20'],
         ['Regulacja pęsetą', '10-20'],
         ['...DEPILACJA WOSKIEM...', ''],
         ['Brwi regulacja ', '30-40'],
         ['Wąsik', '20'],
         ['Twarz ', '50'],
         ['Pachy ', '40'],
         ['Przedramiona', '30-60'],
         ['Łydki ', '50 '],
         ['Uda', '50'],
         ['Całe nogi', '90'],
         ['Bikini ', '40-90'],
         ['Tors/ plecy', '70-100'],

      ],
      'Solarium': [
         ['1 minuta', '2.40'],
         ['Karnet 100 minut', '210'],
      ],
   };

   const cennik = document.querySelector('#cennik ul')

   const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
   }


   const createZakladki = (div) => {
      const keys = Object.keys(data);
      keys.forEach((el, i) => {

         div.innerHTML += `<button  
            class="text-lg text-gray-100 hover:text-gray-50 hover:bg-black-600 p-3 rounded mx-2 ${el.replace(/ /g, '')}">${el}</button>`
      })
   }

   const setUpContent = () => {
      const keys = Object.keys(data);
      cennik.innerHTML = ''
      if (keys.indexOf(decodeURI(capitalizeFirstLetter(window.location.hash.slice(1)))) != -1) {
         data[decodeURI(capitalizeFirstLetter(window.location.hash.slice(1)))].forEach(zestaw => {
            if (zestaw[0] == '...DEPILACJA WOSKIEM...') {

               cennik.innerHTML += `
               <li class="flex justify-between">
               <span class="p-5">${zestaw[0]}</span>
                  </li>`

            } else {

               cennik.innerHTML += `
               <li class="flex justify-between">
               <span>${zestaw[0]}</span>
               <span class="text-right">
                  ${zestaw[1]} PLN
                  </span>
                  </li>`
            }
         })
      } else {
         data.Męski.forEach(zestaw => {
            cennik.innerHTML += `
               <li class="flex justify-between">
               <span>${zestaw[0]}</span>
               <span class="text-right">
                  ${zestaw[1]} PLN
               </span>
            </li>`
         })
      }
   }


   const setBgZakladek = () => {
      const zakladkiContainer = document.querySelector('#zakladki-container')
      const zakladki = zakladkiContainer.querySelectorAll(`button`)
      const keys = Object.keys(data);

      zakladki.forEach((z) => { z.classList.remove('bg-black-600') })

      if (keys.indexOf(decodeURI(capitalizeFirstLetter(window.location.hash.slice(1)))) != -1) {
         const zakladka = zakladkiContainer.querySelector(`button.${decodeURI(capitalizeFirstLetter(window.location.hash.slice(1))).replace(/ /g, '')}`)
         zakladka.classList.add('bg-black-600')

      } else {
         const zakladka = zakladkiContainer.querySelector(`button`)
         zakladka.classList.add('bg-black-600')
      }
   }

   const setListenerZakladki = () => {

      const zakladki = document.querySelectorAll('#zakladki-container button')

      zakladki.forEach((el, i) => {
         el.addEventListener('click', () => {

            cennik.innerHTML = '';
            window.location.assign(`/cennik.html#${el.innerText}`)
            // data[el.innerText].forEach(zestaw => {
            //    cennik.innerHTML += `
            //       <li class="flex justify-between">
            //       <span>${zestaw[0]}</span>
            //       <span class="text-right">
            //          ${zestaw[1]} PLN
            //       </span>
            //    </li>`
            // })

            zakladki.forEach((z, index) => {
               if (index === i) {
                  z.classList.add('bg-black-600')
               } else {
                  z.classList.remove('bg-black-600')
               }
            })

         })
      })

   }

   const setUpChangingCennik = () => {
      const zakladkiContainer = document.querySelector('#zakladki-container');

      createZakladki(zakladkiContainer);
      setListenerZakladki();
      setUpContent();
      setBgZakladek();


      window.addEventListener('popstate', () => {

         // console.log(decodeURI(window.location.hash))
         setUpContent();
         setBgZakladek();
      })
   }


   const start = () => {

      setUpChangingCennik();



   }

   return { start }
})()
