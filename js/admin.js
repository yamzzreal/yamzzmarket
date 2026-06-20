/* =========================
YAMZZ MARKET ADMIN.JS
========================= */

// Data website

let websiteData = null;
let editIndex = null;
let editTestiIndex = null;

function updateDashboard(){

    const totalProducts =
    document.getElementById(
    "totalProducts"
    );

    const totalTestimonials =
    document.getElementById(
    "totalTestimonials"
    );

    if(totalProducts){

        totalProducts.innerText =
        websiteData.products.length;

    }

    if(totalTestimonials){

        totalTestimonials.innerText =
        websiteData.testimonials.length;

    }

}
document.addEventListener(
"DOMContentLoaded",
()=>{

const search =
document.getElementById(
"searchInput"
);

if(search){

search.addEventListener(
"input",
function(){

searchProduct(
this.value
);

});

}

});
// =========================
// LOAD DATA
// =========================

async function loadAdmin() {

websiteData = await getData();

if(!websiteData){

    alert("Gagal mengambil data");
    return;

}

// buat struktur default

if(!websiteData.settings)
websiteData.settings = {};

if(!websiteData.products)
websiteData.products = [];

if(!websiteData.testimonials)
websiteData.testimonials = [];

document.getElementById(
"totalProducts"
).innerText =
websiteData.products.length;

document.getElementById(
"totalTestimonials"
).innerText =
(
websiteData.testimonials || []
).length;

document.getElementById(
"siteName"
).value =
websiteData.settings.site_name || "";

document.getElementById(
"siteWa"
).value =
websiteData.settings.whatsapp || "";

renderAdminProducts();

renderTestimonials();

updateDashboard();

}

// =========================
// RENDER PRODUK
// =========================

function renderAdminProducts(productList = websiteData.products){

const list =
document.getElementById("productList");

list.innerHTML = "";

productList.forEach((product,index)=>{

list.innerHTML += `

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
            ${product.status || "ready"}
        </span>

    </div>

    <div class="product-title">

        ${product.title}

    </div>

    <div class="price-label">

        HARGA

    </div>

    <div class="price">

        Rp ${Number(product.price)
        .toLocaleString("id-ID")}

    </div>

    <div class="product-buttons">

        <button
        class="buy-btn"
        onclick="editProduct(${index})">

            Edit

        </button>

        <button
        class="detail-btn"
        onclick="deleteProduct(${index})">

            Hapus

        </button>

    </div>

</div>

`;

});

}
function searchProduct(keyword){

const filtered = websiteData.products.filter(item =>
    item.title.toLowerCase().includes(keyword.toLowerCase()) ||
    (item.description || "")
.toLowerCase().includes(keyword.toLowerCase())
);

renderAdminProducts(filtered);

}
// =========================
// SIMPAN SETTING
// =========================

async function saveSettings(){

websiteData.settings.site_name =
document.getElementById(
"siteName"
).value;

websiteData.settings.whatsapp =
document.getElementById(
"siteWa"
).value;

await saveData(
    websiteData
);

alert(
    "Pengaturan berhasil disimpan"
);

}

// =========================
// TAMBAH PRODUK
// =========================

async function addProduct(){

const title =
document.getElementById(
"title"
).value;

const description =
document.getElementById(
"description"
).value;

const price =
document.getElementById(
"price"
).value;

const image =
document.getElementById(
"image"
).value;

if(
    !title ||
    !description ||
    !price ||
    !image
){
    alert(
    "Lengkapi semua data"
    );
    return;
}

websiteData.products.push({

    id: Date.now(),

    title,

    description,

    price,

    image,

    status:"READY",

    whatsapp:
    websiteData.settings.whatsapp

});

await saveData(
    websiteData
);

document.getElementById(
"title"
).value = "";

document.getElementById(
"description"
).value = "";

document.getElementById(
"price"
).value = "";

document.getElementById(
"image"
).value = "";

renderAdminProducts();

updateDashboard();

alert(
"Produk berhasil ditambahkan"
);

}

// =========================
// HAPUS PRODUK
// =========================

async function deleteProduct(index){

const confirmDelete =
confirm(
"Hapus produk ini?"
);

if(!confirmDelete)
return;

websiteData.products.splice(
index,
1
);

await saveData(
websiteData
);

renderAdminProducts();

updateDashboard();

}

// =========================
// EDIT PRODUK
// =========================

function editProduct(index){

editIndex = index;

const product = websiteData.products[index];

document.getElementById("editTitle").value = product.title;
document.getElementById("editDesc").value = product.description;
document.getElementById("editPrice").value = product.price;
document.getElementById("editImage").value = product.image;
document.getElementById("editStatus").value = product.status;
const modal = document.getElementById("editModal");
modal.style.display = "flex";

// trigger animasi fade + scale
setTimeout(()=>{
  modal.classList.add("show");
},10);

}

function renderTestimonials(){

const container =
document.getElementById(
"testimoniList"
);

if(!container) return;

container.innerHTML = "";

const testimonials =
websiteData.testimonials || [];

testimonials.forEach((item,index)=>{

container.innerHTML += `

<div class="testi-item">

<img src="${item.image}">

<h3>${item.title}</h3>

<p>${item.desc}</p>

<div class="actions">

<button
class="edit-btn"
onclick="editTestimonial(${index})">

Edit

</button>

<button
class="delete-btn"
onclick="deleteTestimonial(${index})">

Hapus

</button>

</div>

</div>

`;

});

}

async function addTestimonial(){

const title =
document.getElementById(
"testiTitle"
).value;

const desc =
document.getElementById(
"testiDesc"
).value;

const image =
document.getElementById(
"testiImage"
).value;

if(
!title ||
!desc ||
!image
){
alert("Lengkapi data");
return;
}

if(!websiteData.testimonials){
websiteData.testimonials = [];
}

websiteData.testimonials.push({

id: Date.now(),

title,

desc,

image

});

await saveData(
websiteData
);

renderTestimonials();

updateDashboard();

document.getElementById(
"testiTitle"
).value="";

document.getElementById(
"testiDesc"
).value="";

document.getElementById(
"testiImage"
).value="";

alert(
"Testimoni berhasil ditambahkan"
);

}

async function deleteTestimonial(index){

if(
!confirm(
"Hapus testimoni?"
)
)return;

websiteData
.testimonials
.splice(index,1);

await saveData(
websiteData
);

renderTestimonials();

updateDashboard();

}

function editTestimonial(index){

editTestiIndex = index;

const item =
websiteData.testimonials[index];

document.getElementById(
"editTestiTitle"
).value = item.title;

document.getElementById(
"editTestiDesc"
).value = item.desc;

document.getElementById(
"editTestiImage"
).value = item.image;

const modal =
document.getElementById(
"editTestiModal"
);

modal.style.display = "flex";

setTimeout(()=>{

modal.classList.add(
"show"
);

},10);

renderTestimonials();

updateDashboard();
}

async function saveTestimonialEdit(){

websiteData.testimonials[
editTestiIndex
] = {

...websiteData.testimonials[
editTestiIndex
],

title:
document.getElementById(
"editTestiTitle"
).value,

desc:
document.getElementById(
"editTestiDesc"
).value,

image:
document.getElementById(
"editTestiImage"
).value

};

await saveData(
websiteData
);

renderTestimonials();

closeTestimonialModal();

alert(
"Testimoni berhasil diperbarui"
);

}

function closeTestimonialModal(){

const modal =
document.getElementById(
"editTestiModal"
);

modal.classList.remove(
"show"
);

setTimeout(()=>{

modal.style.display =
"none";

},250);

}
// ========================
// SAVE EDIT
// ========================
async function saveEdit(){

websiteData.products[editIndex] = {

    ...websiteData.products[editIndex],

    title: document.getElementById("editTitle").value,
    description: document.getElementById("editDesc").value,
    price: document.getElementById("editPrice").value,
    image: document.getElementById("editImage").value,
    status: document.getElementById("editStatus").value

};

await saveData(websiteData);

renderAdminProducts();

closeModal();

alert("Produk berhasil diperbarui");

}

function closeModal(){

const modal = document.getElementById("editModal");

modal.classList.remove("show");

setTimeout(()=>{
  modal.style.display = "none";
},250);

}
// =========================
// LOGIN CHECK
// =========================

async function checkLogin(){

const isLogin =
localStorage.getItem(
"yamzz_admin"
);

if(
window.location.pathname
.includes("admin.html")
){

    if(!isLogin){

        window.location.href =
        "login.html";

    }

}

}
// =========================
// LOGOUT
// =========================

function logout(){

localStorage.removeItem(
"yamzz_admin"
);

location.href =
"login.html";

}

// =========================

window.addEventListener(
"load",
async ()=>{

await checkLogin();

await loadAdmin();

renderTestimonials();

});
