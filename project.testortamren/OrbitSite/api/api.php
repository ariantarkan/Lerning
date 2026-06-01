<?php
session_start();
require '../db.php'; // بازگشت به پوشه اصلی برای پیدا کردن db.php

header('Content-Type: application/json'); // خروجی تمام درخواست‌ها JSON خواهد بود

$response = ['status' => 'error', 'message' => 'درخواست نامعتبر است.'];

if (isset($_POST['action'])) {
    $action = $_POST['action'];

    switch ($action) {
        case 'register':
            if (!empty($_POST['username']) && !empty($_POST['password'])) {
                $user = trim($_POST['username']);
                $pass = $_POST['password'];

                // بررسی وجود نام کاربری
                $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
                $stmt->execute([$user]);
                if ($stmt->fetch()) {
                    $response['message'] = 'این نام کاربری قبلا ثبت شده است.';
                } else {
                    $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);
                    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
                    if ($stmt->execute([$user, $hashed_pass])) {
                        $response = ['status' => 'success', 'message' => 'ثبت نام با موفقیت انجام شد! اکنون می‌توانید وارد شوید.'];
                    } else {
                        $response['message'] = 'خطایی در ثبت نام رخ داد.';
                    }
                }
            } else {
                $response['message'] = 'نام کاربری و رمز عبور الزامی است.';
            }
            break;

        case 'login':
            if (!empty($_POST['username']) && !empty($_POST['password'])) {
                $user = $_POST['username'];
                $pass = $_POST['password'];

                $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
                $stmt->execute([$user]);
                $userData = $stmt->fetch();

                if ($userData && password_verify($pass, $userData['password'])) {
                    $_SESSION['user_id'] = $userData['id'];
                    $_SESSION['role'] = $userData['role'];
                    $_SESSION['username'] = $userData['username'];
                    $response = ['status' => 'success', 'message' => 'ورود با موفقیت انجام شد.'];
                } else {
                    $response['message'] = 'نام کاربری یا رمز عبور اشتباه است.';
                }
            } else {
                $response['message'] = 'نام کاربری و رمز عبور الزامی است.';
            }
            break;

        case 'logout':
            session_destroy();
            $response = ['status' => 'success'];
            // چون با جاوااسکریپت کار می‌کنیم، ریدایرکت در سمت کلاینت انجام می‌شود
            break;

        case 'submit_ticket':
            if (isset($_SESSION['user_id']) && !empty($_POST['subject']) && !empty($_POST['message'])) {
                $user_id = $_SESSION['user_id'];
                $subject = htmlspecialchars($_POST['subject']);
                $message = htmlspecialchars($_POST['message']);

                $stmt = $pdo->prepare("INSERT INTO tickets (user_id, subject, message) VALUES (?, ?, ?)");
                if ($stmt->execute([$user_id, $subject, $message])) {
                    $response = ['status' => 'success', 'message' => 'تیکت شما با موفقیت ثبت شد!'];
                } else {
                    $response['message'] = 'خطا در ثبت تیکت!';
                }
            } else {
                $response['message'] = 'برای ارسال تیکت باید وارد شوید و فیلدها را پر کنید.';
            }
            break;
            
        case 'admin_reply':
            if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin' && isset($_POST['ticket_id']) && !empty($_POST['admin_reply'])) {
                 $ticket_id = $_POST['ticket_id'];
                 $admin_reply = htmlspecialchars($_POST['admin_reply']);

                 $stmt = $pdo->prepare("UPDATE tickets SET admin_reply = ?, status = 'closed' WHERE id = ?");
                 if ($stmt->execute([$admin_reply, $ticket_id])) {
                    // ریدایرکت به پنل ادمین
                    header("Location: ../secret_panel_8899/index.php?status=replied");
                    exit();
                 } else {
                    header("Location: ../secret_panel_8899/index.php?status=error");
                    exit();
                 }
            } else {
                 header("Location: ../secret_panel_8899/index.php?status=error");
                 exit();
            }
            break;
    }
}

echo json_encode($response);
?>
