
export const messageUi = (message, count) => {
    const messagesBox = document.getElementById('messages')
    let newElement = document.createElement("div");
        newElement.innerHTML += `<p><strong>${message.u.name} : </strong> ${message.msg}</p>`;
        newElement.className = `msg-text ${(count%2 == 0)? 'event': 'odd'}`;
 
    messagesBox.append(newElement)
}

export const onTypingUi = (username, isTyping = true) => {
    const typingIndicator = document.getElementById('typing-indicator')
    typingIndicator.innerHTML = isTyping ?
                                    `<span class="msg-text typing">${username} is typing...</span>`
                                    :''
    }