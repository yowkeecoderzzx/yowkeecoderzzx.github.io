document.addEventListener('DOMContentLoaded', function () {
    const cartCountSpan = document.querySelector('.sidebar .cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    function getCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cart = getCart();
        let count = 0;
        for (const item of cart) {
            count += item.qty;
        }
        if (cartCountSpan) {
            cartCountSpan.textContent = `Cart (${count})`;
        }
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));

            let cart = getCart();
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cart.push({
                    id: id,
                    name: name,
                    desc: '',
                    price: price,
                    qty: 1
                });
            }

            saveCart(cart);
            updateCartCount();
            alert(`${name} ay nadagdag sa cart.`);
        });
    });

    updateCartCount();
});
