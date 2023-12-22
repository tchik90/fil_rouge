// FAYSSAL NEW 

// ----- RECUPERATION DE DIVERS CONTENUS DE LA PAGE -----
// var option = document.querySelector(".option").selectedIndex.options[choice].value;
// console.log(option);

if (localStorage.getItem('users') != null) {
    // récupération sous forme de tableau
    var tUsers = JSON.parse(localStorage.getItem('users'));
   // console.log(tUsers)
} else {
    alert("Les Local Storage n'ont pas été copiés")
}
if (localStorage.getItem('bds') != null) {
    // récupération sous forme de tableau
    var tInfos = JSON.parse(localStorage.getItem('bds'))
} else {
    alert("Les Local Storage n'ont pas été copiés")
}

var btnSearchUser = document.querySelector("#btnSearchUser");
var btnAnnulerUser = document.querySelector("#btnAnnulerUser");
var searchUser = document.querySelector("#searchUser");

var btnAmende = document.getElementById('payerAmende');
var btnCotisation = document.getElementById('payerCotisation');
var btnDepot = document.getElementById('depotLivre');
var btnEmprunt = document.getElementById('empruntLivre')
var btnRetard = document.getElementById('payerRetard')
// récupération des span pour affichage
var afficheUser = document.querySelector("span#user");
var afficheAbonnement = document.querySelector("span#abonnement");
var afficheEmprunt = document.querySelector("span#bdEmprunt");
var afficheRetard = document.querySelector("span#bdRetard");
var afficheAmende = document.querySelector("span#amende");
var afficheDateAdhesion = document.querySelector("span#dateAdhesion");

var afficheAuteur = document.querySelector("span#infoAuteur");
var afficheTitre = document.querySelector("span#infoTitre");
var afficheSerie = document.querySelector("span#infoSerie");

var afficheIsbn = document.querySelector("span#infoIsbn");
var afficheCode = document.querySelector("span#infoCode");
var afficheNbrBd = document.querySelector("span#infoNbrBd");

var afficheStock = document.querySelector("span#infoStock");


// ----- focus sur zone de recherche
searchUser.focus();

// ----- on cache les boutons modifs' adhérents 

btnCotisation.style.display = "none";
btnAmende.style.display = "none";
btnDepot.style.display = "none";
btnEmprunt.style.display = "none";
btnRetard.style.display = "none";


// ----- mise à jour à chaque touche entrée dans la zone de recherche
searchUser.addEventListener('keyup', function(){
    var optionSelect = selectOptionUser();

    if(optionSelect == "cde") {
        var input = searchUser.value;
        var result = tUsers.filter(item => item.cdeUser.toString().includes(input));
        var suggestion = '';
    } else {   
        var input = searchUser.value;
        var result = tUsers.filter(item => item.nom.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';
    }


    if(input !='') {
        result.forEach(result =>
            suggestion +=`
            <option id="suggestions" value="${result.nom}"></option>
            `
            )
            document.getElementById('suggestionsUser').innerHTML = suggestion;
        }
});

btnSearchUser.onclick = function() {
    rechercheUser();
}

function rechercheUser(){
    var search = document.querySelector("#searchUser").value;
    var input = searchUser.value;
    var optionSelect = selectOptionUser();


      if(!input) {
        swal.fire({
            title: "Champs vide",
            text: "Veuillez saisir un nom d'adhérent ou un code utilisateur valide.",
            icon: "error"
        });
    }
  // recherche avec nom ou code adhérent ?
    if (optionSelect === "cde") {
        var result = tUsers.filter(item => item.cdeUser.toString().includes(input));
    } else if (optionSelect === "nom")  {
        var result = tUsers.filter(item => item.nom.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
    } 
    if( result.length === 0){ 
        swal.fire({
            title: "Saisie invalide",
            text: "Le nom ou le code utilisateur saisie n'existe pas.",
            icon: "error"
        });  
        
    }
    
    // afficher les infos utilisateur
    afficheUser.textContent = result[0].nom;

    // Abonné ?
    if(result[0].abonne == "non") {
        afficheAbonnement.style.color = "red"
        afficheAbonnement.textContent = result[0].abonne;
        btnCotisation.style.display = "";
        
    
    } else {
        afficheAbonnement.style.color = "green"
        afficheAbonnement.textContent = result[0].abonne;
        btnCotisation.style.display = "none";
   
    }

    // BD emprunté à 3 ?
    var nombreTotalBD = result[0].bdEmprunt.length;

    if(result[0].bdEmprunt == "3") {
        afficheEmprunt.style.color = "red";
        afficheEmprunt.innerHTML =`${nombreTotalBD}<br>` + result[0].bdEmprunt.map(bd => `Code BD: ${bd.cdeBd} 'Date: ${bd.date}`).join('<br>');
        btnDepot.style.display = "";
    } 
    if(result[0].bdEmprunt.length == "0"){
        afficheEmprunt.style.color = "green";
        afficheEmprunt.textContent = "0";
        btnAmende.style.display = "none";
        btnDepot.style.display = "none";
     if(result[0].abonne == "oui")btnEmprunt.style.display = "";
    }
    else {
        afficheEmprunt.style.color = "green";
        afficheEmprunt.innerHTML =`${nombreTotalBD}<br>` + result[0].bdEmprunt.map(bd => `Code BD: ${bd.cdeBd}<br> Date: ${bd.date}`).join('<br>');

        btnEmprunt.style.display = "none";
    }

    // BD en retard ?
    if(result[0].bdRetard > "0") {
        afficheRetard.style.color = "red";
        afficheRetard.innerHTML = result[0].bdRetard.map(bd => `Cde: ${bd.cdeBd} Date: ${bd.date}`).join('<br>');
        btnRetard.style.display = "";
    } else {
        afficheRetard.style.color = "green";
        afficheRetard.textContent = "Aucune";
        btnRetard.style.display = "none";

    }
// AMENDE à payer ?
        if(result[0].amende > "0") {
        afficheAmende.style.color = "red";
        afficheAmende.textContent = result[0].amende;
        btnAmende.style.display = "";
    }
    else if(result[0].amende == "0") {
        afficheAmende.style.color = "green";
        afficheAmende.textContent = result[0].amende;
    }

// Date d'adhésion :
if(result[0].dateCotisation){
    afficheDateAdhesion.style.color = "green";
    afficheDateAdhesion.innerHTML = result[0].dateCotisation;
    console.log(result[0])
}
else    {
    afficheDateAdhesion.style.color = "red";
    afficheDateAdhesion.innerHTML = "Non renseignés dans nos tests"

}


//    controleUser()
};

btnAnnulerUser.onclick = function(){
    afficheUser.textContent = "Nom Prénom";
    afficheAbonnement.textContent = "";
    afficheEmprunt.textContent = "";
    afficheRetard.textContent = "";
};

function choixUser () {
    var optionSelect = selectOptionUser();

    if(optionSelect == "cde") {
        var input = searchUser.value;
        var result = tUsers.filter(item => item.cdeUser.toString().includes(input));
        var suggestion = '';
    } else {   
        var input = searchUser.value;
        var result = tUsers.filter(item => item.nom.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';
    }
    
    return result;
  
}

btnAmende.onclick = function() {

var user = choixUser();

    var montant = user[0].amende;
    

    montant = montant * 25;
    Swal.fire({
        icon: "warning",
        title: "Paiement de l'amende",
        text: "Vous devez reglez la somme de " + montant + " euros",
        showCloseButton: true,
        allowOutsideClick: false,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: `VALIDER PAIEMENT`,
        cancelButtonText: 'ANNULER',
        confirmButtonColor: '#ffcc00',
    }).then((result) => {
        if (result.isConfirmed) {
            user[0].amende = 0;
            localStorage.setItem("users", JSON.stringify(tUsers));
            rechercheUser()
    }
    });
}

btnRetard.onclick = function () {
    var user = choixUser();
    var nbrBdRetard = user[0].bdRetard.map((bd) => bd.cdeBd);
    ;
    nbrBdRetard = nbrBdRetard.length
    prixRetard = nbrBdRetard * 8;


        Swal.fire({
            icon: "warning",
            title: "Paiement pour délais de retard",
            text: "Vous devez reglez la somme de " + prixRetard + " euros",
            showCloseButton: true,
            allowOutsideClick: false,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: `VALIDER PAIEMENT`,
            cancelButtonText: 'ANNULER',
            confirmButtonColor: '#ffcc00',

    }).then((result) =>{
        if (result.isConfirmed) {
            user[0].bdRetard = 0;
            localStorage.setItem("users", JSON.stringify(tUsers));
            rechercheUser()
        }
    })
    
}

btnCotisation.onclick = function () {
    var user = choixUser();
    var cotisation = user[0].abonne;
    if(cotisation == "non") {
        Swal.fire({
            icon: "warning",
            title: "Paiement de la cotisation annuel",
            text: "Vous devez reglez la somme de " + 8 + " euros",
            showCloseButton: true,
            allowOutsideClick: false,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: `VALIDER PAIEMENT`,
            cancelButtonText: 'ANNULER',
            confirmButtonColor: '#ffcc00',

    }).then((result) =>{
        if (result.isConfirmed) {
            user[0].abonne = "oui";
            localStorage.setItem("users", JSON.stringify(tUsers));
            rechercheUser()
        }
    })
    }
    
}

btnDepot.onclick = function() {
    var user = choixUser();

    Swal.fire({
        title: "Confirmez que " + user[0].nom + " souhaite enregistrer un dépot",
        showCloseButton: true,
        allowOutsideClick: false,
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonText: `OK`,
        confirmButtonColor: '#ffcc00',
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("idDepot", user[0].cdeUser);
            var urlActuelle = window.location.href;
            urlActuelle = urlActuelle.split("bibliothecaire.html")[0];
            urlActuelle += "bibliothecaire depot.html";
            window.location.href = urlActuelle;
    }
    });
};

btnEmprunt.onclick = function (){
    var user = choixUser();
    Swal.fire({
        title: "Confirmez que " + user[0].nom + " souhaite emprunter un livre",
        showCloseButton: true,
        allowOutsideClick: false,
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonText: `OK`,
        confirmButtonColor: '#ffcc00',
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("idEmprunt", user[0].cdeUser);
            var urlActuelle = window.location.href;
            urlActuelle = urlActuelle.split("bibliothecaire.html")[0];
            urlActuelle += "bibliothecaire emprunt.html";
            window.location.href = urlActuelle;
    }
    });
    

}

// ----- Récupération de l'option choisie (code client ou nom prénom)
function selectOptionUser() {
    var select = document.getElementById("optionUser");
    var choice = select.selectedIndex;
    var option = select.options[choice].value;
    //console.log(option);
    return option;
}


// function controleUser() {
//     var abonne = document.getElementById("abonnement").innerHTML;
//     var emprunt = document.getElementById("bdEmprunt").innerHTML;
//     var retard = document.getElementById("bdRetard").innerHTML;

//     var btnValiderEmprunt = document.querySelector("#btnValiderEmprunt");

//     var bEmpruntPossible = false;

//     console.log("emprunt : " + emprunt)
//     console.log("retard : " + retard)

//     if(abonne == "oui" && emprunt < 3 && retard == 0) {
//         bEmpruntPossible = true;
//     } else {
//         bEmpruntPossible = false;
//     }
    
//     if(bEmpruntPossible) {
//         console.log("emprunt possible")
//         //btnValiderEmprunt.style.border = "solid blue";
//         btnValiderEmprunt.style.background = "var(--orange)";
//         btnValiderEmprunt.style.color = "black";
//         //btnValiderEmprunt.textContent = "Valider Emprunt";
//     } else {
//         console.log("emprunt pas possible")
//         //btnValiderEmprunt.style.border = "solid blue";
//         btnValiderEmprunt.style.background = "red";
//         btnValiderEmprunt.style.color = "white";
//         //btnValiderEmprunt.textContent = "Emprunt Impossible";
//     }
// }

// afficher la liste des adhérents

document.addEventListener('DOMContentLoaded', function() {
        listUsers();
    });

function listUsers(){

    var divParent = document.getElementById('divParent');
    
    for(i = 0; i < tUsers.length; i++) {
        
        var ul = document.createElement("ul");
        ul.classList.add("list-group");
        ul.classList.add("list-group-horizontal");
        
        var liCodeUser = document.createElement("li");
        liCodeUser.id = "codeUser_" + tUsers[i].cdeUser; 
        liCodeUser.classList.add("list-group-item");
        liCodeUser.classList.add("col-3");
        
        var liNom = document.createElement("li");
        liNom.id = "nom_" + tUsers[i].cdeUser; 
        liNom.classList.add("list-group-item");
        liNom.classList.add("text-break");
        liNom.classList.add("col-4");

        var liMail = document.createElement("li");
        liMail.id = "mail_" + tUsers[i].cdeUser; 
        liMail.classList.add("list-group-item");
        liMail.classList.add("text-break");
        liMail.classList.add("col-5");

        liCodeUser.textContent= tUsers[i].cdeUser; 
        liNom.textContent = tUsers[i].nom;
        liMail.textContent = tUsers[i].mail;

         ul.appendChild(liCodeUser);
         ul.appendChild(liNom);
         ul.appendChild(liMail);
         divParent.appendChild(ul);
     }
     
    }
    