// Tableau des agents mediatheque objets

var objMediatheque = [
    { 
        identifiant: "Bib01",
        mdp: "bibliothecaire", 
        role: 1,
    },
    { 
        identifiant: "Admin01",
        mdp: "admin",
        role: 2,
    },
    { 
        identifiant: "Resp01",
        mdp: "responsable",
        role: 3,
    },
]

var btnConnexion = document.getElementById("button");
var afficheErreur = document.getElementById("erreur");
afficheErreur.style.display = "none"

// Evenements

btnConnexion.onclick = function() {
    connexion();
}

// FONCTION
function connexion() {
    let identifiant = document.getElementById('identifiant').value;
    let mdp = document.getElementById('mdp').value;
    let erreur = document.getElementById('erreur');
    // console.log ("Votre identifiant est " + identifiant + " et votre mot de passe est " + mdp);

    for (let i = 0; i < objMediatheque.length; i++) {
        if (identifiant === objMediatheque[i].identifiant && mdp === objMediatheque[i].mdp) {
            Swal.fire({
                title: 'Connexion réussie!',
                text: 'Vous êtes connecté.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Stocker les informations de l'utilisateur dans la session
            sessionStorage.setItem('user', JSON.stringify(objMediatheque[i]));

            // Rediriger l'utilisateur vers une page sécurisée
            redirectToDashboard(objMediatheque[i].role);
            return;
        }
    }

    // Si l'identification échoue
    Swal.fire({
        title: 'Erreur',
        text: 'Identifiant ou mot de passe incorrect.',
        icon: 'error',
        confirmButtonText: 'OK'
    });

    // Afficher l'erreur dans l'élément HTML
    afficheErreur.style.display = ""
    erreur.innerText = "Identifiant ou mot de passe erroné";
}

function redirectToDashboard(role) {
    switch (role) {
        case 1:
            Swal.fire({
                title: 'Bienvenue!',
                text: 'Vous êtes sur le dashboard bibliothécaire.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            window.location.assign("bibliothecaire.html");
            break;
        case 2:
            Swal.fire({
                title: 'Bienvenue!',
                text: 'Vous êtes sur le dashboard Admin.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            window.location.assign("administrateur.html");
            break;
        case 3:
            Swal.fire({
                title: 'Bienvenue!',
                text: 'Vous êtes sur le dashboard Responsable.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            window.location.assign("responsable_stats_emprunt.html");
            break;
        // Ajoutez d'autres rôles au besoin
        default:
            Swal.fire({
                title: 'Erreur',
                text: 'Rôle non reconnu.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            break;
    }
}

