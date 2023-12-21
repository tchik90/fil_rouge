// CET CELUI LA
//console.log("tUsers chargé OK")
var tUsers = [
    { // emprunt OK
        nom: "Jean Peuplu", 
        cdeUser: 1,
        abonne: "oui", 
        mail: "tessss@gmail.com",
        amende: 0,
        bdEmprunt: [
            {cdeBd: "1.1", date: "05/12/2023"},
            {cdeBd: "1.2", date: "17/12/2023"},
        ], 
        bdRetard: [
        ]
        },

    { // emprunt NON -> 3 bds
        nom: "Troi Bédé", 
        cdeUser: 2,
        abonne: "oui", 
        mail: "troisb@gmail.com",
        amende: 0,
        bdEmprunt: [
            {cdeBd: "2.2", date: "05/12/2023"},
            {cdeBd: "2.3", date: "17/12/2023"},
            {cdeBd: "3.2", date: "17/12/2023"},
        ], 
        bdRetard: [
        ]
        },

    { // emprunt NON -> 1 retard
        nom: "Henry Tard", 
        cdeUser: 3,
        abonne: "oui", 
        mail: "zut@gmail.com",
        amende: 0,
        bdEmprunt: [
            {cdeBd: "3.3", date: "01/12/2023"},
        ], 
        bdRetard: [
            {cdeBd: "3.3", date: "01/12/2023"},
        ]
        },

    { // emprunt NON -> pas abonné
        nom: "Jean Aimare", 
        cdeUser: 4,
        abonne: "non", 
        mail: "jaima@gmail.com",
        amende: 0,
        bdEmprunt: [
        ], 
        bdRetard: [
        ]
        },

    { // emprunt NON -> 1 amende
        nom: "Teston Toussa", 
        cdeUser: 5,
        abonne: "oui", 
        mail: "teston@gmail.com",
        amende: 1,
        bdEmprunt: [
            {cdeBd: "5.4", date: "10/12/2023"},
        ], 
        bdRetard: [
        ]
        },

]

// document.addEventListener('DOMContentLoaded', function () {
//     listUsers(); 
// });



// // Récupère le nombre de BDs empruntés
// console.log("Bds empruntées : " + Object.keys(tUsers[5].bdEmprunt).length);
// // Récupère le nombre de BDs en retard
// console.log("BDs en retard : " + Object.keys(tUsers[5].bdRetard).length);

// console.log(tUsers[1].nom);
// console.log(tUsers[1].bdEmprunt);
//console.log(tUsers[1].bdEmprunt.bd1.date);
// console.log(tUsers.length);
