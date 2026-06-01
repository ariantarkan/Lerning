<?php
header('Content-Type: application/json');

require_once '../confing/db.php'; 

$response = ['success' => false, 'staff' => []];

try {
    $stmt = $conn->prepare("SELECT name, position, image_path FROM staff ORDER BY id ASC");
    $stmt->execute();
    $staff_members = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($staff_members) {
        $response['success'] = true;
        $response['staff'] = $staff_members;
    } else {
        $response['message'] = "هیچ کارمندی یافت نشد.";
    }
} catch(PDOException $e) {
    $response['message'] = "خطا در دیتابیس: " . $e->getMessage();
}

echo json_encode($response);



