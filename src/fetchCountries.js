import Notiflix from 'notiflix';
import tplCountryMarkup from './templates/country-markup.hbs';
import tplInfo from './templates/country-info.hbs';

const refs = {
  list: document.querySelector('.country-list'),
  input: document.querySelector('#search-box'),
  listInfo: document.querySelector('.country-info'),
};

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
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
function renderCountryCard(countries) {
  if (refs.input.value === '') {
    refs.list.innerHTML = '';
  } else if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length >= 2 && countries.length <= 10) {
    countries
      .map(country => {
        let infoMarkup = tplInfo(country);
        refs.listInfo.innerHTML = infoMarkup;
        refs.list.innerHTML = '';
      })
      .join('');
  } else
    countries
      .map(country => {
        let markup = tplCountryMarkup(country);
        refs.listInfo.innerHTML = '';
        refs.list.innerHTML = markup;
      })
      .join('');
}

export function searchCountry(e) {
  let searchedEl = refs.input.value.trim();
  fetchCountries(searchedEl).then(renderCountryCard);
}
