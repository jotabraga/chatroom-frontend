let chatContent = [];
let userName;

function getInChat() {
    const nameInput = document.querySelector(".user-name");
    const name = nameInput.value;
    userName = name;

    const chatName = { name: name }
    const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", chatName);

    promisse.then(startChat);
    promisse.catch(changeName);
}
function changeName() {
    const msgError = "O nome " + userName + " está em uso, escolha outro para entrar!";
    alert(msgError);
}
function startChat() {
    chatInit();
    changeScreenFromEntranceToChatScreen();
    setInterval(updateStatusToOnline, 3000);
    setInterval(chatInit, 3000);
}
function updateStatusToOnline() {
    const message = { name: userName };
    axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status', message);
}

function changeScreenFromEntranceToChatScreen() {
    const faceScreenDiv = document.querySelector(".entrance-screen");
    const headerDiv = document.querySelector(".header");
    const chatContentDiv = document.querySelector(".chat-content");
    const footerDiv = document.querySelector(".footer");

    faceScreenDiv.classList.add("hidden");
    headerDiv.classList.remove("hidden");
    chatContentDiv.classList.remove("hidden");
    footerDiv.classList.remove("hidden");
}
function chatInit() {
    const promiseChat = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promiseChat.then(getChatData);
}
function getChatData(answer) {
    chatContent = answer.data;
    console.log(chatContent);
    renderChatMessages();
}
function renderChatMessages() {
    const container = document.querySelector(".chat-content");
    container.innerHTML = "";

    for (let i = 0; i < chatContent.length; i++) {
        let chatBoxStyleByType = "chat-box";
        if (chatContent[i].type === "status") {
            chatBoxStyleByType += " status-type";
        }
        if (chatContent[i].type === "private_message") {
            chatBoxStyleByType += " private-type";
        }

        container.innerHTML += `
        <div class="${chatBoxStyleByType}">${chatContent[i].time} &nbsp; <strong>${chatContent[i].from}</strong> &nbsp; para &nbsp; <strong>${chatContent[i].to}</strong>: ${chatContent[i].text}</div>
      `;
    }
    window.scrollTo(0, document.body.scrollHeight);  //Essa função da um scroll automatico cada vez que um item é add ao chat ou o chat é atualizado
}
function sendMessage() {
    let textToSend = document.querySelector(".text-to-send");
    let textThatWillBeSended = textToSend.value;

    const userMessageToChat = {
        from: userName,
        to: "Todos",
        text: textThatWillBeSended,
        type: "message"
    }
    const requisition = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", userMessageToChat);
    requisition.then(chatInit);
    textToSend.value = "";
    requisition.catch(errorFromSendMessageThreat);
}
function sendMessagePressingEnterButton(enterButton) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
function errorFromSendMessageThreat() {
    window.location.reload();
}
function showContactsToMessage() {
    const darkenedBackground = document.querySelector(".darkened-background");
    const contactsList = document.querySelector(".contacts-list");
    console.log(contactsList);

    darkenedBackground.classList.remove("hidden");
    contactsList.classList.remove("hidden");
}
function hideContactsToMessage(element) {
    this.classList.add("hidden");
    this.nextSibling.classList.add("hidden");
}
