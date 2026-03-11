<?php

session_start();

//set employee name
if (isset($_GET['user'])) {
    $_SESSION['e_name']= htmlspecialchars($_GET['user']);
}
$e_name=$_SESSION['e_name'];

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "inventrymanagement";


// Initialize session variables if not already set
if (!isset($_SESSION['items'])) {
    $_SESSION['items'] = [];
}

$subtotal = 0;
$u_name = '';
$phno = '';

// Add item to session 'items' array
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['item_name'], $_POST['item_price'], $_POST['qty'])) {
    $item_name = $_POST['item_name'];
    $item_price = $_POST['item_price'];
    $qty = $_POST['qty'];
    $total = $item_price * $qty;
    
    // Add item data to session
    $_SESSION['items'][] = [
        'item_name' => $item_name,
        'item_price' => $item_price,
        'qty' => $qty,
        'total' => $total
    ];
    $e_name=$_SESSION['e_name'];
}


// logout
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['logout'])){
    session_unset();
    session_destroy();
    header('Location: logout.html');
    exit();
}
// reset
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['clears'])){
    $subtotal=0;
    $_SESSION['items']=[];
    $e_name=$_SESSION['e_name'];
}

?>