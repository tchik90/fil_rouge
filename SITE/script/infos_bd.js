// récupère le contenue
let tAlbums = [...albums.values()];
// récupère l'id
let tAlbumsId = [...albums.keys()];

// récupère le contenue
let tAuteurs = [...auteurs.values()];
// récupère l'id
let tAuteursId = [...auteurs.keys()];

// récupère le contenue
let tSeries = [...series.values()];
// récupère l'id
let tSeriesId = [...series.keys()];


// on créer un tableau Albums en y mettant l'id correspondant
var tAlbumsFinal = []
for(let i =0; i < tAlbums.length; i++) {
    tAlbumsFinal[i] = tAlbums[i];
    tAlbumsFinal[i].idAlbum = tAlbumsId[i];
}

// on créer un tableau Auteurs en y mettant l'id correspondant
var tAuteursFinal = []
for(let i =0; i < tAuteurs.length; i++) {
    tAuteursFinal[i] = tAuteurs[i];
    tAuteursFinal[i].id = tAuteursId[i];
}

// on créer un tableau Séries en y mettant l'id correspondant
var tSeriesFinal = []
for(let i =0; i < tSeries.length; i++) {
    tSeriesFinal[i] = tSeries[i];
    tSeriesFinal[i].id = tSeriesId[i];
}

// ON CREER UN TABLEAU OU TOUTES LES INFOS SERONT DEDANS
var tInfos = [];
// j'ajoute le nom de l'auteur correspondant
for(let i =0; i < tAlbumsFinal.length; i++) {
    tInfos[i] = tAlbumsFinal[i]; // on copie le tAlbumsFinal
    var searchId = tAlbumsFinal[i].idAuteur; // on récupère l'id Auteur dans mon objet du tableau
    var result = tAuteursFinal.filter(item => item.id.includes(searchId)); // on cherche le nom de l'auteur correspondant à l'id recherché
    tInfos[i].nomAuteur = result[0].nom; // on met 0 pour éviter plusieurs résultat quand on cherche un chiffre < 100 ex: 13 ->>> 13, 131, 113 etc

    // j'ajoute le nom de la série correspondante
    var searchIdSerie = tAlbumsFinal[i].idSerie; // on récupère l'id Serie dans mon objet du tableau
    var resultSerie = tSeriesFinal.filter(item => item.id.includes(searchIdSerie)); // on cherche le nom de la série correspondante à l'id recherché
    tInfos[i].nomSerie = resultSerie[0].nom; // on met 0 pour éviter plusieurs résultat quand on cherche un chiffre < 100 ex: 13 ->>> 13, 131, 113 etc

    tInfos[i].infosTitre = tInfos[i].titre + " - " + tInfos[i].nomSerie + " - " + tInfos[i].nomAuteur;
    tInfos[i].infosAuteur = tInfos[i].nomAuteur + " - " + tInfos[i].nomSerie + " - " + tInfos[i].titre;
    tInfos[i].infosSerie = tInfos[i].nomSerie + " - " + tInfos[i].titre + " - " + tInfos[i].nomAuteur;
}

// // j'ajoute le nom de la série correspondante
// for(let i =0; i < tAlbumsFinal.length; i++) {
//     var searchId = tAlbumsFinal[i].idSerie; // on récupère l'id Serie dans mon objet du tableau
//     var result = tSeriesFinal.filter(item => item.id.includes(searchId)); // on cherche le nom de la série correspondante à l'id recherché
//     tInfos[i].nomSerie = result[0].nom; // on met 0 pour éviter plusieurs résultat quand on cherche un chiffre < 100 ex: 13 ->>> 13, 131, 113 etc
// }

// pour facilité l'affichage ma recherche
// ajouter une propriété comportant : titre - serie - auteur
// for(let i = 0; i < tInfos.length; i++) {
//     tInfos[i].infosTitre = tInfos[i].titre + " - " + tInfos[i].nomSerie + " - " + tInfos[i].nomAuteur;
//     tInfos[i].infosAuteur = tInfos[i].nomAuteur + " - " + tInfos[i].nomSerie + " - " + tInfos[i].titre;
//     tInfos[i].infosSerie = tInfos[i].nomSerie + " - " + tInfos[i].titre + " - " + tInfos[i].nomAuteur;
// }

// for(let i = 0; i < tInfos.length; i++) {
//     tInfos[i].infosAuteur = tInfos[i].nomAuteur + " - " + tInfos[i].nomSerie + " - " + tInfos[i].titre;
// }

// for(let i = 0; i < tInfos.length; i++) {
//     tInfos[i].infosSerie = tInfos[i].nomSerie + " - " + tInfos[i].titre + " - " + tInfos[i].nomAuteur;
// }

// affichage du tableau finale avec toutes les informations nécessaires
console.log("tInfos");
console.log(tInfos);