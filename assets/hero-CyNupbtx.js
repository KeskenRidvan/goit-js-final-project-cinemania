import{s as _,a as p,f as v,o as b}from"./movie-grid-DRZykVbG.js";const g=`<div class="container hero-landing__container">
  <h1 class="hero-landing__header">Let's Make Your Own Cinema</h1>
  <p class="hero-landing__description"></p>
  <button type="button" id="hero-landing__btn-start" class="btn btn-orange">Get Started</button>
</div>`,f=`<div class="container hero-movie__container">
  <h1 class="hero-movie__title"></h1>

  <ul class="hero-movie__star-container"></ul>

  <p class="hero-movie__description"></p>

  <div class="hero-movie__button-container">
    <button type="button" id="hero-movie__btn-trailer" class="btn btn-orange">Watch trailer</button>
    <button type="button" id="hero-movie__btn-detail" class="btn btn-outline">More details</button>
  </div>
</div>`,u={mobile:"Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.",tablet:"Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience."},y=()=>{const e=document.querySelector(".hero-landing__description");if(!e)return;const n=window.matchMedia("(min-width: 768px)"),t=o=>{e.textContent=o?u.tablet:u.mobile};t(n.matches),n.addEventListener("change",o=>{t(o.matches)})},M=_,k=(e,n)=>{if(!e)return"";const t=e.trim().split(/\s+/);return t.length<=n?e:`${t.slice(0,n).join(" ")}...`},T=e=>{const n=(e||0)/2,t=Math.floor(n),o=n-t>=.5,s=r=>`
    <li class="hero-movie__star-item">
      <svg class="star"><use href="${M}#${r}"></use></svg>
    </li>`;let a="";for(let r=0;r<5;r++)r<t?a+=s("icon-star-full"):r===t&&o?a+=s("icon-star-half"):a+=s("icon-star-empty");return a},S=e=>{if(!e)return;const n={container:".hero-movie__container",title:".hero-movie__title",desc:".hero-movie__description",stars:".hero-movie__star-container",trailerBtn:"#hero-movie__btn-trailer",detailBtn:"#hero-movie__btn-detail"},t={};for(const[d,m]of Object.entries(n))t[d]=document.querySelector(m);const{container:o,title:s,desc:a,stars:r,trailerBtn:l,detailBtn:i}=t;if(!o)return;const h=e.backdrop_path?`https://image.tmdb.org/t/p/original${e.backdrop_path}`:"";o.style.setProperty("--hero-bg-url",`url("${h}")`),s&&(s.textContent=e.title),a&&(a.textContent=k(e.overview,20)),r&&(r.innerHTML=T(e.vote_average)),[l,i].forEach(d=>d?.setAttribute("data-movie-id",e.id))},B=async()=>{try{const e=await p.get("/trending/movie/day");return e.data.results.length?e.data.results[Math.floor(Math.random()*e.data.results.length)]:null}catch(e){return console.error("Film verisi çekilemedi:",e),null}},L=async()=>{const e=document.querySelector("#hero");if(!e)return;const n=await B();if(n){e.innerHTML=f,S(n);const s=document.querySelector("#hero-movie__btn-trailer"),a=document.querySelector("#hero-movie__btn-detail"),r=i=>{const c=i.currentTarget.dataset.movieId;c&&v(c)},l=i=>{const c=i.currentTarget.dataset.movieId;c&&b(c)};s?.addEventListener("click",i=>r(i)),a?.addEventListener("click",i=>l(i));return}e.innerHTML=g,y();const t=document.querySelector("#hero-landing__btn-start"),o=()=>{window.location.href="/catalog/"};t?.addEventListener("click",o)};export{L as c};
