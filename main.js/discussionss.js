// ======================================================
// KADEA CHAT - discussionss.js
// Partie 1 : Initialisation
// ======================================================

// ------------------------------
// Vérification de connexion
// ------------------------------

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "connexion.html";
}

// ------------------------------
// Données
// ------------------------------

let currentContact = null;

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

let messages = JSON.parse(localStorage.getItem("messages")) || {};

// ------------------------------
// Eléments HTML
// ------------------------------

const contactsPanel = document.getElementById("contactsPanel");
const chatPanel = document.getElementById("chatPanel");

const contactsList = document.getElementById("contactsList");

const addContactBtn = document.getElementById("addContactBtn");

const contactModal = document.getElementById("contactModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const saveContactBtn = document.getElementById("saveContact");
const contactName = document.getElementById("contactName");
const contactPhone = document.getElementById("contactPhone");
const searchInput = document.getElementById("searchInput");
const backBtn = document.getElementById("backBtn");
const chatName = document.getElementById("chatName");
const chatPhone = document.getElementById("chatPhone");
const chatAvatar = document.getElementById("chatAvatar");
const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const emojiBtn = document.getElementById("emojiBtn");
const emojiPanel = document.getElementById("emojiPanel");
const fileInput = document.getElementById("fileInput");
// Sauvegarde
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function saveMessages() {
    localStorage.setItem("messages", JSON.stringify(messages));
}
// ======================================================
// MODAL CONTACT
// ======================================================

function ouvrirModal() {
    contactModal.classList.remove("hidden");
    contactModal.classList.add("flex");
}

function fermerModal() {
    contactModal.classList.remove("flex");
    contactModal.classList.add("hidden");
}

addContactBtn.addEventListener("click", ouvrirModal);

closeModal.addEventListener("click", fermerModal);

cancelBtn.addEventListener("click", fermerModal);

// ======================================================
// AJOUTER UN CONTACT
// ======================================================

saveContactBtn.addEventListener("click", () => {

    const nom = contactName.value.trim();

    const telephone = contactPhone.value.trim();

    if (nom === "" || telephone === "") {

        alert("Veuillez remplir tous les champs.");

        return;

    }

    const existe = contacts.find(contact => contact.phone === telephone);

    if (existe) {

        alert("Ce numéro existe déjà.");

        return;

    }

    const nouveauContact = {

        id: Date.now(),

        name: nom,

        phone: telephone

    };

    contacts.push(nouveauContact);

    saveContacts();

    afficherContacts();

    contactName.value = "";

    contactPhone.value = "";

    fermerModal();

});

// ======================================================
// AFFICHER LES CONTACTS
// ======================================================

function afficherContacts(liste = contacts) {

    contactsList.innerHTML = "";

    if (liste.length === 0) {

        contactsList.innerHTML = `
            <p class="text-center text-gray-500 py-8">
                Aucun contact
            </p>
        `;

        return;

    }

    liste.forEach(contact => {

        const card = document.createElement("div");

        card.className =
            "flex items-center gap-3 p-4 cursor-pointer hover:bg-violet-100 transition";

        card.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
                ${contact.name.charAt(0).toUpperCase()}
            </div>

            <div>

                <h3 class="font-semibold">${contact.name}</h3>

                <p class="text-sm text-gray-500">${contact.phone}</p>

            </div>
        `;

        card.addEventListener("click", () => {

            ouvrirDiscussion(contact);

        });

        contactsList.appendChild(card);

    });

}

afficherContacts();

// ======================================================
// RECHERCHE
// ======================================================

searchInput.addEventListener("input", () => {

    const recherche = searchInput.value.toLowerCase();

    const resultat = contacts.filter(contact =>

        contact.name.toLowerCase().includes(recherche)

        ||

        contact.phone.includes(recherche)

    );

    afficherContacts(resultat);

});
// OUVRIR UNE DISCUSSION

function ouvrirDiscussion(contact) {
    currentContact = contact;
    chatName.textContent = contact.name;
    chatPhone.textContent = contact.phone;
    chatAvatar.textContent =
        contact.name.charAt(0).toUpperCase();

    afficherMessages();

    if (window.innerWidth < 768) {
        contactsPanel.classList.add("hidden");
        chatPanel.classList.remove("hidden");
        chatPanel.classList.add("flex");

    }

}

// ======================================================
// RETOUR (Responsive)
// ======================================================

backBtn.addEventListener("click", () => {
    if (window.innerWidth < 768) {
        chatPanel.classList.remove("flex");
        chatPanel.classList.add("hidden");
        contactsPanel.classList.remove("hidden");

    }
});
// AFFICHER LES MESSAGES
function afficherMessages() {
    chatMessages.innerHTML = "";
    if (!currentContact) {
        chatMessages.innerHTML = `
            <div class="flex items-center justify-center h-full text-gray-500">
                Sélectionnez une discussion.
            </div>
        `;
        return;
    }
    const discussion = messages[currentContact.phone] || [];
    if (discussion.length === 0) {
        chatMessages.innerHTML = `
            <div class="flex items-center justify-center h-full text-gray-500">
                Aucun message.
            </div>
        `;
        return;
    }
   discussion.forEach((message, index) => {

        const div = document.createElement("div");

        div.className =
            message.type === "sent"
                ? "flex justify-end mb-3"
                : "flex justify-start mb-3";

       div.innerHTML = `

<div class="${
    message.type === "sent"
        ? "bg-violet-600 text-white"
        : "bg-white border"
} px-4 py-2 rounded-2xl max-w-[75%] shadow">

    <div class="flex justify-between items-start gap-3">

        <p class="break-words flex-1">

            ${message.text}

        </p>

       ${
    message.text
    ? `<p>${message.text}</p>`
    : ""
}

${
    message.fileType?.startsWith("image/")
    ? `<img src="${message.file}" class="rounded-xl mt-2 max-w-[220px]">`
    : ""
}

${
    message.fileType?.startsWith("video/")
    ? `
        <video
            controls
            class="rounded-xl mt-2 max-w-[220px]">

            <source src="${message.file}">

        </video>
      `
    : ""
}

${
    message.file &&
    !message.fileType.startsWith("image/") &&
    !message.fileType.startsWith("video/")
    ? `
        <a
            href="${message.file}"
            download="${message.fileName}"
            class="text-blue-500 underline">

            📄 ${message.fileName}

        </a>
      `
    : ""
        }


    </div>

    <p class="text-xs opacity-70 mt-2 text-right">

        ${message.time}

    </p>

</div>

`;
        chatMessages.appendChild(div);
    });
    document.querySelectorAll(".editMessage").forEach(btn => {

    btn.addEventListener("click", () => {

        const index = Number(btn.dataset.index);

        const nouveauMessage = prompt(
            "Modifier le message :",
            messages[currentContact.phone][index].text
        );

        if (nouveauMessage === null) return;

        if (nouveauMessage.trim() === "") return;

        messages[currentContact.phone][index].text = nouveauMessage;

        saveMessages();

        afficherMessages();

    });

});
    chatMessages.scrollTop = chatMessages.scrollHeight;
    document.querySelectorAll(".deleteMessage").forEach(btn => {

    btn.addEventListener("click", () => {

        const index = Number(btn.dataset.index);

        if(confirm("Supprimer ce message ?")){

            messages[currentContact.phone].splice(index,1);

            saveMessages();

            afficherMessages();

        }

    });

});
}
// ======================================
// ENVOYER UN MESSAGE


function envoyerMessage() {

    if (!currentContact) {
        alert("Choisissez un contact.");
        return;
    }
    const texte = messageInput.value.trim();
    if (texte === "") return;
    if (!messages[currentContact.phone]) {
        messages[currentContact.phone] = [];
    }
    const message = {
    id: Date.now(),
    text: texte,
    type: "sent",
    status: "sent",
    time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    })
};
    messages[currentContact.phone].push(message);
    saveMessages();
    afficherMessages();
    messageInput.value = "";
    emojiPanel.classList.add("hidden");
    recevoirMessage();
}

// ======================================
// BOUTON ENVOYER

sendBtn.addEventListener("click", envoyerMessage);

// ======================================
// TOUCHE ENTRÉE
messageInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        envoyerMessage();

    }

});
// ======================================
// RÉCEPTION AUTOMATIQUE


function recevoirMessage() {

    setTimeout(() => {

        const reponses = [

            "Salut 😀",

            "Comment vas-tu ?",
            "Bien et toi ?",
            "Ça va bien, merci !",
            "tu fais quoi de beau ?",
            "Quoi de neuf ?",
            "tu as passé une bonne journée ?",
            "Oui, super ! Et toi ?",


            "😂",

            "❤️",

            "💔",

            "A bientôt.",

            "🔥",

            "Merci."

        ];

        const texte =
            reponses[Math.floor(Math.random() * reponses.length)];

        messages[currentContact.phone].push({

            text: texte,

            type: "received",

            time: new Date().toLocaleTimeString([], {

                hour: "2-digit",

                minute: "2-digit"

            })

        });

        saveMessages();
        notification(currentContact.name, texte);

        afficherMessages();

    }, 1000);

}
// ======================================
// EMOJIS
// ======================================

// Ouvrir/Fermer le panneau des emojis

emojiBtn.addEventListener("click", () => {

    emojiPanel.classList.toggle("hidden");

});

// Ajouter un emoji dans le champ de message

document.querySelectorAll(".emoji").forEach(emoji => {

    emoji.addEventListener("click", () => {

        messageInput.value += emoji.textContent;

        messageInput.focus();

    });

});

// Fermer le panneau lorsqu'on clique ailleurs

document.addEventListener("click", (e) => {

    if (
        !emojiPanel.contains(e.target) &&
        !emojiBtn.contains(e.target)
    ) {

        emojiPanel.classList.add("hidden");

    }

});
Notification.requestPermission();

function notification(titre, texte){

    if(Notification.permission === "granted"){

        new Notification(titre,{
            body: texte
        });
    }
}
// ======================================
// ENVOI DE FICHIERS
// ======================================

fileBtn.addEventListener("click", () => {

    fileInput.click();

});

fileInput.addEventListener("change", () => {

    if (!currentContact) {

        alert("Choisissez un contact.");

        return;

    }

    const fichier = fileInput.files[0];

    if (!fichier) return;

    const reader = new FileReader();

    reader.onload = function(e){

        if(!messages[currentContact.phone]){

            messages[currentContact.phone] = [];

        }

        messages[currentContact.phone].push({

            type: "sent",

            file: e.target.result,

            fileName: fichier.name,

            fileType: fichier.type,

            time: new Date().toLocaleTimeString([],{

                hour:"2-digit",

                minute:"2-digit"

            })

        });

        saveMessages();

        afficherMessages();

    }

    reader.readAsDataURL(fichier);

});