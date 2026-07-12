const profileEmail = document.querySelector("section p");
const editBtn = document.querySelector(".bg-violet-600");

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

const deleteBtn = document.getElementById("deleteAccountBtn");

deleteBtn.addEventListener("click", () => {

    const confirmation = confirm(
        "Voulez-vous vraiment supprimer votre compte ?"
    );

    if (!confirmation) {

        return;

    }

    // Suppression locale

    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("contacts");
    localStorage.removeItem("messages");

    alert("Votre compte a été supprimé avec succès.");

    window.location.href = "connexion.html";

});
// Déconnexion
const profileImage = document.getElementById("profileImage");

const imageInput = document.getElementById("imageInput");

const profileName = document.getElementById("profileName");

const editNameBtn = document.getElementById("editNameBtn");

const nameModal = document.getElementById("nameModal");

const newName = document.getElementById("newName");

const saveName = document.getElementById("saveName");

const cancelName = document.getElementById("cancelName");


// Charger les données

const savedImage = localStorage.getItem("profileImage");
if(savedImage){
    profileImage.src = savedImage;
}

const savedName = localStorage.getItem("profileName");
if(savedName){
    profileName.textContent = savedName;
}

// Modifier la photo

imageInput.addEventListener("change"),(e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
   reader.onload = () => {

    profileImage.src = reader.result;

    const user = JSON.parse(localStorage.getItem("currentUser"));

    user.photo = reader.result;

    localStorage.setItem("currentUser", JSON.stringify(user));

};

    reader.readAsDataURL(file);
 }

// Ouvrir la fenêtre

editNameBtn.onclick=()=>{

    newName.value=profileName.textContent;

    nameModal.classList.remove("hidden");

    nameModal.classList.add("flex");

};
// Annuler
cancelName.onclick = () => {
    nameModal.classList.remove("flex");
    nameModal.classList.add("hidden");
};

// Sauvegarder

saveName.onclick=()=>{

  const user = JSON.parse(localStorage.getItem("currentUser"));
user.fullName = newName.value;
localStorage.setItem("currentUser", JSON.stringify(user));

profileName.textContent = newName.value;
    localStorage.setItem(

        "profileName",

        newName.value

    );

    nameModal.classList.add("hidden");

};