var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"Bamazon"
});

connection.connect(function(err,res) {
    if(err) throw err;
    Manager();
})

function Manager()
{
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        saleSearch();
        break;

      case "View Low Inventory":
        lowSearch();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        addProduct();
        break;
      }

    });
}

function saleSearch()
{
    connection.query("Select * From products" , function(err , res) {
        for(var i = 0; i < res.length; i++)
        {
            console.log(res[i]);
        }
    })
}

function lowSearch()
{
    connection.query("Select * From products where stock_quantitity < 5" , function(err , res) {
        for(var i = 0; i < res.length; i++)
        {
            console.log(res[i]);
        }
    })
}

function addInventory()
{
    connection.query("Select * From products where stock_quantitity < 5" , function(err , res) {
        inquirer.prompt([
            {
                name: "product",
                type: "list",
                message: "What would you like to do?",
                choices: res
            },
            {
                name : "amount",
                type: "input",
                message:"How much would you like to add?"
            }
        ]).then(function(responses) {
            var query = "Update products Set ? Where ?";
            connection.query(query,{stock_quantitity : responses.amount , item_id : responses.product.item_id} , function(err,res) {
                if(err) throw err;
                console.log("The product has been updated");
            })
        })
    })
}

function addProduct()
{
    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "What is the item you would like to submit?"
          },
          {
            name: "department",
            type: "input",
            message: "What department is it in?"
          },
          {
            name: "price",
            type: "input",
            message: "What would you like the price to be?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          },
          {
            name: "quantity",
            type: "input",
            message: "What would you like your starting quantity to be?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
        }

    ]).then(function(answer) {
        connection.query("INSERT INTO products SET ?" ,
    {
          product_name: answer.product,
          department_name: answer.department,
          price: answer.price,
          stock_quantitity: answer.quantity
    } , function(err) {
        if(err) throw err;
        console.log("Ite added to inventory");
    });
    });

}