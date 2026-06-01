
        function renderProjects(projectsToRender) {

            const projectContainer = document.getElementById('project-grid');

            projectContainer.innerHTML = ''; 

            projectsToRender.forEach(project => {

                const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');


                const cardHTML = `
                    <div class="project-card">
                        <img src="${project.imageUrl}" alt="${project.title}">
                        <div class="card-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="tags">
                                ${tagsHTML}
                            </div>
                            <div class="card-buttons">
                                <a href="${project.githubUrl}" target="_blank" class="btn-primary">مشاهده کد</a>
                                <!-- ارسال ID پروژه به تابع openModal هنگام کلیک -->
                                <button onclick="openModal(${project.id})" class="btn-secondary">جزئیات بیشتر</button>
                            </div>
                        </div>
                    </div>
                `;

                projectContainer.innerHTML += cardHTML;
            });
        }


        function filterProjects(category, btnElement) {

            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            

            btnElement.classList.add('active');


            if (category === 'all') {
                renderProjects(projects);
            } else {

                const filtered = projects.filter(p => p.category === category);
                renderProjects(filtered);
            }
        }


        const modal = document.getElementById("project-modal");
        const modalTitle = document.getElementById("modal-title");
        const modalDesc = document.getElementById("modal-desc");


        function openModal(projectId) {

            const project = projects.find(p => p.id === projectId);
            if(project) {

                modalTitle.innerText = project.title;
                modalDesc.innerText = project.fullDescription;

                modal.style.display = "flex"; 
            }
        }


        function closeModal() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            renderProjects(projects);
        });