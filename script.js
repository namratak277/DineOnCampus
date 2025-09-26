document.addEventListener("DOMContentLoaded", () => {
const menuItems = document.querySelectorAll(".MenuItem");
const favoritesList = document.getElementById("favoriteslist");
const totalPriceEl = document.getElementById("totalprice");

  const favorites = new Map(); 
    menuItems.forEach(item => {
        const name = item.dataset.name;

        const priceText = item.querySelector(".price").textContent;
        const price = parseFloat(priceText.replace("$", ""));

        const button = document.createElement("button");
        button.textContent = "Add to Favorites";
        button.classList.add("favorite-btn");
        item.appendChild(button);

                button.addEventListener("click", () => {
                const isFavorite = favorites.has(name);

                if (!isFavorite) {
                    favorites.set(name, price);
                    item.classList.add("favorite");
                    button.textContent = "Remove from Favorites";

                    const li = document.createElement("li");
                    li.textContent = `${name} - $${price}`;
                    li.dataset.name = name;
                    favoritesList.appendChild(li);
                } else {
                    favorites.delete(name);
                    item.classList.remove("favorite");
                    button.textContent = "Add to Favorites";

                    const li = favoritesList.querySelector(`li[data-name="${name}"]`);
                    if (li) li.remove();
                }

                updateTotal();
                });
    });

        function updateTotal() {
            let total = 0;
            for (let price of favorites.values()) {
            total += price;
            }
            totalPriceEl.textContent = total;
        }
});
