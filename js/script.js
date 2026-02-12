// Shopping Cart Array
let cart = [];

// Add to Cart Function
function addToCart(name, brand, price, image) {
    const item = {
        name: name,
        brand: brand,
        price: price,
        image: image
    };

    cart.push(item);
    updateCartCount();

    // Animation effect
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.animation = 'none';
    setTimeout(() => {
        cartBtn.style.animation = 'pulse 0.5s';
    }, 10);

    // Success notification
    showNotification('✅ Added to cart!');
}

// Update Cart Count
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

// Open Cart
function openCart() {
    const cartContent = document.getElementById('cartContent');

    if (cart.length === 0) {
        cartContent.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    } else {
        let total = 0;
        let itemsHTML = '<div class="cart-items">';

        cart.forEach((item, index) => {
            total += item.price;
            itemsHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-brand">${item.brand}</div>
                    </div>
                    <div class="cart-item-price">${item.price} EGP</div>
                    <button class="remove-item-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });

        itemsHTML += '</div>';

        itemsHTML += `
            <div class="cart-total">
                <h3>Total Amount</h3>
                <div class="total-price">${total} EGP</div>
            </div>
            <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
        `;

        cartContent.innerHTML = itemsHTML;
    }

    document.getElementById('cartModal').classList.add('active');
}

// Close Cart
function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    openCart(); // Refresh cart display
}

// Proceed to Checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    closeCart();
    document.getElementById('checkoutModal').classList.add('active');
}

// Close Checkout
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// Submit Order
function submitOrder(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        email: document.getElementById('customerEmail').value,
        governorate: document.getElementById('governorate').value,
        address: document.getElementById('address').value,
        notes: document.getElementById('notes').value
    };

    // Create order items list
    let orderItems = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        orderItems += `${index + 1}. ${item.name} - ${item.brand} - ${item.price} EGP\n`;
    });

    const message = `
🌟 *New Order from Watd Store* 🌟

👤 *Customer Info:*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'Not provided'}

🛒 *Order Items:*
${orderItems}

💰 *Total: ${total} EGP*

📍 *Delivery Info:*
Governorate: ${formData.governorate}
Address: ${formData.address}

📝 *Notes:* ${formData.notes || 'None'}

---
Thank you for your order! 🙏
    `;

    const whatsappURL = `https://wa.me/201288717913?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    // Clear cart and close modals
    cart = [];
    updateCartCount();
    closeCheckout();

    // Show success message
    document.getElementById('successMessage').classList.add('active');

    setTimeout(() => {
        document.getElementById('successMessage').classList.remove('active');
    }, 4000);

    // Reset form
    document.getElementById('checkoutForm').reset();
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #d4af37 0%, #c9a961 100%);
        color: #0a1628;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: bold;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
