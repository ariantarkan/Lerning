<?php
session_start();
require 'db.php';

$my_tickets = [];
if (isset($_SESSION['user_id'])) {
    $stmt = $pdo->prepare("SELECT * FROM tickets WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$_SESSION['user_id']]);
    $my_tickets = $stmt->fetchAll();
}
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مرکز پشتیبانی</title>
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
</head>
<body>

    <div class="animated-bg"></div>
    <div id="toast-container"></div>

    <!-- مودال ورود و ثبت نام -->
    <div id="auth-modal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <div class="modal-tabs">
                <button class="tab-link active" data-tab="login-tab">ورود</button>
                <button class="tab-link" data-tab="register-tab">ثبت نام</button>
            </div>
            <div id="login-tab" class="tab-content active">
                <h2>ورود به حساب کاربری</h2>
                <form id="login-form">
                    <input type="hidden" name="action" value="login">
                    <input type="text" name="username" placeholder="نام کاربری" required>
                    <input type="password" name="password" placeholder="رمز عبور" required>
                    <button type="submit">ورود</button>
                </form>
            </div>
            <div id="register-tab" class="tab-content">
                <h2>ایجاد حساب جدید</h2>
                <form id="register-form">
                    <input type="hidden" name="action" value="register">
                    <input type="text" name="username" placeholder="نام کاربری" required>
                    <input type="password" name="password" placeholder="رمز عبور" required>
                    <button type="submit">ثبت نام</button>
                </form>
            </div>
        </div>
    </div>

    <!-- محتوای اصلی -->
    <div class="content">
        <header>
            <div class="logo">پشتیبانی ما</div>
            <nav>
                <ul>
                    <li><a href="index.php">صفحه اصلی</a></li>
                    <!-- **اصلاح شده:** لینک پنل ادمین به صورت نسبی نوشته شد -->
                    <?php if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin'): ?>
                        <li><a href="secret_panel_8899/index.php">پنل ادمین</a></li>
                    <?php endif; ?>
                    
                    <?php if (isset($_SESSION['user_id'])): ?>
                        <li class="username-display">کاربر: <?php echo htmlspecialchars($_SESSION['username']); ?></li>
                        <li><a href="#" id="logout-btn" class="logout-link">خروج</a></li>
                    <?php else: ?>
                        <li><button id="auth-btn" class="main-auth-btn">ورود / ثبت نام</button></li>
                    <?php endif; ?>
                </ul>
            </nav>
        </header>

        <main class="hero">
            <h1 class="welcome-text">به مرکز پشتیبانی خوش آمدید</h1>
            <p class="subtitle">چگونه می‌توانیم به شما کمک کنیم؟</p>
            
            <?php if (!isset($_SESSION['user_id'])): ?>
                <div class="search-box">
                    <p class="login-prompt">
                        برای ارسال تیکت ابتدا <a href="#" id="login-prompt-link">وارد شوید</a>.
                    </p>
                </div>
            <?php else: ?>
                <!-- دکمه برای نمایش فرم ارسال تیکت -->
                <button id="show-ticket-form-btn" class="main-auth-btn">ارسال تیکت جدید</button>

                <!-- فرم ارسال تیکت (در ابتدا مخفی است) -->
                <div id="new-ticket-form" class="ticket-form-container" style="display: none;">
                    <h3>ارسال تیکت جدید</h3>
                    <form id="ticket-form">
                        <input type="hidden" name="action" value="submit_ticket">
                        <input type="text" name="subject" placeholder="موضوع مشکل" required>
                        <textarea name="message" placeholder="جزئیات مشکل خود را اینجا بنویسید..." required></textarea>
                        <button type="submit">ارسال تیکت</button>
                    </form>
                </div>

                <!-- نمایش تیکت‌های قبلی کاربر -->
                <div class="my-tickets-container">
                    <h3>تیکت‌های من</h3>
                    <?php if (count($my_tickets) > 0): ?>
                        <?php foreach ($my_tickets as $ticket): ?>
                            <div class="ticket-item" style="border-right-color: <?php echo ($ticket['status'] == 'open') ? '#ffcc00' : '#00cc66'; ?>;">
                                <div class="ticket-header">
                                    <h4><?php echo htmlspecialchars($ticket['subject']); ?></h4>
                                    <span class="ticket-status-<?php echo $ticket['status']; ?>">
                                        <?php echo ($ticket['status'] == 'open') ? 'در انتظار پاسخ' : 'پاسخ داده شده'; ?>
                                    </span>
                                </div>
                                <p class="ticket-message"><strong>متن شما:</strong> <?php echo nl2br(htmlspecialchars($ticket['message'])); ?></p>
                                <?php if (!empty($ticket['admin_reply'])): ?>
                                    <div class="admin-reply">
                                        <p><strong>پاسخ پشتیبانی:</strong> <?php echo nl2br(htmlspecialchars($ticket['admin_reply'])); ?></p>
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <p class="no-tickets">شما هنوز تیکتی ارسال نکرده‌اید.</p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </main>

        <section class="support-cards">
            <a href="tutorials.php" class="card-link">
                <div class="card">
                    <h3>آموزش‌ها</h3>
                    <p>یادگیری کار با امکانات برنامه</p>
                </div>
            </a>
            <a href="rules.php" class="card-link">
                <div class="card">
                    <h3>قوانین</h3>
                    <p>قوانین و مقررات استفاده</p>
                </div>
            </a>
            <!-- این کارت به بالای صفحه (بخش فرم) اسکرول می‌کند -->
            <a href="#new-ticket-form" id="report-bug-link" class="card-link">
                <div class="card">
                    <h3>گزارش باگ</h3>
                    <p>مشکلی دیدید؟ به ما اطلاع دهید</p>
                </div>
            </a>
        </section>
    </div>

    <script src="script.js?v=<?php echo time(); ?>"></script>
</body>
</html>
