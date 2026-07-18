// =============================================
// CONFIGURATION API

const API_URL = "https://kadea-chat-api.onrender.com";

// Remplace par ton vrai Workspace Token
const API_KEY = "TON_WORKSPACE_TOKEN";

// Token JWT enregistré après la connexion
const TOKEN = localStorage.getItem("token");

// =============================================
// ELEMENTS HTML
const profileImage = document.getElementById("profileImage");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const accountName = document.getElementById("accountName");
const accountEmail = document.getElementById("accountEmail");
const imageInput = document.getElementById("imageInput");
const editNameBtn = document.getElementById("editNameBtn");
const nameModal = document.getElementById("nameModal");
const cancelName = document.getElementById("cancelName");
const saveName = document.getElementById("saveName");
const newName = document.getElementById("newName");
// =============================================
// UTILISATEUR CONNECTE
let currentUser = null;
// =============================================
// CHARGER LE PROFIL
async function chargerProfil() {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                "x-api-key": API_KEY,
                "Authorization": `Bearer ${TOKEN}`

            }

        });
        const result = await response.json();
        if (!result.success) {
            alert(result.message);
            return;
        }
        currentUser = result.data;
        afficherProfil();
    }
    catch (error) {
        console.error(error);
        alert("Impossible de récupérer le profil.");
    }

}
// =============================================
// AFFICHER LE PROFIL
function afficherProfil() {
    if (!currentUser) return;
    // Nom
    profileName.textContent =
        currentUser.fullName || "Utilisateur";
    accountName.textContent =
        currentUser.fullName || "Utilisateur";
    // Email
    profileEmail.textContent =
        currentUser.email || "";
    accountEmail.textContent =
        currentUser.email || "";
    // Avatar
    if (currentUser.avatarUrl) {
        profileImage.src = currentUser.avatarUrl;
    } else {
        profileImage.src =
            "https://i.pravatar.cc/300";

    }
    // Bio (si tu ajoutes cet élément dans ton HTML)
    const bio = document.getElementById("profileBio");
    if (bio) {
        bio.textContent =
            currentUser.bio || "Aucune bio.";
    }
}
// =============================================
// LANCEMENT
document.addEventListener("DOMContentLoaded", () => {

    if (!TOKEN) {
        alert("Vous devez vous connecter.");
        window.location.href = "connexion.html";
        return;
    }
    chargerProfil();
});
// MODAL MODIFIER LE NOM
editNameBtn.addEventListener("click", () => {
    newName.value = currentUser.fullName || "";
    nameModal.classList.remove("hidden");
    nameModal.classList.add("flex");

});

cancelName.addEventListener("click", () => {
    nameModal.classList.add("hidden");
    nameModal.classList.remove("flex");

});
// ENREGISTRER LE NOUVEAU NOM
saveName.addEventListener("click", async () => {
    const fullName = newName.value.trim();
    if (!fullName) {
        alert("Veuillez saisir un nom.");
        return;

    }

    try {
        const response = await fetch(`${API_URL}/users/me`, {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
                "Authorization": `Bearer ${TOKEN}`

            },
            body: JSON.stringify({
                fullName: fullName
            })

        });
        const result = await response.json();
        if (!result.success) {
            alert(result.message);
            return;
        }
        currentUser.fullName = fullName;
        afficherProfil();
        nameModal.classList.add("hidden");
        nameModal.classList.remove("flex");
        alert("Nom modifié avec succès.");

    }
    catch (error) {
        console.error(error);
        alert("Erreur lors de la modification du nom.");
    }

});
// CHANGER LA PHOTO DE PROFIL

imageInput.addEventListener("change", async () => {

    const file = imageInput.files[0];

    if (!file) return;

    // Prévisualisation immédiate
    const reader = new FileReader();

    reader.onload = (e) => {

        profileImage.src = e.target.result;

    };

    reader.readAsDataURL(file);

    // Demande l'URL de l'image
    const avatarUrl = prompt(
        "Collez l'URL publique de votre photo :",
        currentUser.avatarUrl || ""
    );

    if (!avatarUrl) {
        afficherProfil();
        return;

    }

    try {
        const response = await fetch(`${API_URL}/users/me`, {

            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
                "Authorization": `Bearer ${TOKEN}`

            },
            body: JSON.stringify({
              avatarUrl: avatarUrl
            })
        });
        const result = await response.json();
        if (!result.success) {
            alert(result.message);
            afficherProfil();
            return;
        }
        currentUser.avatarUrl = avatarUrl;
        afficherProfil();
        alert("Photo de profil mise à jour.");
    }
    catch (error) {
        console.error(error);
        alert("Erreur lors de la mise à jour de la photo.");
        afficherProfil();
    }

});
// ============================================
// BIO
const profileBio = document.getElementById("profileBio");
const editBioBtn = document.getElementById("editBioBtn");
editBioBtn.addEventListener("click", async () => {
    const nouvelleBio = prompt(
        "Modifier votre bio",
        currentUser.bio || ""
    );
    if (nouvelleBio === null) return;
    try{
        const response = await fetch(`${API_URL}/users/me`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "x-api-key":API_KEY,
                "Authorization":`Bearer ${TOKEN}`
            },
            body:JSON.stringify({
                bio:nouvelleBio
         })

        });
       const result = await response.json();
       console.log(result);
        if(!result.success){
            alert(result.message);
            return;
        }
        currentUser.bio = nouvelleBio;
        afficherProfil();
        alert("Bio mise à jour.");
    }
    catch(error){
        console.error(error);
        alert("Erreur lors de la modification.");
    }

});
// METTRE A JOUR LE PROFIL
function actualiserProfil(){
    profileName.textContent = currentUser.fullName;
    accountName.textContent = currentUser.fullName;
    profileEmail.textContent = currentUser.email;
    accountEmail.textContent = currentUser.email;
    profileImage.src =
        currentUser.avatarUrl ||
        "https://i.pravatar.cc/300";
    if(profileBio){
        profileBio.textContent =
            currentUser.bio ||
            "Aucune bio";

    }

}
const deleteAccountBtn = document.getElementById("deleteAccountBtn");
deleteAccountBtn.addEventListener("click", async () => {
    const confirmation = confirm(
        "Voulez-vous vraiment vous déconnecter de votre compte ?"
    );

    if (!confirmation) return;

    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "x-api-key": API_KEY,

                "Authorization": `Bearer ${TOKEN}`

            }

        });

    } catch (error) {
        console.error(error);
    }
    localStorage.removeItem("token");
    window.location.href = "connexion.html";

});
