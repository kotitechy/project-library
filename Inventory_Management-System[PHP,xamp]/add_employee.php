<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get the form data and store it in variables
    $fullname = $_POST['fullname'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $salary = $_POST['salary'];
    $email = $_POST['email'];

    // Check if any field is empty
    if (empty($fullname) || empty($username) || empty($password) || empty($phone) || empty($address) || empty($salary) || empty($email)) {
        echo "All fields are required!";
    } else {
        $servername = "localhost";
        $db_username = "root";
        $db_password = "root";
        $dbname = "inventrymanagement";

        // Create connection
        $conn = new mysqli($servername, $db_username, $db_password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Modify the query to insert the data into the 'staff' table
        $query = "INSERT INTO staff (s_name, s_email, s_phno, address, s_salary, passwd) 
                  VALUES ('$fullname', '$email', '$phone', '$address', '$salary', '$password')";

        if ($conn->query($query) === TRUE) {
            echo '<script>alert("' . $fullname . ' has been added as staff.");</script>';
        } else {
            echo "Error: " . $query . "<br>" . $conn->error;
        }

        // Close the connection
        $conn->close();
    }
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Employee</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
        }

        .form-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px; /* Set a max-width for large screens */
            box-sizing: border-box;
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        .form-group input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }

        .form-group input[type="submit"]:hover {
            background-color: #45a049;
        }

        /* Grid layout for form fields */
        .form-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* Two equal-width columns */
            gap: 20px; /* Space between the columns */
        }

        /* Media Query for smaller screens (e.g., mobile devices) */
        @media (max-width: 600px) {
            body {
                padding: 10px; /* Add some space around on small screens */
            }

            .form-container {
                padding: 15px;
                max-width: 100%; /* Allow form to take up full width on small screens */
            }

            h2 {
                font-size: 18px; /* Adjust header font size */
            }

            .form-group input {
                padding: 12px; /* Increase padding for input fields on mobile */
            }

            .form-row {
                grid-template-columns: 1fr; /* Stack inputs in one column on small screens */
            }
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>Add Employee</h2>
        <form action="#" method="POST">
            <div class="form-row">
                <div class="form-group">
                    <label for="fullname">Employee Full Name:</label>
                    <input type="text" id="fullname" name="fullname" required>
                </div>

                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <div class="form-group">
                    <label for="phone">Phone Number:</label>
                    <input type="text" id="phone" name="phone" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="address">Address:</label>
                    <input type="text" id="address" name="address" required>
                </div>

                <div class="form-group">
                    <label for="salary">Salary:</label>
                    <input type="number" id="salary" name="salary" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
            </div>

            <div class="form-group">
                <input type="submit" value="Add Employee">
            </div>
        </form>
    </div>
</body>
</html>
