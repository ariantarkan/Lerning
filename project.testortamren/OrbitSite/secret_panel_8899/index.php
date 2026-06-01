<?php
session_start();
require '../db.php';

// بررسی دسترسی ادمین
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    header('Location: ../index.php');
    exit();
}

// واکشی تمام تیکت های باز
$stmt = $pdo->prepare("SELECT tickets.*, users.username FROM tickets JOIN users ON tickets.user_id = users.id WHERE tickets.status = 'open' ORDER BY tickets.created_at ASC");
$stmt->execute();
$open_tickets = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>پنل مدیریت</title>
    <style>
        body { font-family: 'Vazirmatn', sans-serif; background: #f4f4f4; color: #333; line-height: 1.6; padding: 20px; }
        .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        h1 { text-align: center; color: #555; }
        .ticket { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
        .ticket h3 { margin-top: 0; }
        .ticket p { background: #f9f9f9; padding: 10px; border-radius: 4px; }
        textarea { width: 95%; padding: 10px; border-radius: 4px; border: 1px solid #ccc; margin-top: 10px; }
        button { background: #5cb85c; color: #fff; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
        button:hover { background: #4cae4c; }
        .no-tickets { text-align: center; color: #888; }
        a.logout { float: left; color: red; }
    </style>
</head>
<body>
<div class="container">
    <a href="../api/api.php?action=logout" class="logout">خروج</a>
    <h1>پنل مدیریت پشتیبانی</h1>
    <h2>تیکت‌های باز</h2>

    <?php if (count($open_tickets) > 0): ?>
        <?php foreach ($open_tickets as $ticket): ?>
            <div class="ticket">
                <h3>موضوع: <?php echo htmlspecialchars($ticket['subject']); ?></h3>
                <small>ارسال شده توسط: <?php echo htmlspecialchars($ticket['username']); ?> در تاریخ <?php echo $ticket['created_at']; ?></small>
                <p><strong>متن تیکت:</strong><br><?php echo nl2br(htmlspecialchars($ticket['message'])); ?></p>
                
                <!-- فرم به api.php ارسال می شود -->
                <form action="../api/api.php" method="POST">
                    <input type="hidden" name="action" value="admin_reply">
                    <input type="hidden" name="ticket_id" value="<?php echo $ticket['id']; ?>">
                    <textarea name="admin_reply" placeholder="پاسخ خود را اینجا بنویسید..." required></textarea><br>
                    <button type="submit">ارسال پاسخ و بستن تیکت</button>
                </form>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <p class="no-tickets">در حال حاضر تیکت بازی وجود ندارد.</p>
    <?php endif; ?>
</div>
</body>
</html>
