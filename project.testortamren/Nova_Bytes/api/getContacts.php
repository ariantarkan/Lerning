<?php
header('Content-Type: application/json');
require_once '../confing/db.php'; 

$response = ['success' => false, 'contacts' => []];

try {
    $stmt = $conn->prepare("SELECT platform_name, platform_url FROM contact_methods ORDER BY id ASC");
    $stmt->execute();
    $contacts_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($contacts_data) {
        $response['success'] = true;
        $response['contacts'] = $contacts_data;
    } else {
        $response['message'] = "هیچ راه ارتباطی یافت نشد.";
    }
} catch(PDOException $e) {
    $response['message'] = "خطا در دیتابیس: " . $e->getMessage();
}

echo json_encode($response);
