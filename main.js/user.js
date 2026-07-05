const API_KEY = "wksp_831a5b66c9a8e19184cdd4a1f3119412";
const API_URL =
"https://kadea-chat-api.onrender.com/auth/register";

function togglePassword(id){
    const input = document.getElementById(id);
    if(input.type === "password"){
        input.type = "text";
    }else{
        input.type = "password";
    }

}
const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const fullName =
    document.getElementById("fullName").value.trim();
    const email =
    document.getElementById("email").value.trim();
    const password =
    document.getElementById("password").value;
    const confirmPassword =
    document.getElementById("confirmPassword").value;
    const message =
    document.getElementById("message");
    if(password !== confirmPassword){
        message.classList.remove("hidden");
        message.className =
        "bg-red-100 text-red-700 rounded-lg p-4";
        message.textContent =
        "Les mots de passe ne correspondent pas.";
        return;
    }

    try{

      const response = await fetch("https://kadea-chat-api.onrender.com/auth/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "wksp_831a5b66c9a8e19184cdd4a1f3119412"
    },
    body: JSON.stringify({
        fullName,
        email,
        password
    })
});
const data = await response.json();

if (response.ok && data.success) {
    alert("✅ Votre compte a été créé avec succès !");
    window.location.href = "login.html";
} else {
    alert("❌ " + (data.message || "Erreur lors de la création du compte."));
}
}catch (error) {
    console.error("Erreur lors de la requête :", error);
    alert("❌ Une erreur est survenue. Veuillez réessayer plus tard.");
}
});  