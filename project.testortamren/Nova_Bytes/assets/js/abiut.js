const contactModal = document.getElementById('contact-modal');
    const projectsModal = document.getElementById('projects-modal');
    const btnContact = document.getElementById('open-contact-modal');
    const btnProjects = document.getElementById('open-projects-modal');
    const closeButtons = document.querySelectorAll('.close-button');

    btnContact.addEventListener('click', () => {
        contactModal.style.display = 'block';
    });

    btnProjects.addEventListener('click', () => {
        projectsModal.style.display = 'block';
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.parentElement.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if(e.target === contactModal) {
            contactModal.style.display = 'none';
        }
        if(e.target === projectsModal) {
            projectsModal.style.display = 'none';
        }
    });



    document.addEventListener('DOMContentLoaded', function() {
    fetch('../../api/getStaff.php')
        .then(response => response.json())
        .then(data => {
            const staffListDiv = document.getElementById('team-members-list');
            if (data.success && data.staff.length > 0) {
                staffListDiv.innerHTML = '';

                data.staff.forEach(member => {
                    const memberDiv = document.createElement('div');
                    memberDiv.classList.add('team-member');
                    memberDiv.innerHTML = `
                        <img src="${member.image_path}" alt="${member.name}">
                        <h4>${member.name}</h4>
                        <p>${member.position}</p>
                    `;
                    staffListDiv.appendChild(memberDiv);
                });
            } else {
                staffListDiv.innerHTML = `<p>${data.message || 'اطلاعات کارکنان در دسترس نیست.'}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching staff data:', error);
            document.getElementById('team-members-list').innerHTML = '<p>خطا در برقراری ارتباط با سرور.</p>';
        });
});



    fetch('../../api/getProjects.php')
        .then(response => response.json())
        .then(data => {
            const projectsListDiv = document.getElementById('projects-list');
            if (data.success && data.projects.length > 0) {
                projectsListDiv.innerHTML = '';
                
                data.projects.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.classList.add('team-member');
                    projectDiv.innerHTML = `
                        <h4><a href="${project.project_url}" target="_blank">${project.project_name}</a></h4>
                    `;
                    projectsListDiv.appendChild(projectDiv);
                });
            } else {
                projectsListDiv.innerHTML = `<p>${data.message || 'اطلاعاتی در دسترس نیست.'}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching projects data:', error);
            document.getElementById('projects-list').innerHTML = '<p>خطا در برقراری ارتباط با سرور.</p>';
        });



    fetch('../../api/getContacts.php')
        .then(response => response.json())
        .then(data => {
            const contactsListDiv = document.getElementById('contacts-list');
            if (data.success && data.contacts.length > 0) {
                contactsListDiv.innerHTML = '';
                
                data.contacts.forEach(contact => {
                    const contactDiv = document.createElement('div');
                    contactDiv.classList.add('team-member');
                    contactDiv.innerHTML = `
                        <h4><a href="${contact.platform_url}" target="_blank">${contact.platform_name}</a></h4>
                    `;
                    contactsListDiv.appendChild(contactDiv);
                });
            } else {
                contactsListDiv.innerHTML = `<p>${data.message || 'اطلاعاتی در دسترس نیست.'}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching contacts data:', error);
            document.getElementById('contacts-list').innerHTML = '<p>خطا در برقراری ارتباط با سرور.</p>';
        });
