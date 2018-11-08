var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});
var itemsToAdd=[];

connection.connect(function (err) {
    if (err) throw err;
    console.log(" ");
    console.log("Welcome Manager! This application will allow you to manage the Bamazon site.")
    console.log(" ");
    displayOptions();
});

function displayOptions(){
    inquirer
        .prompt([
            {
            type: "list",
            name: "option",
            message: "Select the desired option: ",
            choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product","EXIT"]
            }
        ])
        .then(function(res) {
            switch(res.option){
                case "View Products for Sale":
                viewProducts();
                break;
                case "View Low Inventory":
                lowInventory();
                break;
                case "Add to Inventory":
                askQuestions();
                break;
                case "Add New Product":
                askProductQuestions();
                break;
                case "EXIT":
                connection.end();
                break;
            }
        });
}

function viewProducts() {
    console.log(" ");
    console.log("Here is a table with all the items we currently have for sale: ");
    console.log(" ");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      printTable(res);
      displayOptions();
    });
  }

function lowInventory(){
    console.log(" ");
    console.log("Here is a table with all the items with a current inventory count lower than 5: ");
    console.log(" ");
    var query="SELECT products.item_id,products.product_name,products.department_name,products.price,products.stock_quantity FROM products WHERE products.stock_quantity<5";
    connection.query(query,function(err,res){
        printTable(res);
        displayOptions();
    });
    
}

function askQuestions() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        printTable(res);
        itemsToAdd = [];
        for (var x in res) {
            itemsToAdd.push({ name: res[x].item_id, value: res[x] });
        }
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "id",
                    message: "Please select the item ID to which you want to add inventory: ",
                    choices: itemsToAdd
                },
                {
                    type: "input",
                    name: "quantity",
                    message: "Please enter the quantity you want to add to the inventory. Enter only positive integers please:  "
                }
            ])
            .then(function (res) {
                var item = res.id;
                var quantity = parseFloat(res.quantity);
                var isInt = Number.isInteger(quantity);

                if (isInt && quantity > 0) {
                    addToInventory(item, quantity);
                }
                else {
                    console.log(" ");
                    console.log("That was not a valid integer. Please enter valid values...")
                    console.log(" ");
                    askQuestions();
                }

            });
    });
}

function addToInventory(item,quantity){
    var id=item.item_id;
    var newStock=item.stock_quantity+quantity;
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newStock
          },
          {
            item_id: id
          }
        ],
        function(err, res) {
        console.log(" ");
        console.log(quantity+" units were added to the inventory of "+item.product_name);
        console.log("New Stock: "+newStock+" units");
        console.log(" ");
        displayOptions();
        }
      );
}

function askProductQuestions(){

    inquirer
            .prompt([
                {
                    type: "input",
                    name: "product_name",
                    message: "Please enter the name of the new product: ",
                },
                {
                    type: "input",
                    name: "department_name",
                    message: "Please enter the name of its department:  "
                },
                {
                    type: "input",
                    name: "price",
                    message: "Please enter its unitary price. Please input valid numbers (e.g. 5 or 5.50): ",
                },
                {
                    type: "input",
                    name: "stock_quantity",
                    message: "Please enter the initial stock quantity. Please input only positive integers: ",
                }
            ])
            .then(function (res) {
                var quantity=parseFloat(res.stock_quantity);
                var isInt=Number.isInteger(quantity);
                var isFloat=isNaN(parseFloat(res.price));
                if (!isFloat&&isInt&&quantity>0) {
                    addNewProduct(res);
                }
                else {
                    console.log(" ");
                    console.log("The provided information is incorrect. Please enter valid values...")
                    console.log(" ");
                    askProductQuestions();
                }

            });
    
}

function addNewProduct(productInfo){
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: productInfo.product_name,
          department_name: productInfo.department_name,
          price: productInfo.price,
          stock_quantity: productInfo.stock_quantity
        },
        function(err, res) {
          console.log(" ");
          console.log("The new product: '"+productInfo.product_name+"' has been added to the available items!");
          console.log("Unitary price: $"+productInfo.price);
          console.log("Initial stock: "+productInfo.stock_quantity+" units");
          console.log(" ");
          displayOptions();
        }
      );
}

function printTable(rows) {
    const headers = ["Item ID", "Product Name", "Department", "Price (USD)", "Stock Quantity"];
    let table = new Table({
        head: headers
    });

    rows.forEach(row => {
        table.push([row.item_id, row.product_name, row.department_name, row.price, row.stock_quantity]);
    });

    console.log(table.toString());
    console.log(" ");
}

