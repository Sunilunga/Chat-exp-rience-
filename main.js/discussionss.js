

// Contact actuellement sélectionné
let currentContact = null;

//========================
// Eléments HTML
//========================

const contactsList = document.getElementById("contactsList");
const addContactBtn = document.getElementById("addContactBtn");
const chatMessages = document.getElementById("chatMessages");
const chatName = document.getElementById("chatName");
const chatPhone = document.getElementById("chatPhone");
const chatAvatar = document.getElementById("chatAvatar");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const emojiBtn = document.getElementById("emojiBtn");
const emojiPanel = document.getElementById("emojiPanel");
const searchInput = document.getElementById("searchInput");
// Contacts
//========================

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
// Messages
let messages = JSON.parse(localStorage.getItem("messages")) || {};
function saveContacts(){

    localStorage.setItem(

        "contacts",

        JSON.stringify(contacts)

    );

}

function saveMessages(){

    localStorage.setItem(

        "messages",

        JSON.stringify(messages)

    );

}
 saveMessages()
 
function afficherContacts(liste = contacts){

    contactsList.innerHTML = "";

    liste.forEach(contact=>{

        const card = document.createElement("div");

        card.className =

        "flex items-center gap-4 p-4 rounded-xl cursor-pointer hover:bg-violet-100 transition";

        card.innerHTML = `

        <div class="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center text-lg font-bold">

            ${contact.name.charAt(0).toUpperCase()}

        </div>

        <div>

            <h3 class="font-semibold">

                ${contact.name}

            </h3>

            <p class="text-gray-500 text-sm">

                ${contact.phone}

            </p>

        </div>

        `;

        card.addEventListener("click",()=>{

            ouvrirDiscussion(contact);

        });

        contactsList.appendChild(card);

    });

}
afficherContacts();
function ouvrirDiscussion(contact){

    currentContact = contact;

    chatName.textContent = contact.name;

    chatPhone.textContent = contact.phone;

    chatAvatar.textContent =

    contact.name.charAt(0).toUpperCase();

}
 afficherMessages();
