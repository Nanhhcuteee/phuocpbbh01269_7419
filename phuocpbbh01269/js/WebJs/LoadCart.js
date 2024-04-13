document.addEventListener('DOMContentLoaded', function () {
    // Lấy dữ liệu từ localStorage
    var cartProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.querySelector(".cart-body");
    const cartTotalProduct = document.querySelector(".cart__total");

    // Hàm để cập nhật localStorage và giao diện khi xóa sản phẩm
    function removeFromCart(productId) {
        cartProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
        // Cập nhật giao diện
        const productToRemove = document.querySelector(`tr[data-id="${productId}"]`);
        if (productToRemove) {
            productToRemove.remove();
        }

        // Cập nhật lại localStorage
        let filteredItems = cartProducts.filter(item => item.id !== productId);
        localStorage.setItem('cartItems', JSON.stringify(filteredItems));


        // Cập nhật tổng giá trị
        let totalPrice = 0;
        filteredItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        const totalPriceElement = document.querySelector(".cart__total span");
        if (totalPriceElement) {
            totalPriceElement.textContent = `${totalPrice}$`;
        }

    }
    // Lặp qua mỗi sản phẩm và tạo HTML để hiển thị chúng
    cartProducts.forEach(product => {
        const productCartHTML = `
            <tr data-id="${product.id}">           
                <td class="product__cart__item">
                    <div class="product__cart__item__pic">
                        <img src="${product.image}" alt="" width="130">
                    </div>
                </td>
                <td class="product__cart__item">
                    <div class="product__cart__item__text">
                        <h6>${product.name}</h6>     
                    </div>
                </td> 
                <td class="quantity__item">
                    <div class="quantity">
                        <div class="pro-qty-2">
                            <input type="text" value="${product.quantity}">
                        </div>
                    </div>
                </td>
                <td class="cart__price">${product.price}$</td>
                <!--Nút xóa sản phẩm khỏi giỏ hàng-->
                <td class="cart__close"><i class="fa fa-close"></i></td>
            </tr>
        `;
        // Thêm HTML của sản phẩm vào trong container sản phẩm
        cartContainer.innerHTML += productCartHTML;
    });

    // Lắng nghe sự kiện click trên nút xóa sản phẩm
    cartContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('fa-close')) {
            if (confirm("Are you sure you want to remove this product from your cart ?")) {
                // Lấy id của sản phẩm cần xóa
                const productId = parseInt(event.target.closest('tr').dataset.id);
                removeFromCart(productId);
            }
        }
    });

    //Tính giá Total
    let totalPrice = 0;
    cartProducts.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    const productTotalHTML = `
        <h6>Cart total</h6>
        <div class="checkout__input">
            <input placeholder="Name" style="width: 280px;margin-bottom: 10px"/>
        </div>
        <div class="checkout__input">
            <input placeholder="Phone" style="width: 280px;margin-bottom: 10px"/>
        </div>
        <div class="checkout__input">
            <input placeholder="Email" style="width: 280px;margin-bottom: 10px"/>
        </div>
        <div class="checkout__input">
            <input placeholder="Address" style="width: 280px;margin-bottom: 10px"/>
        </div>
        <ul>                         
            <li>Total <span>${totalPrice}$</span></li>
        </ul>
        <a href="#"  class="primary-btn">Checkout</a>
        `;
    // Thêm HTML của sản phẩm vào trong container sản phẩm
    cartTotalProduct.innerHTML += productTotalHTML;

    // Lắng nghe sự kiện click trên nút Checkout
    const checkoutButton = document.querySelector(".primary-btn");
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function (event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của nút

            // Kiểm tra nếu tổng giá trị lớn hơn 0 và tất cả các trường form không rỗng
            const totalPrice = parseFloat(document.querySelector(".cart__total span").textContent);
            const nameInput = document.querySelector('input[placeholder="Name"]').value;
            const phoneInput = document.querySelector('input[placeholder="Phone"]').value;
            const emailInput = document.querySelector('input[placeholder="Email"]').value;
            const addressInput = document.querySelector('input[placeholder="Address"]').value;

            if (totalPrice > 0 && nameInput && phoneInput && emailInput && addressInput) {
                if (confirm("Do you want checkout ?")) {
                    localStorage.removeItem('cartItems');
                    document.querySelector('input[placeholder="Name"]').value = '';
                    document.querySelector('input[placeholder="Phone"]').value = '';
                    document.querySelector('input[placeholder="Email"]').value = '';
                    document.querySelector('input[placeholder="Address"]').value = '';
                    window.location.href = "blog-details.html";
                }
            } else {
                alert("Please fill in the information and have the product in the cart to proceed with the checkout.");
            }
        });
    }
});

