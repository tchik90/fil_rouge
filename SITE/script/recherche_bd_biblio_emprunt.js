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
var btnAmende = document.querySelector("#btnAmende");

var bEmpruntPossible = false;

var afficheUser = document.querySelector("span#user");
var afficheAbonnement = document.querySelector("span#abonnement");
var afficheEmprunt = document.querySelector("span#bdEmprunt");
var afficheRetard = document.querySelector("span#bdRetard");
var afficheAmende = document.querySelector("span#amende");


// ----- focus sur zone de recherche
searchUser.focus();

// On cache les boutons Amende
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
if (localStorage.getItem('idEmprunt') != null) {
    var idDepotValue = localStorage.getItem('idEmprunt');
    appelEmprunt(idDepotValue)
}


// -------------------------------------------------------------------------------------------------------
// -------- ZONE RECHERCHE UTILISATEUR -------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

var suggestionsUser = document.querySelector("#suggestionsUser");

// ----- mise à jour à chaque touche entrée dans la zone de recherche
searchUser.addEventListener('keyup', function () {
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
                console.log("OK")
                index = i;
                break;
            }
        }
        console.log(tUsers[index].nom)
    }
});


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
// -------- ZONE RECHERCHE BD ----------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------


var afficheSuggestion = document.getElementById("afficheSuggestion");

// Récupération de l'option choisie BD
var choixOption = document.getElementById("option");
var nbrClick = 0;

choixOption.onclick = function () {
    nbrClick++
    //console.log("Nombre de clic : " + nbrClick)
    if (nbrClick == 2) {
        nbrClick = 0;
        //console.log("input effacé")
        searchInput.value = "";
        searchInput.focus();
        //carteCache.innerHTML = "";
        afficheSuggestion.innerHTML = "";
        afficheSuggestion.style.display = 'none';
    }

    // Affichage / masquage bouton rechercher
    var optionSelect = selectOption();
    if (optionSelect == "code") {
        btnSearch.style.display = "";
    } else {
        btnSearch.style.display = "none";
    }
}

// FONCTION DE RECHERCHE ET SUGGESTION
// ----- mise à jour à chaque touche entrée dans la zone de recherche
searchInput.addEventListener('keyup', function () {
    var optionSelect = selectOption(); // recherche de l'option choisie
    var input = searchInput.value;

    // Affichage des suggestions en fonction de l'option choisie
    //---- SI TITRE ----
    if (optionSelect == "titre" && input.length > 2) {
        console.log("option ->>> Titre");
        afficheSuggestion.style.display = '';
        var resultTitre = tInfos.filter(item => item.infosTitre.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';

        var tResult = [];

        for (let i = 0; i < resultTitre.length; i++) {
            var nom = resultTitre[i].infosTitre;
            if (tResult.includes(nom));
            else tResult.push(nom);
        }
        for (let i = 0; i < tResult.length; i++) {
            suggestion += '<option id="suggestions" class="p-1 suggestion" value="' + tResult[i] + '">' + tResult[i] + '</option>';
        }

        afficheSuggestion.setAttribute("size", tResult.length);
        afficheSuggestion.innerHTML = suggestion;

        // action au clic sur une suggestion
        afficheSuggestion.addEventListener('click', function () {
            // Fonction pour remplir la zone de recherche
            document.getElementById("searchInput").value = afficheSuggestion.value;
            afficheSuggestion.style.display = 'none';
            rechercheBD(); // ->>> si on veut que ça lance la recherche sans cliquer sur rechercher
        });

        //---- SI CODE ----
    } else if (optionSelect == "code") {
        console.log("option ->>> Code");
        btnSearch.style.display = "";

        var resultCode = tInfos.filter(item => item.idAlbum.includes(input));

        var tResult = [];

        for (let i = 0; i < resultCode.length; i++) {
            var nom = resultCode[i].idAlbum;
            if (tResult.includes(nom));
            else tResult.push(nom);
        }

        console.log(tResult[0])


        //---- SI AUTEUR ----
    } else if (optionSelect == "auteur" && input.length > 1) {
        console.log("option ->>> Auteur");
        afficheSuggestion.style.display = '';
        var resultAuteur = tInfos.filter(item => item.nomAuteur.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';

        var tResult = [];

        for (let i = 0; i < resultAuteur.length; i++) {
            var nom = resultAuteur[i].nomAuteur;
            if (tResult.includes(nom));
            else tResult.push(nom);
        }
        for (let i = 0; i < tResult.length; i++) {
            suggestion += '<option id="suggestions" class="p-1 suggestion" value="' + tResult[i] + '">' + tResult[i] + '</option>';
        }

        afficheSuggestion.setAttribute("size", tResult.length);
        afficheSuggestion.innerHTML = suggestion;

        // action au clic sur une suggestion
        afficheSuggestion.addEventListener('click', function () {
            // Fonction pour remplir la zone de recherche
            document.getElementById("searchInput").value = afficheSuggestion.value;
            afficheSuggestion.style.display = 'none';
            rechercheBD(); // ->>> si on veut que ça lance la recherche sans cliquer sur rechercher
        });


        //---- SI SERIE ----
    } else if (optionSelect == "serie" && input.length > 2) {
        console.log("option ->>> Série");
        afficheSuggestion.style.display = '';
        var resultSerie = tInfos.filter(item => item.nomSerie.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';

        var tResult = [];

        for (let i = 0; i < resultSerie.length; i++) {
            var nom = resultSerie[i].nomSerie;
            if (tResult.includes(nom));
            else tResult.push(nom);
        }
        for (let i = 0; i < tResult.length; i++) {
            suggestion += '<option id="suggestions" class="p-1 suggestion" value="' + tResult[i] + '">' + tResult[i] + '</option>';
        }

        // affichage "size=" en fonction du nombre de suggestion 
        // var nbrAfficheListe = 10;
        // if(tResult.length < 10) nbrAfficheListe = tResult.length;

        afficheSuggestion.setAttribute("size", tResult.length);
        afficheSuggestion.innerHTML = suggestion;

        // action au clic sur une suggestion
        afficheSuggestion.addEventListener('click', function () {
            // Fonction pour remplir la zone de recherche
            document.getElementById("searchInput").value = afficheSuggestion.value;
            afficheSuggestion.style.display = 'none';
            rechercheBD(); // ->>> si on veut que ça lance la recherche sans cliquer sur rechercher
        });

        //---- SI VIDE ----
    } else {
        afficheSuggestion.style.display = 'none';
        afficheSuggestion.innerHTML = "";
    }
});

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

// Afficher carte après click sur rechercher
btnSearch.onclick = function () {
    rechercheBD();
}

btnAnnulerBd.onclick = function () {
    btnAnnulerBd.style.display = "none";
    infoAuteur.textContent = "Auteur";
    infoTitre.textContent = "Titre";
    infoSerie.textContent = "Série";
    infoIsbn.innerHTML = "";
    infoCode.textContent = "";
    infoNbrBd.innerHTML = "";
    infoStock.innerHTML = "";
}

btnValiderEmprunt.onclick = function () {
    var indexUser = rechercheUser();
    var indexBD = rechercheBD();

    //console.log("VALIDATION")
    //var abonne = document.getElementById("abonnement").innerHTML;
    //var emprunt = document.getElementById("bdEmprunt").innerHTML;
    //var retard = document.getElementById("bdRetard").innerHTML;
    var stock = infoStock.innerHTML;

    if (indexUser > -1) {


        var abonne = tUsers[indexUser].abonne;
        var emprunt = tUsers[indexUser].bdEmprunt.length;
        var retard = tUsers[indexUser].bdRetard.length;
        var amende = tUsers[indexUser].amende;
        var user = tUsers[indexUser].nom;

        // emprunt = emprunt.split("<")[0];
        // retard = retard.split("<")[0];

        // var user = afficheUser.innerHTML;
        // user = user.split(",")[0];

        if (bEmpruntPossible) {
            popUpValiderEmprunt(indexBD, indexUser);
        } else {
            console.log("test --------------")
            console.log(emprunt)
            console.log(retard)
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
            } else if (amende > 0) {
                Swal.fire({
                    icon: "error",
                    title: "Emprunt impossible",
                    text: user + " a " + amende + " amende(s) à régler",
                    showCloseButton: true,
                    allowOutsideClick: false,
                    focusConfirm: false,
                    confirmButtonText: `D'ACCORD`,
                    confirmButtonColor: '#ffcc00',
                });
            } else if (stock == 0) {
                Swal.fire({
                    icon: "error",
                    title: "Emprunt impossible",
                    text: "La BD recherchée n'a plus d'exemplaires en stock",
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
                    text: "Entrez un code exemplaire valide",
                    showCloseButton: true,
                    allowOutsideClick: false,
                    focusConfirm: false,
                    confirmButtonText: `D'ACCORD`,
                    confirmButtonColor: '#ffcc00',
                });
            }
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Selectionnez un abonné",
            //text: "La BD recherchée n'est plus en stock",
            showCloseButton: true,
            allowOutsideClick: false,
            focusConfirm: false,
            confirmButtonText: `D'ACCORD`,
            confirmButtonColor: '#ffcc00',
        });
    }
}

btnAnnulerEmprunt.onclick = function () {
    document.location.reload();
}

btnAmende.onclick = function () {
    var indexUser = rechercheUser();
    payerAmende(indexUser);
}

// -------------------------------------------------------------------------------------------------------
// -------- FONCTIONS ------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
function appelEmprunt(idDepotValue) {
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

function majLocaleStorage() {
    localStorage.setItem('users', JSON.stringify(tUsers));
    localStorage.setItem('bds', JSON.stringify(tInfos));
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

function popUpValiderEmprunt(indexBD, indexUser) {

    var user = tUsers[indexUser].nom;
    var abonne = tUsers[indexUser].abonne;

    var nbrDispo = tInfos[indexBD].cdeDispo.length;
    var codesExemplaires = [];

    var searchCode = searchInput.value;
    console.log(searchCode)

    if (nbrDispo > 0) {
        for (i = 0; i < nbrDispo; i++) {
            codesExemplaires.push(tInfos[indexBD].cdeDispo[i])
        }
    }
    console.log(codesExemplaires)

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
        var tableauCode = [{}];
        for (let i = 0; i < codesExemplaires.length; i++) {
            var cle = codesExemplaires[i];
            var valeur = codesExemplaires[i];
            tableauCode[0][cle] = valeur;
        }
        console.log(tableauCode)

        // avec propositions d'inputs
        // const { value: code } = await Swal.fire({
        //     title: "Selectionnez le code exemplaire à emprunter",
        //     input: "radio",
        //     showCloseButton: true,
        //     allowOutsideClick: false,
        //     focusConfirm: false,
        //     confirmButtonText: `OK`,
        //     confirmButtonColor: '#ffcc00',
        //     inputOptions: tableauCode[0],
        //     inputValidator: (value) => {
        //         if (!value) {
        //             return "Vous devez sélectionner un code exemplaire !";
        //         }
        //     }
        // });
        const { value: code } = await Swal.fire({
            title: "Confirmez vous que " + user + " souhaite empreinter l'exemplaire n°" + searchCode + " ?",

            showCloseButton: true,
            allowOutsideClick: false,
            focusConfirm: false,
            confirmButtonText: `CONFIRMER`,
            confirmButtonColor: '#ffcc00',


        });
        if (code) {
            console.log(code)
            Swal.fire({
                icon: "success",
                // title: "Emprunt Validé pour " + user + ", exemplaire n°" + code,
                title: "Emprunt Validé pour " + user + ", exemplaire n°" + searchCode,
                showCloseButton: true,
                allowOutsideClick: false,
                focusConfirm: false,
                confirmButtonText: `D'ACCORD`,
                confirmButtonColor: '#ffcc00',
                didClose: () => {
                    //ajout bd à emprunt user
                    console.log(tUsers[indexUser])
                    var date = new Date().toLocaleDateString();
                    var obj = {
                        cdeBd: searchCode,
                        date: date,
                    }
                    tUsers[indexUser].bdEmprunt.push(obj)
                    // on cherche l'index du code recherché
                    var indexCode = -1;
                    for (i = 0; i < tInfos[indexBD].cdeDispo.length; i++) {
                        if (tInfos[indexBD].cdeDispo[i] == searchCode) {
                            indexCode = i;
                            break
                        }
                    }
                    // on supprime le code à l'index défini
                    tInfos[indexBD].cdeDispo.splice(indexCode, 1)
                    // on soustrait le stock
                    tInfos[indexBD].stock = tInfos[indexBD].stock - 1;

                    console.log(tUsers[indexUser])
                    console.log(tInfos)
                    // MAJ Local Storage
                    localStorage.setItem('users', JSON.stringify(tUsers));
                    localStorage.setItem('bds', JSON.stringify(tInfos));
                    window.location.reload()
                },
            });
        }
    })()
}

// Récupération de l'option choisie Utilisateur
function selectOptionUser() {
    var choice = choixOptionUser.selectedIndex;
    var option = choixOptionUser.options[choice].value;
    console.log(option);

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
    console.log("booléen ? " + rechercheValid)

    // On affiche ou masque le bouton Amende
    if (rechercheValid && result.amende > 0) {
        btnAmende.style.display = "";
    } else {
        btnAmende.style.display = "none";
    }

    if (rechercheValid) {
        console.log("Je suis dans mon if !")
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

    // console.log("stock : " + stock);
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
        console.log("emprunt possible")
        btnValiderEmprunt.style.background = "var(--orange)";
        btnValiderEmprunt.style.color = "black";
        btnValiderEmprunt.textContent = "Valider Emprunt";
    } else {
        console.log("emprunt pas possible")
        btnValiderEmprunt.style.background = "red";
        btnValiderEmprunt.style.color = "white";
        btnValiderEmprunt.textContent = "Emprunt Impossible";
    }
    controleEmprunt();
}

function controleEmprunt() {

    var stock = infoStock.textContent;
    var abonne = afficheAbonnement.textContent;
    var emprunt = afficheEmprunt.innerHTML;
    var retard = afficheRetard.innerHTML;
    var amende = afficheAmende.textContent;

    // récupère le texte en rouge
    var exemplaireTrouve = infoAuteur.innerHTML;
    exemplaireTrouve = exemplaireTrouve.split("</span>")[0]
    exemplaireTrouve = exemplaireTrouve.split(">")[1]
    // texte en rouge dans la fonction rechercheBD() -> ligne 835
    var texteRouge = "ENTREZ UN EXEMPLAIRE DISPONIBLE"

    emprunt = emprunt.split("<")[0];
    retard = retard.split("<")[0];

    console.log("abonne : " + abonne);
    console.log("emprunt : " + emprunt);
    console.log("retard : " + retard);
    console.log("amende : " + retard);

    // if (abonne == "oui" && stock > 0 && emprunt < 3 && retard == 0 && amende == 0) {
    if (abonne == "oui" && exemplaireTrouve != texteRouge && emprunt < 3 && retard == 0 && amende == 0) {
        bEmpruntPossible = true;
    } else {
        bEmpruntPossible = false;
    }

    if (abonne != "") {
        if (bEmpruntPossible) {
            console.log("emprunt possible")
            //btnValiderEmprunt.style.border = "solid blue";
            btnValiderEmprunt.style.background = "var(--orange)";
            btnValiderEmprunt.style.color = "black";
            btnValiderEmprunt.textContent = "Valider Emprunt";
        } else {
            console.log("emprunt pas possible")
            //btnValiderEmprunt.style.border = "solid blue";
            btnValiderEmprunt.style.background = "red";
            btnValiderEmprunt.style.color = "white";
            btnValiderEmprunt.textContent = "Emprunt Impossible";
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

    if (optionSelectUser == "nom") {
        for (i = 0; i < tUsers.length; i++) {
            if (tUsers[i].nom == recherche) {
                console.log("OK NOM")
                index = i;
                rechercheValid = true;
                break;
            }
        }
        var result = tUsers[index]

    } else { // si recherche par code
        for (i = 0; i < tUsers.length; i++) {
            if (tUsers[i].cdeUser == recherche) {
                console.log("OK CODE")
                index = i;
                rechercheValid = true;
                break;
            } else console.log("pas encore")
        }
        var result = tUsers[index]
    }

    afficherUser(rechercheValid, result);
    controleUser()

    return index;
};

// Recherche BD
function rechercheBD() {
    btnAnnulerBd.style.display = "";

    var optionSelect = selectOption(); // recherche de l'option choisie

    var recherche = document.querySelector("#searchInput").value;
    var indexBD = -1;
    var indexExemplaire = -1;

    // RECHERCHE PAR TITRE
    if (optionSelect == "titre") {
        for (i = 0; i < tUsers.length; i++) {
            if (tInfos[i].infosTitre == recherche) {
                console.log("OK TITRE")
                indexBD = i;
                break;
            }
        }
        var result = tInfos[indexBD]
        result.cdeDispo.sort();
        console.log(result)

        var cheminImg = result.nomSerie + "-" + result.numero + "-" + result.titre;

        cheminImg = cheminImg.replace(':', '');
        cheminImg = cheminImg.replace("'", '');

        infoAuteur.textContent = result.nomAuteur;
        infoTitre.textContent = result.titre;
        infoSerie.textContent = result.nomSerie;
        infoIsbn.innerHTML = "HPCM-2456";
        infoNbrBd.innerHTML = result.exemplaires;
        infoStock.innerHTML = result.stock;

        result.cdeDispo.sort();
        var liste = "";
        for (n = 0; n < result.stock; n++) {
            liste += "<b>" + result.cdeDispo[n] + "</b> / ";
        }
        infoCode.innerHTML = liste;

        if (infoStock.innerHTML > 0) infoStock.style.color = "green";
        else infoStock.style.color = "red";

        // RECHERCHE PAR CODE
    } else if (optionSelect == "code") {

        // recherche par code simple
        // for (i = 0; i < tInfos.length; i++) {
        //     if (tInfos[i].idAlbum == recherche) {
        //         console.log("OK NUMERO")
        //         indexBD = i;
        //         break;
        //     }
        // }
        // var result = tInfos[indexBD]
        // console.log(result)

        for (i = 0; i < tInfos.length; i++) {
            for (y = 0; y < tInfos[i].cdeDispo.length; y++) {
                if (tInfos[i].cdeDispo[y] == recherche) {
                    indexExemplaire = y
                    indexBD = i
                    break
                }
            }
        }
        var result = tInfos[indexBD]
        console.log(result)


        if (indexExemplaire >= 0) {
            infoAuteur.textContent = result.nomAuteur;
            infoAuteur.style.color = "black";
            infoTitre.textContent = result.titre;
            infoSerie.textContent = result.nomSerie;
            infoIsbn.innerHTML = "HPCM-2456";
            infoNbrBd.innerHTML = result.exemplaires;
            infoStock.innerHTML = result.stock;

            result.cdeDispo.sort();
            var liste = "";
            for (n = 0; n < result.stock; n++) {
                liste += "<b>" + result.cdeDispo[n] + "</b> / ";
            }
            infoCode.innerHTML = liste;

            // si id album trouvé mais pas code exemplaire
        } else if (indexBD >= 0) {
            // var proposition = tInfos[indexBD].idAlbum;
            var proposition = proposition.split(".")[0]; // on garde que l'idAlbum saisie
            console.log("---------------------------------------------------------------------")
            // recherche par code simple
            for (i = 0; i < tInfos.length; i++) {
                if (tInfos[i].idAlbum == recherche) {
                    indexBD = i;
                    break;
                }
            }
            var result = tInfos[indexBD]
            console.log(result)
            console.log(proposition)

            // si rien trouvé
        } else {
            recherche = recherche.split(".")[0]; // on garde que l'idAlbum saisie
            // recherche par code simple
            for (i = 0; i < tInfos.length; i++) {
                if (tInfos[i].idAlbum == recherche) {
                    indexBD = i;
                    break;
                }
            }

            var result = tInfos[indexBD]
            console.log(recherche)
            console.log(indexBD)
            console.log(result)

            // idAlbum trouvé
            if (indexBD != -1) {
                infoAuteur.innerHTML = '<span style="color: red;">ENTREZ UN EXEMPLAIRE DISPONIBLE</span><br><span style="color: black;">' + result.nomAuteur + '</span>';
                infoTitre.textContent = result.titre;
                infoSerie.textContent = result.nomSerie;
                infoIsbn.innerHTML = "HPCM-2456";
                infoNbrBd.innerHTML = result.exemplaires;
                infoStock.innerHTML = result.stock;

                result.cdeDispo.sort();
                var liste = "";
                for (n = 0; n < result.stock; n++) {
                    liste += "<b>" + result.cdeDispo[n] + "</b> / ";
                }
                infoCode.innerHTML = liste;

                // si rien trouvé
            } else {
                console.log(indexBD)
                infoAuteur.textContent = "CODE EXEMPLAIRE INTROUVABLE";
                infoAuteur.style.color = "red";
                infoTitre.textContent = " ";
                infoSerie.textContent = " ";
                infoIsbn.innerHTML = "";
                infoCode.textContent = "";
                infoNbrBd.innerHTML = "";
                infoStock.innerHTML = "";
            }
        }


        if (infoStock.innerHTML > 0) infoStock.style.color = "green";
        else infoStock.style.color = "red";

    }
    controleEmprunt();

    return indexBD;
}

function nbrExemplaireBd() {
    for (i = 0; i < tInfos.length; i++) {
        var nbr = Math.floor(Math.random() * 5 + 1); //entre 1 et 5
        tInfos[i].exemplaires = nbr;
    }

}

function stockAleatoire() {
    for (i = 0; i < tInfos.length; i++) {
        var stock = Math.floor(Math.random() * (tInfos[i].exemplaires + 1)); //5
        tInfos[i].stock = stock
    }
    return stock
}
// ajouté cdeDispo a tInfos
function codeBdAleatoire() {
    console.log(tInfos)
    for (i = 0; i < tInfos.length; i++) {

        var stock = tInfos[i].stock;
        var nbrExemplaires = tInfos[i].exemplaires;

        var tCode = [];
        var compteur = 0;

        var code = Math.floor(Math.random() * nbrExemplaires + 1);

        while (compteur < stock) {
            if (!tCode.includes(code)) {
                tCode.push(code);
                compteur++;
            } else {
                var code = Math.floor(Math.random() * nbrExemplaires + 1);
            }
        }
        tCode.sort();
        tInfos[i].cdeDispo = tCode;

    }
    //console.log(tCode)

    // var code = Math.floor(Math.random() * (nbrBd+1));
    // var tStock = [];
    // //var code = Math.floor(Math.random() * stock + 1) // entre 1 et 5 // ex 1
    // var compteur = 0;

    // while(compteur < stock) {
    //     if(!tStock.includes(code)) {
    //         tStock.push(code);
    //         compteur++
    //     } else {
    //         var code = Math.floor(Math.random() * stock + 1)
    //     }
    // }

    // tStock.sort()

    // console.log("compteur : " + compteur)
    // console.log("stock : " + stock)
    // console.log("tStock : " + tStock)

}