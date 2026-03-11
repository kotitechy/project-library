<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "inventrymanagement";


function ins_customer($u_name, $phno) {
  $servername = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "inventrymanagement";

  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // Modify the query to use INSERT IGNORE
  $query = "INSERT IGNORE INTO customers (name, phno) VALUES ('$u_name', '$phno')";

  if ($conn->query($query) === TRUE) {
      echo '<script>alert("' . $u_name . ' is our Customer now");</script>';
  } else {
      echo "Error: " . $query . "<br>" . $conn->error;
  }
  $conn->close();
}

function ins_data($phno, $i_name, $i_price, $i_qty, $i_total) {
  $servername = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "inventrymanagement";

  $conn = new mysqli($servername, $username, $password, $dbname);
  
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    
    // First insert query
    $query = "INSERT INTO sales (phno, item_name, item_price, qty_sold, total) 
            VALUES ($phno, '$i_name', $i_price, $i_qty, $i_total)";
  
    if ($conn->query($query) === TRUE) {
      // Define sub_total if intended to be used here
      $sub_total = $i_total; // or any calculation you intend for sub_total
      
      // Second insert query
      $query2 = "INSERT INTO sale_total (phno, sub_total) VALUES ($phno, $sub_total)";
      
      if ($conn->query($query2) === TRUE) {
          echo "<script>alert('Updated data successfully');</script>";
        } else {
            echo "Error: " . $query2 . "<br>" . $conn->error;
        }
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }
    
    $conn->close();
}
function listemployees(){
  $servername = "localhost";
  $username = "root";
  $password = "root";
  $dbname = "inventrymanagement";

  $conn = new mysqli($servername, $username, $password, $dbname);
  
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $query = "SELECT * FROM staff";
  $result = $conn->query($query);
  
  $employees = array(); // Initialize an array to hold employee data

  if ($result->num_rows > 0) {
      // Fetch all employee records as an associative array
      while($row = $result->fetch_assoc()) {
          $employees[] = $row;
      }
  } else {
      echo "No employees found.";
  }
  
  $conn->close();
  
  return $employees;
}
function liststock(){
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
  
    $query = "SELECT * FROM stock;";
    $result = $conn->query($query);
    
    $stock = array(); // Initialize an array to hold stock data
  
    if ($result->num_rows > 0) {
        // Fetch all stock records as an associative array
        while($row = $result->fetch_assoc()) {
            $stock[] = $row;
        }
    } else {
        echo "No stock found.";
    }
    
    $conn->close();
    
    return $stock;
  }
?> 