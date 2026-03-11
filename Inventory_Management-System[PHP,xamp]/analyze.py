import pymysql
sales=0
def fetch_data_from_mysql(host, user, password, database, query):
    # Establish the connection to the MySQL server
    try:
        connection = pymysql.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        
        # Create a cursor object
        cursor = connection.cursor()
        
        # Execute the query
        cursor.execute(query)
        
        # Fetch all the rows from the result of the query
        result = cursor.fetchall()
        
        # Close the cursor and connection
        cursor.close()
        connection.close()
        
        return result
        
    except pymysql.MySQLError as e:
        print(f"Error: {e}")
        return None

# Example usage:
host = 'localhost'
user = 'root'
password = 'root'
database = 'inventrymanagement'
query = '''SELECT item_name, SUM(qty_sold) AS total_qty_sold, sum(total)
FROM sales
where sno > 30
GROUP BY item_name;
'''
query = '''SELECT item_name, SUM(qty_sold) AS total_qty_sold, sum(total)
FROM sales
where date(purchased_date) = curdate()
GROUP BY item_name;
'''

data = fetch_data_from_mysql(host, user, password, database, query)
# if data:
    # print(data)
if data:
    import matplotlib.pyplot as plt
    import pandas as pd
    from decimal import Decimal

    # Convert Decimal to int directly while creating the DataFrame
    data_int = [(item, int(quantity), int(price)) for item, quantity, price in data]

    # Create DataFrame
    df = pd.DataFrame(data_int, columns=['Item', 'Quantity', 'Price'])

    # Plotting the pie chart
    plt.pie(df['Quantity'], labels=df['Item'], autopct=lambda p: f'{int(p * sum(df["Quantity"]) / 100)}', startangle=90)

    # Display the plot
    plt.title('Item Quantity Chart')
    plt.savefig('pic1.png')
    # plt.show()

    # Convert Decimal to int directly while creating the DataFrame

    # Create DataFrame
    df = pd.DataFrame(data_int, columns=['Item', 'Quantity', 'Price'])

    # Plotting the pie chart
    plt.pie(df['Quantity'], labels=df['Item'], autopct=lambda p: f'{int(p * sum(df["Price"]) / 100)}', startangle=90)


    try:
            connection = pymysql.connect(
                host=host,
                user=user,
                password=password,
                database=database
            )

            # Create a cursor object
            cursor = connection.cursor()

            # Execute the query
            cursor.execute('''
    SELECT sum(total)
    FROM sales
    where date(purchased_date)='20241215';
    ''')

            # Fetch all the rows from the result of the query
            result = cursor.fetchall()

            # Close the cursor and connection
            cursor.close()
            connection.close()

            sales = result[0][0]
    except pymysql.MySQLError as e:
            print(f"Error: {e}")
            sales = 0

    # Display the plot
    plt.title(f'Chart Of Amount ₹{sales}')
    plt.savefig('pic2.png')
    # plt.show()
else:
    import matplotlib.pyplot as plt

    plt.figure(figsize=(6, 4))
    plt.text(0.5, 0.5, "NO SALES FOR CURRENT DATE", fontsize=20, ha='center', va='center')
    plt.axis('off')
    plt.savefig("pic1.png", bbox_inches='tight')  # Save without axes, tight bounding box
    plt.savefig("pic2.png", bbox_inches='tight')