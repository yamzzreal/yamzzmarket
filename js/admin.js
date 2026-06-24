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
let allProducts = [];
let currentCategory = "all";

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

allProducts = data.products || [];

generateCategories();

renderProducts(allProducts);

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
// ====================
// FUNCTION buy-btn

function buyProduct(id){

    getData().then(data => {

        const product =
        data.products.find(
        p => String(p.id) === String(id)
        );

        if(!product) return;

        const detailLink =
        `${location.origin}/detail.html?id=${product.id}`;

        const message =

`Halo mas Yamzz 👋

Saya ingin membeli akun berikut:

📌 Nama :
${product.title}

💰 Harga :
Rp ${Number(product.price).toLocaleString("id-ID")}

📝 Spek :
${product.description}

🔗 Link Produk :
${detailLink}

Mohon info ketersediaannya ya 🙏`;

        window.open(
        `https://wa.me/${product.whatsapp}?text=${encodeURIComponent(message)}`
        );

    });

}

async function shareProduct(id){

    const data =
    await getData();

    const product =
    data.products.find(
    p => String(p.id) === String(id)
    );

    if(!product) return;

    const link =
    `https://www.yamzzoffc.my.id/detail.html?id=${product.id}`;

    const text =

`🔥 ${product.title}

💰 Rp ${Number(product.price)
.toLocaleString("id-ID")}

📝 ${product.description}

🔗 ${link}`;

    if(navigator.share){

        navigator.share({

            title: product.title,
            text: text,
            url: link

        });

    }else{

        navigator.clipboard.writeText(link);

        alert("Link produk berhasil disalin");

    }

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

        <button
        class="share-icon"
        onclick="shareProduct('${product.id}')">

            <i class="fa-solid fa-share"></i>

        </button>

    </div>

    <div class="product-top">

        <span class="badge-game">
    ${product.category || "Game"}
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
        onclick="buyProduct('${product.id}')">

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
// KATEGORI PRODUK 
// =========================
function generateCategories() {

const container =
document.getElementById(
"categoryFilter"
);

const categories = [
"all",
...new Set(
allProducts.map(
p => p.category || "Lainnya"
)
)
];

container.innerHTML = "";

categories.forEach(cat => {

const btn =
document.createElement(
"button"
);

btn.className =
"cat-btn";

if(cat === "all")
btn.classList.add(
"active"
);

btn.textContent =
cat === "all"
? "Semua"
: cat;

btn.onclick = () => {

document
.querySelectorAll(".cat-btn")
.forEach(b =>
b.classList.remove(
"active"
)
);

btn.classList.add(
"active"
);

currentCategory = cat;

const filtered =
currentCategory === "all"
? allProducts
: allProducts.filter(
p => p.category === currentCategory
);

renderProducts(filtered);

};

container.appendChild(
btn
);

});

}
// =========================
// CARI PRODUK
// =========================

function searchProduct(keyword){

let filtered =
currentCategory === "all"
? allProducts
: allProducts.filter(
p => p.category === currentCategory
);

filtered = filtered.filter(item =>

(item.title || "")
.toLowerCase()
.includes(keyword.toLowerCase())

||

(item.description || "")
.toLowerCase()
.includes(keyword.toLowerCase())

||

String(item.price)
.includes(keyword)

);

renderProducts(filtered);

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
                   
