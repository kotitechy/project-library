<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Kirana and General Store</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <style>
        .customer-section {
    margin: 20px;
    text-align: center;
}

.customer-section input {
    margin: 5px;
}

.table-container {
    width: 100%;
    overflow-y: scroll;
    border: 1px solid black;
    margin-bottom: 20px;
    max-height: 300px;
}

table {
    width: 100%;
    /* min-height: 50vh; */
    border-collapse: collapse;
}

th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ccc;
}
    </style>
</head>
<body>
<span style='width:10px'>
<form action="db_funcs.php" method="post">  
    <input type="text" id="cus_name" name="cus_name" placeholder="Customer Name" required>
    <input type="tel" id="ps" name="ps" placeholder="Phone Number" required>
    <button type="submit">BILL NOW</button>
</form></span>
<form action="db_funcs.php" method="post">
            <button type="submit" name="clears">Reset</button>
    </form>
<hr>
</div>
    <!-- Main Part (Table) -->
    <div class="table-container">
        <table id="itemsTable">
            
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody id="tableBody" style='max-height=50px'>
                <!-- Dynamically added rows will appear here -->
                <?php  
                    if(isset($_SESSION['items']) && count($_SESSION['items']) > 0 ){
                        $index=1;
                        foreach($_SESSION['items'] as $item){
                           $x =  ($item['item_price'] * $item['qty']);
                           $subtotal+=$x;
                        echo "
                            <tr>
                            <td>{$index}</td>
                            <td>{$item['item_name']}</td>
                            <td>{$item['qty']}</td>
                            <td>{$item['item_price']}</td>
                            <td>{$x}</td>
                            </tr>";
                            $index++;
                        }
                    }
                ?>
            </tbody>
        </table>
    </div>
    </body>
    </html>
    