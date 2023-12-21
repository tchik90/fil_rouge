// -------------------------------------------------------------------------------------------------------
// -------- RECUPERATION DES LOCAL STORAGE ---------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

// si il y a bien le LT 'users'
if (localStorage.getItem('users') != null) {
    // récupération sous forme de tableau
    var tUsers = JSON.parse(localStorage.getItem('users'));
    console.log(tUsers)
} else {
    alert("Les Local Storage n'ont pas été copiés")
}
if (localStorage.getItem('bds') != null) {
    // récupération sous forme de tableau
    var tInfos = JSON.parse(localStorage.getItem('bds'))
} else {
    alert("Les Local Storage n'ont pas été copiés")
}

//console.log(tInfos)


// -------------------------------------------------------------------------------------------------------
// -------- CODES UTILES ---------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

// recherche de d'INDEX (ex ici USER) avec id user
var SearchIdUser = 4;
var indexUser = -1;

    for (i = 0; i < tUsers.length; i++) {
        if (tUsers[indexUser].cdeUser == SearchIdUser) {
            indexEmprunt = i;
        }
    }

    var monUser = tUsers[indexUser];

    // si par exemple je veux modifier son nom 
    tUsers[indexUser].nom = "Nouveau Nom";

    // si par exemple je veux ajouté une amende 
    tUsers[indexUser].amende = Number(tUsers[indexUser].amende + 1);

// -------------------------------------------------------------------------------------------------------
// -------- FONCTION -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

function majLocaleStorage() {
    localStorage.setItem('users', JSON.stringify(tUsers));
    localStorage.setItem('bds', JSON.stringify(tInfos));
}