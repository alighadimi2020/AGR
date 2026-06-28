fetch("data/websites.json")
    .then(response => response.json())
    .then(websites => {

        const container = document.getElementById("portfolio-container");

        websites.forEach(site => {

            container.innerHTML += `

                <div class="portfolio-card">

                    <img src="${site.image}" alt="${site.title}">

                    <div class="portfolio-content">

                        <span class="category">
                            ${site.category}
                        </span>

                        <h3>
                            ${site.title}
                        </h3>

                        <p>
                            ${site.description}
                        </p>

                        <div class="price">

                            ${site.price}

                        </div>

                        <div class="buttons">

                            <a href="${site.demo}" target="_blank">

                                مشاهده دمو

                            </a>

                            <a href="#order">

                                سفارش مشابه

                            </a>

                        </div>

                    </div>

                </div>

            `;

        });

    });
