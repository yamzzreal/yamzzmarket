/* =========================
YAMZZ MARKET ADMIN.JS
========================= */

// Data website

let websiteData = null;
let editIndex = null;

// =========================
// LOAD DATA
// =========================

async function loadAdmin() {

websiteData = await getData();

if(!websiteData){

    alert("Gagal mengambil data");

    return;

}

document.getElementById(
    "siteName"
).value =
websiteData.settings.site_name;

document.getElementById(
    "siteWa"
).value =
websiteData.settings.whatsapp;

renderAdminProducts();

}

// =========================
// RENDER PRODUK
// =========================

function renderAdminProducts(){

const list =
document.getElementById(
    "productList"
);

list.innerHTML = "";

websiteData.products.forEach(
(product,index)=>{

    list.innerHTML += `

    <div class="product-item">

        <h3>
            ${product.title}
        </h3>

        <p>
            Rp ${Number(
            product.price
            ).toLocaleString("id-ID")}
        </p>

        <div class="actions">

            <button
            class="edit-btn"
            onclick="editProduct(${index})">

                Edit

            </button>

            <button
            class="delete-btn"
            onclick="deleteProduct(${index})">

                Hapus

            </button>

        </div>

    </div>

    `;

});

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

    title: title,

    description: description,

    price: price,

    image: image,

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

}); 
