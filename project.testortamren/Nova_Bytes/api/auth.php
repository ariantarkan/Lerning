<?php
session_start();
require '../confing/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'] ?? '';
    $captcha = $_POST['captcha'] ?? '';

    if (!isset($_SESSION['captcha']) || $captcha != $_SESSION['captcha']) {
        die("<script>alert('پاسخ امنیتی اشتباه است!'); window.history.back();</script>");
    }

    $email_or_phone = trim($_POST['email_or_phone']);
    $password = $_POST['password'];

    if ($action == 'register') {
        $username = trim($_POST['username']);
        
        if (strlen($password) < 8) {
            die("<script>alert('رمز عبور باید حداقل 8 کاراکتر باشد.'); window.history.back();</script>");
        }

        $is_email = filter_var($email_or_phone, FILTER_VALIDATE_EMAIL);
        $is_phone = preg_match('/^09\d{9}$/', $email_or_phone);
        
        if (!$is_email && !$is_phone) {
            die("<script>alert('لطفا یک ایمیل معتبر یا شماره موبایل (شروع با 09) وارد کنید.'); window.history.back();</script>");
        }

        $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email_or_phone = ?");
        $stmt->execute([$username, $email_or_phone]);
        if ($stmt->rowCount() > 0) {
            die("<script>alert('این نام کاربری یا ایمیل/شماره قبلا ثبت شده است.'); window.history.back();</script>");
        }

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (username, email_or_phone, password) VALUES (?, ?, ?)");
        if ($stmt->execute([$username, $email_or_phone, $hashed_password])) {
            $_SESSION['user_id'] = $conn->lastInsertId();
            $_SESSION['username'] = $username;
            header("Location: ../index.php");
            exit;
        }
    } 
    elseif ($action == 'login') {
        $stmt = $conn->prepare("SELECT * FROM users WHERE email_or_phone = ?");
        $stmt->execute([$email_or_phone]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            header("Location: ../index.php");
            exit;
        } else {
            die("<script>alert('اطلاعات ورود اشتباه است.'); window.history.back();</script>");
        }
    }
}
?>
