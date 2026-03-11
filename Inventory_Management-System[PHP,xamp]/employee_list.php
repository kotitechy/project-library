<?php
// database connection
$servername = "localhost";
$username = "root";
$password = "root"; 
$dbname = "inventrymanagement";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Fetch employees
$sql = "SELECT sno, s_name, s_phno, s_email FROM staff";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
  <title>Employee List</title>
  <style>
    body {
      font-family: Arial;
      background: #f2f2f2;
    }
    table {
      border-collapse: collapse;
      width: 80%;
      margin: 50px auto;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    th, td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      text-align: center;
    }
    th {
      background-color: #007bff;
      color: white;
    }
  </style>
</head>
<body>

  <h2 style="text-align:center;">Employee List</h2>

  <table>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Email</th>
    </tr>

    <?php
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>".$row["sno"]."</td>
                <td>".$row["s_name"]."</td>
                <td>".$row["s_phno"]."</td>
                <td>".$row["s_email"]."</td>
              </tr>";
      }
    } else {
      echo "<tr><td colspan='5'>No employees found.</td></tr>";
    }
    $conn->close();
    ?>

  </table>

</body>
</html>
