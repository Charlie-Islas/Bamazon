# Welcome to the Bamazon Documentation

Please read the following description to get to know the app.

1. bamazonCustomer:

bamazonCustomer.js is a node app designed to serve the final consumer of Bamazon. When the app is run, it automatically displays a table with the following information for all of the products available on stock:

    *Item ID number (unique for each product)
    *Product name
    *Department
    *Price (USD)
    *Stock Quantity

Then, the app asks the user to select the ID of the product he/she wants to purchase. Please remember that you can quit the app at any time pressing CRTL+C. Once the user chooses the ID, the app asks how many units of the selected item are to be purchased. The program automatically validates if the user enters a positive integer or zero, in which case it proceeds to check if there is sufficient stock. If the stock quantity is bigger or equal to the purchase request, the program informs the user of the purchased item, the units, and the total cost of the purchase, as well as to update the database. If there is not enought stock to fulfill the request, the program informs the user and asks if the user wants to make another purchase. If the user enters an unvalid value, the app informs him, and then it displays the list of products ID's again, so the user can start over with the purchase.

If the user purchases all the stock, the program informs the user that this item is no longer available, and it is deleted from the database.

Once the purchase is finished, the program asks the user if he/she wants to make another purchase. If "Yes" is selected, the program runs over. Otherwise, the program says goodbye to the user and the process is quit.

2. bamazonManager:

bamazonManager.js is a node app designed to serve the manager of Bamazon. When the app is run, it asks the user to select one of the following functions:

    1. View products for sale:
        When this option is selected, the table previously described (for customer purchases) is displayed to the manager. 
    2. View low inventory:
        This option displays a table with the product information of products whose stock quantity is lower than five.
    3. Add to inventory:
        It asks the user to select the product ID and the number of units he wants to add. If the unit input is a positive integer, it updated the database and displays a confirmation message. Otherwise, it asks the user to re-enter the information. 
    4. Add new product:
        It allows the manager to add a completely new product by providing the necessary information: product name, department, price (USD), and initial stock quantity. The program validates if the entered price is a number, and if the entered initial stock quantity is a positive integer. Is one or both of these conditions are not met, the program shows an error message and asks for the information again.
    5. EXIT:
        The process is ended.

After each function is correctly executed, the program automatically displays the initial list of options until the manager chooses EXIT or presses CRTL+C.

