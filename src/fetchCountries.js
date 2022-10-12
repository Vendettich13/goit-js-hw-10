import Notiflix from 'notiflix';
import tplCountryMarkup from './templates/country-markup.hbs';
import tplInfo from './templates/country-info.hbs';

const refs = {
  list: document.querySelector('.country-list'),
  input: document.querySelector('#search-box'),
  listInfo: document.querySelector('.country-info'),
};
function reset() {
  refs.list.innerHTML = '';
  refs.listInfo.innerHTML = '';
}

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error();
      } else return response.json();
    })
    .catch(() => {
      reset();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
function renderCountryCard(countries) {
  if (refs.input.value === '') {
    reset();
  } else if (countries.length > 10) {
    reset();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length >= 2 && countries.length <= 10) {
    let infoMarkup = tplInfo(countries);
    refs.listInfo.innerHTML = infoMarkup;
    refs.list.innerHTML = '';
  } else {
    let markup = tplCountryMarkup(countries);
    refs.listInfo.innerHTML = '';
    refs.list.innerHTML = markup;
  }
}

export function searchCountry(e) {
  let searchedEl = refs.input.value.trim();
  fetchCountries(searchedEl).then(renderCountryCard);
}
