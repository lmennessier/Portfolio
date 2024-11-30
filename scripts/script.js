// script.js

document.addEventListener('DOMContentLoaded', function() {
  // Gestion du thème clair/sombre (inchangée)
  const themeSwitch = document.getElementById('theme-checkbox');

  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      themeSwitch.checked = true;
    }
  }

  function switchTheme(event) {
    if (event.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  themeSwitch.addEventListener('change', switchTheme);

  // Code pour le défilement fluide simplifié
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Utiliser scrollIntoView avec behavior: 'smooth' pour un défilement fluide linéaire
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start' // Vous pouvez ajuster ceci selon vos préférences
        });
      }

      // Fermer le menu après le clic (pour mobile)
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Animation de saisie du texte simplifiée (inchangée)
  const textElement = document.querySelector('.sous-content');
  const finalText = 'Développeur Informatique/Web stagiaire';
  const typingSpeed = 100; // Vitesse de frappe en ms
  const cursorElement = document.createElement('span');
  cursorElement.classList.add('cursor');
  cursorElement.textContent = '_'; // Symbole du curseur
  textElement.textContent = ''; // Vider le contenu initial
  textElement.appendChild(cursorElement);

  let index = 0;

  function type() {
    if (index < finalText.length) {
      textElement.textContent = finalText.substring(0, index + 1);
      textElement.appendChild(cursorElement);
      index++;
      setTimeout(type, typingSpeed);
    } else {
      // Animation terminée
    }
  }

  type();
});

document.getElementById("contactForm").addEventListener("submit", function (event) {
  // Empêcher l'envoi par défaut
  event.preventDefault();

  // Récupérer les champs du formulaire
  const emailField = document.getElementById("email");
  const sujetField = document.getElementById("sujet");
  const messageField = document.getElementById("message");

  // Réinitialiser les erreurs
  resetErrors([emailField, sujetField, messageField]);

  // Variables pour suivre la validité
  let isValid = true;

  // Validation de l'email
  if (!validateEmail(emailField.value)) {
    showError(emailField, "Veuillez entrer une adresse email valide.");
    isValid = false;
  }

  // Validation du sujet
  if (sujetField.value.trim() === "") {
    showError(sujetField, "Le sujet est obligatoire.");
    isValid = false;
  }

  // Validation du message
  if (messageField.value.trim() === "") {
    showError(messageField, "Le message est obligatoire.");
    isValid = false;
  }

});

// Fonction pour valider une adresse email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Fonction pour afficher un message d'erreur
function showError(field, message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  field.classList.add("error-border");
  field.parentElement.appendChild(errorDiv);
}

// Fonction pour réinitialiser les erreurs
function resetErrors(fields) {
  fields.forEach((field) => {
    const parent = field.parentElement;
    const errorMessage = parent.querySelector(".error-message");
    if (errorMessage) {
      parent.removeChild(errorMessage);
    }
    field.classList.remove("error-border");
  });
}

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche l'envoi par défaut

  // Récupération des données du formulaire
  const email = document.getElementById("email").value.trim();
  const sujet = document.getElementById("sujet").value.trim();
  const message = document.getElementById("message").value.trim();

  // Création de l'objet contenant les données
  const formulaireData = {
    email: email,
    sujet: sujet,
    message: message,
  };

  // Affichage d'une alerte avec les données
  alert(
    `Bonjour Mr/Mme : ${formulaireData.email}, votre message : "${formulaireData.sujet}", n'a pas été envoyé car le PHP ne fonctionne pas.`
  );
});

 // Sélectionner le bouton et la zone d'informations
 const showInfoBtn = document.getElementById('show-info-btn');
 const contactInfo = document.getElementById('contact-info');

 // Ajouter un écouteur d'événement pour le clic sur le bouton
 showInfoBtn.addEventListener('click', () => {
     // Basculer l'affichage de la zone d'informations
     if (contactInfo.style.display === 'none' || contactInfo.style.display === '') {
         contactInfo.style.display = 'block';
     } else {
         contactInfo.style.display = 'none';
     }
 });





