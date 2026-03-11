<?php

// Add item to session 'items' array
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['item_name'], $_POST['item_price'], $_POST['qty'])) {
    $item_name = $_POST['item_name'];
    $item_price = $_POST['item_price'];
    $qty = $_POST['qty'];
    $total = $item_price * $qty;
    
    echo $item_name;
}



?>
