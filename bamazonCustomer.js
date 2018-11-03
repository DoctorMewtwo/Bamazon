var inquirer = require("inquirer");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password: "root",
    database : "Bamazon"
});

function readItems()
{
    connection.query("Select * From products" , function(err , res) {
        for(var i = 0; i < res.length; i++)
        {
            console.log(res[i]);
        }
        toDo();
    })
}

function toDo()
{
    inquirer.prompt([
        {
            name: "id",
            type : "input",
            message : "Enter an item id of what you would like to buy",
            validate: function(value) {
                if(isNaN(value) === false){
                    return true;
                }
                return false;
            }
        },
        {
            name: "quantity",
            type : "input",
            message : "Enter a quantity",
            validate: function(value) {
                if(isNaN(value) === false){
                    return true;
                }
                return false;
            }
        }
    ]).then(function (response) {
        var query = "Select * from products Where ?";
        connection.query(query , { item_id : parseInt(response.id)} , function(err , res) {
            console.log(res[0].stock_quantitity);
            if(parseInt(res[0].stock_quantitity) > parseInt(response.quantity))
            {
                
                var total = parseFloat(res[0].price * response.quantity);
                query = "Uodate products Set ? Where ?";
                console.log("Congrats on your purchase you just spent " + total + " Dollars");
                connection.query(query,[{stock_quantity : parseFloat(res[0].stock_quantitity) - parseFloat(response.quantity)},{ item_id : response.id}], function(err,resp){
                    console.log("product updated");
                })
            }
            else
            {
                console.log("Sorry youve selected too high of a quantity");

            }
            connection.end();
        })
    })
}

connection.connect(function(err) {
    if(err) throw err;
    readItems();
})