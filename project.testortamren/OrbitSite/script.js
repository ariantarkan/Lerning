document.addEventListener('DOMContentLoaded', function() {
    
    // --- عناصر مودال ---
    const authModal = document.getElementById('auth-modal');
    const authBtn = document.getElementById('auth-btn');
    const closeModalBtn = document.querySelector('.close-btn');
    const loginPromptLink = document.getElementById('login-prompt-link');

    const openModal = () => { if (authModal) authModal.style.display = 'block'; };
    const closeModal = () => { if (authModal) authModal.style.display = 'none'; };

    if (authBtn) authBtn.addEventListener('click', openModal);
    if (loginPromptLink) loginPromptLink.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == authModal) {
            closeModal();
        }
    });

    // --- مدیریت تب‌های مودال (ورود/ثبت‌نام) ---
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // --- سیستم پیام انیمیشنی (Toast) ---
    const toastContainer = document.getElementById('toast-container');
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.add('hide');
            toast.addEventListener('transitionend', () => toast.remove());
        }, 3000);
    }

    // --- مدیریت فرم‌ها با AJAX ---
    const handleFormSubmit = async (form, url) => {
        const formData = new FormData(form);
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.status === 'success') {
                showToast(result.message || 'عملیات موفق بود!');
                setTimeout(() => window.location.reload(), 2000);
            } else {
                showToast(result.message || 'خطایی رخ داد.', 'error');
            }
        } catch (error) {
            showToast('خطای ارتباط با سرور!', 'error');
            console.error('Error:', error);
        }
    };

    // --- ثبت رویداد برای فرم‌ها ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) registerForm.addEventListener('submit', (e) => { e.preventDefault(); handleFormSubmit(registerForm, 'api/api.php'); });

    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', (e) => { e.preventDefault(); handleFormSubmit(loginForm, 'api/api.php'); });
    
    const ticketForm = document.getElementById('ticket-form');
    if (ticketForm) ticketForm.addEventListener('submit', (e) => { e.preventDefault(); handleFormSubmit(ticketForm, 'api/api.php'); });

    // --- دکمه خروج ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            const formData = new FormData();
            formData.append('action', 'logout');
            
            try {
                const response = await fetch('api/api.php', { method: 'POST', body: formData });
                const result = await response.json();
                if (result.status === 'success') {
                    showToast('با موفقیت خارج شدید.');
                    setTimeout(() => window.location.href = 'index.php', 1500);
                }
            } catch (error) {
                showToast('خطا در خروج از حساب.', 'error');
            }
        });
    }

    // --- **جدید:** منطق دکمه نمایش فرم تیکت ---
    const showTicketFormBtn = document.getElementById('show-ticket-form-btn');
    const newTicketFormContainer = document.getElementById('new-ticket-form');
    const reportBugLink = document.getElementById('report-bug-link');

    if (showTicketFormBtn && newTicketFormContainer) {
        showTicketFormBtn.addEventListener('click', () => {
            // فرم را نمایش بده و دکمه را مخفی کن
            newTicketFormContainer.style.display = 'block';
            showTicketFormBtn.style.display = 'none';
        });
    }
    
    // **جدید:** اگر روی کارت "گزارش باگ" کلیک شد، فرم را نشان بده
    if (reportBugLink && newTicketFormContainer) {
        reportBugLink.addEventListener('click', (e) => {
            // اسکرول به فرم انجام می‌شود، فقط آن را نمایش می‌دهیم
            if (newTicketFormContainer.style.display === 'none') {
                newTicketFormContainer.style.display = 'block';
                if (showTicketFormBtn) showTicketFormBtn.style.display = 'none';
            }
        });
    }
});
