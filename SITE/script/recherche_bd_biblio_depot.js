// ----- RECUPERATION DE DIVERS CONTENUS DE LA PAGE -----
var btnSearch = document.querySelector("#btnSearch");
var searchInput = document.querySelector("#searchInput");
var searchUser = document.querySelector("#searchUser");

var infoAuteur = document.querySelector("#infoAuteur");
var infoTitre = document.querySelector("#infoTitre");
var infoSerie = document.querySelector("#infoSerie");
var infoIsbn = document.querySelector("#infoIsbn");
var infoCode = document.querySelector("#infoCode");
var infoNbrBd = document.querySelector("#infoNbrBd");
var infoStock = document.querySelector("#infoStock");

var btnAnnulerBd = document.querySelector("#btnAnnuler");

var btnValiderEmprunt = document.querySelector("#btnValiderEmprunt");
var btnAnnulerEmprunt = document.querySelector("#btnAnnulerEmprunt");
var btnPerduBd = document.querySelector("#btnPerduBd");
var btnAmende = document.querySelector("#btnAmende");

var bEmpruntPossible = false;

var afficheUser = document.querySelector("span#user");
var afficheAbonnement = document.querySelector("span#abonnement");
var afficheEmprunt = document.querySelector("span#bdEmprunt");
var afficheRetard = document.querySelector("span#bdRetard");
var afficheAmende = document.querySelector("span#amende");


// ----- focus sur zone de recherche
searchUser.focus();

// On cache les boutons BD Perdu et Amende
btnPerduBd.style.display = "none";
btnAmende.style.display = "none";


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
// -------- SI LOCAL STORAGE ID DEPOT --------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
if (localStorage.getItem('idDepot') != null) {
    var idDepotValue = localStorage.getItem('idDepot');
    appelDepot(idDepotValue)
}


// -------------------------------------------------------------------------------------------------------
// -------- ZONE RECHERCHE UTILISATEUR -------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

var suggestionsUser = document.querySelector("#suggestionsUser");

// ----- mise à jour à chaque touche entrée dans la zone de recherche
searchUser.addEventListener('keyup', eventUser)

function eventUser() {
    var optionSelectUser = selectOptionUser()

    //RECHERCHE PAR NOMS
    if (optionSelectUser == "nom") {
        var input = searchUser.value;
        var result = tUsers.filter(item => item.nom.toLocaleLowerCase().includes(input.toLocaleLowerCase()));

        var suggestion = '';
        suggestionsUser.style.display = '';

        var tResult = [];

        for (let i = 0; i < result.length; i++) {
            var nom = result[i].nom;
            if (tResult.includes(nom));
            else tResult.push(nom);
        }
        for (let i = 0; i < tResult.length; i++) {
            suggestion += '<option id="suggestions" class="p-1 suggestion" value="' + tResult[i] + '">' + tResult[i] + '</option>';
        }

        console.log(tResult)

        suggestionsUser.setAttribute("size", tResult.length);
        suggestionsUser.innerHTML = suggestion;

        // action au clic sur une suggestion
        suggestionsUser.addEventListener('click', function () {
            // Fonction pour remplir la zone de recherche
            document.getElementById("searchUser").value = suggestionsUser.value;
            suggestionsUser.style.display = 'none';
            rechercheUser(); // ->>> si on veut que ça lance la recherche sans cliquer sur rechercher
        });

        //RECHERCHE PAR CODE
    } else {
        var recherche = Number(searchUser.value);
        var index = -1;

        for (i = 0; i < tUsers.length; i++) {
            if (tUsers[i].cdeUser == recherche) {
                index = i;
                break;
            }
        }
    }
};


// Récupération de l'option choisie Utilisateur
var choixOptionUser = document.getElementById("optionUser");
var nbrClickUser = 0;

choixOptionUser.onclick = function () {
    nbrClickUser++;
    if (nbrClickUser == 2) {
        nbrClickUser = 0;
        searchUser.value = "";
        searchUser.focus();
        suggestionsUser.innerHTML = "";
        suggestionsUser.style.display = "none";
        annulerUser();

    }
    // Affichage / masquage bouton rechercher
    var optionSelect = selectOptionUser();
    if (optionSelect == "cde") {
        btnSearchUser.style.display = "";
    } else {
        btnSearchUser.style.display = "none";
    }
}


// -------------------------------------------------------------------------------------------------------
// -------- BOUTONS --------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

// Action au bouton recherche utilisateur
btnSearchUser.onclick = function () {
    rechercheUser();
}

// Action au bouton annuler utilisateur
btnAnnulerUser.onclick = function () {
    annulerUser();
}


btnValiderEmprunt.onclick = function () {
    var indexUser = rechercheUser();
    controleEmprunt();

    var abonne = tUsers[indexUser].abonne;
    var emprunt = tUsers[indexUser].bdEmprunt.length;
    var retard = tUsers[indexUser].bdRetard.length;
    var user = tUsers[indexUser].nom;
    var amende = tUsers[indexUser].amende;


    if (bEmpruntPossible) {
        popUpValiderEmprunt(indexUser);

    } else {
        if (abonne == "non") {
            Swal.fire({
                icon: "error",
                title: "Dépôt impossible",
                text: user + " n'est pas abonné(e)",
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                confirmButtonText: `D'ACCORD`,
                confirmButtonColor: '#ffcc00',
            });
        } else if (emprunt > 2) {
            Swal.fire({
                icon: "error",
                title: "Dépôt impossible",
                text: user + " ne peut pas emprunter plus de BD",
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                confirmButtonText: `D'ACCORD`,
                confirmButtonColor: '#ffcc00',
            });
        } else if (retard > 0) {
            Swal.fire({
                icon: "error",
                title: "Dépôt impossible",
                text: user + " a une BD en retard",
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                confirmButtonText: `D'ACCORD`,
                confirmButtonColor: '#ffcc00',
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Dépôt impossible",
                text: user + " n'a aucune BD empruntée",
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                confirmButtonText: `D'ACCORD`,
                confirmButtonColor: '#ffcc00',
            });
        }

    }
}

btnAnnulerEmprunt.onclick = function () {
    document.location.reload();
}

btnPerduBd.onclick = function () {
    var indexUser = rechercheUser();

    var abonne = tUsers[indexUser].abonne;
    var emprunt = tUsers[indexUser].bdEmprunt.length;
    var retard = tUsers[indexUser].bdRetard.length;
    var user = tUsers[indexUser].nom;

    if (bEmpruntPossible) {
        bdPerdu(indexUser);

    } else {
        if (abonne == "non") {
            Swal.fire({
                icon: "error",
                title: "Emprunt impossible",
                text: user + " n'est pas abonné(e)",
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                confirmButtonText: `D'ACCORD`,
                confirmButtonColor: '#ffcc00',
            });
        } else if (emprunt > 2) {
            Swal.fire({
                icon: "error",
                title: "Emprunt impossible",
                text: user + " ne peut pas emprunter plus de BD",
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                confirmButtonText: `D'ACCORD`,
                confirmButtonColor: '#ffcc00',
            });
        } else if (retard > 0) {
            Swal.fire({
                icon: "error",
                title: "Emprunt impossible",
                text: user + " a une BD en retard",
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                confirmButtonText: `D'ACCORD`,
                confirmButtonColor: '#ffcc00',
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Emprunt impossible",
                text: "La BD recherchée n'est plus en stock",
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                confirmButtonText: `D'ACCORD`,
                confirmButtonColor: '#ffcc00',
            });
        }

    }
}

btnAmende.onclick = function () {
    var indexUser = rechercheUser();
    payerAmende(indexUser);
}

// -------------------------------------------------------------------------------------------------------
// -------- FONCTIONS ------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
function appelDepot(idDepotValue) {
    searchUser.value = idDepotValue;

    var recherche = document.querySelector("#searchUser").value;

    var rechercheValid = false;
    var index = -1;

    for (i = 0; i < tUsers.length; i++) {
        if (tUsers[i].cdeUser == recherche) {
            //console.log("OK CODE")
            index = i;
            rechercheValid = true;
            break;
        }
    }
    var result = tUsers[index]


    afficherUser(rechercheValid, result);
    controleUser()

    localStorage.removeItem('idDepot')
}

function payerAmende(indexUser) {
    var amende = tUsers[indexUser].amende;
    var user = tUsers[indexUser].nom;
    //console.log(amende)

    (async () => {
        var titleAmende = "";
        if (amende == 1) titleAmende = user + " a 1 amende à régler";
        else titleAmende = user + " a " + amende + " amendes à régler";

        var textAmende = "";
        if (amende == 1) textAmende = "Soit un total de 25€";
        else textAmende = "Soit un total de " + (amende * 25) + "€ (25€ / amendes)";

        const { value: paye } = await Swal.fire({
            icon: "warning",
            title: titleAmende,
            text: textAmende,
            showCloseButton: true,
            allowOutsideClick: false,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: `VALIDER PAIEMENT`,
            cancelButtonText: 'ANNULER',
            confirmButtonColor: '#ffcc00',
        });
        console.log(paye)
        if (paye) {
            Swal.fire({
                icon: "success",
                title: user + " est à jour dans ses amendes",
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                confirmButtonColor: '#ffcc00',
            });
            tUsers[indexUser].amende = 0;

            majLocaleStorage();
            rechercheUser();
        }
    })()
}

// NE PAS UTILISER
function AfficheNewUser(code, nbrEmprunt, nbrRetard) {
    // RECHERCHE DE L'USER
    var optionSelectUser = selectOptionUser();
    var searchUser = document.querySelector("#searchUser").value;
    //var searchUser = 1;

    var rechercheValid = false;

    if (optionSelectUser == "nom") {
        var result = tUsers.filter(item => item.nom.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));
        rechercheValid = true;
    } else {
        var input = Number(searchUser);
        var result = [];

        for (i = 0; i < tUsers.length; i++) {
            if (input == tUsers[i].cdeUser) result.push(tUsers[i]);
        }

        if (result.length > 0) {
            console.log(result)
            rechercheValid = true;
        } else {
            console.log("Code Utilisateurs non trouvé")
            rechercheValid = false;
        }
    }
    // RECHERCHE DE LA BD DANS L'USER
    var codeBd = "cdeBd : '132'";

    //console.log(resultBd)

    // // ENLEVER BD !!!!
    // var listeRetard = '';
    // for (i = 0; i < result[0].bdRetard.length; i++) {
    //     listeRetard += '<span>code BD : ' + result[0].bdRetard[i].cdeBd + '<br></span>';
    // }

    // var listeEmprunt = '';
    // for (i = 0; i < result[0].bdRetard.length; i++) {
    //     listeEmprunt += '<span>code BD : ' + result[0].bdEmprunt[i].cdeBd + '<br></span>';
    // }

    // var cdeBdSuppr = "code BD : " + code;
    // var newListe = listeRetard.replace(cdeBdSuppr, "");


    // afficheEmprunt.innerHTML = (nbrEmprunt - 1) + '<br>' + newListe;
    // afficheRetard.innerHTML = (nbrRetard - 1) + '<br>' + newListe;
}

function bdPerdu(indexUser) {
    var emprunt = tUsers[indexUser].bdEmprunt.length;
    var retard = tUsers[indexUser].bdRetard.length;
    var user = tUsers[indexUser].nom;
    var amende = tUsers[indexUser].amende;

    var codes = [];
    for (i = 0; i < emprunt; i++) {
        codes.push(tUsers[indexUser].bdEmprunt[i].cdeBd);
    }

    // console.log("-------------------------");
    // console.log(emprunt);
    // console.log(retard);
    // console.log(codes);
    // console.log("-------------------------");


    (async () => {
        var tableauCode = [{}];
        var listeText = "";

        for (let i = 0; i < emprunt; i++) {
            var cle = codes[i];
            var valeur = codes[i];
            tableauCode[0][cle] = valeur;
            listeText += codes[i] + ", "
        }

        var textTitle = "";
        if (codes.length == 1) textTitle = user + " dépose 1 BD ?";
        else textTitle = "Confirmez vous que " + user + " dépose bien les " + codes.length + " BDs empruntées ?";

        var textText = "";
        if (codes.length == 1) textText = "Exemplaire n° " + listeText;
        else textText = "Exemplaires n° " + listeText;;

        var titleRetard = "";
        if (retard == 1) titleRetard = user + " a une BD en retard";
        else titleRetard = user + " a " + retard + " BDs en retard";

        var textRetard = "";
        if (retard == 1) textRetard = user + " doit payer la somme de 8€";
        else textRetard = user + " doit payer la somme de " + (8 * retard) + "€ (8€ / BDs)";

        var paiement = false;

        //console.log(tableauCode[0]) // {18.4: '18.4', 17.2: '17.2'}

        const { value: code } = await Swal.fire({
            title: "Selectionnez l'exemplaire perdu",
            input: "radio",
            showCloseButton: true,
            allowOutsideClick: false,
            focusConfirm: false,
            confirmButtonText: `OK`,
            confirmButtonColor: '#ffcc00',
            inputOptions: tableauCode[0],
            inputValidator: (value) => {
                if (!value) {
                    return "Vous devez sélectionner un exemplaire !";
                }
            }
        });
        // recherche de l'index BD selectionné
        var indexCode = -1;
        for (i = 0; i < emprunt; i++) {
            if (tUsers[indexUser].bdEmprunt[i].cdeBd == code) {
                indexCode = i;
                break;
            }
        }
        // on supprime le code à l'index défini
        tUsers[indexUser].bdEmprunt.splice(indexCode, 1);
        //console.log(tUsers[indexUser]);

        if (code) {
            majStockBdPerdu(code);
            const { value: paiement } = await Swal.fire({
                icon: "warning",
                title: user + " doit payer la somme de 25€ (25€ / BDs perdus)",
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: `VALIDER PAIEMENT`,
                cancelButtonText: 'ANNULER',
                denyButtonText: 'PAYER PLUS TARD',
                confirmButtonColor: '#ffcc00',
            });
            // Si clic sur denyButton on ajoute une amende si payer plus tard
            if (paiement == false) {
                //console.log("PAYER PLUS TARD")
                tUsers[indexUser].amende++;
            }
            // Si clic sur confirmButton
            else if (paiement) {
                Swal.fire({
                    icon: "success",
                    title: "L'exemplaire n°" + code + " a été enregistrée comme perdue",
                    showCloseButton: true,
                    allowOutsideClick: false,
                    focusConfirm: false,
                    confirmButtonText: `D'ACCORD`,
                    confirmButtonColor: '#ffcc00',

                });
            }
            majLocaleStorage();
            rechercheUser();

        }
    })()
}

function popUpValiderEmprunt(indexUser) {

    var user = tUsers[indexUser].nom;
    var abonne = tUsers[indexUser].abonne;
    var amende = tUsers[indexUser].amende;
    var retard = tUsers[indexUser].bdRetard.length;

    var codesExemplaires = [];

    var nbrEmprunt = tUsers[indexUser].bdEmprunt.length;
    var indexEmprunt = -1;
    var exemSelect = ""; // correspond à l'input select pop up

    // recherche de l'index de l'exemplaire emprunté
    if (nbrEmprunt > 0) {
        for (i = 0; i < nbrEmprunt; i++) {
            if (tUsers[indexUser].bdEmprunt[i].cdeBd == exemSelect) {
                indexEmprunt = i;
            }
        }
    }

    (async () => {
        var listeText = "";
        var tCodeDepot = [] // pour la fonction maj Stock

        for (let i = 0; i < nbrEmprunt; i++) {
            listeText += tUsers[indexUser].bdEmprunt[i].cdeBd + ", ";
            tCodeDepot.push(tUsers[indexUser].bdEmprunt[i].cdeBd);
        }
        // suppression dernière virgule
        listeText = listeText.substring(0, listeText.length - 2);

        var textTitle = "";
        if (nbrEmprunt == 1) textTitle = user + " dépose 1 BD ?";
        else textTitle = "Confirmez vous que " + user + " dépose bien les " + nbrEmprunt + " BDs empruntées ?";

        var textText = "";
        if (nbrEmprunt == 1) textText = "Exemplaire n° : " + listeText;
        else textText = "Exemplaires n° : " + listeText;;

        var titleAmende = "";
        if (amende == 1) titleAmende = user + " a une amende à payer";
        else titleAmende = user + " a " + amende + " amendes à payer";

        var textAmende = "";
        if (amende == 1) textAmende = user + " doit payer la somme de 25€ (25€ / BDs perdus)";
        else textAmende = user + " doit payer la somme de " + (25 * amende) + "€ (25€ / BDs perdus)";


        var titleRetard = "";
        if (retard == 1) titleRetard = user + " a une BD en retard";
        else titleRetard = user + " a " + retard + " BDs en retard";

        var textRetard = "";
        if (retard == 1) textRetard = user + " doit payer la somme de 8€";
        else textRetard = user + " doit payer la somme de " + (8 * retard) + "€ (8€ / BDs)";

        var textCommentaire = "";
        if (nbrEmprunt == 1) textCommentaire = "Commentaire sur l'état de la BD (facultatif)";
        else textCommentaire = "Commentaire sur l'état des BDs (facultatif)";

        var paiement = false;

        // SI RETARD
        if (retard > 0) {
            // si bd retard -> paiement !
            const { value: paiement } = await Swal.fire({
                icon: "warning",
                title: titleRetard,
                text: textRetard,
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: `VALIDER PAIEMENT`,
                cancelButtonText: 'ANNULER',
                denyButtonText: 'PAYER PLUS TARD',
                confirmButtonColor: '#ffcc00',
            });
            // Si clic sur denyButton on ajoute une amende si payer plus tard
            if (paiement == false) {
                // paiement plus tard ?
                const { value: amende } = await Swal.fire({
                    icon: "warning",
                    text: "Si le paiement n'est pas effectué aujourd'hui, la somme dû par BDs en retard passera alors de 8€ à 25€ (voir réglement)",
                    showCloseButton: true,
                    allowOutsideClick: false,
                    focusConfirm: false,
                    showCancelButton: true,
                    cancelButtonText: 'ANNULER',
                    confirmButtonText: `CONFIRMER`,
                    confirmButtonColor: '#ffcc00',
                });
                if (amende) {
                    const { value: code } = await Swal.fire({
                        title: textTitle,
                        text: textText,
                        showCloseButton: true,
                        allowOutsideClick: false,
                        focusConfirm: false,
                        showCancelButton: true,
                        cancelButtonText: 'ANNULER',
                        confirmButtonText: `CONFIRMER`,
                        confirmButtonColor: '#ffcc00',
                    });
                    if (code) {
                        // ajout des amendes
                        tUsers[indexUser].amende = Number(tUsers[indexUser].amende + retard);

                        Swal.fire({
                            icon: "success",
                            title: "Dépôt Validé pour " + user,
                            showCloseButton: true,
                            allowOutsideClick: false,
                            focusConfirm: false,
                            confirmButtonText: `D'ACCORD`,
                            confirmButtonColor: '#ffcc00',
                        });
                    }

                }
            }
            else if (paiement) {
                // si paiment ok -> dépot toutes les BD ?
                const { value: code } = await Swal.fire({
                    title: textTitle,
                    text: textText,
                    showCloseButton: true,
                    allowOutsideClick: false,
                    focusConfirm: false,
                    showCancelButton: true,
                    cancelButtonText: 'ANNULER',
                    confirmButtonText: `CONFIRMER`,
                    confirmButtonColor: '#ffcc00',
                });
                if (code) {
                    Swal.fire({
                        icon: "success",
                        title: "Dépôt Validé pour " + user,
                        showCloseButton: true,
                        allowOutsideClick: false,
                        focusConfirm: false,
                        confirmButtonText: `D'ACCORD`,
                        confirmButtonColor: '#ffcc00',
                    });
                }
            }
            // SI PAS DE RETARD
        } else {
            const { value: code } = await Swal.fire({
                title: textTitle,
                text: textText,
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                showCancelButton: true,
                cancelButtonText: 'ANNULER',
                confirmButtonText: `CONFIRMER`,
                confirmButtonColor: '#ffcc00',
            });
            if (code) {
                Swal.fire({
                    icon: "success",
                    title: "Dépôt Validé pour " + user,
                    showCloseButton: true,
                    allowOutsideClick: false,
                    focusConfirm: false,
                    confirmButtonText: `D'ACCORD`,
                    confirmButtonColor: '#ffcc00',
                });
            }
        }
        // on supprime les emprunts et retards
        tUsers[indexUser].bdEmprunt = [];
        tUsers[indexUser].bdRetard = [];

        majStockBdDepot(tCodeDepot);
        majLocaleStorage();
        rechercheUser();
    })()
}

function majStockBdDepot(tCodeDepot) {
    console.log("MAJ STOCK DEPOT");
    console.log(tCodeDepot) // ['28.4']
    // console.log(tCodeDepot[0]) // 28.4

    // recherche des bds empruntés
    for (i = 0; i < tCodeDepot.length; i++) {
        var code = tCodeDepot[i];
        var album = tCodeDepot[i].split(".")[0]
        console.log(code) // code entier ex 1.1
        console.log(album) // ref idAlbum ex 1
        console.log(tInfos)

        //recherche de la bd avec l'idAlbum défini // ici 18
        var indexBD = -1;
        // for (y = 0; y < tInfos.length; y++) {
        //     if (tInfos[y].idAlbum == album) {
        //         indexBD = y;
        //         break;
        //     }
        // }
        for (y = 0; y < tInfos.length; y++) {
            if (tInfos[y].idAlbum == album) {
                //indexBD = y;
                var laBdRecherche = tInfos[y]

                //push exemplaire
                laBdRecherche.cdeDispo.push(code)

                //maj stock
                laBdRecherche.stock = Number(laBdRecherche.stock + 1)
            }
        }
    }
}

function majStockBdPerdu(code) {
    //console.log("FUNCTION MAJ STOCK AVEC " + code) // 18.4
    album = code.split(".")[0];
    //console.log("FUNCTION MAJ STOCK AVEC " + code); // 18 (idAlbum)

    //recherche de la bd avec l'idAlbum défini // ici 18
    var indexBD = -1;
    for (i = 0; i < tInfos.length; i++) {
        if (tInfos[i].idAlbum == album) {
            indexBD = i;
            break;
        }
    }
    var result = tInfos[indexBD]

    result.cdeDispo.push(code);

    //maj exemplaire
    result.exemplaires = Number(result.exemplaires - 1);


    //console.log(result)
}

function majLocaleStorage() {
    localStorage.setItem('users', JSON.stringify(tUsers));
    localStorage.setItem('bds', JSON.stringify(tInfos));
}

// Récupération de l'option choisie Utilisateur
function selectOptionUser() {
    var choice = choixOptionUser.selectedIndex;
    var option = choixOptionUser.options[choice].value;
    //console.log(option);

    return option;
}

// Récupération de l'option choisie BD
function selectOption() {
    var select = document.getElementById("option");
    var choice = select.selectedIndex;
    var option = select.options[choice].value;
    //console.log(option);

    return option;
}

function afficherUser(rechercheValid, result) {
    // result = tableau user sélectionné

    // On affiche ou masque le bouton BD Perdu
    if (rechercheValid && (result.bdEmprunt.length > 0 || result.bdRetard.length > 0)) {
        btnPerduBd.style.display = "";
    } else {
        btnPerduBd.style.display = "none";
    }

    // On affiche ou masque le bouton Amende
    if (rechercheValid && result.amende > 0) {
        btnAmende.style.display = "";
    } else {
        btnAmende.style.display = "none";
    }

    if (rechercheValid) {
        // afficher les infos utilisateur
        afficheUser.innerHTML = result.nom + ",<span style='font-size : 0.6em';> abonné n°" + result.cdeUser + "</span>";

        // Amende ?
        if (result.amende > 0) {
            afficheAmende.style.color = "red"
            afficheAmende.textContent = result.amende;
        } else {
            afficheAmende.style.color = "green"
            afficheAmende.textContent = result.amende;
        }

        // Abonné ?
        if (result.abonne == "non") {
            afficheAbonnement.style.color = "red"
            afficheAbonnement.textContent = result.abonne;
        } else {
            afficheAbonnement.style.color = "green"
            afficheAbonnement.textContent = result.abonne;
        }

        // BD emprunté à 3 ?
        if (result.bdEmprunt.length == "3") {
            afficheEmprunt.style.color = "red"
        } else {
            afficheEmprunt.style.color = "green"
        }

        // BD emprunté Affichage
        var listeEmprunt = '';
        for (i = 0; i < result.bdEmprunt.length; i++) {
            listeEmprunt += '<span>code BD : ' + result.bdEmprunt[i].cdeBd + '<br></span>';
        }
        afficheEmprunt.innerHTML = result.bdEmprunt.length + '<br>' + listeEmprunt;

        // BD en retard ?
        if (result.bdRetard > "0") {
            afficheRetard.style.color = "red"
        } else {
            afficheRetard.style.color = "green"
        }
        // BD en retard Affichage
        var listeRetard = '';
        for (i = 0; i < result.bdRetard.length; i++) {
            listeRetard += '<span>code BD : ' + result.bdRetard[i].cdeBd + '<br></span>';
        }
        afficheRetard.innerHTML = result.bdRetard.length + '<br>' + listeRetard;
    } else {

        afficheUser.textContent = "Utilisateur non trouvé";
        afficheAbonnement.style.color = "black";
        afficheAbonnement.textContent = "";
        afficheEmprunt.style.color = "black";
        afficheEmprunt.textContent = "";
        afficheRetard.style.color = "black"
        afficheRetard.textContent = "";
        afficheAmende.style.color = "black"
        afficheAmende.textContent = "";

    }
}

function annulerUser() {
    afficheUser.textContent = "Nom Prénom";
    afficheAbonnement.textContent = "";
    afficheEmprunt.textContent = "";
    afficheRetard.textContent = "";
};

// -------- FONCTIONS CONTROLE ---------------------------------------------------------------------------

function controleUser() {
    var abonne = afficheAbonnement.textContent;
    var emprunt = afficheEmprunt.innerHTML;
    var retard = afficheRetard.innerHTML;
    var amende = afficheAmende.textContent;

    emprunt = emprunt.split("<")[0];
    retard = retard.split("<")[0];

    // console.log("abonne : " + abonne);
    // console.log("emprunt : " + emprunt);
    // console.log("retard : " + retard);
    // console.log("amende : " + retard);

    var btnValiderEmprunt = document.querySelector("#btnValiderEmprunt");

    var bEmpruntPossible = false;

    if (abonne == "oui" && emprunt < 3 && retard == 0 && amende == 0) {
        bEmpruntPossible = true;
    } else {
        bEmpruntPossible = false;
    }

    if (bEmpruntPossible) {
        //console.log("emprunt possible")
        btnValiderEmprunt.style.background = "var(--orange)";
        btnValiderEmprunt.style.color = "black";
        btnValiderEmprunt.textContent = "Valider Dépôt";
    } else {
        //console.log("emprunt pas possible")
        btnValiderEmprunt.style.background = "red";
        btnValiderEmprunt.style.color = "white";
        btnValiderEmprunt.textContent = "Dépôt Impossible";
    }
    controleEmprunt();
}


function controleEmprunt() {

    //var stock = infoStock.textContent;
    var abonne = document.getElementById("abonnement").innerHTML;
    var emprunt = document.getElementById("bdEmprunt").innerHTML;
    var retard = document.getElementById("bdRetard").innerHTML;

    emprunt = emprunt.split("<")[0];
    retard = retard.split("<")[0];

    // console.log("stock : " + stock);
    // console.log("abonne : " + abonne);
    // console.log("emprunt : " + emprunt);
    // console.log("retard : " + retard)

    if (emprunt > 0) {
        bEmpruntPossible = true;
    } else {
        bEmpruntPossible = false;
    }

    if (abonne != "") {
        if (bEmpruntPossible) {
            //console.log("emprunt possible")
            //btnValiderEmprunt.style.border = "solid blue";
            btnValiderEmprunt.style.background = "var(--orange)";
            btnValiderEmprunt.style.color = "black";
            btnValiderEmprunt.textContent = "Valider Dépôt";
        } else {
            //console.log("emprunt pas possible")
            //btnValiderEmprunt.style.border = "solid blue";
            btnValiderEmprunt.style.background = "red";
            btnValiderEmprunt.style.color = "white";
            btnValiderEmprunt.textContent = "Dépôt impossible";
        }
    } else {
        btnValiderEmprunt.style.background = "red";
        btnValiderEmprunt.style.color = "white";
        btnValiderEmprunt.textContent = "Selectionnez un abonné";
    }
}

// Recherche User
function rechercheUser() {
    var optionSelectUser = selectOptionUser();
    var recherche = document.querySelector("#searchUser").value;

    var rechercheValid = false;
    var index = -1;

    // recherche index user
    if (optionSelectUser == "nom") {
        for (i = 0; i < tUsers.length; i++) {
            if (tUsers[i].nom == recherche) {
                //console.log("OK NOM")
                index = i;
                rechercheValid = true;
                break;
            }
        }
        var result = tUsers[index]

    } else { // si recherche par code
        for (i = 0; i < tUsers.length; i++) {
            if (tUsers[i].cdeUser == recherche) {
                //console.log("OK CODE")
                index = i;
                rechercheValid = true;
                break;
            }
        }
        var result = tUsers[index]
    }

    afficherUser(rechercheValid, result);
    controleUser()

    return index;
};
