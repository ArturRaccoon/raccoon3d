const romanticMessages = [
    "Історія кохання починається...",
    "Наші серця б'ються одночасно",
    "Моя лінія життя перетинається тобою",
    "Ти мій місяць",
    "Ти моє сонце",
    "Ти мої зірки",
    "Я уже твій",
    "Ох! Це так мило, ти заповнила моє серце 💞",
];

const raccoonStates = [
    'beggining.jpg', // Ensure the filename matches your asset
    'sync.jpg',
    'lines.jpg',
    'moon.jpg',
    'sun.jpg',
    'stars.jpg',
    'floating.jpg',
    'raccoon.glb'
];

// Define unique positions for each state
const positions = [
    { top: "5%", left: "5%" },
    { top: "5%", left: "70%" },
    { top: "40%", left: "10%" },
    { top: "60%", left: "50%" },
    { top: "30%", left: "30%" },
    { top: "70%", left: "10%" },
    { top: "20%", left: "80%" },
    { top: "70%", left: "70%" }
];

// Define unique shapes using CSS clip-path values (or "none" for default rectangle)
const shapes = [
    "circle(50% at 50% 50%)",
    "ellipse(40% 50% at 50% 50%)",
    "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    "inset(10% round 20px)",
    "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
    "circle(70% at 50% 50%)",
    "ellipse(60% 70% at 50% 50%)",
    "none"
];

let clickCount = 0;
const maxClicks = 8;

// DOM Elements
const raccoonContainer = document.getElementById('raccoonContainer');
const raccoon = document.getElementById('raccoon');
const progressFill = document.getElementById('progressFill');
const romanticMessage = document.getElementById('romanticMessage');
const heartSound = document.getElementById('heartSound');

function updateProgress() {
    const progress = (clickCount / maxClicks) * 100;
    progressFill.style.width = `${progress}%`;
    document.getElementById('clickCount').textContent = clickCount;
}

function animateRaccoon() {
    raccoon.style.transform = 'scale(1.1)';
    setTimeout(() => {
        raccoon.style.transform = 'scale(1)';
    }, 200);
}

function showHeartBurst() {
    const burst = document.querySelector('.heart-burst');
    burst.style.animation = 'burst 0.8s ease-out';
    setTimeout(() => {
        burst.style.animation = '';
    }, 800);
}

function createHearts(x, y) {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.animation = `float ${2 + i}s linear`;
        document.getElementById('heartsBackground').appendChild(heart);
        setTimeout(() => heart.remove(), (2 + i) * 1000);
    }
}

function updateMessage() {
    romanticMessage.textContent = romanticMessages[Math.min(clickCount, romanticMessages.length - 1)];
    romanticMessage.style.animation = 'textFade 1s ease';
}

function updateRaccoonDisplay() {
    const currentState = raccoonStates[Math.min(clickCount, raccoonStates.length - 1)];
    if (currentState.endsWith('.glb')) {
        // For 3D models using <model-viewer>
        raccoon.style.backgroundImage = '';
        raccoon.innerHTML = `<model-viewer src="${currentState}" auto-rotate camera-controls style="width:100%; height:100%;"></model-viewer>`;
    } else {
        raccoon.innerHTML = "";
        raccoon.style.backgroundImage = `url('${currentState}')`;
    }
    
    // Set a unique position for the container
    const pos = positions[Math.min(clickCount, positions.length - 1)];
    raccoonContainer.style.top = pos.top;
    raccoonContainer.style.left = pos.left;
    
    // Set a unique shape using clip-path on the raccoon element
    const shape = shapes[Math.min(clickCount, shapes.length - 1)];
    if (shape === "none") {
        raccoon.style.clipPath = "";
    } else {
        raccoon.style.clipPath = shape;
    }
}

function handleClick(event) {
    if (clickCount >= maxClicks) return;

    clickCount++;
    updateProgress();
    updateMessage();
    animateRaccoon();
    showHeartBurst();
    createHearts(event.clientX, event.clientY);
    updateRaccoonDisplay();

    heartSound.currentTime = 0;
    heartSound.play();

    if (clickCount === maxClicks) {
        setTimeout(() => {
            document.getElementById('pageTransition').style.opacity = '1';
            setTimeout(() => {
                window.location.href = 'love-letter.html';
            }, 1000);
        }, 2000);
    }
}

document.getElementById('raccoonContainer').addEventListener('click', handleClick);

document.addEventListener('DOMContentLoaded', () => {
    // Ensure the container is absolutely positioned
    raccoonContainer.style.position = 'absolute';
    
    // Initialize the first state
    raccoon.style.backgroundImage = `url('${raccoonStates[0]}')`;
    romanticMessage.textContent = romanticMessages[0];
    
    // Set initial position and shape
    const pos = positions[0];
    raccoonContainer.style.top = pos.top;
    raccoonContainer.style.left = pos.left;
    const shape = shapes[0];
    raccoon.style.clipPath = shape;
});
