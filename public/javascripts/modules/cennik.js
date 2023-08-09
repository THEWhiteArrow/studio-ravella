const setUpCennik = (() => {

   let historyPage = '';

   const data = {
      'Męski': [
         ['Strzyżenie boków ', '45'],
         ['Strzyżenie włosów bez mycia', '55'],
         ['Strzyżenie włosów z myciem', '60'],
         ['Strzyżenie jeża kwadratowego', '70'],
         ['Użycie golarki przy goleniu', '5'],
         ['Strzyżenie przedszkolaków ', '50'],
         ['Strzyżenie wąsów', '10'],
         ['Strzyżenie brody', '20-50'],
         ['Odsiwianie włosów', '120-150'],
         ['Modelowanie włosów z myciem', '30'],


      ],
      'Damski': [
         ['Modelowanie włosów', '60-100'],
         ['Strzyżenie włosów z modelowaniem', '90-150'],
         ['Strzyżenie dzieci', '70-100'],
         ['Strzyżenie grzywki', '20'],
         ['Upięcie lub fryzura wieczorowa', '80-200'],
         ['Fryzura ślubna', '150-250'],
         ['Farbowanie włosów 1 kolor', '200-350'],
         ['Kreatywne farbowanie włosów ', '250-550'],
         ['Balejaż ', '250-520'],
         ['Ombre/sombrer', '210-380'],
         ['Trwały skręt włosów', '210-360'],
         ['Sauna regenerująca / nawilżająca włosy', '40-60'],
         ['Zabieg regenerujący / odżywczy włosy', '30-150'],
         ['Botox na włosy', ' 70-200'],
         ['Laminacja włosów', ' 70-150'],
         ['Keratyna CocoChoco ', '250-900'],
         ['Strzyżenie po zabiegach chemicznych ', '40'],
         ['Przedłużanie / zagęszczanie włosów monofibra 1 pasemko', '12-15'],


      ],
      'Pielęgnacja dłoni i stóp': [
         ['Manicure klasyczny z malowaniem', '50-70'],
         ['Manicure hybrydowy', '90-120'], 
         ['Pedicure klasyczny lub frezarkowy ', '90-120'],
         ['Pedicure hybrydowy', '130-150'],
         ['Zdjęcie hybrydy', '40'],
         ['Przedłużanie paznokci żelem', '120-180'],
         ['Regeneracja dłoni ciepłą parafiną', '50'],

      ],
      'Kosmetyka': [
         ['Henna na rzęsy', '30'],
         ['Henna na brwi', '30'],
         ['Regulacja pęsetą', '10-20'],
         ['...DEPILACJA WOSKIEM...', ''],
         ['Brwi regulacja ', '30-40'],
         ['Wąsik', '20'],
         ['Twarz ', '50'],
         ['Pachy ', '40-60'],
         ['Przedramiona', '30-60'],
         ['Łydki ', '50-70'],
         ['Uda', '50-70'],
         ['Całe nogi', '90-130'],
         ['Bikini ', '40-90'],
         ['Tors / plecy', '70-100'],

      ],
      'Solarium': [
         ['1 minuta', '2.80'],
         ['Karnet 100 minut', '250'],
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
