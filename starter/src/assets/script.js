let cartAmountRemaining = 0;   // global variable used to track any amounts outstanding in the cart
const products = [];           /* Create an array named products which you will use to add all of your 
                                  product object literals that you create in the next step. */
const cart = [];              // Declare an empty array named cart to hold the items in the cart

products.push({               // Array of all product(s) information
      name : "Cherries",
      price : 4.45,
      quantity : 0,
      productId : 100,
      image : "images/cherry.jpg"
  },
  {
    name : "Oranges",
    price : 5.60,
    quantity : 0,
    productId : 120,
    image : "images/orange.jpg"
  },
  {
    name : "Strawberries",
    price : 9.90,
    quantity : 0,
    productId : 140,
    image : "images/strawberry.jpg"
  },
  {
    name : "Melons",
    price : 14.50,
    quantity : 0,
    productId : 150,
    image : "images/melon.png"
  },
  {
    name : "Bananas",
    price : 3.90,
    quantity : 0,
    productId : 160,
    image : "images/banana.png"
  },
  {
    name : "Pineapples",
    price : 5.20,
    quantity : 0,
    productId : 170,
    image : "images/pineapple.jpg"
  }
);
// Images provided in /images folder. All images from Unsplash.com

/**
* @description Adds a product to the if not present and increase cart qty
* @constructor
* @param {string} productId - The productId of the product 
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

/**
* @description Increases product qty 
* @constructor
* @param {string} productId - The productId of the product 
*/
function increaseQuantity(productId) {
  products.forEach((element) => {
    if (element.productId === productId) {
      element.quantity += 1;
    };
  });
};

/**
* @description Decreases product qty and removes from cart if qty being set to zero
* @constructor
* @param {string} productId - The productId of the product 
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

/**
* @description Sets Product Qty to zero
* @constructor
* @param {string} productId - The productId of the product for qty to be set to zero
*/
function setProductQtyToZero(productId) {
  products.forEach((element) => {
    if (element.productId === productId) {
      element.quantity = 0;
    };
  });
};

/**
* @description Remove a product by cart by setting product qty to 0 and then removing
* @constructor
* @param {string} productId - The productId of the product to be reoved
*/
function removeProductFromCart(productId) {
  for (let i = 0; i <= cart.length; i++) {
    if (cart[i].productId === productId) {
      // set product quantity to 0 and then delete the item from the cart
      setProductQtyToZero(productId);
      cart.splice(i,1);
    };
  };
};

/**
* @description Determine total cost of all products in teh cart
* @constructor
*/
function cartTotal() {
  let totalAmt = 0;
  cart.forEach((element) => {
    totalAmt += element.price * element.quantity;
  });
  return totalAmt;
};

/**
* @description Empty all cart items
* @constructor
*/
function emptyCart() {
  //function to empty all cart items
  cart.forEach((cartItem) => {
    setProductQtyToZero(cartItem.productId);
  });
  cart.splice(0,cart.length);
};

/**
* @description Processes a payment and calculates any amount outstanding or overpaid
* @constructor
* @param {string} amount - The amount tendered by customer
*/
function pay (amount) {
  let retAmount = (amount + cartAmountRemaining) - cartTotal();
  if (retAmount >= 0) {
    cartAmountRemaining = 0;
  } else {
    cartAmountRemaining = retAmount;
  };
  return retAmount;
};

/**
* @description Returns a currency conversion rate
* @constructor
* @param {string} targetCurrency - The currency being converted TO
* @param {string} currentCurrency - The currency being converted FROM
*/
function lookupRates(targetCurrency, currentCurrency,) {
  //rates are sourced from xe.com 30 Jan 2025 UTC 0530
  const rates = [];
  rates.push({
      conv: "USDEUR", 
      rate: 0.95980921
      },
      {
      conv: "USDYEN", 
      rate: 154.59214
      },
      {
      conv: "YENUSD", 
      rate: 0.0064683567
      },
      {
      conv: "YENEUR", 
      rate: 0.0062082366
      },
      {
      conv: "EURUSD", 
      rate: 1.0418992
      },
      {
      conv: "EURYEN", 
      rate: 161.09087
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

/**
* @description Converts product prices from old to new currency
* @constructor
* @param {string} currencyConversionRate - The converson rate for old to target currency
* @param {string} targetCurrency - The currency being converted TO
*/
function convertProductRates(currencyConversionRate,targetCurrency) {
  products.forEach((element) => {
     // element.price = (element.price * currencyConversionRate).toFixed(currencyDecPlaces);
     element.price = (element.price * currencyConversionRate);
  });
};

/**
* @description Controls the currency conversion process
* @constructor
* @param {string} targetCurrency - The currency being converted TO
*/
function currency (targetCurrency) {
  let currencyConversionRate = lookupRates(targetCurrency, currencyVal);
  convertProductRates(currencyConversionRate,targetCurrency);  
  cartAmountRemaining = cartAmountRemaining * currencyConversionRate;
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
