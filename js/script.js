// animação simples ao rolar
const elementos = document.querySelectorAll('.evento');

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    header.classList.toggle("scrolled", window.scrollY > 50);
});

// ANIMAÇÃO AO SCROLL
const eventos = document.querySelectorAll(".evento");

window.addEventListener("scroll", () => {
    eventos.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) {
            el.classList.add("show");
        }
    });
});

// LIGHTBOX
const imagens = document.querySelectorAll(".evento img");

imagens.forEach(img => {
    img.addEventListener("click", () => {
        const lightbox = document.querySelector(".lightbox");
        const lightImg = document.querySelector(".lightbox img");

        lightbox.style.display = "flex";
        lightImg.src = img.src;
    });
});

document.querySelector(".lightbox").addEventListener("click", () => {
    document.querySelector(".lightbox").style.display = "none";
});