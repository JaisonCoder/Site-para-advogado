let content = document.querySelector(".conteiner-2");
let contentOffset = content.offsetTop - window.innerHeight;
let contentTrabalhos = document.querySelector(".conteiner-trabalhos");
let contentTrabalhosOffset = contentTrabalhos.offsetTop - window.innerHeight;

window.addEventListener("scroll", function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > contentOffset) {
    fadeIn(content);
  }

  if (currentScroll > contentTrabalhosOffset) {
    fadeInFromLeft(contentTrabalhos);
  }
});

function fadeIn(element) {
  element.classList.add("fade-in");
}

function fadeInFromLeft(element) {
  element.classList.add("fade-in-left");
}
document.addEventListener("DOMContentLoaded", function() {
  let content = document.querySelector(".conteiner-pc");
  let contentOffset = content.offsetTop - window.innerHeight;

  window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > contentOffset) {
      content.classList.add("fade-up");
    }
  });
});
