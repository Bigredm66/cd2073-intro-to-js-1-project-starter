/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
const products = [];
/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/
products.push({
      name : "Cherries",
      price : "4.45",
      quantity : 0,
      productId : 100,
      image : "images/cherry.jpg"
  },
  {
    name : "Oranges",
    price : "5.60",
    quantity : 0,
    productId : 120,
    image : "images/orange.jpg"
  },
  {
    name : "Strawberries",
    price : "9.90",
    quantity : 0,
    productId : 140,
    image : "images/strawberry.jpg"
  },
  {
    name : "Melons",
    price : "14.50",
    quantity : 0,
    productId : 150,
    image : "images/melon.png"
  },
  {
    name : "Bananas",
    price : "3.90",
    quantity : 0,
    productId : 160,
    image : "images/banana.png"
  },
  {
    name : "Pineapples",
    price : "5.20",
    quantity : 0,
    productId : 170,
    image : "images/pineapple.jpg"
  }
);


/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */
const cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function addProductToCart(productId) {
  // Check if productId isn't already in the cart
  let inCart = false;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) { 
      inCart = true;
    }
  });

  
  products.forEach((element) => {
    if (element.productId === productId) {
      element.quantity += 1;   // Add 1 to product qty
      if (inCart === false) {  // If inCart is false the item isn't already there, add to cart
        cart.push(element);
      };
    };
  });
};

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId) {
  products.forEach((element) => {
    if (element.productId === productId) {
      element.quantity += 1;
    };
  });
};
/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(productId) {
  products.forEach((element) => {
    if (element.productId === productId) {
      if (element.quantity-1 === 0) {
        removeProductFromCart(productId);
      }
      else {
        element.quantity -= 1;
      };
    };
  });
};  

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function setProductQtyToZero(productId) {
  products.forEach((element) => {
    if (element.productId === productId) {
      element.quantity = 0;
    };
  });
};

function removeProductFromCart(productId) {
  for (let i = 0; i <= cart.length; i++) {
    if (cart[i].productId === productId) {
      // set product quantity to 0 and then delete the item from the cart
      setProductQtyToZero(productId);
      cart.splice(i,1);
    };
  };
};


/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/
function cartTotal() {
  let totalAmt = 0;
  cart.forEach((element) => {
    totalAmt += element.price * element.quantity;
  });
  return totalAmt;
}
/* Create a function called emptyCart that empties the products from the cart */

function emptyCart() {
  //function to empty all cart items
  cart.forEach((cartItem) => {
    setProductQtyToZero(cartItem.productId);
  });
  cart.splice(0,cart.length);
};

function pay (amount,currencyVal) {
  let retAmount = amount - cartTotal();
  return retAmount;
};

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

function lookupRates(targetCurrency, currentCurrency,) {
  const rates = [];
  rates.push({
      conv: "USDEUR", 
      rate: 0.97
      },
      {
      conv: "USDYEN", 
      rate: 156.28
      },
      {
      conv: "YENUSD", 
      rate: 0.0064
      },
      {
      conv: "YENEUR", 
      rate: 0.0062
      },
      {
      conv: "EURUSD", 
      rate: 1.03
      },
      {
      conv: "EURYEN", 
      rate: 161.04
      }
  );
  
  let targetConversion = currentCurrency + targetCurrency;
  let rate = 0;
  rates.forEach((element) => {
      if (element.conv === targetConversion) {
          rate = element.rate;
      }
  });
  currencyVal = targetCurrency;
  return rate;
};

function convertProductRates(currencyConversionRate,targetCurrency) {
  products.forEach((element) => {
     element.price = (element.price * currencyConversionRate).toFixed(currencyDecPlaces);
  });
};

function currency (targetCurrency) {
  let currencyConversionRate = lookupRates(targetCurrency, currencyVal);
  convertProductRates(currencyConversionRate,targetCurrency);  
};


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    products,
    cart,
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    cartTotal,
    pay, 
    emptyCart,
    currency
  };
} 
