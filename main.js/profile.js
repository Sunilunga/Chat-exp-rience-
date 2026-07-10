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