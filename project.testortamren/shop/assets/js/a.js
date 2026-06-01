document.addEventListener('DOMContentLoaded', () => {
    // --- کدهای قبلی شما برای تم و منوی موبایل ---
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            if (document.body.classList.contains("dark")) {
                themeToggle.textContent = "☀️";
            } else {
                themeToggle.textContent = "🌙";
            }
        });
    }

    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('is-active');
        });
    });

    // --- کدهای مربوط به استوری ---
    const storyCarousel = document.querySelector('.story-carousel');
    const storyItems = document.querySelectorAll('.story-item');

    // توابع برای اسکرول استوری‌ها (اگر carousel دارید)
    window.nextStory = function () {
        if (storyCarousel) {
            storyCarousel.scrollBy({
                left: 280,
                behavior: 'smooth'
            });
        }
    };

    window.prevStory = function () {
        if (storyCarousel) {
            storyCarousel.scrollBy({
                left: -280,
                behavior: 'smooth'
            });
        }
    };

    // نمایش استوری با کلیک
    storyItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const span = item.querySelector('span');

            const imageUrl = img ? img.src : '';
            // const storyText = span ? span.textContent : 'استوری'; // این متن در alert نمایش داده نمی شود

            if (imageUrl) {
                playStory(imageUrl); // فراخوانی تابع نمایش استوری
            } else {
                console.log("No image found for this story item.");
            }
        });
    });
});

// تابع برای نمایش استوری در مدال
function playStory(imageSrc) {
    // فرض می‌کنیم که المنت مدال با ID 'storyViewer' و المنت تصویر با ID 'storyImage' در HTML شما وجود دارد.
    // اگر ID ها متفاوت هستند، لطفاً آنها را در اینجا اصلاح کنید.
    const viewer = document.getElementById('storyViewer');
    const img = document.getElementById('storyImage');

    if (viewer && img) {
        img.src = imageSrc;
        viewer.style.display = 'flex'; // یا 'block' بسته به نیاز

        // بستن خودکار بعد از 5 ثانیه
        // اگر این تایمر باعث مشکل در سیستم استوری پیچیده‌تر شما می‌شود، می‌توان آن را حذف کرد
        // و کاربر به صورت دستی با کلیک ببندد.
        setTimeout(() => {
            closeStory();
        }, 60000);
    } else {
        console.error("Story modal elements (storyViewer or storyImage) not found!");
        // اگر مدال پیدا نشد، شاید بخواهید alert را نمایش دهید:
        // alert('نمایش استوری: ' + imageSrc); 
    }
}

// تابع برای بستن مدال استوری
function closeStory() {
    const viewer = document.getElementById('storyViewer');
    if (viewer) {
        viewer.style.display = 'none';
        // برای جلوگیری از نمایش تصویر قبلی هنگام باز شدن مجدد، src را خالی کنید:
        const img = document.getElementById('storyImage');
        if (img) {
            img.src = '';
        }
    }
}

// --- توجه ---
// 1. اطمینان حاصل کنید که المنت‌های زیر در فایل HTML شما وجود دارند:
//    - یک المنت با کلاس 'story-item' که شامل <img> و <span> است.

document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('storyViewer');
    const imgElement = document.getElementById('storyImage');
    const textElement = document.getElementById('active-story-text');
    const closeBtn = document.getElementById('close-story-btn');
    const prevBtn = document.getElementById('prev-story-btn');
    const nextBtn = document.getElementById('next-story-btn');

    const storyItems = Array.from(document.querySelectorAll('.story-item img'));
    let currentStoryIndex = 0;
    let storyTimer = null;
    const STORY_DURATION = 60000;

    function clearStoryTimer() {
        if (storyTimer) {
            clearTimeout(storyTimer);
            storyTimer = null;
        }
    }

    function startStoryTimer() {
        clearStoryTimer();
        storyTimer = setTimeout(() => {
            if (currentStoryIndex < storyItems.length - 1) {
                showStory(currentStoryIndex + 1);
            } else {
                viewer.style.display = 'none';
            }
        }, STORY_DURATION);
    }

    function showStory(index) {
        if (index < 0 || index >= storyItems.length) {
            viewer.style.display = 'none';
            clearStoryTimer();
            return;
        }

        currentStoryIndex = index;
        const currentImg = storyItems[index];
        imgElement.src = currentImg.src;

        const parent = currentImg.parentElement;
        const textSpan = parent.querySelector('span');

        if (textElement) {
            textElement.textContent = textSpan ? textSpan.textContent : '';
            textElement.style.marginTop = '15px'; // متن کمی پایین‌تر
        }

        viewer.style.display = 'flex';

        // مهم: هر بار استوری عوض شد، تایمر از اول شروع شود
        startStoryTimer();
    }

    // کلیک روی استوری‌های کوچک
    storyItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            showStory(index);
        });
    });

    // دکمه بعدی
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentStoryIndex < storyItems.length - 1) {
                showStory(currentStoryIndex + 1);
            }
        });
    }

    // دکمه قبلی
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentStoryIndex > 0) {
                showStory(currentStoryIndex - 1);
            }
        });
    }

    // بستن
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            clearStoryTimer();
            viewer.style.display = 'none';
        });
    }
});








function setDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}




document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});



// مثال: فرض کنید یک دکمه با آیدی 'darkModeToggle' دارید
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        setDarkMode(!isDarkMode);
    });
}