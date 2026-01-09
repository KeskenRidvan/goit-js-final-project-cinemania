import{s as E,d as G,e as M,o as A,g as w,r as k}from"./movie-grid-ETmJYsIg.js";const q=`<div class="container hero-library__container">
  <h1 class="hero-library__title">Create Your Dream Cinema</h1>
  <p class="hero-library__desc">Is a guide to designing a personalized movie theater experience with the right
    equipment, customized decor, and favorite films. This guide helps you bring the cinema experience into your own home
    with cozy seating, dim lighting, and movie theater snacks.</p>
</div>`,C=()=>{const e=document.querySelector("#library__hero");e&&(e.innerHTML=q)},H=`<div class="genre-select" data-genre-select>
  <button type="button" class="genre-select__btn" data-genre-btn>
    <span class="genre-select__label" data-genre-label>Genre</span>

    <svg class="genre-select__icon" aria-hidden="true">
      <use href="#icon-arrow-down"></use>
    </svg>
  </button>

  <ul class="genre-select__menu" data-genre-menu></ul>
</div>`,x=({containerSelector:e,genres:n,onChange:t,initialValue:s="all"})=>{const i=document.querySelector(e);if(!i)return null;i.innerHTML=H;const y=i.querySelector("use");y&&y.setAttribute("href",`${E}${y.getAttribute("href")}`);const u=i.querySelector("[data-genre-select]"),l=i.querySelector("[data-genre-btn]"),a=i.querySelector("[data-genre-label]"),c=i.querySelector("[data-genre-menu]");if(!u||!l||!a||!c)return null;let d=s,m=Array.isArray(n)?n:[];const L=()=>["all",...m],b=()=>{const r=L();c.innerHTML=r.map(o=>`<li class="genre-select__item ${o===d?"genre-select__item--active":""}" data-value="${o}">${o==="all"?"Genre":o}</li>`).join("")},g=(r,{silent:o=!1}={})=>{d=r,a.textContent=r==="all"?"Genre":r,b(),!o&&typeof t=="function"&&t(d)},p=()=>u.classList.remove("is-open"),S=()=>u.classList.toggle("is-open");g(d,{silent:!0}),l.addEventListener("click",S),c.addEventListener("click",r=>{const o=r.target.closest("[data-value]");if(!o)return;const _=o.dataset.value;g(_),p()});const f=r=>{i.contains(r.target)||p()},v=r=>{r.key==="Escape"&&p()};return document.addEventListener("click",f),document.addEventListener("keydown",v),{getValue:()=>d,setValue:r=>g(r,{silent:!0}),updateGenres:r=>{m=Array.isArray(r)?r:[],d!=="all"&&!m.includes(d)&&(d="all",a.textContent="Genre"),b()},destroy:()=>{document.removeEventListener("click",f),document.removeEventListener("keydown",v)}}},h=(e,n)=>{e.classList.remove("library-list--grid","library-list--empty"),e.classList.add(n==="empty"?"library-list--empty":"library-list--grid")},T=e=>{h(e,"empty"),e.innerHTML=`
    <div class="library-empty">
      <div class="library-empty__content">
        <p class="library-empty__title">OOPS...</p>
        <p class="library-empty__text">We are very sorry!</p>
        <p class="library-empty__text">You don’t have any movies at your library.</p>
      </div>
      <a href="/goit-js-final-project-cinemania/catalog/" class="btn btn-orange library-empty__btn">
        Search movie
      </a>
    </div>
  `},V=e=>{const n=new Set;return e.forEach(t=>{Array.isArray(t.genres)&&t.genres.forEach(s=>s?.name&&n.add(s.name))}),Array.from(n).sort((t,s)=>t.localeCompare(s))},$=(e,n)=>!n||n==="all"?e:e.filter(t=>Array.isArray(t.genres)&&t.genres.some(s=>s?.name===n)),D=()=>{G(),C(),M();const e=document.querySelector("#library__list"),n=document.querySelector("#genre-filter");if(!e)return;let t=null,s="all";const i=()=>{t&&(t.destroy(),t=null),n&&(n.innerHTML=""),s="all"},y=l=>{if(!n)return;const a=V(l);if(!t){t=x({containerSelector:"#genre-filter",genres:a,initialValue:s,onChange:c=>{s=c,u()}});return}t.updateGenres(a)},u=()=>{const l=w();if(!l.length){i(),T(e);return}y(l);const a=$(l,s);if(!a.length){renderNoResults(e);return}h(e,"grid"),k(a,e)};e.addEventListener("click",l=>{const a=l.target.closest(".movie-card");if(!a)return;const c=a.dataset.id;c&&A(c)}),window.addEventListener("library:changed",u),u()};document.addEventListener("DOMContentLoaded",D);
