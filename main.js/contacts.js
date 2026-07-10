// ==============================
// Gestion des contacts
// ==============================
let currentContact = null;

const modal = document.getElementById("contactModal");
const addBtn = document.getElementById("addContactBtn");
const closeBtn = document.getElementById("closeModal");
const saveBtn = document.getElementById("saveContact");
const nameInput = document.getElementById("contactName");
const phoneInput = document.getElementById("contactPhone");

// Ouvrir la fenêtre
addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
});
// Fermer la fenêtre
closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
});

// Ajouter un contact
saveBtn.addEventListener("click", () => {

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name === "" || phone === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const contact = {
        id: Date.now(),
        name,
        phone
    };

    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    alert("✅ Contact ajouté avec succès !");
    nameInput.value = "";
    phoneInput.value = "";
    modal.classList.add("hidden");
    modal.classList.remove("flex");

    console.log(contacts);

});
function afficherContacts() {
    const contactsList = document.getElementById("contactsList");
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contactsList.innerHTML = "";

    contacts.forEach(contact => {

        const card = document.createElement("div");

        card.className =
            "flex items-center gap-4 p-4 hover:bg-gray-100 rounded-xl cursor-pointer";

        card.innerHTML = `
            <div class="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                ${contact.name.charAt(0).toUpperCase()}
            </div>

            <div>
                <h3 class="font-semibold">${contact.name}</h3>
                <p class="text-gray-500 text-sm">${contact.phone}</p>
            </div>
        `;

      card.addEventListener("click", () => {

    currentContact = contact;

    document.getElementById("chatName").textContent = contact.name;
    document.getElementById("chatPhone").textContent = contact.phone;
    document.getElementById("chatAvatar").textContent =
        contact.name.charAt(0).toUpperCase();

    chatMessages.innerHTML = "";
});

        contactsList.appendChild(card);

    });

}
afficherContacts();
//button envoyer message
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
sendBtn.addEventListener("click", envoyerMessage);

function envoyerMessage() {

    if (!currentContact) {

        alert("Sélectionnez un contact.");

        return;

    }
    const message = messageInput.value.trim();
    if (message === "") return;

    chatMessages.innerHTML += `
        <div class="flex justify-end">

            <div class="bg-violet-600 text-white px-4 py-2 rounded-2xl max-w-xs">

                ${message}

            </div>

        </div>
    `;

    messageInput.value = "";

}
function envoyerMessage() {
    if (!currentContact) {
        alert("Sélectionnez un contact.");
        return;
    }

    const message = messageInput.value.trim();
    if (message === "") return;

    const messageDiv = document.createElement("div");
    messageDiv.className = "flex justify-end";

    const bubble = document.createElement("div");
    bubble.className = "bg-violet-600 text-white px-4 py-2 rounded-2xl max-w-xs";
    bubble.textContent = message; // ✅ emojis inclus

    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);

    messageInput.value = "";
}

