document.addEventListener('DOMContentLoaded', function() {
    
    fetch('api/getPhones.php')
        .then(response => response.json())
        .then(data => {
            const phonesListDiv = document.getElementById('phones-list');
            if (data.success && data.phones.length > 0) {
                phonesListDiv.innerHTML = '';
                
                data.phones.forEach(phone => {
                    phonesListDiv.innerHTML += `
                        <span>${phone.phone_number}</span> :
                        <span dir="auto">${phone.title}</span><br>
                    `;
                });
            } else {
                phonesListDiv.innerHTML = '<span>شماره‌ای ثبت نشده است</span>';
            }
        })
        .catch(error => {
            console.error('Error fetching phones:', error);
            document.getElementById('phones-list').innerHTML = '<span>خطا در دریافت اطلاعات</span>';
        });

    fetch('api/getSocials.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.links) {

                const discordBtn = document.getElementById('discord-link');
                if (discordBtn && data.links.discord) {
                    discordBtn.href = data.links.discord;
                }
                
                const githubBtn = document.getElementById('buttongethub');
                if (githubBtn && data.links.github) {
                    githubBtn.href = data.links.github;
                }
            }
        })
        .catch(error => console.error('Error fetching social links:', error));
});
