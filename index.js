// Variables pour suivre l'état actuel de l'écran
let currentScreen = 1; // 1 pour la première interface, 2 pour la seconde

// Gestion des swipes tactiles
let touchstartX = 0;
let touchendX = 0;
const threshold = 50; // Distance minimale du swipe pour déclencher une action

const applications = document.querySelector('.applications');

applications.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
}, false);

applications.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeDistance = touchendX - touchstartX;

    if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance < -threshold && currentScreen === 1) {
            // Swipe vers la gauche (de droite à gauche), passe à l'écran suivant
            right();
        } else if (swipeDistance > threshold && currentScreen === 2) {
            // Swipe vers la droite (de gauche à droite), revient à l'écran précédent
            left();
        }
    }
}

// Fonction pour changer d'écran à gauche
function left() {
    if (currentScreen > 1) {
        document.querySelector('.applications').classList.remove('active-slide');
        document.querySelector('.span1').classList.add('active-screen');
        document.querySelector('.span2').classList.remove('active-screen');
        currentScreen--; // Revenir à la première interface
    }
}

// Fonction pour changer d'écran à droite
function right() {
    if (currentScreen < 2) {
        document.querySelector('.applications').classList.add('active-slide');
        document.querySelector('.span1').classList.remove('active-screen');
        document.querySelector('.span2').classList.add('active-screen');
        currentScreen++; // Passer à la seconde interface
    }
}

// Gestion des touches du clavier
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowLeft" && currentScreen === 2) {
        left(); // Flèche gauche pour revenir à l'écran précédent
    }
    if (event.key === "ArrowRight" && currentScreen === 1) {
        right(); // Flèche droite pour passer à l'écran suivant
    }
});

// Gestion de l'ouverture du menu
const openMenu = document.querySelector('.open-button');

openMenu.addEventListener("click", OpenAppScreen);

function OpenAppScreen() {
    document.querySelector('.lock-screen').classList.replace('active', 'animate-lock-screen');
    document.querySelector('.lock-screen').style.height = '0';
    document.querySelector('.application-menu').classList.add('active');
}
