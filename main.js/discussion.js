let currentContact = null;

//---------------------
// Eléments HTML
//---------------------

const modal = document.getElementById("contactModal");
const addBtn = document.getElementById("addContactBtn");
const closeBtn = document.getElementById("closeModal");
const saveBtn = document.getElementById("saveContact");

const nameInput = document.getElementById("contactName");
const phoneInput = document.getElementById("contactPhone");

const contactsList = document.getElementById("contactsList");

const chatName = document.getElementById("chatName");
const chatPhone = document.getElementById("chatPhone");
const chatAvatar = document.getElementById("chatAvatar");

const chatMessages = document.getElementById("chatMessages");

//==================================================
// Ouvrir le modal
//==================================================

addBtn.onclick = () => {

    modal.classList.remove("hidden");
    modal.classList.add("flex");

};

//==================================================
// Fermer le modal
//==================================================

closeBtn.onclick = () => {

    modal.classList.add("hidden");
    modal.classList.remove("flex");

};

//==================================================
// Ajouter un contact
//==================================================

saveBtn.onclick = () => {

    const name = nameInput.value.trim();

    const phone = phoneInput.value.trim();

    if(name==="" || phone===""){

        alert("Remplissez tous les champs.");

        return;

    }

    const contacts =
    JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push({

        id:Date.now(),

        name,

        phone

    });
    localStorage.setItem(
        "contacts",
        JSON.stringify(contacts)

    );
    nameInput.value="";
    phoneInput.value="";
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    afficherContacts();
};

// Afficher les contacts
//==================================================

function afficherContacts(){

    const contacts=

    JSON.parse(localStorage.getItem("contacts")) || [];

    contactsList.innerHTML="";

    contacts.forEach(contact=>{

        const card=document.createElement("div");

        card.className=

        "flex items-center gap-4 p-4 rounded-xl cursor-pointer hover:bg-violet-100 transition";

        card.innerHTML=`

        <div class="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

        ${contact.name[0].toUpperCase()}

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

        card.onclick=()=>{

            ouvrirConversation(contact);

        };
        contactsList.appendChild(card);
    });

}
// Ouvrir une conversation
function ouvrirConversation(contact){

    currentContact=contact;

    chatName.textContent=contact.name;

    chatPhone.textContent=contact.phone;

    chatAvatar.textContent=

    contact.name[0].toUpperCase();

    chatMessages.innerHTML=`

    <div class="flex justify-center mt-10">

        <span class="bg-violet-100 text-violet-700 px-5 py-2 rounded-full">

            Vous discutez avec ${contact.name}

        </span>

    </div>

    `;

}

//==================================================

afficherContacts();