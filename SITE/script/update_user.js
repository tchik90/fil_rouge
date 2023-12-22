// recupération des éléments HTML
var btnUpdateUser = document.getElementById('btnUpdateUser');
var btnSearchUpdateUser = document.getElementById('btnSearchUpdateUser');

var zoneErreurUpdateNom = document.getElementById("zoneErreurUpdateNom");
var zoneErreurUpdateMail = document.getElementById("zoneErreurUpdateMail");

// bouton de recherche adhérent par code utilisateur
btnSearchUpdateUser.addEventListener('click', (e) => {
    e.preventDefault();

// récupération des saisies à l'input
    var updateNom = document.getElementById('updateNom');
    var updateMail = document.getElementById('updateMail');
    var codeUser = document.getElementById('codeUser').value;
    console.log(codeUser)

// contrôle du champ de saisie code adhérent
    const regexpNum = /^[0-9]+$/;
    zoneErreurCodeUser.innerHTML = "";

    if (!regexpNum.test(codeUser)) {
        zoneErreurCodeUser.innerHTML = "Err: Le code utilisateur doit être un numéro";
        return;
    }

// rechercher le code utilisateur saisie dans le tableau adhérent
    var foundUser = tUsers.find(user => user.cdeUser == codeUser);

// afficher les informations automatiquement à l'input 
    if (foundUser) {
        updateNom.value = foundUser.nom;
        updateMail.value = foundUser.mail;

    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: "Le code adhérent saisie n'existe pas",
            allowOutsideClick: false,
            focusConfirm: false,
            confirmButtonText: `D'ACCORD`,
            confirmButtonColor: '#ffcc00',
          });
        return;
    }


});

// bouton de modification adhérent 
btnUpdateUser.addEventListener('click', (e) => {

 // recupération des éléments HTML
    var updateNom = document.getElementById('updateNom').value;
    var updateMail = document.getElementById('updateMail').value;
    var codeUser = document.getElementById('codeUser').value;

// contrôle des champ de saisies à l'input
    const regexpStr = /^[a-zA-ZÀ-ÿ-' ]+$/;
    const regexpMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    zoneErreurUpdateNom.innerHTML = "";
    zoneErreurUpdateMail.innerHTML = "";

    if (!regexpStr.test(updateNom)) {
        zoneErreurUpdateNom.innerHTML = "Err: Le nom doit contenir uniquement des caractères";
        return;
    }
    if (!regexpMail.test(updateMail)) {
        zoneErreurUpdateMail.innerHTML = "Err: L'adresse mail n'est pas valide";
        return;
    }
// on récupère notre tableau en cours

   var ExcludedtUsers = findUserTableByCodeUser(codeUser);

   //console.log(ExcludedtUsers);

// on contrôle que l'email n'existe pas déjà en dehors de notre tableau

    if (!emailIsUnique(updateMail,ExcludedtUsers)) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Le mail saisi est déjà utilisé, veuillez en saisir une nouvelle',
            allowOutsideClick: false,
            focusConfirm: false,
            confirmButtonText: `D'ACCORD`,
            confirmButtonColor: '#ffcc00',
          });
        return;
    } // on met à jours notre tableau 
    else {
        
         updateUser(updateNom,updateMail,codeUser);
         swal.fire({
            title: "Mise à jour réussie",
            text: "Les informations de l'adhérent ont été mises à jour.",
            icon: "success"
        });

    } 

// contrôle pour voir si la mise à jour à été faite dans la console.
// console.log(ExcludedtUsers);


var liNom = document.getElementById('nom_' + codeUser);
var liMail = document.getElementById('mail_' + codeUser);

console.log('codeUser:', codeUser);
console.log('updateNom:', updateNom);
console.log('updateMail:', updateMail);



liNom.innerHTML = updateNom;
liMail.innerHTML = updateMail;



})
// retrouver l'adhérent grâce au code saisie
function findUserTableByCodeUser(codeUser) {
    return tUsers.find(user => user.cdeUser == codeUser);
}
// ecrasement des anciennes valeurs par celle saisie
function updateUser(nom, mail, codeUser) {
    var foundUser = tUsers.find(user => user.cdeUser == codeUser);

    if (foundUser) {
        foundUser.nom= nom;
        foundUser.mail= mail;
    }
}

// contrôle de la validité du mail dans tout les tableaux sauf le notre
function emailIsUnique(email, excludedTable) {

    let emailIsUnique = true;

    for (i = 0; i < tUsers.length; i++) {

        if (email == tUsers[i].mail && tUsers[i].cdeUser !== excludedTable.cdeUser  ) {
            console.log(tUsers[i]);
            emailIsUnique = false;
            break;
        }
    }
    if (!emailIsUnique) {
        return false;
    }
    return true;
}



