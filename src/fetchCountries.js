import Notiflix from 'notiflix';
import { reset } from './fetchCountries';

export function fetchCountries(name) {
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
