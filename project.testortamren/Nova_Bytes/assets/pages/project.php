<?php
// اضافه کردن فایل اتصال به دیتابیس
require_once '../../confing/db.php';

// --- خواندن پروژه‌ها از دیتابیس (بدون تغییر) ---
$stmt = $conn->prepare("SELECT * FROM prudaction ORDER BY id DESC");
$stmt->execute();
$dbProjects = $stmt->fetchAll(PDO::FETCH_ASSOC);

$projectsArray = [];
foreach ($dbProjects as $row) {
    $projectsArray[] = [
        'id' => (int)$row['id'],
        'title' => $row['title'],
        'category' => $row['category'],
        'description' => $row['description'],
        'fullDescription' => $row['full_description'],
        'imageUrl' => $row['image_url'],
        'tags' => explode(',', $row['tags']),
        'githubUrl' => $row['github_url']
    ];
}
$projectsJson = json_encode($projectsArray, JSON_UNESCAPED_UNICODE);


// --- بخش جدید: خواندن دسته‌بندی‌های یکتا برای فیلترها ---

// 1. خواندن دسته بندی های یکتا از جدول
$categoryStmt = $conn->prepare("SELECT DISTINCT category FROM prudaction");
$categoryStmt->execute();
$categories = $categoryStmt->fetchAll(PDO::FETCH_COLUMN); // فقط ستون category را به صورت آرایه ساده برمیگرداند

// 2. دیکشنری برای نمایش نام های فارسی (می‌توانید دسته بندی های جدید را اینجا اضافه کنید)
$category_names = [
    'web' => 'پروژه‌های وب',
    'game' => 'بازی‌سازی',
    // 'mobile' => 'اپلیکیشن موبایل' // مثال برای آینده
];

?>

<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>پروژه‌ها - Nova Bytes</title>
    <link rel="stylesheet" href="../css/project.css">
</head>
<body>

    <a href="../../index.php" class="back-home-btn" title="بازگشت به سایت">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
</a>

    <div class="container">
        <header style="text-align: center; margin-top: 40px; margin-bottom: 30px; color: white;">
            <h1>نمونه کارهای ما</h1>
            <p>نگاهی به پروژه‌هایی که با عشق و تکنولوژی ساخته‌ایم.</p>
        </header>

        <!-- بخش جدید: دکمه های فیلتر داینامیک -->
        <div class="filter-container">
            <button class="filter-btn active" onclick="filterProjects('all', this)">همه پروژه‌ها</button>
            <?php foreach ($categories as $category): ?>
                <?php
                    // پیدا کردن نام فارسی از دیکشنری. اگر وجود نداشت، خود کلمه انگلیسی را نمایش بده
                    $displayName = $category_names[$category] ?? ucfirst($category);
                ?>
                <button class="filter-btn" onclick="filterProjects('<?php echo htmlspecialchars($category); ?>', this)">
                    <?php echo htmlspecialchars($displayName); ?>
                </button>
            <?php endforeach; ?>
        </div>
        <!-- پایان بخش داینامیک -->

        <main id="project-grid" class="project-grid"></main>
    </div>

    <div id="project-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            <h2 id="modal-title">عنوان پروژه</h2>
            <p id="modal-desc">توضیحات کامل پروژه در اینجا قرار می‌گیرد...</p>
        </div>
    </div>

    <script>
        const projects = <?php echo $projectsJson; ?>;
    </script>
    
    <script src="../js/projectsData.js"></script>
</body>
</html>
