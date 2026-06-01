const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// اتصال به MongoDB
mongoose.connect('mongodb://localhost:27017/supportChat')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// تعریف Schema و Model برای پیام‌ها
const messageSchema = new mongoose.Schema({
    content: String,
    sender: String, // 'user' or 'support'
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// تعریف Schema و Model برای تیکت‌ها
const ticketSchema = new mongoose.Schema({
    subject: String,
    description: String,
    status: { type: String, enum: ['open', 'closed', 'in_progress'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
    messages: [{ // برای نمایش تاریخچه پیام‌های یک تیکت
        content: String,
        sender: String, // 'user' or 'admin'
        timestamp: { type: Date, default: Date.now }
    }]
});
const Ticket = mongoose.model('Ticket', ticketSchema);

// سرو کردن فایل‌های استاتیک (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public'))); // فرض می‌کنیم فایل‌های فرانت‌اند در پوشه public هستند

// رویدادهای Socket.IO
io.on('connection', (socket) => {
    console.log('یک کاربر متصل شد');

    // دریافت پیام از کاربر و ذخیره در دیتابیس
    socket.on('sendMessage', async (msgData) => {
        const newMessage = new Message({
            content: msgData.content,
            sender: 'user'
        });
        await newMessage.save();
        // ارسال پیام به همه کلاینت‌ها (شامل ادمین)
        io.emit('receiveMessage', newMessage);
    });

    // دریافت تیکت جدید از کاربر
    socket.on('newTicket', async (ticketData) => {
        const newTicket = new Ticket({
            subject: ticketData.subject,
            description: ticketData.description,
            messages: [{ content: ticketData.description, sender: 'user' }] // ذخیره اولین پیام تیکت
        });
        await newTicket.save();
        // ارسال تیکت جدید به ادمین (و شاید به خود کاربر برای تایید)
        io.emit('receiveTicket', newTicket); // برای ادمین
        socket.emit('ticketCreatedConfirmation', newTicket); // تایید به کاربر
    });

    // دریافت درخواست برای بستن تیکت از ادمین
    socket.on('closeTicket', async (ticketId) => {
        await Ticket.findByIdAndUpdate(ticketId, { status: 'closed' });
        io.emit('ticketStatusChanged', { id: ticketId, status: 'closed' });
    });

    // دریافت درخواست برای تغییر وضعیت تیکت
    socket.on('updateTicketStatus', async (data) => {
        await Ticket.findByIdAndUpdate(data.ticketId, { status: data.newStatus });
        io.emit('ticketStatusChanged', { id: data.ticketId, status: data.newStatus });
    });

    // دریافت پیام درون یک تیکت (از ادمین یا کاربر)
    socket.on('sendMessageToTicket', async (data) => {
        const ticket = await Ticket.findById(data.ticketId);
        if (ticket) {
            ticket.messages.push({ content: data.message, sender: data.sender });
            await ticket.save();
            io.emit('updateTicketMessages', { ticketId: data.ticketId, messages: ticket.messages });
        }
    });

    // بارگذاری پیام‌های چت اولیه هنگام اتصال
    socket.on('fetchChatHistory', async () => {
        const messages = await Message.find().sort({ timestamp: -1 }).limit(50); // ۵۰ پیام آخر
        socket.emit('chatHistory', messages.reverse()); // ارسال به کاربر فعلی
    });

    // بارگذاری تیکت‌ها برای ادمین
    socket.on('fetchTickets', async () => {
        const tickets = await Ticket.find().sort({ createdAt: -1 });
        socket.emit('ticketsList', tickets);
    });

    socket.on('disconnect', () => {
        console.log('کاربر قطع شد');
    });
});

server.listen(PORT, () => {
    console.log(`سرور در حال اجرا روی پورت ${PORT}`);
});