<?php
require 'db_functions.php';

session_start();

// Set employee name
if (isset($_GET['user'])) {
    $_SESSION['e_name'] = htmlspecialchars($_GET['user']);
}
$e_name = $_SESSION['e_name'] ?? '';

// Initialize session variables
if (!isset($_SESSION['items'])) {
    $_SESSION['items'] = [];
}

$subtotal = 0;

// Add item to session 'items' array
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['item_name'], $_POST['item_price'], $_POST['qty'])) {
    $item_name = htmlspecialchars($_POST['item_name']);
    $item_price = floatval($_POST['item_price']);
    $qty = intval($_POST['qty']);
    $total = $item_price * $qty;

    $_SESSION['items'][] = [
        'item_name' => $item_name,
        'item_price' => $item_price,
        'qty' => $qty,
        'total' => $total
    ];
}

// Insert items into the database
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['ps']) && isset($_POST['cus_name'])) {
    ins_customer($_POST['cus_name'], $_POST['ps']);
    foreach ($_SESSION['items'] as $item) {
        ins_data($_POST['ps'], $item['item_name'], $item['item_price'], $item['qty'], $item['total'], $subtotal);
    }
    
    $e_name=$_SESSION['e_name'];
    // Optionally reset items after insertion
    $_SESSION['items'] = [];
}

// Logout
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['logout'])) {
    session_unset();
    session_destroy();
    header('Location: logout.html');
    exit();
}

// Reset
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['clears'])) {
    $_SESSION['items'] = [];
}


//saless page
if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['sale_a'])){
    $url = "hhttp://localhost/inventry_system/temp.php?user=damini";

echo "<script type='text/javascript'>
    window.open('$url', '_blank');
</script>";
    $user = urlencode($e_name);
    header("Location: sale_a.php?user=".$user);
    header('Location: sale_a.php');
}
//stock page
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['stock'])) {
    $url = "http://localhost/inventry_system/stock_today.html";

    // Output JavaScript to open the URL in a new tab
    $output = shell_exec('python3 ' . __DIR__ . '/analyze.py');
    echo "<script type='text/javascript'>
        window.open('$url', '_blank'); // Open the page in a new tab
        window.location.href = '$url'; // Redirect the current page to the same URL
    </script>";
    exit(); // stopiing the execeution
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kirana and General Store</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        header {
            background-color: #e7dddd;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        header ul {
            display: flex;
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        header li {
            margin: 0 15px;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }

        header li:hover {
            color: #00bfff;
            cursor: pointer;
        }

        .log {
            margin-left: auto;
        }

        .container {
            display: grid;
            grid-template-columns: 4fr 1fr; /* 80% for table, 20% for billing */
            height: calc(100vh - 60px);
        }

        .table-container {
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ccc;
        }

        .billing-section {
            border-left: 1px solid #ccc;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .subtotal {
            font-weight: bold;
            margin: 10px 0;
        }

        .item-form input {
            margin: 5px 0;
            padding: 8px;
            width: 100%;
            box-sizing: border-box;
        }

        .item-form button {
            padding: 10px;
            background-color: #00bfff;
            color: #fff;
            border: none;
            cursor: pointer;
        }

        .item-form button:hover {
            background-color: #007acc;
        }
    </style>
</head>
<body>
<header>
    <ul>
        <li><h3>Kirana and General Store</h3></li>
        <li><h3>    <div class="c_s">
        <form action="" method="post">
        <button type="submit" name='sale_a'>Sales_report</button>
        </form>
    </div></h3></li>
        <li><h3>    <div class="c_s">
        <!-- <form action="" method="post">
        <button type="submit" name='stock'>Stock</button>
        </form> -->
    </div></h3></li>
        <li><h3>Services</h3></li>
        <li><h3>Contact</h3></li>
    </ul>
    <div class="log">
        <form action="" method="post">
            <span><?php echo $e_name; ?></span>
            <button type="submit" name="logout">Logout</button>
        </form>
    </div>
</header>

<div class="container">
    <!-- Main Table Section -->
    <div class="table-container">
        <h2 style=" height:30px">
        <span id='new-c'>
        <form action="temp.php" method="post">
            <input style="padding:6px;" type="text" id="cus_name" name="cus_name" placeholder="Customer Name" required>
            <input style="padding:6px;" type="tel" id="ps" name="ps" placeholder="Phone Number" required>
            <button type="submit" style="padding:5px;">NEXT</button>
        </form>
        </span>
        </h2>
        <table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <?php
                if (isset($_SESSION['items']) && count($_SESSION['items']) > 0) {
                    $index = 1;
                    foreach ($_SESSION['items'] as $item) {
                        $subtotal += $item['total'];
                        echo "
                        <tr>
                            <td>{$index}</td>
                            <td>{$item['item_name']}</td>
                            <td>{$item['qty']}</td>
                            <td>₹{$item['item_price']}</td>
                            <td>₹{$item['total']}</td>
                        </tr>";
                        $index++;
                    }
                }
                ?>
            </tbody>
        </table>
    </div>

    <!-- Billing Section -->
    <div class="billing-section">
        <form class="item-form" action="" method="post">
            <h4>Add Items</h4>
            <input type="text" name="item_name" placeholder="Item Name" required>
            <input type="number" name="item_price" placeholder="Price" min="0" step="0.01" required>
            <input type="number" name="qty" placeholder="Quantity" min="1" required>
            <button type="submit">Add Item</button>
        </form>
        <div class="subtotal">Subtotal: ₹<?php echo $subtotal; ?></div>
        <form action="" method="post">
            <button type="submit" name="clears">Reset</button>
        </form>
    </div>
</div>
</body>
</html>
