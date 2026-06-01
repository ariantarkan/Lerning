<?php
header('Content-Type: application/json');

require_once '../confing/db.php'; 

$response = ['success' => false, 'projects' => []];

try {
    $stmt = $conn->prepare("SELECT project_name, project_url FROM projects ORDER BY id ASC");
    $stmt->execute();
    $projects_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($projects_data) {
        $response['success'] = true;
        $response['projects'] = $projects_data;
    } else {
        $response['message'] = "هیچ خدماتی یافت نشد.";
    }
} catch(PDOException $e) {
    $response['message'] = "خطا در دیتابیس: " . $e->getMessage();
}

echo json_encode($response);
