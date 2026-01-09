import{a as m,o as w,r as S,i as y,b as k,c as E,d as q,e as L}from"./movie-grid-FzENuq0Q.js";import{c as T}from"./hero-SS4v5V5p.js";const C=`<div class="container weekly-trends__container">
  <div class="weekly-trends__header">
    <h2 class="weekly-trends__title">
      Weekly Trends
    </h2>
    <a class="weekly-trends__seeall" href="/goit-js-final-project-cinemania/catalog/" aria-label="See all movies">
      See all
    </a>
  </div>
  <div class="weekly-trends__list movie-grid"></div>
</div>`,H=()=>window.matchMedia("(min-width: 768px)").matches?3:1,$=async()=>{const e=document.querySelector("#weekly-trends");if(!e)return;e.innerHTML=C;const n=e.querySelector(".weekly-trends__list");if(!n)return;let o=[];const s=()=>{const r=H(),i=o.slice(0,r);i.length&&S(i,n)};try{const{data:r}=await m.get("/trending/movie/week");if(o=Array.isArray(r?.results)?r.results:[],!o.length)return;s(),window.matchMedia("(min-width: 768px)").addEventListener("change",s),n.addEventListener("click",l=>{const c=l.target.closest(".movie-card");if(!c)return;const a=c.dataset.id;a&&w(a)})}catch(r){console.error("Weekly trends error:",r)}},x=`<div class="container upcoming__container">
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
</div>`,h=e=>e.toISOString().slice(0,10),A=()=>{const e=new Date,n=new Date(e.getFullYear(),e.getMonth(),1),o=new Date(e.getFullYear(),e.getMonth()+1,0);return{start:h(n),end:h(o)}},D=(e,n)=>{if(!e)return"";const o=e.trim().split(/\s+/);return o.length<=n?e:`${o.slice(0,n).join(" ")}...`},F=async()=>{const e=document.querySelector("#upcoming-this-month");if(!e)return;e.innerHTML=x;const n=e.querySelector(".upcoming__image"),o=e.querySelector(".upcoming__title"),s=e.querySelector(".upcoming__release"),r=e.querySelector(".upcoming__vote"),i=e.querySelector(".upcoming__popularity"),l=e.querySelector(".upcoming__genre"),c=e.querySelector(".upcoming__overview"),a=e.querySelector(".upcoming__btn"),b=e.querySelectorAll("[data-upcoming-open]");try{const{start:d,end:f}=A(),{data:M}=await m.get("/discover/movie",{params:{"primary_release_date.gte":d,"primary_release_date.lte":f,sort_by:"popularity.desc",include_adult:!1,page:1}}),u=M?.results?.[0];if(!u){e.innerHTML="";return}const{data:t}=await m.get(`/movie/${u.id}`),_="https://image.tmdb.org/t/p/original",g=t.backdrop_path&&`${_}${t.backdrop_path}`||t.poster_path&&`${_}${t.poster_path}`||"";g?(n.src=g,n.alt=t.title||"Movie"):n.remove(),o.textContent=t.title||"No Title",s.innerHTML=`<span>${t.release_date||"—"}</span>`,r.innerHTML=`<span>${t.vote_average?.toFixed(1)||"0"}</span> / <span>${t.vote_count||0}</span>`,i.textContent=t.popularity?.toFixed(1)||"0",l.textContent=t.genres?.map(p=>p.name).join(", ")||"—",c.textContent=D(t.overview,45)||"No description available.";const v=()=>{a.textContent=y(t.id)?"Remove from library":"Add to my library"};v(),b.forEach(p=>p.addEventListener("click",()=>w(t.id))),a.addEventListener("click",()=>{y(t.id)?k(t.id):E(t),v(),window.dispatchEvent(new CustomEvent("library:changed",{detail:{movieId:t.id}}))})}catch(d){console.error("Upcoming this month error:",d)}},I=()=>{q(),T(),$(),F(),L()};document.addEventListener("DOMContentLoaded",I);
