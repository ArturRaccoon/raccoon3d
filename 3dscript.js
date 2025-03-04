document.addEventListener("DOMContentLoaded", function () {
    let clickCount = 0;
    const maxClicks = 5;
    const raccoonContainer = document.getElementById("raccoonContainer");
    const progressFill = document.getElementById("progressFill");
    const clickCountDisplay = document.getElementById("clickCount");
    
    // Different states of the raccoon (images & 3D)
    const raccoonStates = [
        "raccoon1.png",
        "raccoon2.png",
        "raccoon3.png",
        "models/raccoon4.glb"  // Ensure this file exists!
    ];
    
    // Random positions
    const positions = [
        { top: "20%", left: "15%" },
        { top: "40%", left: "70%" },
        { top: "60%", left: "30%" },
        { top: "80%", left: "50%" }
    ];
    
    // Random shapes
    const shapes = ["clip-circle", "clip-hexagon", "clip-diamond"];

    raccoonContainer.addEventListener("click", function () {
        if (clickCount < maxClicks) {
            clickCount++;
            updateRaccoonDisplay();
            progressFill.style.width = `${(clickCount / maxClicks) * 100}%`;
            clickCountDisplay.textContent = clickCount;
        }
    });

    function updateRaccoonDisplay() {
        let stateIndex = Math.min(clickCount, raccoonStates.length - 1);
        let posIndex = Math.min(clickCount, positions.length - 1);
        let shapeIndex = Math.min(clickCount, shapes.length - 1);

        raccoonContainer.className = `raccoon-container ${shapes[shapeIndex]}`;
        raccoonContainer.style.top = positions[posIndex].top;
        raccoonContainer.style.left = positions[posIndex].left;
        
        if (raccoonStates[stateIndex].endsWith(".glb")) {
            raccoonContainer.innerHTML = `
                <model-viewer 
                    src="${raccoonStates[stateIndex]}" 
                    auto-rotate 
                    camera-controls 
                    interaction-prompt="none"
                    shadow-intensity="1"
                    style="width: 100%; height: 100%;">
                </model-viewer>`;
        } else {
            raccoonContainer.innerHTML = "";
            raccoonContainer.style.backgroundImage = `url('${raccoonStates[stateIndex]}')`;
            raccoonContainer.style.backgroundSize = "contain";
            raccoonContainer.style.backgroundRepeat = "no-repeat";
        }
    }

    // Special Effect Button Logic
    function showSpecialEffect(type) {
        alert(`You triggered a ${type} effect!`);
    }

    window.showSpecialEffect = showSpecialEffect;
});
