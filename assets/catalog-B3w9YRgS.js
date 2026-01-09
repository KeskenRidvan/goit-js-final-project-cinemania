import{d as M,e as S,o as x,r as q,a as E}from"./movie-grid-ETmJYsIg.js";import{c as P}from"./hero-hpBvxOhO.js";const C=`<div class="filters" data-filters>
  <input class="filters__input" data-search-input type="text" placeholder="Search" autocomplete="off" />

  <input class="filters__input filters__input--film" data-film-input type="text" placeholder="Film"
    autocomplete="off" />

  <select class="filters__select" data-year-select aria-label="Select Release Year">
    <option value="">Year</option>
  </select>

  <button class="filters__btn" type="button" data-search-btn aria-label="Search Movies">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </button>
</div>`,H=(t=2015)=>{const e=new Date().getFullYear(),a=[];for(let n=e;n>=t;n--)a.push(n);return a},$=({containerSelector:t,fromYear:e=2015,initial:a={query:"",film:"",year:""},mode:n="idle",onSearch:s=()=>{},onChange:o=()=>{}}={})=>{const r=document.querySelector(t);if(!r)return console.warn(`CatalogFilter: container not found: ${t}`),null;r.innerHTML=C;const g=r.querySelector("[data-filters]"),c=r.querySelector("[data-search-input]"),u=r.querySelector("[data-film-input]"),d=r.querySelector("[data-year-select]"),p=r.querySelector("[data-search-btn]"),k=H(e);d.innerHTML='<option value="">Year</option>'+k.map(i=>`<option value="${i}">${i}</option>`).join(""),c.value=a.query??"",u.value=a.film??"",d.value=a.year??"";const m=i=>{i==="active"?g.classList.add("filters--active"):g.classList.remove("filters--active")},v=()=>({query:c.value.trim(),film:u.value.trim(),year:d.value}),y=()=>{const i=v();g.classList.contains("filters--active")||(m("active"),i.query&&!i.film&&(u.value=i.query));const w=v();s({film:w.film,year:w.year})},f=i=>{i.key==="Enter"&&y()},b=()=>{const{film:i,year:_}=v();o({film:i,year:_})};return p.addEventListener("click",y),c.addEventListener("keydown",f),u.addEventListener("keydown",f),d.addEventListener("change",b),m(n),{setMode:m,getValues:v,destroy:()=>{p.removeEventListener("click",y),c.removeEventListener("keydown",f),u.removeEventListener("keydown",f),d.removeEventListener("change",b),r.innerHTML=""}}},T=()=>window.matchMedia("(max-width: 480px)").matches,F=t=>String(t).padStart(2,"0"),L=t=>{const e=[...new Set(t)].sort((n,s)=>n-s),a=[];for(let n=0;n<e.length;n++){const s=e[n],o=e[n-1];n>0&&s-o>1&&a.push("..."),a.push(s)}return a},N=({current:t,total:e,compact:a})=>{if(a){const o=[1,t-1,t,t+1].filter(r=>r>0&&r<=e);return e-t<3&&o.push(e),L(o)}const n=[];n.push(1);const s=2;for(let o=t-s;o<=t+s;o++)o>1&&o<=e&&n.push(o);if(t<5)for(let o=2;o<=Math.min(6,e);o++)n.push(o);return e-t<=5&&n.push(e),L(n)},j=({containerSelector:t,currentPage:e,totalPages:a,onPageChange:n})=>{const s=document.querySelector(t);if(!s)return;const o=Number(a)||1,r=Number(e)||1;if(o<=1){s.innerHTML="";return}const g=N({current:r,total:o,compact:T()});s.innerHTML=`
    <div class="pagination">
      <button class="pagination__btn" data-page="prev" aria-label="Previous Page" ${r<=1?"disabled":""}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <div class="pagination__pages">
        ${g.map(c=>c==="..."?'<span class="pagination__dots">...</span>':`<button class="${c===r?"pagination__page pagination__page--active":"pagination__page"}" data-page="${c}">${F(c)}</button>`).join("")}
      </div>

      <button class="pagination__btn" data-page="next" aria-label="Next Page" ${r>=o?"disabled":""}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  `,s.onclick=c=>{const u=c.target.closest("[data-page]");if(!u)return;const d=u.dataset.page;let p=r;d==="prev"?p=r-1:d==="next"?p=r+1:p=Number(d),n&&n(p)}},l={film:"",year:"",page:1,totalPages:1},Y=async()=>{try{const{film:t,year:e,page:a}=l;let n="/discover/movie",s={page:a,include_adult:!1,sort_by:"popularity.desc"};t?(n="/search/movie",s={query:t,page:a,include_adult:!1},e&&(s.year=e)):e&&(s.primary_release_year=e);const{data:o}=await E.get(n,{params:s});return{results:o?.results??[],totalPages:o?.total_pages??1}}catch(t){return console.error("Fetch Error:",t),{results:[],totalPages:1}}},h=async()=>{const t=document.querySelector("#catalog-list");if(!t)return;t.innerHTML='<div style="color:white; text-align:center;">Loading...</div>';const{results:e,totalPages:a}=await Y();l.totalPages=Math.max(1,Number(a)||1),e.length===0?t.innerHTML='<div style="color:white; text-align:center;">No movies found.</div>':q(e,t),j({containerSelector:"#pagination",currentPage:l.page,totalPages:l.totalPages,onPageChange:n=>{l.page=n,window.scrollTo({top:0,behavior:"smooth"}),h()}})},A=()=>{M(),P(),S(),$({containerSelector:"#catalog-filters",mode:l.film?"active":"idle",onSearch:({film:e,year:a})=>{l.film=e,l.year=a,l.page=1,h()},onChange:({film:e,year:a})=>{l.film=e,l.year=a,l.page=1,h()}}),document.querySelector("#catalog-list")?.addEventListener("click",e=>{const a=e.target.closest(".movie-card");a&&a.dataset.id&&x(a.dataset.id)}),h()};document.addEventListener("DOMContentLoaded",A);
