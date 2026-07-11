const profileName = document.querySelector("h2");
const profileEmail = document.querySelector("section p");
const editBtn = document.querySelector(".bg-violet-600");
const logoutBtn = document.querySelector(".text-red-600");

// Charger le profil

function loadProfile() {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    profileName.textContent = user.fullName;
    profileEmail.textContent = user.email;

}

// Charger au démarrage

loadProfile();

// Suppression du compte (local)

const deleteAccountBtn = document.getElementById("deleteAccountBtn");

deleteAccountBtn.addEventListener("click", () => {

    const confirmation = confirm(
        "Voulez-vous supprimer votre compte ?\n\nCette action supprimera toutes les données enregistrées localement."
    );

    if (!confirmation) {
        return;
    }

    // Supprimer les données locales

    localStorage.removeItem("currentUser");
    localStorage.removeItem("contacts");
    localStorage.removeItem("messages");

    alert("✅ Votre compte a été supprimé avec succès.");

    // Redirection

    window.location.href = "register.html";

});