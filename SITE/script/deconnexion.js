// DECONNEXION

document.getElementById('logOut').addEventListener('click', function(event) {
    event.preventDefault(); // Pour éviter que le lien ne suive le href par défaut

    // Affiche une alerte de confirmation avec SweetAlert
    Swal.fire({
        title: 'Voulez-vous vous déconnecter ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'index.html';
        }
    });
});