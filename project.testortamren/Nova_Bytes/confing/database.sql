CREATE TABLE users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email_or_phone VARCHAR(100) NOT NULL UNIQUE COMMENT 'ایمیل یا شماره تلفن',
    password VARCHAR(255) NOT NULL COMMENT 'رمز عبور (باید هش شود)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE projects (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_UNICODE_CI;



CREATE TABLE staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) DEFAULT '../img/nova.png'
);


INSERT INTO staff (name, position, image_path) VALUES 
('علی رضایی', 'توسعه‌دهنده فرانت‌اند', '../img/nova.png'),
('سارا موسوی', 'توسعه‌دهنده بک‌اند', '../img/nova.png'),
('رضا احمدی', 'مدیر پروژه', '../img/nova.png');



ALTER TABLE projects ADD COLUMN project_url VARCHAR(255) DEFAULT '#';


INSERT INTO projects (project_name, project_url) VALUES 
('کارلنسر', 'https://example.com/project1'),
('پونیشا', 'https://example.com/project2'),
('کافه پروژه', 'https://example.com/project3');
|

CREATE TABLE contact_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform_name VARCHAR(100) NOT NULL,
    platform_url VARCHAR(255) NOT NULL
);

INSERT INTO contact_methods (platform_name, platform_url) VALUES 
('تلگرام', 'https://t.me/your_id'),
('اینستاگرام', 'https://instagram.com/your_id'),
('ایمیل', 'mailto:info@example.com');


CREATE TABLE phones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    title VARCHAR(50) DEFAULT 'شماره تماس'
);

INSERT INTO phones (phone_number, title) VALUES 
('09939960385', 'شماره تماس'),
('09129315013', 'شماره تماس');


CREATE TABLE social_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL
);

INSERT INTO social_links (platform, url) VALUES 
('discord', 'https://discord.gg/YourServerLink');


INSERT INTO social_links (platform, url) VALUES 
('github', 'https://github.com/YourUsername');


CREATE TABLE prudaction (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL COMMENT 'web یا game',
    description VARCHAR(255) NOT NULL,
    full_description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    tags VARCHAR(255) NOT NULL COMMENT 'تگ‌ها را با کاما جدا کنید',
    github_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO prudaction (title, category, description, full_description, image_url, tags, github_url) VALUES 
('پلتفرم آموزشی آنلاین', 'web', 'یک پلتفرم کامل برای برگزاری دوره‌های آموزشی آنلاین با قابلیت آزمون.', 'این پروژه یک سیستم جامع مدیریت یادگیری است...', '../img/nova.png', 'React,Node.js,MongoDB', 'https://github.com/'),
('بازی شوتر فضایی', 'game', 'یک بازی هیجان‌انگیز و سریع در فضای بی‌کران.', 'این بازی به صورت دوبعدی و با موتور یونیتی ساخته شده است...', 'https://via.placeholder.com/400x200/8A2BE2/FFFFFF?text=Space+Game', 'Unity,C#', 'https://github.com/'),
('داشبورد مدیریت مالی', 'web', 'داشبورد تحلیلی برای مدیریت درآمدها و ترسیم نمودار.', 'این داشبورد برای کسب‌وکارهای کوچک طراحی شده...', 'https://via.placeholder.com/400x200/4169E1/FFFFFF?text=Dashboard', 'Vue.js,Django', 'https://github.com/'),
('بازی پازل فکری', 'game', 'بازی معمایی با بیش از ۵۰ مرحله چالش‌برانگیز.', 'یک بازی موبایلی سبک و جذاب که ذهن بازیکن را درگیر می‌کند...', 'https://via.placeholder.com/400x200/FF4500/FFFFFF?text=Puzzle+Game', 'Godot,GDScript', 'https://github.com/');
