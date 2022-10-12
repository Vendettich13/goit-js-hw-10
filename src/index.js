import './css/styles.css';
import { searchCountry } from './renders.js';
import { refs } from './renders.js';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
