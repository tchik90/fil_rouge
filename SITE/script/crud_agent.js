// Tableau des agents de la médiathèque
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
];

// Fonction pour afficher la liste des agents sous forme de tableau
function afficherAgents() {
    var objMediatheque = JSON.parse(localStorage.getItem('objMediatheque')) || [];
    var listeAgents = document.getElementById('listeAgents');
    listeAgents.innerHTML = '';

    if (objMediatheque.length === 0) {
        listeAgents.innerHTML = '<p>Aucun agent trouvé.</p>';
        return;
    }

    var table = document.createElement('table');
    table.className = 'table';
    var headerRow = table.createTHead().insertRow(0);

    // Ajouter les en-têtes de colonnes
    var headers = ['Identifiant', 'Mot de passe', 'Rôle', 'Actions'];
    headers.forEach(function (header) {
        var th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    // Ajouter les lignes du tableau
    objMediatheque.forEach(function (agent, index) {
        var row = table.insertRow(-1);

        // Ajouter les cellules
        var cellIdentifiant = row.insertCell(0);
        var cellMdp = row.insertCell(1);
        var cellRole = row.insertCell(2);
        var cellActions = row.insertCell(3);

        cellIdentifiant.textContent = agent.identifiant;
        cellMdp.textContent = agent.mdp;
        cellRole.textContent = agent.role;

        // Ajouter les boutons d'action
        var modifierBtn = document.createElement('button');
        modifierBtn.className = 'modifierAgentBtn btn btn-primary';
        modifierBtn.setAttribute('data-index', index);
        modifierBtn.textContent = 'Modifier';

        var supprimerBtn = document.createElement('button');
        supprimerBtn.className = 'supprimerAgentBtn btn btn-danger';
        supprimerBtn.setAttribute('data-index', index);
        supprimerBtn.textContent = 'Supprimer';

        cellActions.appendChild(modifierBtn);
        cellActions.appendChild(supprimerBtn);
    });

    listeAgents.appendChild(table);
}

// Fonction pour ajouter un agent
function ajouterAgent(identifiant, mdp, role) {// Vérifier si l'identifiant existe déjà
    if (identifiantExiste(identifiant, -1)) {
        Swal.fire('Erreur', 'Cet identifiant est déjà utilisé. Veuillez en choisir un autre.', 'error');
        return;
    }
    var agent = {
        identifiant: identifiant,
        mdp: mdp,
        role: role
    };

    // Ajout d'un nouvel agent
    objMediatheque.push(agent);
    sauvegarderDansLocalStorage();
    afficherAgents();
    fermerFormulaire();
    Swal.fire('Succès', 'Agent ajouté avec succès !', 'success');
}





// Fonction pour modifier un agent
function modifierAgent(identifiant, mdp, index) {
    // Vérifier si l'identifiant est déjà utilisé
    if (identifiantExiste(identifiant, index)) {
        Swal.fire('Erreur', 'Cet identifiant est déjà utilisé. Veuillez en choisir un autre.', 'error');
        return;
    }

    var agent = {
        identifiant: identifiant,
        mdp: mdp,
        role: objMediatheque[index].role
    };

    // Modification d'un agent existant
    objMediatheque[index] = agent;
    sauvegarderDansLocalStorage();
    afficherAgents();
    fermerFormulaire();
    Swal.fire('Succès', 'Agent modifié avec succès !', 'success');
}





// Fonction pour vérifier si un identifiant existe déjà
function identifiantExiste(identifiant, index) {
    return objMediatheque.some((agent, i) => i !== index && agent.identifiant === identifiant);
}

// Fonction pour ouvrir le formulaire en mode ajout ou modification
function ouvrirFormulaire(type, index) {
    var formulaireAjout = document.getElementById('formulaireAgentAjout');
    var formulaireModifier = document.getElementById('formulaireAgentModifier');
    var titreFormulaire = document.getElementById('titreFormulaire');

    if (type === 'ajouter') {
        formulaireAjout.classList.remove('d-none');
        formulaireModifier.classList.add('d-none');
        titreFormulaire.textContent = 'Ajouter agent';
    } else if (type === 'modifier') {
        formulaireAjout.classList.add('d-none');
        formulaireModifier.classList.remove('d-none');
        titreFormulaire.textContent = 'Modifier agent';

        // Remplir le formulaire avec les données de l'agent à modifier
        document.getElementById('identifiantModifier').value = objMediatheque[index].identifiant;
        document.getElementById('mdpModifier').value = objMediatheque[index].mdp;
        document.getElementById('roleModifier').value = objMediatheque[index].role;
        document.getElementById('indexModifier').value = index;
    }
}

// Gestionnaire d'événement pour soumettre le formulaire d'ajout
document.getElementById('formulaireAjout').addEventListener('submit', function (event) {
    event.preventDefault();

    var identifiant = document.getElementById('identifiant').value;
    var mdp = document.getElementById('mdp').value;
    var role = document.getElementById('role').value;

    ajouterAgent(identifiant, mdp, role);
});

// Gestionnaire d'événement pour soumettre le formulaire de modification
document.getElementById('formulaireModifier').addEventListener('submit', function (event) {
    event.preventDefault();

    var identifiant = document.getElementById('identifiantModifier').value;
    var mdp = document.getElementById('mdpModifier').value;
    var index = document.getElementById('indexModifier').value;

    modifierAgent(identifiant, mdp, index);
});

// Gestionnaire d'événement pour annuler l'ajout ou la modification
document.getElementById('annulerFormulaireAjoutBtn').addEventListener('click', function() {
    fermerFormulaire();
});

document.getElementById('annulerFormulaireModifierBtn').addEventListener('click', function() {
    fermerFormulaire();
});

// Fonction pour fermer le formulaire
function fermerFormulaire() {
    var formulaireAjout = document.getElementById('formulaireAgentAjout');
    var formulaireModifier = document.getElementById('formulaireAgentModifier');

    formulaireAjout.classList.remove('d-none');
    formulaireModifier.classList.add('d-none');

    // Réinitialiser le formulaire
    document.getElementById('formulaireAjout').reset();
    document.getElementById('formulaireModifier').reset();
}

// Fonction pour supprimer un agent
function supprimerAgent(index) {
    // Vérifier le rôle de l'agent à supprimer
    var roleASupprimer = objMediatheque[index].role;

    // Vérifier s'il reste au moins un administrateur
    var nbAdminsRestants = objMediatheque.filter(agent => agent.role === 2).length;

    // Si l'agent à supprimer est un administrateur et il reste un seul administrateur, afficher un message d'erreur
    if (roleASupprimer === 2 && nbAdminsRestants === 1) {
        Swal.fire({
            title: 'Erreur',
            text: 'Il doit y avoir au moins un administrateur. Impossible de supprimer le dernier administrateur.',
            icon: 'error',
        });
    } else {
        Swal.fire({
            title: 'Supprimer Agent',
            text: 'Êtes-vous sûr de vouloir supprimer cet agent ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer !',
        }).then((result) => {
            if (result.isConfirmed) {
                objMediatheque.splice(index, 1);
                sauvegarderDansLocalStorage();
                afficherAgents();
                Swal.fire('Succès', 'Agent supprimé avec succès !', 'success');
            }
        });
    }
}

function sauvegarderDansLocalStorage() {
    localStorage.setItem('objMediatheque', JSON.stringify(objMediatheque));
}

// Gestion des événements

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modifierAgentBtn')) {
        var index = event.target.getAttribute('data-index');
        ouvrirFormulaire('modifier', index);
    } else if (event.target.classList.contains('supprimerAgentBtn')) {
        var index = event.target.getAttribute('data-index');
        supprimerAgent(index);
    } else if (event.target.id === 'annulerFormulaireAjoutBtn' || event.target.id === 'annulerFormulaireModifierBtn') {
        fermerFormulaire();
    }
});

// Affichage initial des agents
afficherAgents();