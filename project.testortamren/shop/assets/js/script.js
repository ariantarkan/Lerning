const socket = io(); // اتصال به سرور Socket.IO

const chatMessages = document.getElementById('chat');
const msgInput = document.getElementById('msgInput');
const sendButton = document.querySelector('.chat-input button');

// -- بخش چت --

// هنگام ارسال پیام توسط کاربر
sendButton.onclick = () => {
    const messageText = msgInput.value.trim();
    if (messageText) {
        const messageData = { content: messageText };
        socket.emit('sendMessage', messageData); // ارسال پیام به سرور
        msgInput.value = '';
    }
};

// دریافت پیام از سرور (هم پیام کاربر و هم پیام پشتیبانی)
socket.on('receiveMessage', (message) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(message.sender); // 'user' or 'support'
    messageDiv.textContent = message.content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // اسکرول به پایین
});

// دریافت تاریخچه چت هنگام اتصال
socket.on('chatHistory', (messages) => {
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(msg.sender);
        messageDiv.textContent = msg.content;
        chatMessages.appendChild(messageDiv);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
});


// -- بخش تیکت --
const ticketSubjectInput = document.querySelector('.ticket-box input[type="text"]');
const ticketDescriptionTextarea = document.querySelector('.ticket-box textarea');
const createTicketButton = document.querySelector('.ticket-btn');

// ارسال تیکت جدید
createTicketButton.onclick = () => {
    const subject = ticketSubjectInput.value.trim();
    const description = ticketDescriptionTextarea.value.trim();
    if (subject && description) {
        socket.emit('newTicket', { subject, description });
        ticketSubjectInput.value = '';
        ticketDescriptionTextarea.value = '';
    }
};

// نمایش تیکت‌های جدید یا تغییر وضعیت تیکت (این بخش برای ادمین است)
socket.on('receiveTicket', (ticket) => {
    console.log('تیکت جدید دریافت شد:', ticket);
    // اینجا باید منطقی برای نمایش تیکت‌ها در پنل ادمین پیاده‌سازی شود
});

socket.on('ticketStatusChanged', (data) => {
    console.log(`وضعیت تیکت ${data.id} تغییر کرد به: ${data.status}`);
    // اینجا باید رابط کاربری ادمین را برای نمایش تغییر وضعیت به‌روز کرد
});

// برای بارگذاری تاریخچه چت هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
    socket.emit('fetchChatHistory');
    // در حالت ادمین، باید تیکت‌ها را هم بارگذاری کرد
    // socket.emit('fetchTickets');
});