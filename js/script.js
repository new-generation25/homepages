// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// Tour booking modal functions
function openBookingModal(tourId) {
    const modal = document.getElementById('bookingModal');
    const tourNameInput = document.getElementById('tourName');
    
    const tourNames = {
        'hallasan': '한라산 성판악 코스 트레킹',
        'udo': '우도 섬 관광 투어',
        'seongsan': '성산일출봉 일출 투어',
        'olle': '제주 올레길 7코스 걷기'
    };
    
    if (tourNameInput && tourNames[tourId]) {
        tourNameInput.value = tourNames[tourId];
    }
    
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Tour booking form submission
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const bookingData = {
                tourName: document.getElementById('tourName').value,
                bookingDate: document.getElementById('bookingDate').value,
                participants: document.getElementById('participants').value,
                customerName: document.getElementById('customerName').value,
                customerPhone: document.getElementById('customerPhone').value,
                customerEmail: document.getElementById('customerEmail').value,
                specialRequests: document.getElementById('specialRequests').value
            };
            
            // Simulate booking process
            alert('예약이 접수되었습니다. 확인 후 연락드리겠습니다.');
            closeBookingModal();
            bookingForm.reset();
        });
    }
});

// Shopping cart functionality
let cart = [];

function addToCart(productId) {
    const products = {
        'hallabong': { name: '제주 한라봉 선물세트', price: 35000 },
        'dolhareubang': { name: '돌하르방 미니어처', price: 18000 },
        'honey': { name: '제주 천연 벌꿀', price: 28000 },
        'pork-jerky': { name: '제주 흑돼지 육포', price: 25000 },
        'green-tea': { name: '제주 유기농 녹차', price: 22000 },
        'chocolate': { name: '제주 감귤 초콜릿', price: 15000 }
    };
    
    const product = products[productId];
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        
        updateCartCount();
        showCartNotification(product.name);
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function showCartNotification(productName) {
    // Simple notification - you could enhance this with a proper notification system
    alert(`${productName}이(가) 장바구니에 추가되었습니다.`);
}

// Add event listeners for add to cart buttons
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            addToCart(productId);
        });
    });
    
    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCartModal);
    }
});

function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        displayCartItems();
        modal.style.display = 'block';
    }
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalAmountElement = document.getElementById('totalAmount');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">장바구니가 비어있습니다.</p>';
        if (totalAmountElement) {
            totalAmountElement.textContent = '0원';
        }
        return;
    }
    
    let cartHTML = '';
    let totalAmount = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>가격: ${item.price.toLocaleString()}원</p>
                <p>수량: ${item.quantity}개</p>
                <p>소계: ${itemTotal.toLocaleString()}원</p>
                <button onclick="removeFromCart('${item.id}')" class="btn btn-secondary">제거</button>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    if (totalAmountElement) {
        totalAmountElement.textContent = totalAmount.toLocaleString() + '원';
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCartItems();
}

function checkout() {
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        return;
    }
    
    alert('주문이 접수되었습니다. 결제 페이지로 이동합니다.');
    cart = [];
    updateCartCount();
    closeCartModal();
}

// News category filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter news cards
            newsCards.forEach(card => {
                const cardCategory = card.querySelector('.category');
                if (selectedCategory === 'all' || 
                    (cardCategory && cardCategory.textContent.includes(getCategoryText(selectedCategory)))) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

function getCategoryText(category) {
    const categoryMap = {
        'events': '행사/축제',
        'attractions': '명소',
        'food': '맛집',
        'tips': '여행팁'
    };
    return categoryMap[category] || category;
}

// Newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`${email}로 뉴스레터 구독이 완료되었습니다.`);
            this.reset();
        });
    }
});

// Modal close functionality
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking the X button
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Filter functionality for tours and products
document.addEventListener('DOMContentLoaded', function() {
    const tourTypeFilter = document.getElementById('tourType');
    const durationFilter = document.getElementById('duration');
    const categoryFilter = document.getElementById('category');
    const priceRangeFilter = document.getElementById('priceRange');
    
    // Tour filters
    if (tourTypeFilter) {
        tourTypeFilter.addEventListener('change', filterTours);
    }
    if (durationFilter) {
        durationFilter.addEventListener('change', filterTours);
    }
    
    // Product filters
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    if (priceRangeFilter) {
        priceRangeFilter.addEventListener('change', filterProducts);
    }
});

function filterTours() {
    // This would contain actual filtering logic for tours
    // For now, it's a placeholder
    console.log('Filtering tours...');
}

function filterProducts() {
    // This would contain actual filtering logic for products
    // For now, it's a placeholder
    console.log('Filtering products...');
}