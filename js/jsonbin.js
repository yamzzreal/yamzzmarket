/* =========================
YAMZZ MARKET JSONBIN.JS
========================= */

// GANTI DENGAN DATA JSONBIN KAMU

const BIN_ID = "6a32e7b9da38895dfed22d14";
const API_KEY = "$2a$10$QQTsW9lEiJrPCaC7VKkgH.SF8xR/Gn2/LbQ6lGp4yKxAFU9PsdCu.";

const API_URL =
`https://api.jsonbin.io/v3/b/${BIN_ID}`;

// =========================
// AMBIL DATA
// =========================

async function getData() {

try {

    const response = await fetch(API_URL + "/latest", {
        method: "GET",
        headers: {
            "X-Master-Key": API_KEY
        }
    });

    const result = await response.json();

    return result.record;

} catch(error) {

    console.error(
        "Gagal mengambil data",
        error
    );

    return null;
}

}

// =========================
// SIMPAN DATA
// =========================

async function saveData(data) {

try {

    const response = await fetch(API_URL, {

        method: "PUT",

        headers: {
            "Content-Type":
            "application/json",

            "X-Master-Key":
            API_KEY
        },

        body: JSON.stringify(data)

    });

    return await response.json();

} catch(error) {

    console.error(
        "Gagal menyimpan data",
        error
    );

    return null;

}

}

// =========================
// LOAD WEBSITE
// =========================

async function loadWebsite() {

const data = await getData();

if(!data) return;

// Nama Toko

const title =
document.getElementById("site-name");

if(title){
    title.innerText =
    data.settings.site_name;
}

// Produk

renderProducts(
    data.products || []
);

}

window.addEventListener(
"load",
loadWebsite
);

function renderStatus(status) {
    return status === "sold"
        ? `<span style="color:red;font-weight:bold;">SOLD</span>`
        : `<span style="color:lime;font-weight:bold;">READY</span>`;
}
// =========================
// RENDER PRODUK
// =========================

function renderProducts(products){

const container =
document.getElementById("products");

if(!container) return;

container.innerHTML = "";

products.forEach(product => {

    container.innerHTML += `

<div class="product">

    <div class="product-image">

        <img
        src="${product.image}"
        alt="${product.title}">

    </div>

    <div class="product-top">

        <span class="badge-game">
            Free Fire
        </span>

        <span class="badge-ready">
            ${product.status}
        </span>

    </div>

    <div class="product-title">

        ${product.title}

    </div>

    <div class="price-label">

        HARGA

    </div>

    <div class="price">

        Rp ${Number(
        product.price
        ).toLocaleString("id-ID")}

    </div>

    <div class="product-buttons">

         <button
        class="buy-btn"
        onclick="
        window.open(
        'https://wa.me/${product.whatsapp}?text=Hallo mas yamzz saya mau beli akun ${product.title} spek ${product.description} harga Rp ${Number(
        product.price
        ).toLocaleString("id-ID")}'
        )">

        Beli

        </button>

        <button
class="detail-btn"
onclick="
window.location.href=
'detail.html?id=${product.id}'
">

Detail

</button>

    </div>

</div>

`;

});

}

// =========================
// CARI PRODUK
// =========================

async function searchProduct(keyword){

const data = await getData();

if(!data) return;

const products =
data.products.filter(item =>

    item.description
    .toLowerCase()
    .includes(
        keyword.toLowerCase()
    ) ||
    item.price
    .toLowerCase()
    .includes(
        keyword.toLowerCase()
    )
);

renderProducts(products);

}

// =========================
// EVENT SEARCH
// =========================

document.addEventListener(
"DOMContentLoaded",
() => {

const search =
document.querySelector(".search");

if(search){

search.addEventListener(
"input",
(e) => {

searchProduct(
e.target.value
);

});

}

});
