// script.js

document.addEventListener('DOMContentLoaded', function() {
  // Sélection du switch de thème
  const themeSwitch = document.getElementById('theme-checkbox');

  // Vérification du thème sauvegardé
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      themeSwitch.checked = true;
    }
  }

  // Fonction pour changer le thème
  function switchTheme(event) {
    if (event.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  // Écouteur d'événement sur le switch
  themeSwitch.addEventListener('change', switchTheme);

  // Fonction de défilement fluide personnalisée
  function smoothScroll(targetEl, duration) {
    const target = document.querySelector(targetEl);
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime){
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // Code pour le défilement fluide
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      const targetId = this.getAttribute('href');
      if (document.querySelector(targetId)) {
        // Utiliser la fonction de défilement personnalisée
        smoothScroll(targetId, 1000); // Ajustez la durée selon vos préférences
      }

      // Fermer le menu après le clic (pour mobile)
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
});



// Animation de saisie du texte
document.addEventListener('DOMContentLoaded', function() {
  const textElement = document.querySelector('.sous-content');
  const initialText = 'Développeur Informatique/Web satgizire';
  const correctedText = 'Développeur Informatique/Web stagiairee';
  const finalText = 'Développeur Informatique/Web stagiaire';
  const typingSpeed = 100; // Vitesse de frappe en ms
  const pauseTime = 1000; // Temps de pause avant la correction
  const cursorElement = document.createElement('span');
  cursorElement.classList.add('cursor');
  cursorElement.textContent = '_'; // Symbole du curseur
  textElement.textContent = ''; // Vider le contenu initial
  textElement.appendChild(cursorElement);

  let index = 0;
  let tempText = '';
  let typingState = 'typingInitial'; // 'typingInitial', 'correctingToStagi', 'typingCorrected', 'deletingExtraE', 'finished'

  function type() {
    if (typingState === 'typingInitial') {
      if (index < initialText.length) {
        tempText += initialText.charAt(index);
        index++;
        textElement.textContent = tempText;
        textElement.appendChild(cursorElement);
        setTimeout(type, typingSpeed);
      } else {
        // Après avoir terminé de taper le texte initial, passer à la correction
        typingState = 'correctingToStagi';
        index = tempText.length; // Mettre à jour l'index pour l'effacement
        setTimeout(type, pauseTime);
      }
    } else if (typingState === 'correctingToStagi') {
      // Effacer jusqu'à "stagi"
      const targetText = 'Développeur Informatique/Web stagi';
      if (tempText.length > targetText.length) {
        tempText = tempText.slice(0, -1);
        index--;
        textElement.textContent = tempText;
        textElement.appendChild(cursorElement);
        setTimeout(type, typingSpeed);
      } else {
        // Passer à la saisie du texte corrigé
        typingState = 'typingCorrected';
        index = targetText.length;
        setTimeout(type, typingSpeed);
      }
    } else if (typingState === 'typingCorrected') {
      if (index < correctedText.length) {
        tempText += correctedText.charAt(index);
        index++;
        textElement.textContent = tempText;
        textElement.appendChild(cursorElement);
        setTimeout(type, typingSpeed);
      } else {
        // Après avoir tapé le texte corrigé, effacer le "e" supplémentaire
        typingState = 'deletingExtraE';
        index = tempText.length;
        setTimeout(type, pauseTime);
      }
    } else if (typingState === 'deletingExtraE') {
      // Effacer le "e" supplémentaire à la fin
      if (tempText.length > finalText.length) {
        tempText = tempText.slice(0, -1);
        index--;
        textElement.textContent = tempText;
        textElement.appendChild(cursorElement);
        setTimeout(type, typingSpeed);
      } else {
        // Animation terminée
        typingState = 'finished';
        // Le curseur reste visible
      }
    } else if (typingState === 'finished') {
      // Animation terminée, le curseur reste visible
    }
  }

  type();
});



