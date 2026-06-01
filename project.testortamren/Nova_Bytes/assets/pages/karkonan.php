<?php
// اتصال به دیتابیس
require_once '../../confing/db.php'; 

// واکشی اطلاعات از جدول جدید
$stmt = $conn->prepare("SELECT * FROM team_members");
$stmt->execute();
$team_members = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Staff Section - Nova Bytes</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="../css/karkonan.css">
</head>
<body>




    <section class="team-section">
        <h2 class="section-title">تیم ما</h2>

            <a href="../../index.php" class="back-home-btn" title="بازگشت به سایت">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
</a>
        
        <div class="team-grid">
            
            <?php if (!empty($team_members)): ?>
                <?php foreach ($team_members as $member): ?>
                    <div class="team-card">
                        <!-- عکس -->
                        <div class="member-img-wrapper">
                            <img src="<?= htmlspecialchars($member['image_url'] ?? 'https://via.placeholder.com/150/1a1a2e/45a29e?text=User') ?>" alt="<?= htmlspecialchars($member['name']) ?>" class="member-img">
                        </div>
                        
                        <!-- نام و سمت -->
                        <h3 class="member-name"><?= htmlspecialchars($member['name']) ?></h3>
                        <div class="member-role"><?= htmlspecialchars($member['role']) ?></div>
                        
                        <!-- بیوگرافی -->
                        <p class="member-bio"><?= htmlspecialchars($member['bio']) ?></p>
                        
                        <!-- مهارت‌ها (تبدیل رشته جدا شده با کاما به تگ‌های مجزا) -->
                        <div class="skills">
                            <?php 
                            $skills = explode(',', $member['skills']);
                            foreach ($skills as $skill): 
                                $skill = trim($skill);
                                if (!empty($skill)):
                            ?>
                                <span class="skill-tag"><?= htmlspecialchars($skill) ?></span>
                            <?php 
                                endif;
                            endforeach; 
                            ?>
                        </div>
                        
                        <!-- شبکه‌های اجتماعی -->
                        <div class="social-links">
                            <?php if (!empty($member['github_link'])): ?>
                                <a href="<?= htmlspecialchars($member['github_link']) ?>" target="_blank" class="social-icon"><i class="fab fa-github"></i></a>
                            <?php endif; ?>
                            
                            <?php if (!empty($member['linkedin_link'])): ?>
                                <a href="<?= htmlspecialchars($member['linkedin_link']) ?>" target="_blank" class="social-icon"><i class="fab fa-linkedin"></i></a>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p style="color: white; text-align: center;">هیچ عضوی در دیتابیس یافت نشد.</p>
            <?php endif; ?>

        </div>
    </section>

</body>
</html>
