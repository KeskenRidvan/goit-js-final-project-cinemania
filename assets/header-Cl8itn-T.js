(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const d=`<div class="container header__container">

  <a href="/goit-js-final-project-cinemania/" class="header__logo">
    <svg class="header__logo-icon">
      <use href="#icon-logo"></use>
    </svg>

    <span class="header__logo-text">Cinemania</span>
  </a>

  <nav class="header__nav-menu">
    <ul class="header__nav-list">
      <li><a href="/goit-js-final-project-cinemania/" class="header__nav-link">HOME</a></li>
      <li><a href="/goit-js-final-project-cinemania/catalog/" class="header__nav-link">CATALOG</a></li>
      <li><a href="/goit-js-final-project-cinemania/library/" class="header__nav-link">MY LIBRARY</a></li>
    </ul>
  </nav>

  <button type="button" class="header__menu-btn">MENU</button>

  <button class="theme-switch" id="theme-switch" type="button" aria-label="Toggle Theme">
    <span class="theme-switch-handle"></span>

    <div class="theme-switch-icons">
      <svg>
        <use href="#icon-dark"></use>
      </svg>

      <svg>
        <use href="#icon-light"></use>
      </svg>

    </div>

  </button>
  <div class="header__backdrop"></div>
</div>`,o="my_library_movies",l="cinemania_theme",h=e=>({id:e.id,title:e.title??e.name??"No Title",poster_path:e.poster_path??null,release_date:e.release_date??"",vote_average:e.vote_average??0,genres:Array.isArray(e.genres)?e.genres:[],genre_ids:Array.isArray(e.genre_ids)?e.genre_ids:[]}),c=()=>{try{const e=localStorage.getItem(o),t=e?JSON.parse(e):[];return Array.isArray(t)?t:[]}catch{return localStorage.removeItem(o),[]}},f=e=>{const t=c(),s=h(e);return t.find(n=>n.id===s.id)?!1:(t.push(s),localStorage.setItem(o,JSON.stringify(t)),!0)},p=e=>{const s=c().filter(a=>String(a.id)!==String(e));localStorage.setItem(o,JSON.stringify(s))},L=e=>c().some(s=>String(s.id)===String(e)),u=e=>{const t=e?"light":"dark";localStorage.setItem(l,t)},g=()=>localStorage.getItem(l),m=()=>{const e=document.querySelector("#theme-switch"),t=document.body;g()==="light"?(t.classList.add("themeLight"),e?.classList.add("theme-light")):(t.classList.remove("themeLight"),e?.classList.remove("theme-light")),e?.addEventListener("click",()=>{t.classList.toggle("themeLight"),e.classList.toggle("theme-light");const a=t.classList.contains("themeLight");u(a)})},v="/goit-js-final-project-cinemania/assets/sprite-BjDpG7Vw.svg",_=()=>{const e=window.location.pathname;document.querySelectorAll(".header__nav-link").forEach(s=>{new URL(s.href).pathname===e?s.classList.add("header__active-link"):s.classList.remove("header__active-link")})},y=()=>{const e=document.querySelector("#header");e.innerHTML=d;const t=document.querySelector(".header__nav-menu"),s=document.querySelector(".header__menu-btn"),a=document.querySelector(".header__backdrop"),n=()=>{t.classList.toggle("header__nav-menu-active"),a.classList.toggle("header__backdrop-active")};e.querySelectorAll("use").forEach(r=>{const i=r.getAttribute("href");r.setAttribute("href",`${v}${i}`)}),s.addEventListener("click",n),a.addEventListener("click",n),m(),_()};export{f as a,y as c,c as g,L as i,p as r,v as s};
