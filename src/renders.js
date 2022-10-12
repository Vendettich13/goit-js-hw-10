import tplCountryMarkup from './templates/country-markup.hbs';
import tplInfo from './templates/country-info.hbs';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

export const refs = {
  list: document.querySelector('.country-list'),
  input: document.querySelector('#search-box'),
  listInfo: document.querySelector('.country-info'),
};

export function reset() {
  refs.list.innerHTML = '';
  refs.listInfo.innerHTML = '';
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
