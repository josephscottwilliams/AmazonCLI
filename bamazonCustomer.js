require('dotenv').config()
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_Pass,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    //   console.log('connected as id ' + connection.threadId);
});
//***********************************************************************************************
function start() {
    console.log("WELCOME TO BAMAZON!")
    connection.query("SELECT products.id, products.product_name, products.price, products.stock FROM products", function (err, res) {
        if (err) throw err;

        var choicesArray = [];
        inquirer
            .prompt([{
                type: "list",
                name: "itemsToBuy",
                message: "Which item would you like to purchase today? [Press Q to Quit]",
                choices: function () {
                    for (item of res) {
                        choicesArray.push(item.id + " || " + item.product_name + " || " + item.price)
                    }
                    return choicesArray;
                }
            },
            {
                type: "input",
                name: "numberOfUnits",
                message: "How many of this item would you like to buy?"
            }
            ])
            .then(answers => {
                // Get the index number from the selection made
                var index = choicesArray.indexOf(answers.itemsToBuy)
                // Use index number from selection made (which is product id) to pass on to buyItem()
                var itemStock = res[index].stock;
                var unitsToBuy = parseInt(answers.numberOfUnits)
                    
                // Determine if it can be bought:
                if (itemStock >= unitsToBuy) {
                    var itemId = parseInt(res[index].id);
                    var total_cost = unitsToBuy * res[index].price;
                    var item_purchased = res[index].product_name;
                    buyItem(itemId, itemStock, unitsToBuy, total_cost, item_purchased)
                }
                else {
                    console.log("Sorry, not enough in stock!")
                    returnToMenu();
                }
            })
            .catch(error => {
                if (error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                } else {
                    // Something else when wrong
                }
            });
    })
}
start();
//***********************************************************************************************
function buyItem(itemId, itemStock, unitsBought, totalCost, item){
        var newStockCount = itemStock - unitsBought
        var query = "UPDATE products SET stock=? WHERE id=?" 

        connection.query(query,[newStockCount, itemId], function(err, res){
            if(err) throw err;
        //   Show the customer the total cost of the purchase (receipt)
            console.log("Thank you for your purchase at Bamazon!" +
            "\nYour order confirmation: " + 
            "\nItem purchased: " + item +
            "\nQuantity purchased: " + unitsBought +
            "\nTotal Cost: " + totalCost )
            returnToMenu();
    })
}
//***********************************************************************************************
function returnToMenu() {
    inquirer
        .prompt([
            {
                type: "confirm",
                name: "returnToMenu",
                message: "Would you like to return to the main menu?"
            }
        ])
        .then(answers => {
            if (answers.returnToMenu === true) {
                start();
            }
            else {
                console.log("Thank you for shopping at Bamazon, come visit again soon!")
            }
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}

//***********************************************************************************************
function quit(){
    console.log("Thank you for visiting Bamazon, have a great day!")
    process.exit(0);
}