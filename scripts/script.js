// script.js

// attend que le DOM soit completement chargée pour ensuite executer le code
document.addEventListener('DOMContentLoaded', function() {
  // Récupère le bouton checkbox 
  const themeSwitch = document.getElementById('theme-checkbox');

  // Récupère le thème actuel 
  const themeActuel = localStorage.getItem('theme');

  //theme au chargement de la page
  if (themeActuel) { // Si le theme est chargé
    // on l'applique
    document.documentElement.setAttribute('data-theme', themeActuel);
    if (themeActuel === 'dark') {
      // si le theme actuel est dark : on coche la case
      themeSwitch.checked = true;
    }
  }

  //  thème clair et sombre
  function switchTheme(event) {
    if (event.target.checked) { // si bouton coché
      // Applique le theme sombre
      document.documentElement.setAttribute('data-theme', 'dark');
      //memoire = dark -> pour prochaine utilisation
      localStorage.setItem('theme', 'dark');
    } else { // bouton est décoché
      // enleve data theme pour revenir au clair
      document.documentElement.removeAttribute('data-theme');
      // remet clair en memoire locale 
      localStorage.setItem('theme', 'light');
    }
  }

  // verifie si bouton est utiliser 
  themeSwitch.addEventListener('change', switchTheme);







  // Récupère les navlinks
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  // le menu pour mobile
  const menuMobile = document.querySelector('.navbar-collapse');

  // sur chaque lien
  navLinks.forEach(lien => {
    lien.addEventListener('click', function(event) {
      // Enleve le comportement par default ("teleportation vers la section")
      event.preventDefault();

      // id de l endroit ou aller
      const cibleId = this.getAttribute('href');
      // l element correspondznt a l id 
      const cibleElement = document.querySelector(cibleId);
      if (cibleElement) { // verifie si l element existe

        const duree = 500; // Durée du scroll en ms
        const decalage = 200; // Décalage a cause de navbar fixe


        // scroll vers la cible avec la duree et le decalage
        smoothScroll(cibleId, duree, decalage);
      }

      // Si menu mobile , alors on le ferme au click
      if (menuMobile.classList.contains('show')) {
        // animation gerer par bootstrap pour la fermeture
        const bsCollapse = new bootstrap.Collapse(menuMobile);
        bsCollapse.hide();
      }
    });
  });



  // Scroll personnalisé car ScrollTo , behavior etc ne fonctionne pas correctement (trop rapide)
  function smoothScroll(cibleSelector, duree, decalage = 0) {
    // la cible 
    const cible = document.querySelector(cibleSelector);
    // position de la cible sur la page , utilisant le haut de la page et le decalage pour calculer
    const positionCible = cible.getBoundingClientRect().top + window.pageYOffset - decalage;
    // position actuelle
    const positionDepart = window.pageYOffset;
    // distance a parcourir pour la fonction scroll
    const distance = positionCible - positionDepart;

    let tempsDepart = null; // important de definir un temps de depart pour les animations

    // l animation de scroll
    function animation(tempsActuel) {
      if (tempsDepart === null) tempsDepart = tempsActuel; // on definit le temps de depart
      const tempsEcoule = tempsActuel - tempsDepart; // Temps écoulé 
      // Calcule la position actuelle ( fonction ease progression lineaire pris sur internet)
      const positionCourante = ease(tempsEcoule, positionDepart, distance, duree);
      // scroll vers la position
      window.scrollTo(0, positionCourante);
      if (tempsEcoule < duree) { // tant que c'est pas terminer
        requestAnimationFrame(animation); // Continue 
      } else {
        // va exactement la ou j ai demandé
        window.scrollTo(0, positionCible);
      }
    }

    // Fonction d'interpolation pour calculer une position fluide (internet)
    function ease(t, b, c, d) {
      return c * (t / d) + b; // Calcul basé sur une progression linéaire
    }

    // Démarre
    requestAnimationFrame(animation);
  }



  // Animation saisie de texte
  const elementTexte = document.querySelector('.sous-content'); // l endroit ou affciher l anim
  const texteFinal = 'Développeur Informatique/Web stagiaire'; // texte a afficher
  const vitesseFrappe = 100; // vitesse de frappe
  const elementCurseur = document.createElement('span'); // Crée pour le curseur
  elementCurseur.classList.add('curseur'); // ajoute une class au curseur -> pour clignotant
  elementCurseur.textContent = '_'; // le curseur
  elementTexte.textContent = ''; 
  elementTexte.appendChild(elementCurseur); // ajout du curseur

  let index = 0; // Index 


  function type() {
    if (index < texteFinal.length) { // Si pas finis d ecrire le texte
      elementTexte.textContent = texteFinal.substring(0, index + 1); // affiche le texte jusqu a index 
      elementTexte.appendChild(elementCurseur); // +curseur
      index++; // lettre suivante
      setTimeout(type, vitesseFrappe); // attent un peu avant d ecrire la procahine lettre
    }
  }

  // demarre
  type();
});






// Form de contact
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // enleve la methode par default

  // Récupère les champs du form
  const champEmail = document.getElementById("email");
  const champSujet = document.getElementById("sujet");
  const champMessage = document.getElementById("message");

  // recup les valeur associer au champ
  const email = champEmail.value.trim();
  const sujet = champSujet.value.trim();
  const message = champMessage.value.trim();

  // met les message d erreur a null
  resetErrors([champEmail, champSujet, champMessage]);

  let formulaireValide = true; // true = formulaire est valider

  // -> si email invalide
  if (!validateEmail(email)) {
    showError(champEmail, "Veuillez entrer une adresse email valide.");
    formulaireValide = false; // pas valide
  }

  // sujet non vide
  if (sujet === "") {
    showError(champSujet, "Le sujet est obligatoire.");
    formulaireValide = false;
  }

  // message non vide
  if (message === "") {
    showError(champMessage, "Le message est obligatoire.");
    formulaireValide = false;
  }

  // Création de l'objet c
  const formulaireData = {
    email: email,
    sujet: sujet,
    message: message,
  };

  // Formaulaire valide , afficher le message avec les donnée stocker dasn un objet javascript
  if (formulaireValide) {
    alert(
      `Bonjour Mr/Mme : ${formulaireData.email}, votre message : "${formulaireData.sujet}", n'a pas été envoyé car le PHP ne fonctionne pas.`
    );
  }
});

// email?
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // verifier si il y a un @ et un .
  return regex.test(email); // true si c est bon
}

// mettre les message d erreur 
function showError(champ, message) {
  const divErreur = document.createElement("div"); // cree une div pour le mettre le msg
  divErreur.className = "error-message"; // ajoute la class pour le msg
  divErreur.textContent = message; // defint le bon message a mettre
  champ.parentElement.appendChild(divErreur); // Ajoute le message sous le champ
}

//réinitialiser les erreurs
function resetErrors(champs) {
  champs.forEach((champ) => {
    const parent = champ.parentElement; // Trouve le champ
    const messageErreur = parent.querySelector(".error-message"); // Cherche le message d'erreur
    if (messageErreur) {
      parent.removeChild(messageErreur); // Supprime le message d'erreur
    }
  });
}

// infos contact
const boutonInfos = document.getElementById('show-info-btn'); 
const infosContact = document.getElementById('contact-info');

boutonInfos.addEventListener('click', () => {
  // affiche ou cache les infos .
  if (infosContact.style.display === 'none' || infosContact.style.display === '') {
    infosContact.style.display = 'block';
  } else {
    infosContact.style.display = 'none';
  }
});







