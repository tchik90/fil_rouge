// INITIALISATION VARIABLES

let ajouter = document.getElementById("ajouter");
let titre = document.getElementById("titre");
let numero = document.getElementById("numero");
let serie = document.getElementById("serie");
let auteur = document.getElementById("auteur");
let prix = document.getElementById("prix");

// RECUPERATION DU TABLEAU pour créer ses autres éléments dynamiquement

const bodytable = document.getElementById("body"); 

// Creation d'une classe Library

class Library {
    
    constructor(id,titre,numero,serie,auteur,prix)
    { 
        this.id=id;
        this.titre=titre;
        this.numero=numero;
        this.serie=serie;
        this.auteur=auteur;
        this.prix=prix;
        console.log(this);
    }

// show data html
    displayData(){
    Library.showdHtml(this.id,this.titre,this.numero,this.serie,this.auteur,this.prix)
    return this;
    }
    
// stockage in local storage 
    storage()
    {   
        const DATA = JSON.parse(localStorage.getItem("Library")) ?? [];
    
        DATA.push ({
             id:this.id,
             titre:this.titre,
             numero:this.numero,
             serie:this.serie,
             auteur:this.auteur,
             prix:this.prix,
        })
        localStorage.setItem("Library",JSON.stringify(DATA))
    }

    // show data storage 
    static showdata()
    {
        if(localStorage.getItem("Library")){
            JSON.parse(localStorage.getItem("Library")).forEach((element) => { 
                Library.showdHtml(element.id,element.titre,element.numero,element.serie,element.auteur,element.prix)
            })
        }
    }

    // AFFICHAGE DYNAMIQUE dans le tableau de la nouvelle BD entrée
    static showdHtml(id,titre,numero,serie,auteur,prix){
        const TABTR = document.createElement("tr");
        TABTR.innerHTML=
        `<tr>
        <td>${id}</td>
        <td>${titre}</td>
        <td>${numero}</td>
        <td>${serie}</td>
        <td>${auteur}</td>
        <td>${prix}</td>
        <td>
            <button class="btn delete" data-id="${id}">Supprimer</button>
        </td>
        </tr>
        `
        document.getElementById("body").appendChild(TABTR);
    }
}

Library.showdata(); 

// Remplir les options de séries
const sortedSeries = Array.from(series.values()).sort((a, b) => a.nom.localeCompare(b.nom));

for (const value of sortedSeries) {
    const option = document.createElement("option");
    option.value = value.nom;
    option.text = value.nom;
    serie.appendChild(option);
}

// Remplir les options d'auteurs
const sortedAuteurs = Array.from(auteurs.values()).sort((a, b) => a.nom.localeCompare(b.nom));

for (const value of sortedAuteurs) {
    const option = document.createElement("option");
    option.value = value.nom;
    option.text = value.nom;
    auteur.appendChild(option);
}


// Expressions régulières
const regexTitre = /^[\p{L}\s,]+$/u;
const regexNumero = /^\d+$/;
const regexSerie = /^[\p{L}0-9\s,]+$/u;
const regexAuteur = /^[\p{L}0-9\s,]+$/u;
const regexPrix = /^\d+(\.\d{1,2})?$/;

// Fonction pour vérifier si une chaîne commence par une majuscule
function startsWithUppercase(value) {
    return /^[A-Z]/.test(value);
}

// EVENEMENT AJOUTER
ajouter.addEventListener("click",(e)=>{
    e.preventDefault();

    // Verification des champs
    if (!regexTitre.test(titre.value)) {
        showErrorPopup("Veuillez entrer un titre.");
        return;
    } else if (!startsWithUppercase(titre.value)) {
        showErrorPopup("Le titre doit commencer par une majuscule.");
        return;
    }

    if (!regexNumero.test(numero.value)) {
        showErrorPopup("Veuillez entrer un numéro positif.");
        return;
    }

    if (!regexSerie.test(serie.value)) {
        showErrorPopup("Veuillez entrer une série.");
        return;
    /*} else if (!startsWithUppercase(serieNom)) {
        showErrorPopup("La série doit commencer par une majuscule.");
        return;*/
    }

    if (auteur.value=="") {
        showErrorPopup("Veuillez entrer le ou les auteur(s).");
        return;
    /*} else if (!startsWithUppercase(auteurNom)) {
        showErrorPopup("Le nom de l'auteur doit commencer par une majuscule.");
        return;*/
    }

    if (!regexPrix.test(prix.value)) {
        showErrorPopup("Veuillez entrer un prix positif.");
        return;
    }

    // Verification des doublons

    const existingData = JSON.parse(localStorage.getItem("Library")) || [];
    // Vérification des doublons titre/série
    const isTitleSerieDuplicate = existingData.some((item) => {
        return (
            item.titre === titre.value &&
            item.serie === serie.value
        );
    });

    if (isTitleSerieDuplicate) {
        showErrorPopup("Cette combinaison de titre et série existe déjà dans la bibliothèque.");
        return;
    }

    // Vérification des doublons numéro/série
    const isNumeroSerieDuplicate = existingData.some((item) => {
        return (
            item.numero === numero.value &&
            item.serie === serie.value
        );
    });

    if (isNumeroSerieDuplicate) {
        showErrorPopup("Cette combinaison de numéro et série existe déjà dans la bibliothèque.");
        return;
    }


    // Ajout des données de la nouvelle BD
    
    let id=Math.floor(Math.random()*100);

    const newLibr= new Library(id,titre.value,numero.value,serie.value,auteur.value,prix.value);
    newLibr.displayData().storage();
    titre.value="";
    numero.value="";
    serie.value="";
    auteur.value="";
    prix.value="";
    showSuccessPopup('La BD a bien été ajoutée');
});

function showErrorPopup(message) {
  Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: message,
  });
}

function showSuccessPopup(message) {
  Swal.fire({
      icon: 'success',
      title: 'Succès',
      text: message,
  });
}

// EVENEMENT SUPPRIMER
bodytable.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
      // Récupérer l'ID
      const id = e.target.getAttribute("data-id");

      // Afficher la popup de confirmation
      Swal.fire({
          title: 'Êtes-vous sûr?',
          text: 'La suppression sera irréversible!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Oui, supprimer!',
          cancelButtonText: 'Annuler',
      }).then((result) => {
          if (result.isConfirmed) {
              // Supprimer du local storage
              const emps = JSON.parse(localStorage.getItem("Library"));
              const Dataa = emps.filter(item => item.id !== +id);
              localStorage.setItem("Library", JSON.stringify(Dataa));

              // Supprimer du HTML
              e.target.parentElement.parentElement.remove();

              Swal.fire(
                  'Supprimée!',
                  'La bande dessinée a été supprimée.',
                  'success'
              );
          }
      });
  }
});
