var btnCreate = document.getElementById("btnCreateUser");
var btnClear = document.getElementById('btnClear');

var zoneErreurPrenom = document.getElementById("zoneErreurPrenom");
var zoneErreurNom = document.getElementById("zoneErreurNom");
var zoneErreurMail = document.getElementById("zoneErreurMail");



if (localStorage.getItem('users') != null) {
    // récupération sous forme de tableau
    var tUsers = JSON.parse(localStorage.getItem('users'));
   // console.log(tUsers)
} else {
    alert("Les Local Storage n'ont pas été copiés")
}

btnCreate.addEventListener('click', (e) => {
    // btnCreate.onclick = function(){
    e.preventDefault();

    var newPrenom = document.getElementById("createPrenom").value;
    var newNom = document.getElementById("createNom").value;
    var newMail = document.getElementById("createMail").value;


    const regexpStr = /^[a-zA-Z]+$/;
    const regexpMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    zoneErreurPrenom.innerHTML = "";
    zoneErreurNom.innerHTML = "";
    zoneErreurMail.innerHTML = "";


    if (!regexpStr.test(newPrenom)) {
        zoneErreurPrenom.innerHTML = "Err: Le prénom doit contenir uniquement des caractères";
        return;
    }
    if (!regexpStr.test(newNom)) {
        zoneErreurNom.innerHTML = "Err: Le nom doit contenir uniquement des caractères";
        return;
    }
    if (!regexpMail.test(newMail)) {
        zoneErreurMail.innerHTML = "Err: L'adresse mail n'est pas valide";
        return;
    }

    let emailIsUnique = tUsers.every(user => user.mail !== newMail);
    if (!emailIsUnique) {
        alert("Err: Le mail saisi est déjà utilisé");
        return;
    }

      for (let i = 1; i <= tUsers.length + 1; i++) {
  
        let codeExists = tUsers.some(user => user.cdeUser === i);

        if (!codeExists) {
            newCodeUser = i;
            tUsers.push({
                nom: newNom + " " + newPrenom,
                cdeUser: newCodeUser,
                mail: newMail,
                abonne: "oui",
                amende: "0",
                bdEmprunt: 0,
                bdRetard: 0,
            });
            swal.fire({
                title: "Création",
                text: "L'adhérent a été crée.",
                icon: "success"
            });
            localStorage.setItem('users', JSON.stringify(tUsers));
            break;
        }
    }
document.getElementById("createPrenom").value = "";
document.getElementById("createNom").value = "";
document.getElementById("createMail").value = "";


//AJOUT DANS LA LISTE html 

var ul = document.createElement("ul");
ul.classList.add("list-group");
ul.classList.add("list-group-horizontal");


var liCodeUser = document.createElement("li");
liCodeUser.id = "codeUser_" + newCodeUser;
liCodeUser.classList.add("list-group-item");
liCodeUser.classList.add("col-3");
liCodeUser.textContent = newCodeUser;

var liNom = document.createElement("li");
liNom.id = "nom_" + newCodeUser;
liNom.classList.add("list-group-item");
liNom.classList.add("col-4");
liNom.classList.add("text-break");
liNom.textContent = tUsers[tUsers.length - 1].nom; // Utilisation du dernier utilisateur ajouté

var liMail = document.createElement("li");
liMail.id = "mail_" + newCodeUser;
liMail.classList.add("list-group-item");
liMail.classList.add("col-5");
liMail.classList.add("text-break");
liMail.textContent = tUsers[tUsers.length - 1].mail; // Utilisation du dernier utilisateur ajouté

ul.appendChild(liCodeUser);
ul.appendChild(liNom);
ul.appendChild(liMail);
divParent.appendChild(ul);


// AFFICHE DANS LA CONSOLE 
    console.log(newCodeUser);

    for (let i = 0; i < tUsers.length; i++)
        console.log(tUsers[i]);
});








