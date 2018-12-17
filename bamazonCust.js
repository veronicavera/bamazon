var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});


function productList(res) {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    var table = new AsciiTable('Bamazon Products')
    table.setHeading("item_id", "product_name", "department_name", "price", "stock_quantity")
    if (err) throw err;
      // Log all results of the SELECT statement
      for (var i = 0; i < res.length; i++) {
          var itemID = res[i].item_id;
          var prodID = res[i].product_name;
          var deptName = res[i].department_name;
          var priceID = res[i].price;
          var stockQTY = res[i].stock_quantity;
          table.addRow(itemID, prodID, deptName, priceID, stockQTY);
  		}
      console.log(table.toString());
      start();
  });
}
function start() {
  inquirer.prompt([
      {
        type: "item",
        name: "userResp",
        message: "Can you provide the ID of the item you would like to buy (Enter ID)?",
        validate: function(value) {
         //isNot-A-Number validation
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        type: "input",
        name: "purchAmt",
        message: "How many would you like to purchase?",
        validate: function(value) {
          
          //in Not-a-Number. Validation
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(userResp) {
      var orderID = parseInt(userResp.userResp);
      var query = "SELECT product_name, price, stock_quantity FROM products WHERE item_id = " + orderID;
      connection.query(query, function(err, res) {

        if(err) throw err;
        if (parseInt(userResp.purchAmt) <= parseInt(res[0].stock_quantity)){
          var stockUp = (res[0].stock_quantity - parseInt(userResp.purchAmt));
          console.log("stock update " + stockUp);
          var queryTwo = "UPDATE products SET stock_quantity = " + stockUp + "WHERE item_id = " + orderID;
          connection.query(queryTwo, function(err, res) {
              if(err) throw err;
            });
            console.log("Thanks for your order!");
        } else {
            console.log("Sorry, insuffecient quantity, only " + res[0].stock_quantity + " in stock");
          }
        start();
      })
    });
}