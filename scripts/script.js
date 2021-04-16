let chatContent = [];
let userName;

function getInChat(){

    const nameInput = document.querySelector(".user-name");
    const name = nameInput.value;
    userName = name;

    const chatName = {
        name: name
    }
    const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants",chatName);

    promisse.then(startChat);
    promisse.catch(changeName);
}

function startChat(){
    chatInit();
    changeScreen();
    setInterval(updateStatus,3000);
    setInterval(chatInit,3000);
}

function updateStatus() {
    let message = {name: userName};     
    axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status', message); 
}

function changeName(){
    const msgError = "O nome " +userName+ " está em uso, escolha outro para entrar!";
    alert(msgError);
}

function changeScreen(){
    const faceScreenDiv = document.querySelector(".entrance-screen");    
    const headerDiv = document.querySelector(".header");
    const chatContentDiv = document.querySelector(".chat-content");
    const footerDiv = document.querySelector(".footer");

    faceScreenDiv.classList.add("hidden");
    headerDiv.classList.remove("hidden");
    chatContentDiv.classList.remove("hidden");
    footerDiv.classList.remove("hidden");
}

function chatInit(){
    const promisseChat = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promisseChat.then(getChatData);
}  

function getChatData(answer){
    chatContent = answer.data;
    console.log(chatContent);
    renderChatMessages(); 
} 

function renderChatMessages(){    
    
    const container = document.querySelector(".chat-content");
    container.innerHTML = "";

    for(let i=0; i < chatContent.length; i++)
    {
        if(chatContent[i].type === "status"){
        container.innerHTML += `
        <div class="chat-box status-type">${chatContent[i].time} &nbsp; <strong>${chatContent[i].from}</strong> &nbsp; para ${chatContent[i].to}: ${chatContent[i].text}</div>
      `;}else    
        if(chatContent[i].type === "private_message"){
            container.innerHTML += `
            <div class="chat-box private-type">${chatContent[i].time} &nbsp; <strong>${chatContent[i].from}</strong> &nbsp; para ${chatContent[i].to}: ${chatContent[i].text}</div>
      `;}else{
            container.innerHTML += `
            <div class="chat-box">${chatContent[i].time} &nbsp; <strong>${chatContent[i].from}</strong> &nbsp; para ${chatContent[i].to}: ${chatContent[i].text}</div>
      `;}    
    }
    window.scrollTo(0, document.body.scrollHeight);
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
    
    const requisition = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages",userMessageToChat);
    requisition.then(chatInit); 
    textToSend.value = "";
    requisition.catch(errorThreat);   
}
function errorThreat(){
    window.location.reload(true);
}
