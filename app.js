document.addEventListener("DOMContentLoaded", () => {
    fetch("data/websites.json")
        .then(response => response.json())
        .then(websites => {
            const container = document.getElementById("portfolio-container");
            let htmlCards = ""; 

            // تولید ساختار کارت‌ها به صورت یکپارچه
            websites.forEach(site => {
                htmlCards += `
                    <div class="portfolio-card fade-in-card">
                        <img src="${site.image}" alt="${site.title}" loading="lazy">
                        <div class="portfolio-content">
                            <span class="category">${site.category}</span>
                            <h3>${site.title}</h3>
                            <p>${site.description}</p>
                            <div class="price">${site.price}</div>
                            <div class="buttons">
                                <a href="${site.demo}" target="_blank" rel="noopener noreferrer">مشاهده دمو</a>
                                <a href="#order">سفارش مشابه</a>
                            </div>
                        </div>
                    </div>
                `;
            });

            container.innerHTML = htmlCards;

            // اجرای انیمیشن نرم هنگام اسکرول و رسیدن به کارت‌ها
            setupScrollAnimations();
        })
        .catch(error => console.error("خطا در بارگذاری اطلاعات:", error));
});

// تابع مدیریت انیمیشن ظهور کارت‌ها
function setupScrollAnimations() {
    const cards = document.querySelectorAll('.fade-in-card');
    
    const observerOptions = {
        threshold: 0.1, // وقتی ۱۰٪ کارت دیده شد انیمیشن شروع شود
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // برای اینکه انیمیشن فقط یکبار اجرا شود
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}
// اسکریپت فعال‌سازی منوی همبرگری
const hamburgerToggle = document.getElementById('hamburger-toggle');
const navMenu = document.getElementById('nav-menu');

if (hamburgerToggle && navMenu) {
    hamburgerToggle.addEventListener('click', () => {
        // فعال کردن افکت دکمه به X و باز شدن باکس منو
        hamburgerToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // بستن خودکار منو پس از کلیک روی هر کدام از لینک‌ها
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerToggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
}
