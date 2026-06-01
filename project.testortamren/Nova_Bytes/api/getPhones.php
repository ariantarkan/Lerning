<?php
header('Content-Type: application/json');
require_once '../confing/db.php'; 

$response = ['success' => false, 'phones' => []];

try {
    $stmt = $conn->prepare("SELECT phone_number, title FROM phones ORDER BY id ASC");
    $stmt->execute();
    $phones_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($phones_data) {
        $response['success'] = true;
        $response['phones'] = $phones_data;
    } else {
        $response['message'] = "شماره ای یافت نشد.";
    }
} catch(PDOException $e) {
    $response['message'] = "خطا در دیتابیس: " . $e->getMessage();
}

echo json_encode($response);
