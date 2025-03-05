// Array di messaggi romantici
const romanticMessages = [
  "Історія кохання починається...",
  "Наші серця б'ються одночасно",
  "Моя лінія життя перетинається тобою",
  "Ти мій місяць",
  "Ти моє сонце",
  "Ти мої зірки",
  "Я уже близько...",
  "Ох! Це так мило, ти заповнила моє серце 💞",
];

// Array di stati del raccoon
const raccoonStates = [
  'beggining.jpg',
  'sync.jpg',
  'lines.jpg',
  'moon.jpg',
  'sun.mp4',
  'stars.jpg',
  'heart.jpg',
  'raccoon.glb'
];

// Posizioni per il raccoon e per i messaggi
const positions = [
  { top: "30%", left: "10%" },
  { top: "10%", left: "69%" },
  { top: "20%", left: "10%" },
  { top: "60%", left: "50%" },
  { top: "10%", left: "30%" },
  { top: "65%", left: "65%" },
  { top: "30%", left: "30%" },
  { top: "50%", left: "50%" }
];

const shapes = [
  "circle(40% at 50% 50%)",
  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  "inset(10% round 20px)",
  "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
  "circle(70% at 50% 50%)",
  "none"
];

const positionsM = [
  { left: "10%", top: "10%" },
  { left: "60%", top: "15%" },
  { left: "20%", top: "30%" },
  { left: "50%", top: "40%" },
  { left: "30%", top: "50%" },
  { left: "70%", top: "60%" },
  { left: "40%", top: "70%" }
];

// Array di immagini di sfondo per le pagine
const pageBackgrounds = [
  'bg1.jpg',
  'bg2.jpg',
  'bg3.jpg',
  'bg4.jpg',
  'bg5.jpg',
  'bg6.jpg',
  'bg7.jpg',
  'bg8.jpg'
];

let clickCount = 0;
const maxClicks = 8;
let currentPage;

const pagesContainer = document.getElementById('pagesContainer');
const heartSound = document.getElementById('heartSound');

// Funzione di smooth scroll (durata 1500ms)
function smoothScrollTo(target, duration) {
  let start = window.pageYOffset;
  let end = target.offsetTop;
  let distance = end - start;
  let startTime = null;
  
  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    let elapsed = currentTime - startTime;
    let progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * progress);
    if (elapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}

// Crea una nuova pagina clonando il template HTML e aggiornandone i dati
function createPage(index) {
  const page = document.createElement('div');
  page.className = 'page';

  // Sfondo con immagine ed effetto blur
  const bg = document.createElement('div');
  bg.className = 'page-bg';
  bg.style.backgroundImage = `url('${pageBackgrounds[index] || 'default.jpg'}')`;
  page.appendChild(bg);

  const templateContent = document.getElementById('page-template').content.cloneNode(true);
  const container = templateContent.querySelector('.container');
  
  // Aggiorna la barra di progresso (senza contatore testuale)
  const progressFill = container.querySelector('.progress-fill');
  progressFill.style.width = `${(index / maxClicks) * 100}%`;
  
  // Imposta il messaggio romantico
  const romanticMessage = container.querySelector('.romantic-message');
  romanticMessage.textContent =
    index === 0 ? romanticMessages[0] : romanticMessages[Math.min(index, romanticMessages.length - 1)];
  const posM = positionsM[index] || { left: '50%', top: '10%' };
  romanticMessage.style.left = posM.left;
  romanticMessage.style.top = posM.top;
  
  // Aggiorna il contenitore e il media del raccoon
  const raccoonContainer = container.querySelector('.raccoon-container');
  const raccoon = container.querySelector('.raccoon');
  const currentState = raccoonStates[index] || raccoonStates[raccoonStates.length - 1];
  
  if (currentState.endsWith('.glb')) {
    raccoon.innerHTML = `
      <model-viewer 
        src="${currentState}" 
        autoplay 
        animation-name="dance" 
        auto-rotate 
        camera-controls 
        rotation-per-second="30deg"
        style="width:100%; height:100%;"
      ></model-viewer>
    `;
  
    raccoon.style.backgroundImage = '';
  } else if (currentState.endsWith('.mp4')) {
    // Gestione dei file video
    raccoon.innerHTML = `
      <video autoplay muted loop playsinline style="width:100%; height:100%; object-fit: cover;">
        <source src="${currentState}" type="video/mp4">
      </video>
    `;
    raccoon.style.backgroundImage = '';
  } else {
    raccoon.innerHTML = "";
    raccoon.style.backgroundImage = `url('${currentState}')`;
  }
  
  // Imposta la clip-path in base allo stato
  if (currentState === 'sync.jpg') {
    raccoon.style.clipPath = "polygon(50% 20%, 60% 5%, 75% 10%, 90% 30%, 85% 60%, 50% 100%, 15% 60%, 10% 30%, 25% 10%, 40% 5%)";
  } else if (currentState === 'lines.jpg') {
    raccoon.style.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
  } else {
    const shape = shapes[index] || shapes[shapes.length - 1];
    raccoon.style.clipPath = shape === "none" ? "" : shape;
  }
  
  const pos = positions[index] || positions[positions.length - 1];
  raccoonContainer.style.top = pos.top;
  raccoonContainer.style.left = pos.left;
  
  page.appendChild(container);
  return page;
}

// Aggiunge gli eventi di click al contenitore del raccoon
function attachEvents(page) {
  const raccoonContainer = page.querySelector('.raccoon-container');
  raccoonContainer.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    handleClick(e);
  });
}


// Anima il raccoon con una trasformazione "epica"
function animateRaccoon() {
  const raccoon = currentPage.querySelector('.raccoon');
  raccoon.classList.add('epic');
  setTimeout(() => {
    raccoon.classList.remove('epic');
  }, 1000);
}

// Crea l'effetto dei cuoricini alla posizione del click
function createHearts(x, y) {
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.animation = `float ${2 + i}s linear`;
    pagesContainer.appendChild(heart);
    setTimeout(() => heart.remove(), (2 + i) * 1000);
  }
}

// Mostra il segno di spunta nell'area cliccata
function showMark(page) {
  const raccoonContainer = page.querySelector('.raccoon-container');
  const mark = document.createElement('div');
  mark.className = 'picture-mark';
  mark.textContent = '✓';
  raccoonContainer.appendChild(mark);
  setTimeout(() => mark.remove(), 1000);
}

// Gestione del click: la pagina corrente resta invariata e ne viene creata una nuova
function handleClick(event) {
  if (clickCount >= maxClicks) return;
  clickCount++;
  
  animateRaccoon();
  createHearts(event.clientX, event.clientY);
  showMark(currentPage);
  heartSound.currentTime = 0;
  heartSound.play();
  
  if (clickCount < maxClicks) {
    const newPage = createPage(clickCount);
    newPage.classList.add('soft-in');
    pagesContainer.appendChild(newPage);
    attachEvents(newPage);
    smoothScrollTo(newPage, 1500);
    currentPage = newPage;
  } else {
    setTimeout(() => {
      document.querySelector('.page-transition').style.opacity = '1';
      setTimeout(() => {
        window.location.href = 'love-letter.html';
      }, 1000);
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  currentPage = createPage(0);
  pagesContainer.appendChild(currentPage);
  attachEvents(currentPage);
});
