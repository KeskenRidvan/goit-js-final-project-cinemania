import{s as k,i as w,r as T,a as E,c as L}from"./header-Cl8itn-T.js";import{a as m,o as q,b as h,r as H,c as C}from"./movie-grid-DhbnrA0Y.js";const $=`<div class="container hero-landing__container">
  <h1 class="hero-landing__header">Let's Make Your Own Cinema</h1>
  <p class="hero-landing__description"></p>
  <button type="button" id="hero-landing__btn-start" class="btn btn-orange">Get Started</button>
</div>`,B=`<div class="container hero-movie__container">
  <h1 class="hero-movie__title"></h1>

  <ul class="hero-movie__star-container"></ul>

  <p class="hero-movie__description"></p>

  <div class="hero-movie__button-container">
    <button type="button" id="hero-movie__btn-trailer" class="btn btn-orange">Watch trailer</button>
    <button type="button" id="hero-movie__btn-detail" class="btn btn-outline">More details</button>
  </div>
</div>`,M={mobile:"Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.",tablet:"Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience."},I=()=>{const e=document.querySelector(".hero-landing__description");if(!e)return;const t=window.matchMedia("(min-width: 768px)"),n=a=>{e.textContent=a?M.tablet:M.mobile};n(t.matches),t.addEventListener("change",a=>{n(a.matches)})},x=k,D=(e,t)=>{if(!e)return"";const n=e.trim().split(/\s+/);return n.length<=t?e:`${n.slice(0,t).join(" ")}...`},j=e=>{const t=(e||0)/2,n=Math.floor(t),a=t-n>=.5,o=s=>`
    <li class="hero-movie__star-item">
      <svg class="star"><use href="${x}#${s}"></use></svg>
    </li>`;let i="";for(let s=0;s<5;s++)s<n?i+=o("icon-star-full"):s===n&&a?i+=o("icon-star-half"):i+=o("icon-star-empty");return i},A=e=>{if(!e)return;const t={container:".hero-movie__container",title:".hero-movie__title",desc:".hero-movie__description",stars:".hero-movie__star-container",trailerBtn:"#hero-movie__btn-trailer",detailBtn:"#hero-movie__btn-detail"},n={};for(const[u,_]of Object.entries(t))n[u]=document.querySelector(_);const{container:a,title:o,desc:i,stars:s,trailerBtn:l,detailBtn:c}=n;if(!a)return;const p=e.backdrop_path?`https://image.tmdb.org/t/p/original${e.backdrop_path}`:"";a.style.setProperty("--hero-bg-url",`url("${p}")`),o&&(o.textContent=e.title),i&&(i.textContent=D(e.overview,20)),s&&(s.innerHTML=j(e.vote_average)),[l,c].forEach(u=>u?.setAttribute("data-movie-id",e.id))},O=async()=>{try{const e=await m.get("/trending/movie/day");return e.data.results.length?e.data.results[Math.floor(Math.random()*e.data.results.length)]:null}catch(e){return console.error("Film verisi çekilemedi:",e),null}},U=async()=>{const e=document.querySelector("#hero");if(!e)return;const t=await O();if(t){e.innerHTML=B,A(t);const o=document.querySelector("#hero-movie__btn-trailer"),i=document.querySelector("#hero-movie__btn-detail"),s=c=>{const d=c.currentTarget.dataset.movieId;d&&q(d)},l=c=>{const d=c.currentTarget.dataset.movieId;d&&h(d)};o?.addEventListener("click",c=>s(c)),i?.addEventListener("click",c=>l(c));return}e.innerHTML=$,I();const n=document.querySelector("#hero-landing__btn-start"),a=()=>{window.location.href="/catalog/"};n?.addEventListener("click",a)},F=`<div class="container weekly-trends__container">
  <div class="weekly-trends__header">
    <h2 class="weekly-trends__title">
      Weekly Trends
    </h2>
    <a class="weekly-trends__seeall" href="/goit-js-final-project-cinemania/catalog/" aria-label="See all movies">
      See all
    </a>
  </div>
  <div class="weekly-trends__list movie-grid"></div>
</div>`,R=()=>window.matchMedia("(min-width: 768px)").matches?3:1,P=async()=>{const e=document.querySelector("#weekly-trends");if(!e)return;e.innerHTML=F;const t=e.querySelector(".weekly-trends__list");if(!t)return;let n=[];const a=()=>{const o=R(),i=n.slice(0,o);i.length&&H(i,t)};try{const{data:o}=await m.get("/trending/movie/week");if(n=Array.isArray(o?.results)?o.results:[],!n.length)return;a(),window.matchMedia("(min-width: 768px)").addEventListener("change",a),t.addEventListener("click",s=>{const l=s.target.closest(".movie-card");if(!l)return;const c=l.dataset.id;c&&h(c)})}catch(o){console.error("Weekly trends error:",o)}},N=`<div class="container upcoming__container">
  <h2 class="upcoming__heading">UPCOMING THIS MONTH</h2>

  <div class="upcoming__layout">

    <div class="upcoming__media" data-upcoming-open>
      <img class="upcoming__image" alt="" />
    </div>

    <div class="upcoming__content">
      <h3 class="upcoming__title" data-upcoming-open></h3>

      <div class="upcoming__meta">
        <div class="upcoming__meta-left">
          <p>Release date</p>
          <p>Vote / Votes</p>
          <p>Popularity</p>
          <p>Genre</p>
        </div>

        <div class="upcoming__meta-right">
          <p class="upcoming__release"></p>
          <p class="upcoming__vote"></p>
          <p class="upcoming__popularity"></p>
          <p class="upcoming__genre"></p>
        </div>
      </div>

      <div class="upcoming__about">ABOUT</div>
      <p class="upcoming__overview"></p>

      <button type="button" class="btn btn-orange upcoming__btn">
        Add to my library
      </button>
    </div>

  </div>
</div>`,S=e=>e.toISOString().slice(0,10),Y=()=>{const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),n=new Date(e.getFullYear(),e.getMonth()+1,0);return{start:S(t),end:S(n)}},G=(e,t)=>{if(!e)return"";const n=e.trim().split(/\s+/);return n.length<=t?e:`${n.slice(0,t).join(" ")}...`},V=async()=>{const e=document.querySelector("#upcoming-this-month");if(!e)return;e.innerHTML=N;const t=e.querySelector(".upcoming__image"),n=e.querySelector(".upcoming__title"),a=e.querySelector(".upcoming__release"),o=e.querySelector(".upcoming__vote"),i=e.querySelector(".upcoming__popularity"),s=e.querySelector(".upcoming__genre"),l=e.querySelector(".upcoming__overview"),c=e.querySelector(".upcoming__btn"),d=e.querySelectorAll("[data-upcoming-open]");try{const{start:p,end:u}=Y(),{data:_}=await m.get("/discover/movie",{params:{"primary_release_date.gte":p,"primary_release_date.lte":u,sort_by:"popularity.desc",include_adult:!1,page:1}}),v=_?.results?.[0];if(!v){e.innerHTML="";return}const{data:r}=await m.get(`/movie/${v.id}`),y="https://image.tmdb.org/t/p/original",b=r.backdrop_path&&`${y}${r.backdrop_path}`||r.poster_path&&`${y}${r.poster_path}`||"";b?(t.src=b,t.alt=r.title||"Movie"):t.remove(),n.textContent=r.title||"No Title",a.innerHTML=`<span>${r.release_date||"—"}</span>`,o.innerHTML=`<span>${r.vote_average?.toFixed(1)||"0"}</span> / <span>${r.vote_count||0}</span>`,i.textContent=r.popularity?.toFixed(1)||"0",s.textContent=r.genres?.map(g=>g.name).join(", ")||"—",l.textContent=G(r.overview,45)||"No description available.";const f=()=>{c.textContent=w(r.id)?"Remove from library":"Add to my library"};f(),d.forEach(g=>g.addEventListener("click",()=>h(r.id))),c.addEventListener("click",()=>{w(r.id)?T(r.id):E(r),f(),window.dispatchEvent(new CustomEvent("library:changed",{detail:{movieId:r.id}}))})}catch(p){console.error("Upcoming this month error:",p)}},W=()=>{L(),U(),P(),V(),C()};document.addEventListener("DOMContentLoaded",W);
