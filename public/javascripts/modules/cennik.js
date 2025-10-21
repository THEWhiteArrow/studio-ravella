const setUpCennik = (() => {
	let historyPage = "";

	const data = {
		Męski: [
			["Strzyżenie boków", "50"],
			["Strzyżenie włosów bez mycia", "65"],
			["Strzyżenie długich włosów", "80-120"],
			["Strzyżenie całościowe maszynką do 1,5 cm", "55-60"],
			["Strzyżenie jeża kwadratowego", "85"],
			["Mycie włosów", "10"],
			["Użycie golarki przy strzyżeniu", "10"],
			["Strzyżenie przedszkolaków", "60"],
			["Strzyżenie wąsów", "10"],
			["Strzyżenie brody", "30-70"],
			["Odsiwianie włosów + strzyżenie", "145-175"],
		],
		"Pielęgnacja dłoni i stóp": [
			["Manicure klasyczny z malowaniem", "60-80"],
			["Manicure hybrydowy", "100-150"],
			["Pedicure klasyczny lub frezarkowy", "120-180"],
			["Pedicure hybrydowy", "130-200"],
			["Zdjęcie hybrydy", "40"],
			["Przedłużanie paznokci żelem", "150-200"],
			["Regeneracja dłoni ciepłą parafiną", "50"],
		],
		Damski: [
			["Modelowanie włosów", "70-150"],
			["Strzyżenie włosów z modelowaniem", "120-200"],
			["Strzyżenie dzieci", "80-120"],
			["Strzyżenie grzywki", "20"],
			["Upięcie lub fryzura wieczorowa", "120-300"],
			["Fryzura ślubna", "180-350"],
			["Farbowanie włosów 1 kolor", "220-450"],
			["Kreatywne farbowanie włosów", "300-650"],
			["Balejaż", "300-700"],
			["Air Touch", "450-1000"],
			["Trwały skręt włosów", "250-500"],
			["Sauna regenerująca / nawilżająca włosy", "60-120"],
			["Zabieg regenerujący / odżywczy włosy", "40-200"],
			["Botox na włosy", "100-250"],
			["Laminacja włosów", "100-200"],
			["Keratyna CocoChoco", "300-1000"],
			["Strzyżenie po zabiegach chemicznych", "40-50"],
			["Przedłużanie / zagęszczanie włosów monofibra 1 pasemko", "12-15"],
		],
		Kosmetyka: [
			["Henna na rzęsy", "30"],
			["Henna na brwi", "30"],
			["Regulacja brwi pęsetą", "10-20"],
			["Regulacja brwi woskiem", "30-40"],
			["Wąsik", "20-30"],
		],
		Solarium: [
			["1 minuta", "3.5"],
			["Karnet 100 minut", "300"],
		],
	};

	const cennik = document.querySelector("#cennik ul");

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const createZakladki = (div) => {
		const keys = Object.keys(data);
		keys.forEach((el, i) => {
			div.innerHTML += `<button  
            class="text-lg text-gray-100 hover:text-gray-50 hover:bg-black-600 p-3 rounded mx-2 ${el.replace(
				/ /g,
				""
			)}">${el}</button>`;
		});
	};

	const setUpContent = () => {
		const keys = Object.keys(data);
		cennik.innerHTML = "";
		if (
			keys.indexOf(
				decodeURI(capitalizeFirstLetter(window.location.hash.slice(1)))
			) != -1
		) {
			data[
				decodeURI(capitalizeFirstLetter(window.location.hash.slice(1)))
			].forEach((zestaw) => {
				if (zestaw[0] == "...DEPILACJA WOSKIEM...") {
					cennik.innerHTML += `
               <li class="flex justify-between">
               <span class="p-5">${zestaw[0]}</span>
                  </li>`;
				} else {
					cennik.innerHTML += `
               <li class="flex justify-between">
               <span>${zestaw[0]}</span>
               <span class="text-right">
                  ${zestaw[1]} PLN
                  </span>
                  </li>`;
				}
			});
		} else {
			data.Męski.forEach((zestaw) => {
				cennik.innerHTML += `
               <li class="flex justify-between">
               <span>${zestaw[0]}</span>
               <span class="text-right">
                  ${zestaw[1]} PLN
               </span>
            </li>`;
			});
		}
	};

	const setBgZakladek = () => {
		const zakladkiContainer = document.querySelector("#zakladki-container");
		const zakladki = zakladkiContainer.querySelectorAll(`button`);
		const keys = Object.keys(data);

		zakladki.forEach((z) => {
			z.classList.remove("bg-black-600");
		});

		if (
			keys.indexOf(
				decodeURI(capitalizeFirstLetter(window.location.hash.slice(1)))
			) != -1
		) {
			const zakladka = zakladkiContainer.querySelector(
				`button.${decodeURI(
					capitalizeFirstLetter(window.location.hash.slice(1))
				).replace(/ /g, "")}`
			);
			zakladka.classList.add("bg-black-600");
		} else {
			const zakladka = zakladkiContainer.querySelector(`button`);
			zakladka.classList.add("bg-black-600");
		}
	};

	const setListenerZakladki = () => {
		const zakladki = document.querySelectorAll(
			"#zakladki-container button"
		);

		zakladki.forEach((el, i) => {
			el.addEventListener("click", () => {
				cennik.innerHTML = "";
				window.location.assign(`/cennik.html#${el.innerText}`);
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
						z.classList.add("bg-black-600");
					} else {
						z.classList.remove("bg-black-600");
					}
				});
			});
		});
	};

	const setUpChangingCennik = () => {
		const zakladkiContainer = document.querySelector("#zakladki-container");

		createZakladki(zakladkiContainer);
		setListenerZakladki();
		setUpContent();
		setBgZakladek();

		window.addEventListener("popstate", () => {
			// console.log(decodeURI(window.location.hash))
			setUpContent();
			setBgZakladek();
		});
	};

	const start = () => {
		setUpChangingCennik();
	};

	return { start };
})();
