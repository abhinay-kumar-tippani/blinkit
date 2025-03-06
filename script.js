document.addEventListener('DOMContentLoaded', function() {
    // Global cart array to store added products
    let cart = [];
  
    // Update cart count on the cart button
    function updateCartCount() {
      const cartButton = document.getElementById('cart_button');
      cartButton.innerHTML = `<i class="shopping_icon fa-solid fa-cart-shopping"></i> My Cart (${cart.length})`;
    }
  
    // Create the cart modal if it doesn't exist already
    function createCartModal() {
      let modal = document.getElementById('cart_modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cart_modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.display = 'none';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '2000';
  
        const modalContent = document.createElement('div');
        modalContent.id = 'cart_modal_content';
        modalContent.style.backgroundColor = '#fff';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = 'var(--border-radius-md)';
        modalContent.style.width = '80%';
        modalContent.style.maxWidth = '500px';
  
        // Header with title and close button
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
  
        const title = document.createElement('h2');
        title.textContent = 'My Cart';
        title.style.margin = '0';
        header.appendChild(title);
  
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.cursor = 'pointer';
        closeBtn.addEventListener('click', function() {
          modal.style.display = 'none';
        });
        header.appendChild(closeBtn);
        modalContent.appendChild(header);
  
        // Container for cart items
        const itemsContainer = document.createElement('div');
        itemsContainer.id = 'cart_items_container';
        itemsContainer.style.marginTop = '20px';
        modalContent.appendChild(itemsContainer);
  
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
      }
      return modal;
    }
  
    // Render the cart items inside the modal
    function renderCart() {
      const itemsContainer = document.getElementById('cart_items_container');
      itemsContainer.innerHTML = ''; // Clear previous content
  
      if (cart.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'Your cart is empty.';
        itemsContainer.appendChild(emptyMsg);
      } else {
        cart.forEach((item, index) => {
          const itemDiv = document.createElement('div');
          itemDiv.style.borderBottom = '1px solid #ddd';
          itemDiv.style.padding = '10px 0';
  
          const title = document.createElement('h4');
          title.textContent = item.title;
          title.style.margin = '0';
          itemDiv.appendChild(title);
  
          const details = document.createElement('p');
          details.textContent = `${item.weight} - ₹${item.price}`;
          details.style.margin = '5px 0';
          itemDiv.appendChild(details);
  
          // Remove button for each item
          const removeBtn = document.createElement('button');
          removeBtn.textContent = 'Remove';
          removeBtn.style.cursor = 'pointer';
          removeBtn.addEventListener('click', function() {
            cart.splice(index, 1);
            updateCartCount();
            renderCart();
          });
          itemDiv.appendChild(removeBtn);
  
          itemsContainer.appendChild(itemDiv);
        });
      }
    }
  
    // Attach event listeners to all ADD buttons on product cards
    const addButtons = document.querySelectorAll('.mini_card_btn');
    addButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Add a loading effect to the button
        btn.classList.add('loading');
        setTimeout(() => {
          btn.classList.remove('loading');
          // Find the product details within the mini card element
          const miniCard = btn.closest('.mini_card');
          const titleEl = miniCard.querySelector('.mini_card_title');
          const priceEl = miniCard.querySelector('.mini_card_price');
          const weightEl = miniCard.querySelector('.mini_card_weight');
          const imgEl = miniCard.querySelector('.mini_card_image img');
  
          const product = {
            title: titleEl ? titleEl.textContent.trim() : 'Unknown Product',
            price: priceEl ? priceEl.textContent.replace(/[^\d]/g, '') : '0',
            weight: weightEl ? weightEl.textContent.trim() : '',
            image: imgEl ? imgEl.src : ''
          };
  
          // Add the product to the cart and update the cart counter
          cart.push(product);
          updateCartCount();
        }, 500); // simulate loading for 500ms
      });
    });
  
    // When the My Cart button is clicked, show the cart modal
    const cartButton = document.getElementById('cart_button');
    cartButton.addEventListener('click', function() {
      const modal = createCartModal();
      renderCart();
      modal.style.display = 'flex';
    });
  
    // Optional: Event listener for delivery location click
    const deliveryLocation = document.getElementById('delivery_location');
    if (deliveryLocation) {
      deliveryLocation.addEventListener('click', function() {
        alert('Change location functionality coming soon!');
      });
    }
  
    // Additional interactivity can be added below as needed
  });
  