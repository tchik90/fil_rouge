
// Tableau des agents de la médiathèque
var objMediatheque = JSON.parse(localStorage.getItem('objMediatheque')) || [];

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

// Fonction pour afficher la liste des agents dans un tableau
function afficherAgents() {
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

// Fonction pour ouvrir le formulaire d'ajout
function ouvrirFormulaireAjouter() {
    var formulaire = document.createElement('div');
    formulaire.innerHTML = document.getElementById('formulaireAjouterAgent').outerHTML;

    // Vérifier si formulaire n'est pas null avant d'ajouter l'écouteur d'événements
    if (formulaire) {
        var identifiant = formulaire.querySelector('#identifiant');
        var mdp = formulaire.querySelector('#mdp');
        var role = formulaire.querySelector('#role');

        identifiant.value = '';
        mdp.value = '';
        role.value = '';

        Swal.fire({
            title: 'Ajouter Agent',
            html: formulaire,
            showCancelButton: false,
            showConfirmButton: false,
            didOpen: function () {
                document.getElementById('formulaireAjouterAgent').style.display = 'block';
            },
            willClose: function () {
                document.getElementById('formulaireAjouterAgent').style.display = 'none';
            }
        });

        formulaire.querySelector('form').addEventListener('submit', function (event) {
            event.preventDefault();

            var formData = {
                identifiant: identifiant.value,
                mdp: mdp.value,
                role: role.value,
            };

            ajouterAgent(formData);

            Swal.close();
            afficherAgents();
        });

        formulaire.querySelector('#annulerAjouterFormulaireBtn').addEventListener('click', fermerFormulaire);
    }
}

// Fonction pour ajouter un agent
function ajouterAgent(agent) {
    // Vérifier si l'identifiant n'existe pas déjà
    if (!agentExiste(agent.identifiant)) {
        objMediatheque.push(agent);
        sauvegarderDansLocalStorage();
    } else {
        // Afficher un message d'erreur ou gérer la situation d'ajout en double
        console.error('L\'identifiant existe déjà. Veuillez choisir un autre identifiant.');
    }
}

// Fonction pour ouvrir le formulaire de modification
function ouvrirFormulaireModifier(index) {
    var formulaire = document.getElementById('formulaireModifier'); // Assurez-vous que l'élément existe
    formulaire.reset();

    var agent = objMediatheque[index];

    // Remplir le formulaire avec les données actuelles
    document.getElementById('identifiant').value = agent.identifiant;
    document.getElementById('mdp').value = agent.mdp;
    document.getElementById('role').value = agent.role;

    Swal.fire({
        title: 'Modifier Agent',
        html: document.getElementById('formulaireModifierAgent').outerHTML,
        showCancelButton: false,
        showConfirmButton: false,
        didOpen: function () {
            document.getElementById('formulaireModifierAgent').style.display = 'block';
        },
        willClose: function () {
            document.getElementById('formulaireModifierAgent').style.display = 'none';
        }
    });

    document.getElementById('formulaireModifier').addEventListener('submit', function (event) {
        event.preventDefault();

        var formData = {
            identifiant: document.getElementById('identifiant').value,
            mdp: document.getElementById('mdp').value,
            role: document.getElementById('role').value,
        };

        modifierAgent(index, formData);

        Swal.close();
        afficherAgents();
    });

    document.getElementById('annulerModifierFormulaireBtn').addEventListener('click', fermerFormulaire);
}

// Fonction pour modifier un agent
function modifierAgent(index, agent) {
    // Vérifier si le nouvel identifiant n'existe pas déjà (sauf à l'index actuel)
    if (!agentExiste(agent.identifiant, index)) {
        objMediatheque[index] = agent;
        sauvegarderDansLocalStorage();
    } else {
        // Afficher un message d'erreur ou gérer la situation de modification en double
        console.error('L\'identifiant existe déjà. Veuillez choisir un autre identifiant.');
    }
}

// Fonction pour fermer le formulaire
function fermerFormulaire() {
    Swal.close();
    document.getElementById('formulaireAjouterAgent').style.display = 'none';
    document.getElementById('formulaireModifierAgent').style.display = 'none';
}

// Fonction pour vérifier si un agent avec l'identifiant donné existe déjà
function agentExiste(identifiant, currentIndex) {
    currentIndex = currentIndex || -1;
    return objMediatheque.some(function (agent, index) {
        return agent.identifiant === identifiant && index !== currentIndex;
    });
}

// Fonction pour supprimer un agent
function supprimerAgent(index) {
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
        }
    });
}

function sauvegarderDansLocalStorage() {
    localStorage.setItem('objMediatheque', JSON.stringify(objMediatheque));
}

// Gestion des événements
document.getElementById('ajouterAgentBtn').addEventListener('click', function () {
    ouvrirFormulaireAjouter();
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('modifierAgentBtn')) {
        var index = event.target.getAttribute('data-index');
        ouvrirFormulaireModifier(index);
    } else if (event.target.classList.contains('supprimerAgentBtn')) {
        var index = event.target.getAttribute('data-index');
        supprimerAgent(index);
    }
});

// Affichage initial des agents
afficherAgents();
