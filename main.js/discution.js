// =============================
// Contacts
// =============================

const modal = document.getElementById("contactModal");

const addBtn = document.getElementById("addContactBtn");

const closeBtn = document.getElementById("closeModal");

// Ouvrir

addBtn.addEventListener("click", () => {

    modal.classList.remove("hidden");

    modal.classList.add("flex");

});

// Fermer

closeBtn.addEventListener("click", () => {

    modal.classList.add("hidden");

    modal.classList.remove("flex");

});