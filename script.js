// =========================
// HERO IMAGE SLIDER
// =========================

const slides = document.querySelectorAll(".slide");

if (slides.length > 0) {

let current = 0;

setInterval(() => {

slides[current].classList.remove("active");

current++;

if(current >= slides.length){

current = 0;

}

slides[current].classList.add("active");

},4000);

}



// =========================
// COUNTERS
// =========================

const counters = document.querySelectorAll(".counter");

counters.forEach(counter=>{

let start=0;

const target=+counter.dataset.target;

const speed=target/100;

function update(){

start+=speed;

if(start<target){

counter.innerHTML=Math.floor(start);

requestAnimationFrame(update);

}

else{

counter.innerHTML=target+"+";

}

}

update();

});



// =========================
// GALLERY LIGHTBOX
// =========================

const galleryImages=document.querySelectorAll(".gallery-card img");

galleryImages.forEach(img=>{

img.addEventListener("click",()=>{

const overlay=document.createElement("div");

overlay.className="lightbox";

overlay.innerHTML=`

<img src="${img.src}">

`;

overlay.onclick=()=>overlay.remove();

document.body.appendChild(overlay);

});

});
/*=====================
TESTIMONIAL SLIDER
=====================*/

const reviews=document.querySelectorAll(".testimonial-card");

if(reviews.length>0){

let reviewIndex=0;

setInterval(()=>{

reviews[reviewIndex].classList.remove("active");

reviewIndex++;

if(reviewIndex>=reviews.length){

reviewIndex=0;

}

reviews[reviewIndex].classList.add("active");

},4000);

}
/* FAQ */

const faq=document.querySelectorAll(".faq-question");

faq.forEach(button=>{

button.onclick=()=>{

button.parentElement.classList.toggle("active");

};

});
/*=========================
MOBILE MENU
=========================*/

const menuBtn=document.querySelector(".menu-btn");

const nav=document.querySelector("nav");

if(menuBtn){

menuBtn.onclick=()=>{

nav.classList.toggle("show");

};

}
/*=========================
SCROLL TO TOP
=========================*/

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};
/*=========================
LOADER
=========================*/

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

if(loader){

loader.style.opacity="0";

loader.style.transition="0.5s";

setTimeout(()=>{

loader.style.display="none";

},500);

}

});