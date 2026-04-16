import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

import germanySvg from '/germany.svg';
import hamburgJpg from './img/hamburg.jpg';
import hamburgPng from './img/hamburg.png';
import hamburgWebp from './img/hamburger.webp';
import hamburgSVG from './img/hamburg-logo.svg';

import { count, countFromFile, info } from 'letter-count';

const mode = import.meta.env.MODE;
const Log = console.log;

document.querySelector('#app').innerHTML = `
  <div>
    <hr>
    <a href="/admin/">Go to Admin</a>
    <hr>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite from Hamburg – Germany in mode: <i>${mode}</i></h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
    <hr>
    <img loading="lazy" decoding="async" src="${germanySvg}" alt="germany logo" />
    <hr>
    <img loading="lazy" decoding="async" src="${hamburgJpg}" alt="hamburgJpg logo" style="width: 100%; height: 100%;" />
    <hr>
    <img loading="lazy" decoding="async" src="${hamburgPng}" alt="hamburgPng logo" />
    <hr>
    <img loading="lazy" decoding="async" src="${hamburgWebp}" alt="hamburgWebp logo" />
    <hr>
    <img loading="lazy" decoding="async" src="${hamburgSVG}" alt="hamburgSVG logo" />
  </div>
`;

setupCounter(document.querySelector('#counter'));

Log(import.meta.env);
Log(count('Hamburg - \nGermany 13.07.1977 !'));
