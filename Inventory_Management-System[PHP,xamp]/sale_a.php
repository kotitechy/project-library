<?php
require 'db_functions.php';
session_start();

$result = [];
$form_date = '';
$daily_sales = 0;

// Store session variable for user
if (isset($_GET['user'])) {
    $_SESSION['e_name'] = htmlspecialchars($_GET['user']);
}
$e_name = $_SESSION['e_name'];

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "inventrymanagement";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['year'], $_POST['month'], $_POST['day'])) {
    $date1 = $_POST['year'] . '-' . $_POST['month'] . '-' . $_POST['day'];
    $form_date = $date1;

    // Fetch sales data with JOIN
    $query = "SELECT s.sno, s.phno, s.item_name, s.item_price, s.qty_sold, s.total, s.purchased_date, st.sub_total 
              FROM sales s
              JOIN sale_total st ON s.phno = st.phno
              WHERE DATE(s.purchased_date) = ?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $date1);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Fetch total daily sales
    $query = "SELECT SUM(st.sub_total) 
              FROM sale_total st
              JOIN sales s ON s.phno = st.phno
              WHERE DATE(s.purchased_date) = ?";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $date1);
    $stmt->execute();
    $row = $stmt->get_result();
    
    if ($row) {
        $row = $row->fetch_row();
        $daily_sales = $row[0] ?? 0;
    }
}

// Redirect to billing page
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['b_p'])) {
    $user = urlencode($e_name);
    header("Location: temp.php?user=" . $user);
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sale Analysis</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 20px;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        .form-container {
            margin-bottom: 20px;
        }
        .form-container input {
            padding: 8px;
            margin: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
        .form-container button {
            padding: 10px 20px;
            background-color: #007bff;
            border: none;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
        .form-container button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Select a Date for Sales Analysis</h2>
    <div class="form-container">
        <form action="sale_a.php" method="POST">
            <label for="year">Year:</label>
            <input type="number" id="year" name="year" required min="2024" max="2030">
        
            <label for="month">Month:</label>
            <input type="number" id="month" name="month" required min="01" max="12">
        
            <label for="day">Day:</label>
            <input type="number" id="day" name="day" required min="01" max="31">
            
            <button type="submit">Fetch Data</button>
        </form>
    </div>

    <h3>Sale Total: 
        <?php 
        echo ($daily_sales == 0) ? 'No sales for the date' : $daily_sales;
        ?>
    </h3>

    <form action="" method="post">
        <button type="submit" name='b_p'><big>Billing Page</big></button>
    </form>

    <h3>Customer Records for the Date: <?php echo $form_date; ?></h3>

    <?php  
    if ($result && $result->num_rows > 0) {
        echo "<table>
            <tr>
                <th>Sno</th>
                <th>Phno</th>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Qty Sold</th>
                <th>Total</th>
                <th>Time</th>
                <th>Sub Total</th>
            </tr>";

        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            foreach ($row as $value) {
                echo "<td>$value</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "<h3>No records found for the date: $form_date</h3>";
    }
    ?>

</div>

</body>
</html>