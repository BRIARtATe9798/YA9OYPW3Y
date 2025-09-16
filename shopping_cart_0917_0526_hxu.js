// 代码生成时间: 2025-09-17 05:26:12
const shoppingCart = {
  // An array to store cart items
  cartItems: [],

  // Adds an item to the cart
  addItem(item) {
    // Check if the item already exists in the cart
    const existingItemIndex = this.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    
    if (existingItemIndex > -1) {
      // If the item exists, increment its quantity
      this.cartItems[existingItemIndex].quantity += item.quantity;
    } else {
      // If the item doesn't exist, add it to the cart
      this.cartItems.push(item);
    }
  },

  // Removes an item from the cart
  removeItem(itemId) {
    // Filter out the item with the specified ID
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
  },

  // Updates the quantity of an item in the cart
  updateItemQuantity(itemId, quantity) {
    // Find the index of the item with the specified ID
    const itemIndex = this.cartItems.findIndex((item) => item.id === itemId);
    
    if (itemIndex > -1) {
      // Update the quantity if the item exists
      if (quantity <= 0) {
        // If the quantity is less than or equal to zero, remove the item from the cart
        this.removeItem(itemId);
      } else {
        this.cartItems[itemIndex].quantity = quantity;
      }
    } else {
      // Handle the error if the item is not found
      console.error('Item not found in the cart');
    }
  },

  // Returns the total number of items in the cart
  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  // Returns the total cost of items in the cart
  getTotalCost() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
};

export default shoppingCart;