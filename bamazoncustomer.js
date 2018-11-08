var mysql = require("mysql");
var inquirer = require("inquirer");
var Table=require("cli-table3");
var saleItems = [];

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
  });

  function displayItems() {
    console.log(" ");
    console.log("Here is a table with all the items we currently have for sale: ");
    console.log(" ");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      printTable(res);
      askQuestions();
    });
  }

  function askQuestions(){

    connection.query("SELECT * FROM products", function(err, res) {
    
        if (err) throw err;
        saleItems = [];
        for (var x in res) {
            saleItems.push({ name: res[x].item_id, value: res[x] });
        }
        console.log(" ");
        inquirer
        .prompt([
            {
            type: "list",
            name: "product",
            message: "What item do you want to purchase? Choose the Item ID: ",
            choices: saleItems
            },
            {
            type: "input",
            name: "quantity",
            message: "How many of these items do you want to purchase? Enter only positive integers please: "
            }
        ])
        .then(function(res) {
            var quantity = parseFloat(res.quantity);
            var isInt=Number.isInteger(quantity);
            var product = res.product;

            if (isInt&&quantity>=0) {

                if (quantity > product.stock_quantity) {
                    console.log(" ");
                    console.log("Sorry, we currently don't have sufficient stock to fulfill your order!");
                    console.log(" ");
                    otherProduct();
                }
                else {
                    updateDB(quantity, product);
                }
            }
            else{
                console.log(" ");
                console.log("That was not a valid integer. Please enter valid values...")
                console.log(" ");
                askQuestions();
            }
        });
    });
  }

  function updateDB(numberOfItems,productInfo){
      var item_id = productInfo.item_id;
      var unitPrice = productInfo.price;
      var newStock=productInfo.stock_quantity-numberOfItems;
      var totalCost = numberOfItems * unitPrice;
      var query = connection.query(
          "UPDATE products SET ? WHERE ?",
          [
              {
                  stock_quantity: newStock
              },
              {
                  item_id: item_id
              }
          ]
      );

      console.log(" ");
      console.log("Thanks for your purchase! Find your corresponding details below:")
      console.log(" ");
      console.log("Product: " + productInfo.product_name);
      console.log("Unit price: $" + unitPrice);
      console.log("Purchased units: " + numberOfItems);
      console.log("Total price: $" + totalCost);
      console.log(" ");
      
      if(newStock===0){
        deleteProduct(productInfo.item_id,productInfo.product_name);
      }
      otherProduct();
  }

  function otherProduct(){
      
    inquirer
    .prompt([
        {
        type: "list",
        name: "choice",
        message: "Do you want to make another purchase?: ",
        choices: ["Yes","No"]
        }
    ])
    .then(function(res) {
        if(res.choice==="Yes"){
            displayItems();
        }
        else{
            console.log(" ");
            console.log("Okay, thanks for visiting Bamazon. Goodbye! :)")
            connection.end();
        }
    });
  }

  function deleteProduct(item_id,product_name){
    console.log("The stock of the purchased product has been entirely deployed. This item is no longer available: "+product_name);
    connection.query(
        "DELETE FROM products WHERE ?",
        {
          item_id: item_id
        },
      );
    console.log(" ");
  }

  function printTable(rows) {
    const headers = ["Item ID", "Product Name","Department","Price (USD)", "Stock Quantity"];
    let table = new Table({
      head: headers
    });
  
    rows.forEach(row => {
      table.push([row.item_id, row.product_name, row.department_name, row.price, row.stock_quantity]);
    });
  
    console.log(table.toString());
  }

  connection.connect(function(err) {
    if (err) throw err;
    console.log(" ");
    console.log("Welcome to Bamazon! Thanks for visiting our page. Prepare to shop super cool items at the best prices!")
    console.log("Press Ctrl+C to EXIT at any time.");
    console.log(" ");
    displayItems();
  });
