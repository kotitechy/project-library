<?php
require 'db_functions.php';

$stock = liststock();

if (!empty($stock)) {
    echo '<table border="1" cellpadding="10">';
    echo '<tr>
    <th>Product</th>
    <th>Total-Quantity</th>
    <th>Sold</th>
    </tr>';
    
    foreach ($stock as $stock) {
        echo '<tr>';
        echo '<td>' . htmlspecialchars($stock['sname']) . '</td>';
        echo '<td>' . htmlspecialchars($stock['qty']) . '</td>';
        echo '<td>' . htmlspecialchars($stock['sold']) . '</td>';
        echo '</tr>';
    }
    echo '</table>';
} else {
    echo 'No stock found.';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employees</title>
</head>
<body>
</body>
</html>
