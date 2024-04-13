//Click add
const btnAddCart = document.querySelectorAll(".addcart");
//Add to Cart
btnAddCart.forEach(button => {
    button.addEventListener("click", function (event) {
        const productContainer = event.target.closest(".product__item");
        const productName = productContainer.querySelector("h6").innerText;
        const productPrice = parseFloat(productContainer.querySelector("h5").innerText.replace("$", ""));
        const productImage = productContainer.querySelector("img").getAttribute("src");


        // Hỏi người dùng trước khi thêm vào giỏ hàng
        const userConfirmed = confirm(`Bạn có muốn thêm sản phẩm "${productName}" vào giỏ hàng không?`);
        const randomId = Math.floor(Math.random() * 999);

        // Nếu người dùng đã xác nhận, thêm sản phẩm vào giỏ hàng
        if (userConfirmed) {
            // Thêm sản phẩm vào giỏ hàng
            const product = { id: randomId,image: productImage,name: productName, price: productPrice, quantity: 1 };

            cartItems.push(product);

            // Lưu giỏ hàng vào localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            alert('Sản phẩm đã được thêm vào giỏ hàng');
            console.log(cartItems);
        }
        else {
            // Người dùng đã từ chối, không thêm sản phẩm vào giỏ hàng
            console.log('Người dùng đã từ chối thêm sản phẩm vào giỏ hàng');
        }
    });
});

