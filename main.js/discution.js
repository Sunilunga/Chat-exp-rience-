}
const emojis = ["😀","😂","❤️","👍","🔥","🎉","😎"];

emojis.forEach(emoji => {
    // Au clic, ajouter l'emoji dans le champ
    messageInput.value += emoji;
});
sendBtn.addEventListener("click", () => {

    if (!currentContact) {
        alert("Sélectionnez un contact");
        return;
    }

    const text = messageInput.value.trim();

    if (text === "") return;

    const message = {
        sender: "me",
        content: text,
        date: new Date().toLocaleTimeString()
    };

    // Sauvegarder et afficher le message

    messageInput.value = "";

});
setTimeout(() => {

    const reply = {
        sender: "contact",
        content: "😀 Bonjour !",
        date: new Date().toLocaleTimeString()
    };

    // Afficher la réponse

}, 1000);