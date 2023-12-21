// ---------------------------------------------------------------------------------------
// --------------------------- Initialisation des variables
// ---------------------------------------------------------------------------------------

// ok Les boutons de la nav latérale
var btnEmprunt = document.getElementById("btnEmprunt");
var btnRetard = document.getElementById("btnRetard");
var btnNbrAbonnes = document.getElementById("btnNbrAbonnes");
var btnNbrBd = document.getElementById("btnNbrBd");
var btnGain = document.getElementById("btnGain");

// Les affichages des graphiques
var statsEmprunt = document.getElementById("statsEmprunt");
var statsRetard = document.getElementById("statsRetard");
var statsNbrAbonnes = document.getElementById("statsNbrAbonnes");
var statsNbrBds = document.getElementById("statsNbrBds");
var statsGain = document.getElementById("statsGain")

// Initialisation de l'affichages statistiques
AfficheStatsEmprunt();

// ---------------------------------------------------------------------------------------
// --------------------------- Actions clicks boutons
// ---------------------------------------------------------------------------------------
btnEmprunt.onclick = function() {
    toutReset();
    statsEmprunt.style.display = "";
    AfficheStatsEmprunt();
}
btnRetard.onclick = function() {
    toutReset();
    statsRetard.style.display = "";
    AfficheStatsRetard();
}
btnNbrAbonnes.onclick = function() {
    toutReset();
    statsNbrAbonnes.style.display = "";
    AfficheStatsNbrAbonnes();
}
btnNbrBd.onclick = function() {
    toutReset();
    statsNbrBds.style.display = "";
    AfficheStatsNbrBds();
}
btnGain.onclick = function() {
    toutReset();
    statsGain.style.display = "";
    AfficheGain();
}


// ---------------------------------------------------------------------------------------
// --------------------------- Fonctions
// ---------------------------------------------------------------------------------------

function AfficheStatsEmprunt() {
    btnEmprunt.className = "nav-link active";
    btnEmprunt.style.color = "var(--orange)";

    new Chart(document.querySelector(".classEmprunt"), {
        type: 'bar',
        data: {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            datasets: [
                {
                    //label: "BDs empruntées",
                    backgroundColor: ["#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00"],
                    data: [125,232,154,174,203,165,142,122,254,223,194,140],
                }
            ]
        },
        options: {
            legend: { display: true },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Nombre de BDs empruntées"
                      },
                  ticks: {
                    beginAtZero: true
                  }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Mois"
                      },
                }]
              },
            legend: { display: false },
            title: {
                display: true,
                text: 'BDs empruntées'
            },
        }
    });

    return
}

function AfficheStatsRetard() {
    btnRetard.className = "nav-link active";
    btnRetard.style.color = "var(--orange)";

    new Chart(document.querySelector(".classRetard"), {
        type: 'bar',
        data: {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            datasets: [
                {
                    //label: "BDs empruntées",
                    backgroundColor: ["#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00"],
                    data: [12,23,15,17,20,16,14,12,25,22,19,12],
                }
            ]
        },
        options: {
            legend: { display: true },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Nombre de BDs en retard"
                      },
                  ticks: {
                    beginAtZero: true
                  }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Mois"
                      },
                }]
              },
            legend: { display: false },
            title: {
                display: true,
                text: 'BDs en retard'
            },
        }
    });

    return
}

function AfficheStatsNbrAbonnes() {
    btnNbrAbonnes.className = "nav-link active";
    btnNbrAbonnes.style.color = "var(--orange)";

    new Chart(document.querySelector(".classNbrAbonnes"), {
        type: 'bar',
        data: {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            datasets: [
                {
                    //label: "Nbr",
                    backgroundColor: ["#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00"],
                    data: [212,223,215,217,220,216,254,262,265,262,270,272],
                }
            ]
        },
        options: {
            legend: { display: true },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Nombre d'abonnés"
                      },
                  ticks: {
                    beginAtZero: true
                  }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Mois"
                      },
                }]
              },
            legend: { display: false },
            title: {
                display: true,
                text: "Nombre d'abonnés"
            },
        }
    });

    return
}

function AfficheStatsNbrBds() {
    btnNbrBd.className = "nav-link active";
    btnNbrBd.style.color = "var(--orange)";

    new Chart(document.querySelector(".classNbrBds"), {
        type: 'bar',
        data: {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            datasets: [
                {
                    //label: "BDs",
                    backgroundColor: ["#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00"],
                    data: [475,480,485,490,495,500,505,510,515,520,525,530],                    
                }
            ]
        },
        options: {
            legend: { display: true },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Nombre de BDs"
                      },
                  ticks: {
                    beginAtZero: true
                  }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Mois"
                      },
                }]
              },
            legend: { display: false },
            title: {
                display: true,
                text: "Nombre de BDs"
            },
        }
    });

    return
}

function AfficheGain() {
    btnGain.className = "nav-link active";
    btnGain.style.color = "var(--orange)";

    new Chart(document.querySelector(".classGain"), {
        type: 'bar',
        data: {
            labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            datasets: [
                {
                    //label: "BDs",
                    backgroundColor: ["#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00", "#ffcc00"],
                    data: [2120,2230,2150,2170,2200,2160,2540,2620,2650,2620,2700,2720],                    
                }
            ]
        },
        options: {
            legend: { display: true },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "euros €"
                      },
                  ticks: {
                    beginAtZero: true
                  }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Mois"
                      },
                }]
              },
            legend: { display: false },
            title: {
                display: true,
                text: "Nombre de BDs"
            },
        }
    });

    return
}

function toutReset() {
    // on cache les graphiques
    statsEmprunt.style.display = "none";
    statsRetard.style.display= "none";
    statsNbrAbonnes.style.display= "none";
    statsNbrBds.style.display= "none";
    statsGain.style.display= "none";

    // couleurs des boutons
    btnEmprunt.style.color = "var(--gris)";
    btnRetard.style.color = "var(--gris)";
    btnNbrAbonnes.style.color = "var(--gris)";
    btnNbrBd.style.color = "var(--gris)";
    btnGain.style.color = "var(--gris)";

    // attribut active supprimé des boutons
    btnEmprunt.className = "nav-link";
    btnRetard.className = "nav-link";
    btnNbrAbonnes.className = "nav-link";
    btnNbrBd.className = "nav-link";
    btnGain.className = "nav-link";
}