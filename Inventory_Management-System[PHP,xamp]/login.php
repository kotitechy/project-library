<?php
session_start();

    if(($_SERVER['REQUEST_METHOD']=='POST') && isset($_POST['name'],$_POST['password'])){
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "inventrymanagement";
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
        }
            $a=$_POST['name'];
            $b=$_POST['password'];
            $query = "select * from staff where s_name='$a' and passwd='$b';";
            $result = $conn->query($query);

            if($result->num_rows > 0){
              echo '<script>alert("Log in Sucess");</script>';
              $u_name='';
              $pass='';
              session_destroy();
              $message = urlencode("You Have logged out");
              $user = urlencode($a);
              header("Location: temp.php?user=".$user);
              exit();
            }else{
              echo '<script>alert("Log in Failed");</script>';
            }
        
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STAFF SIGNIN PAGE</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }

        body {      
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
        }

        header {
            width: 100%;
            margin-bottom: 20px;
            text-align: center;
        }

        marquee {
            font-size: 1.2rem;
            color: #555;
        }

        .container {
            background-color: #fff;
            width: 70vh;
            height: 80vh;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
            overflow: hidden;
        }

        .container p {
            margin-bottom: 20px;
        }

        #lat {
            color: #005f73;
            font-size: 32px;
            font-weight: 700;
            opacity: 0.9;
        }

        #lat1 {
            color: #9b2226;
            font-size: 22px;
            font-weight: 600;
            opacity: 0.6;
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
        }

        input[type="text"] {
            width: 100%;
            padding: 15px;
            margin: 10px 0;
            border: 2px solid #005f73;
            border-radius: 5px;
            font-size: 16px;
            color: #333;
            background-color: #fafafa;
        }

        input[type="text"]:focus {
            border-color: #9b2226;
            outline: none;
            background-color: #fff;
        }

        button {
            width: 60%;
            padding: 15px;
            background-color: #9b2226;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #c1121f;
        }

        .box1 {
            width: 100%;
        }

        footer {
            margin-top: 30px;
            font-size: 16px;
            color: #005f73;
        }

        footer i {
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <marquee behavior="" direction="left">Kirana and General Store log in to continue</marquee>
        </header>
        <p id="lat1">
            <i><b><big>Login Page</big></b></i>
        </p>
        <form action="login.php" method="post">
            <div class="box1">
                <input type="text" name="name" id="name" placeholder="ENTER USER NAME" required>
                <input type="text" name="password" id="password" placeholder="ENTER YOUR PASSWORD" required>
                <button type="submit">Validate</button>
            </div>
        </form>
        <footer>
            <!-- <i>Presented by KTC-E Labs</i> -->
        </footer>
    </div>
</body>
</html>
