getInChat();

let chatContent = [];

function getInChat(){

    //const name = prompt("Qual seu nickname?");

    //const promisse = axion.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants");
    const promisseChat = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promisseChat.then(getChat);

    function getChat(answer){
        chatContent = answer.data;
       
        renderMsgs();
    }
    
}

function renderMsgs(){
    const container = document.querySelector(".chat-content");
    container.innerHTML = "";

    for(let i=0; i < chatContent.length; i++)
    {
        container.innerHTML += `
        <div class="chat-box"><p>${chatContent[i].text}</p></div>
    `;
        
        
        
        
    
    }
    }