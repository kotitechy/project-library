<?php
require 'db_functions.php';

$employees = listemployees();

if (!empty($employees)) {
    echo '<table border="1" cellpadding="10">';
    echo '<tr><th>ID</th><th>Name</th><th>Position</th><th>Salary</th></tr>';
    
    foreach ($employees as $employee) {
        echo '<tr>';
        echo '<td>' . htmlspecialchars($employee['s_name']) . '</td>';
        echo '<td>' . htmlspecialchars($employee['passwd']) . '</td>';
        echo '<td>' . htmlspecialchars($employee['s_email']) . '</td>';
        echo '<td>' . htmlspecialchars($employee['s_phno']) . '</td>';
        echo '</tr>';
    }
    echo '</table>';
} else {
    echo 'No employees found.';
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