const API_URL = "https://kadea-chat-api.onrender.com";
// ===== Clé du Workspace =====
const API_KEY = "wksp_831a5b66c9a8e19184cdd4a1f3119412";
// ===== Récupération des éléments =====
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
// Afficher / Masquer le mot de passe
togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");

    }
});
// Connexion utilisateur
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // ===== Récupération des valeurs =====
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    // ===== Vérification =====
    if (!email || !password) {
        alert("⚠️ Veuillez remplir tous les champs.");
        return;
    }
    try {
        // ===== Envoi vers l'API ====
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        console.log(data);
        // Connexion réussie
        if (response.ok && data.success) {
            // Sauvegarde du Token JWT
            localStorage.setItem("token", data.data.token);
            // Sauvegarde des informations utilisateur
            localStorage.setItem("user", JSON.stringify(data.data.user));
            alert("✅ Connexion réussie !");
            // Redirection
            window.location.href = "dashboard.html";

        }
        else {
            alert("❌ " + data.message);

        }
    }
    catch (error) {
        console.error(error);
        alert("❌ Impossible de contacter le serveur.");
    }
});
fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {

    // Connexion réussie

});
localStorage.setItem("token", data.token);

window.location.href = "discussionss.html";