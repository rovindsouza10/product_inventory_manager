
"use strict";

// =========================
// Initial Inventory
// =========================


let inventory = [
    {
        id: 301,
        name: "Ergonomic Office Chair",
        price: 149.99,
        inStock: true,
        tags: ["Furniture", "Office"]
    },
    {
        id: "OFF-302",
        name: "Smart Desk Lamp",
        price: 45.50,
        inStock: true,
        tags: ["Lighting", "Office"]
    },
    {
        id: 303,
        name: "A4 Document Scanner",
        price: 129.00,
        inStock: false,
        tags: ["Office", "Scanner"]
    },
    {
        id: "OFF-304",
        name: "Wireless Presentation Remote",
        price: 32.75,
        inStock: true,
        tags: ["Accessories", "Presentation"]
    }
];


let showOnlyAvailable = false;


// =========================
// Core Functions
// =========================

function getAvailableProducts(products) {
    return products.filter((product) => product.inStock);
}


function removeProduct(productId) {

    inventory = inventory.filter(
        (product) =>
            String(product.id) !== String(productId)
    );

    renderInventory();
}


// =========================
// Render Inventory
// =========================

function renderInventory() {

    const tableBody =
        document.getElementById("inventory-table-body");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    const displayedProducts =
        showOnlyAvailable
            ? getAvailableProducts(inventory)
            : inventory;

    if (displayedProducts.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No products found.
                </td>
            </tr>
        `;

        return;
    }


    displayedProducts.forEach((product) => {

        const row =
            document.createElement("tr");


        // Product Tags
        const tagsHTML =
            product.tags && product.tags.length > 0
                ? product.tags
                    .map(
                        (tag) =>
                            `<span class="tag">${tag}</span>`
                    )
                    .join("")
                : "<em>None</em>";


        // Stock Status
        const statusBadge =
            product.inStock
                ? `<span class="badge badge-success">
                        In Stock
                   </span>`
                : `<span class="badge badge-danger">
                        Out of Stock
                   </span>`;


        // Table Row
        row.innerHTML = `
            <td>
                <strong>${product.id}</strong>
            </td>

            <td>
                ${product.name}
            </td>

            <td>
                $${product.price.toFixed(2)}
            </td>

            <td>
                ${statusBadge}
            </td>

            <td>
                ${tagsHTML}
            </td>

            <td>
                <button
                    class="danger-btn remove-btn"
                    data-id="${product.id}"
                >
                    Remove
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });


    // Remove buttons
    const removeButtons =
        document.querySelectorAll(".remove-btn");


    removeButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            const target = event.target;

            const id =
                target.getAttribute("data-id");

            if (id !== null) {

                const parsedId =
                    !isNaN(Number(id))
                        ? Number(id)
                        : id;

                removeProduct(parsedId);
            }
        });

    });
}


// =========================
// Event Listeners
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.getElementById("product-form");

        const showAllBtn =
            document.getElementById("show-all-btn");

        const showAvailableBtn =
            document.getElementById(
                "show-available-btn"
            );


        // Add Product
        form?.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const idInput =
                    document
                        .getElementById("product-id")
                        .value
                        .trim();


                const nameInput =
                    document
                        .getElementById("product-name")
                        .value
                        .trim();


                const priceInput =
                    parseFloat(
                        document
                            .getElementById("product-price")
                            .value
                    );


                const tagsInput =
                    document
                        .getElementById("product-tags")
                        .value;


                const inStockInput =
                    document
                        .getElementById(
                            "product-instock"
                        )
                        .checked;


                const parsedId =
                    !isNaN(Number(idInput))
                        ? Number(idInput)
                        : idInput;


                // Check duplicate ID
                const exists =
                    inventory.some(
                        (product) =>
                            String(product.id) ===
                            String(parsedId)
                    );


                if (exists) {

                    alert(
                        "A product with this ID already exists."
                    );

                    return;
                }


                // Convert tags
                const parsedTags =
                    tagsInput
                        ? tagsInput
                            .split(",")
                            .map(
                                (tag) => tag.trim()
                            )
                        : [];


                // Create product
                const newProduct = {

                    id: parsedId,

                    name: nameInput,

                    price: priceInput,

                    inStock: inStockInput,

                    tags: parsedTags
                };


                inventory.push(newProduct);

                renderInventory();

                form.reset();
            }
        );


        // Show All
        showAllBtn?.addEventListener(
            "click",
            () => {

                showOnlyAvailable = false;

                showAllBtn.classList.add("active");

                showAvailableBtn.classList.remove(
                    "active"
                );

                renderInventory();
            }
        );


        // Show Available
        showAvailableBtn?.addEventListener(
            "click",
            () => {

                showOnlyAvailable = true;

                showAvailableBtn.classList.add(
                    "active"
                );

                showAllBtn.classList.remove(
                    "active"
                );

                renderInventory();
            }
        );


        // Initial display
        renderInventory();
    }
);
