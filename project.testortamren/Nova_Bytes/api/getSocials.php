<?php
header('Content-Type: application/json');
require_once '../confing/db.php'; 

$response = ['success' => false, 'links' => []];

try {

    $stmt = $conn->prepare("SELECT platform, url FROM social_links");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($data) {
        $response['success'] = true;

        foreach($data as $row) {
            $response['links'][$row['platform']] = $row['url'];
        }
    }
} catch(PDOException $e) {
    $response['message'] = "خطا: " . $e->getMessage();
}

echo json_encode($response);
?>
