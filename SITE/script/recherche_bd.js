// ----- RECUPERATION DE DIVERS CONTENUS DE LA PAGE -----

var btnSearch = document.querySelector("#btnSearch");
var carte = document.querySelector("#carte");
var carteCache = document.querySelector("#carteCache");
var searchInput = document.querySelector("#searchInput");

var choixOption = document.getElementById("option");
var nbrClick =0;

var btnPrint = document.getElementById("btnPrint");


var afficheSuggestion = document.getElementById("afficheSuggestion");


// Action au changement de type de recherche
choixOption.onclick = function() {
    nbrClick++
    if(nbrClick == 2) {
        nbrClick = 0;
        console.log("input effacé")
        searchInput.value = "";
        searchInput.focus();
        carteCache.innerHTML = "";
        afficheSuggestion.innerHTML = "";
        afficheSuggestion.style.display = 'none';
    }
}

// ----- focus sur zone de recherche
searchInput.focus();

// -----------------------------------------------------------------------------------------------
// FONCTION DE RECHERCHE ET SUGGESTION
// -----------------------------------------------------------------------------------------------

// Mise à jour à chaque touche entrée dans la zone de recherche
searchInput.addEventListener('keyup', function(){
    var optionSelect = selectOption(); // recherche de l'option choisie
    var input = searchInput.value;

// Affichage des suggestions en fonction de l'option choisie
//---- SI TITRE ----
    if(optionSelect == "titre" && input.length > 2) {
        console.log("option ->>> Titre");
        afficheSuggestion.style.display = '';
        var resultTitre = tInfos.filter(item => item.infosTitre.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';

        var tResult = [];
        
        for(let i=0; i < resultTitre.length; i++) {       
            var nom = resultTitre[i].infosTitre;
            if(tResult.includes(nom));
            else tResult.push(nom);
        }
        for(let i=0; i < tResult.length; i++) {
            suggestion += '<option id="suggestions" class="p-1 suggestion" value="' + tResult[i] + '">' + tResult[i] + '</option>';
        }

        // affichage "size=" en fonction du nombre de suggestion 
        // var nbrAfficheListe = 10;
        // if(tResult.length < 10) nbrAfficheListe = tResult.length;

        afficheSuggestion.setAttribute("size", tResult.length);
        afficheSuggestion.innerHTML = suggestion;

        // action au clic sur une suggestion
        afficheSuggestion.addEventListener('click', function() { 
            // Fonction pour remplir la zone de recherche
            document.getElementById("searchInput").value = afficheSuggestion.value;
            afficheSuggestion.style.display = 'none';
            //triCartes(); // ->>> si on veut que ça lance la recherche sans cliquer sur rechercher
        });


//---- SI AUTEUR ----
    } else if(optionSelect == "auteur" && input.length > 1) {
        console.log("option ->>> Auteur");
        afficheSuggestion.style.display = '';
        var resultAuteur = tInfos.filter(item => item.nomAuteur.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';

        var tResult = [];
        
        for(let i=0; i < resultAuteur.length; i++) {       
            var nom = resultAuteur[i].nomAuteur;
            if(tResult.includes(nom));
            else tResult.push(nom);
        }
        for(let i=0; i < tResult.length; i++) {   
            suggestion += '<option id="suggestions" class="p-1 suggestion" value="' + tResult[i] + '">' + tResult[i] + '</option>';
        }
        
        // affichage "size=" en fonction du nombre de suggestion 
        // var nbrAfficheListe = 10;
        // if(tResult.length < 10) nbrAfficheListe = tResult.length;

        afficheSuggestion.setAttribute("size", tResult.length);
        afficheSuggestion.innerHTML = suggestion;

        // action au clic sur une suggestion
        afficheSuggestion.addEventListener('click', function() { 
            // Fonction pour remplir la zone de recherche
            document.getElementById("searchInput").value = afficheSuggestion.value;
            afficheSuggestion.style.display = 'none';
            //triCartes(); // ->>> si on veut que ça lance la recherche sans cliquer sur rechercher
        });


//---- SI SERIE ----
    } else if(optionSelect == "serie" && input.length > 2) {
        console.log("option ->>> Série");
        afficheSuggestion.style.display = '';
        var resultSerie = tInfos.filter(item => item.nomSerie.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
        var suggestion = '';

        var tResult = [];
        
        for(let i=0; i < resultSerie.length; i++) {       
            var nom = resultSerie[i].nomSerie;
            if(tResult.includes(nom));
            else tResult.push(nom);
        }
        for(let i=0; i < tResult.length; i++) {   
            suggestion += '<option id="suggestions" class="p-1 suggestion" value="' + tResult[i] + '">' + tResult[i] + '</option>';
        }
        
        // affichage "size=" en fonction du nombre de suggestion 
        // var nbrAfficheListe = 10;
        // if(tResult.length < 10) nbrAfficheListe = tResult.length;

        afficheSuggestion.setAttribute("size", tResult.length);
        afficheSuggestion.innerHTML = suggestion;

        // action au clic sur une suggestion
        afficheSuggestion.addEventListener('click', function() { 
            // Fonction pour remplir la zone de recherche
            document.getElementById("searchInput").value = afficheSuggestion.value;
            afficheSuggestion.style.display = 'none';
            //triCartes(); // ->>> si on veut que ça lance la recherche sans cliquer sur rechercher
        });

//---- SI VIDE ----
    } else {
        afficheSuggestion.style.display = 'none';
        afficheSuggestion.innerHTML = "";
    }
});


// -----------------------------------------------------------------------------------------------
// ACTION AU CLICK SUR BOUTON
// -----------------------------------------------------------------------------------------------

btnSearch.onclick = function() {
    triCartes();
}

btnPrint.onclick = function() {
    imprimer();
}

// -----------------------------------------------------------------------------------------------
// FONCTIONS
// -----------------------------------------------------------------------------------------------

// ----- Récupération de l'option choisie (titre, auteur ou série)
function selectOption() {
    var select = document.getElementById("option");
    var choice = select.selectedIndex;
    var option = select.options[choice].value;
    //console.log(option);

    return option;
}

// Tri des cartes
function triCartes(){
    console.log("TRI CARTES")
        // supprime les anciennes cartes visible
        carteCache.innerHTML = "";
    
        var optionSelect = selectOption(); // recherche de l'option choisie
    
        if(optionSelect = "serie") {
            var searchUser = document.querySelector("#searchInput").value;
            var result = tInfos.filter(item => item.infosTitre.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));
        }
    
        else if(optionSelect = "auteur") {
            var searchUser = document.querySelector("#searchInput").value;
            var result = tInfos.filter(item => item.infosAuteur.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()));
        }
       
        //tri le tableau des résultat par nom puis par numéros
        result.sort(function compare(a, b) {
            if (a.nomSerie < b.nomSerie)
                return -1;
            if (a.nomSerie > b.nomSerie)
                return 1;
    
            else {
                if (a.numero < b.numero)
                    return -1;
                if (a.numero > b.numero)
                    return 1;
                else return 0;
            }
        });
    
        affichageCartes(result);
}

// ----- Affichages des cartes
function affichageCartes(result) {

    btnPrint.style.display = "flex";

    // afficher autant de carte que de recherche serie inclu dans mon tableau.serie
    for(let i=0; i < result.length; i++) {
        var cheminImg = result[i].nomSerie + "-" + result[i].numero + "-" + result[i].titre;
        
        cheminImg = cheminImg.replace(':', '');
        cheminImg = cheminImg.replace("'", '');
        cheminImg = cheminImg.replace(" !", '');
        cheminImg = cheminImg.replace(" ?", '');
        cheminImg = cheminImg.replace(" !?", '');
        cheminImg = cheminImg.replace("!", '');
        cheminImg = cheminImg.replace("?", '');
        //console.log(cheminImg + "---");
        
        carteCache.innerHTML +=
        "<div class='card m-2' style='width: 18rem;'>" +
        "<img src='../ressources/albums/" + cheminImg + ".jpg' class='card-img-top m-auto mt-1' style='width: 95%;' alt='...'>" +
        
        "<div class='card-body'>" +
        "<h4 class='card-title'>"+result[i].titre+"</h4>" +
        "<p class='card-text my-1'>Série : <b>"+result[i].nomSerie+"</b></p>" +
        "<p class='card-text my-1'>Numéro : <b>"+result[i].numero+"</b></p>" +
        "<p class='card-text my-1'>Auteur : <b>"+result[i].nomAuteur+"</b></p>" +
        "<p class='card-text my-1'>Prix : "+result[i].prix+" €</p>" +    
        //"<p class='card-text my-1 mt-3'>id Série : "+result[i].idSerie+"</p>" +   
        //"<p class='card-text my-1'>id Auteur : "+result[i].idAuteur+"</p>" +
        "</div>" +
        "<a href='#' class='btn btn-primary m-1'>Emprunter</a>" +
        //"</div>" +
        "</div>";
    }
}

function imprimer() {
    window.print();
}
