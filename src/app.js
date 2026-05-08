import { success, error } from "@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile.js";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import debounce from "../node_modules/lodash.debounce/";

const inputRef = document.querySelector(".check-country");
const listRef = document.querySelector(".list");

inputRef.addEventListener(
  "input",
  debounce((event) => {
    const value = event.target.value;
    accets(value).then((res) => {
      listRef.innerHTML = "";
      if (res.length > 10) {
        error({
          title: "Oh No!",
          text: "зробіть запит специфічним",
        });
        return;
      }
      if (res.length > 2 && res.length < 10) {
        listRef.innerHTML = "";
        const item = res
          .map((country) => {
            return `<li class="country">${country.name.common}</li>`;
          })
          .join("");
        listRef.innerHTML = item;
      }
      if (res.length === 1) {
        console.log(res);

        listRef.innerHTML = "";
        const item = res
          .map((country) => {
            const languages = Object.values(country.languages);
            return `<li class="country">
                         <h1 class="name">${country.name.common}</h1>
            <div class="newbox">
              <div class="box">
             <p class="capital">Capital: <span class="span">${country.capital[0]}</span></p>
             <p class="population">Population: <span class="span">${country.population}</span></p>
             <h2 class="language">Languages:</h2>
             <ul class="languages">
             ${languages.map((item) => {
               return `<li class="languages-item">${item}</li>`
             }).join("")}
             </ul>
             </div>
             <img src="${country.flags.png}" alt="${country.flags.alt}">
             </div>
            </li>`;
          })
          .join("");
        listRef.innerHTML = item;
      }
    });
  }, 500),
);

function accets(value) {
  return fetch(`https://restcountries.com/v3.1/name/${value}`).then((res) =>
    res.json(),
  );
}