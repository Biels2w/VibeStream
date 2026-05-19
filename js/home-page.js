// =========================================
// ANIMAÇÃO — VISUALIZADOR DE MÚSICA (BANNER)
// =========================================

function criarVisualizador() {
    const bannerDireita = document.querySelector('.banner-direita');
    if (!bannerDireita) return;

    bannerDireita.innerHTML = `
        <div class="visualizador-container">
            <div class="disco-wrapper">
                <div class="disco">
                    <div class="disco-centro"></div>
                </div>
                <div class="onda-disco onda-1"></div>
                <div class="onda-disco onda-2"></div>
                <div class="onda-disco onda-3"></div>
            </div>
            <div class="barras-container">
                ${Array.from({ length: 28 }, (_, i) => `<div class="barra-viz" id="barra-${i}"></div>`).join('')}
            </div>
            <p class="vizualizador-label">♪ tocando agora</p>
        </div>
    `;

    animarBarras();
    animarOndas();
}

// =========================================
// ANIMAÇÃO DAS BARRAS
// =========================================
function animarBarras() {
    const barras = document.querySelectorAll('.barra-viz');
    if (!barras.length) return;

    const alturas = Array.from({ length: barras.length }, () => Math.random());
    const velocidades = Array.from({ length: barras.length }, () => 0.02 + Math.random() * 0.04);
    const fases = Array.from({ length: barras.length }, () => Math.random() * Math.PI * 2);

    let t = 0;

    function loop() {
        t += 1;
        barras.forEach((barra, i) => {
            const onda = Math.sin(t * velocidades[i] + fases[i]);
            const base = 15 + i * 1.5;
            const altura = base + onda * (20 + alturas[i] * 30);
            barra.style.height = `${Math.max(6, altura)}px`;
        });
        requestAnimationFrame(loop);
    }

    loop();
}

// =========================================
// ANIMAÇÃO DAS ONDAS DO DISCO
// =========================================
function animarOndas() {
    const ondas = document.querySelectorAll('.onda-disco');
    ondas.forEach((onda, i) => {
        onda.style.animationDelay = `${i * 0.6}s`;
    });
}

// =========================================
// INICIALIZAÇÃO
// =========================================
document.addEventListener('DOMContentLoaded', criarVisualizador);



const carrossel = document.querySelector('.carrossel');

carrossel.innerHTML += carrossel.innerHTML;

carrossel.scrollLeft = 0;

carrossel.addEventListener('scroll', () => {
    const fimDoScroll = carrossel.scrollWidth - carrossel.clientWidth;

    if (carrossel.scrollLeft >= fimDoScroll - 5) {
        carrossel.scrollLeft = 0;
    }
});


// =========================================
// OVERFLOW ARTISTAS — arrastar com mouse
// =========================================
const artistasGeral = document.getElementById('artistas-geral');

// Scroll infinito — duplica o conteúdo
artistasGeral.innerHTML += artistasGeral.innerHTML;
artistasGeral.scrollLeft = 0;

artistasGeral.addEventListener('scroll', () => {
    const fimDoScroll = artistasGeral.scrollWidth - artistasGeral.clientWidth;

    if (artistasGeral.scrollLeft >= fimDoScroll - 5) {
        artistasGeral.scrollLeft = 0;
    }
});

// Arrastar com mouse
let isDown = false;
let startX;
let scrollLeft;

artistasGeral.addEventListener('mousedown', (e) => {
    isDown = true;
    artistasGeral.style.cursor = 'grabbing';
    startX = e.pageX - artistasGeral.offsetLeft;
    scrollLeft = artistasGeral.scrollLeft;
});

artistasGeral.addEventListener('mouseleave', () => {
    isDown = false;
    artistasGeral.style.cursor = 'grab';
});

artistasGeral.addEventListener('mouseup', () => {
    isDown = false;
    artistasGeral.style.cursor = 'grab';
});

artistasGeral.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - artistasGeral.offsetLeft;
    const walk = (x - startX) * 1.5;
    artistasGeral.scrollLeft = scrollLeft - walk;
});