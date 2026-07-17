
let roomCount = 0;

const roomsContainer = document.getElementById("roomsContainer");
const addRoomBtn = document.getElementById("addRoomBtn");

addRoomBtn?.addEventListener("click", addRoom);
document.getElementById("resetBtn")?.addEventListener("click", ()=>location.reload());

function addRoom(){
  roomCount++;
  const room=document.createElement("div");
  room.className="room-card";
  room.innerHTML=`
    <h3>Room ${roomCount}</h3>
    <div class="action-buttons">
      <button onclick="addWall(this)">+ Add Wall</button>
      <button onclick="addCeiling(this)">+ Add Ceiling</button>
      <button onclick="this.closest('.room-card').remove();calculateTotals()">Delete Room</button>
    </div>
    <div class="walls"></div>
    <div class="ceilings"></div>`;
  roomsContainer.appendChild(room);
}

function addWall(btn){

const walls = btn.closest(".room-card").querySelector(".walls");

const card = document.createElement("div");

card.className = "wall-card";

card.innerHTML = `

<h4>Wall</h4>

<label>Length (ft)</label>
<input type="number" placeholder="Length" oninput="calculateTotals()">

<label>Height (ft)</label>
<input type="number" placeholder="Height" oninput="calculateTotals()">

<p><strong>Area :
<span class="wallArea">0</span> sqft</strong></p>

<label>Material</label>

<select class="ceilingMaterial" onchange="updateMaterialPrice(this)">

<option value="">Select Material</option>

<option value="80">PVC Panel (₹80/sqft)</option>

<option value="130">Fluted Panel (₹130/sqft)</option>

<option value="150">ART Panel (₹150/sqft)</option>

<option value="140">WPC Panel (₹140/sqft)</option>

<option value="60">Gypsum Board (₹60/sqft)</option>

<option value="40">Thermocol (₹40/sqft)</option>

</select>

<label>Material Price (₹/sqft)</label>

<input
type="number"
class="materialPrice"
<label>Panel Size</label>

<select class="panelSize" onchange="calculateTotals()">

<option value="16">8 × 2 ft (16 sqft)</option>

<option value="20">10 × 2 ft (20 sqft)</option>

<option value="0">Custom Panel</option>

</select>

<div class="customPanel" style="display:none;">

<input type="number"
class="panelLength"
placeholder="Panel Length"
oninput="calculateTotals()">

<input type="number"
class="panelWidth"
placeholder="Panel Width"
oninput="calculateTotals()">

</div>

<p>

Estimated Panels :

<input
type="number"
class="estimatedPanels"
readonly>

</p>

<p>

Final Panels :

<input
type="number"
class="finalPanels"
oninput="calculateTotals()">

</p>

<label>Upload Wall Image</label>

<input type="file"
accept="image/*"
class="wallImage"
onchange="previewImage(this)">

<img class="imagePreview"
style="display:none;width:180px;margin-top:10px;border-radius:10px;">

<label>Notes</label>

<textarea
rows="3"
placeholder="Write notes about this wall..."></textarea>

<button onclick="this.parentElement.remove();calculateTotals()">

Delete Wall

</button>

`;

walls.appendChild(card);

}

function addCeiling(btn){

const ceilings = btn.closest(".room-card").querySelector(".ceilings");

const card = document.createElement("div");

card.className = "ceiling-card";

card.innerHTML = `

<h4>Ceiling</h4>

<label>Length (ft)</label>
<input type="number" class="cLength" placeholder="Length" oninput="calculateTotals()">

<label>Width (ft)</label>
<input type="number" class="cWidth" placeholder="Width" oninput="calculateTotals()">

<p><strong>Plane Ceiling :
<span class="ceilingAreaValue">0</span> sqft</strong></p>

<label>Material</label>

<select class="ceilingMaterial" onchange="updateMaterialPrice(this)">

<option value="">Select Material</option>

<option value="80">PVC Panel (₹80/sqft)</option>

<option value="130">Fluted Panel (₹130/sqft)</option>

<option value="150">ART Panel (₹150/sqft)</option>

<option value="140">WPC Panel (₹140/sqft)</option>

<option value="60">Gypsum Board (₹60/sqft)</option>

<option value="40">Thermocol (₹40/sqft)</option>

</select>

<label>Material Price (₹/sqft)</label>

<input
type="number"
class="materialPrice"
placeholder="Price"
oninput="calculateTotals()">

<label>Panel Size</label>

<select class="panelSize" onchange="calculateTotals()">

<option value="16">8 × 2 ft (16 sqft)</option>

<option value="20">10 × 2 ft (20 sqft)</option>

<option value="0">Custom Panel</option>

</select>

<div class="customPanel" style="display:none;">

<input type="number"
class="panelLength"
placeholder="Panel Length"
oninput="calculateTotals()">

<input type="number"
class="panelWidth"
placeholder="Panel Width"
oninput="calculateTotals()">

</div>

<p>

Estimated Panels :

<input
type="number"
class="estimatedPanels"
readonly>

</p>

<p>

Final Panels :

<input
type="number"
class="finalPanels"
oninput="calculateTotals()">

</p>

<hr>

<label>

<input type="checkbox"
class="borderCheck"
onchange="calculateTotals()">

Add Border

</label>

<div class="borderSection" style="display:none;">

<label>Border Width (ft)</label>

<input
type="number"
class="borderWidth"
placeholder="Example : 1.5"
step="0.1"
oninput="calculateTotals()">

<p>

Border Sqft :

<span class="borderArea">0</span>

</p>

<label>Design Name</label>

<input
type="text"
placeholder="Example : Diamond Design">

<label>Extra Design Sqft</label>

<input
type="number"
class="designSqft"
placeholder="Enter manually"
oninput="calculateTotals()">

<label>Upload Ceiling Image</label>

<input
type="file"
accept="image/*"
onchange="previewImage(this)">

<img
class="imagePreview"
style="display:none;width:180px;margin-top:10px;border-radius:10px;">

</div>

<p>

<strong>

<label>Notes</label>

<textarea
class="ceilingNotes"
rows="4"
placeholder="Example:
• Use warm white LED
• Customer selected WPC Walnut
• Hidden strip light required
• Border design with diamond center">
</textarea>

Grand Ceiling Sqft :

<span class="grandCeiling">0</span>

</strong>

</p>

<button
onclick="this.parentElement.remove();calculateTotals()">

Delete Ceiling

</button>

`;

ceilings.appendChild(card);

const check = card.querySelector(".borderCheck");

const section = card.querySelector(".borderSection");

check.addEventListener("change",()=>{

section.style.display =
check.checked ? "block" : "none";

calculateTotals();

});

}

function calculateTotals(){
  let wallTotal=0, ceilingTotal=0;
document.querySelectorAll(".wall-card").forEach(c=>{

    const i = c.querySelectorAll("input");

    const area =
    (parseFloat(i[0].value)||0) *
    (parseFloat(i[1].value)||0);

    c.querySelector(".wallArea").textContent =
    area.toFixed(2);

    const materialPrice =
    parseFloat(c.querySelector(".materialPrice").value) || 0;

    const materialCost = area * materialPrice;

    let cost = c.querySelector(".materialCost");

    if(!cost){

        cost = document.createElement("p");

        cost.className = "materialCost";

        c.appendChild(cost);

    }

    cost.innerHTML =
    "<strong>Material Cost : ₹ " +
    materialCost.toFixed(2) +
    "</strong>";
let panel =
parseFloat(c.querySelector(".panelSize").value);

if(panel==0){

const l =
parseFloat(c.querySelector(".panelLength").value)||0;

const w =
parseFloat(c.querySelector(".panelWidth").value)||0;

panel=l*w;

}

const estimated =
panel>0 ? Math.ceil(area/panel) : 0;

c.querySelector(".estimatedPanels").value =
estimated;

if(c.querySelector(".finalPanels").value==""){

c.querySelector(".finalPanels").value=
estimated;

}
    wallTotal += area;

});
document.querySelectorAll(".ceiling-card").forEach(card=>{

const length =
parseFloat(card.querySelector(".cLength").value)||0;

const width =
parseFloat(card.querySelector(".cWidth").value)||0;

const plane = length * width;

card.querySelector(".ceilingAreaValue").textContent =
plane.toFixed(2);

let total = plane;

if(card.querySelector(".borderCheck").checked){

const border =
parseFloat(card.querySelector(".borderWidth").value)||0;

const borderSqft =
(length*border)*2 +
(width*border)*2;

card.querySelector(".borderArea").textContent =
borderSqft.toFixed(2);

total += borderSqft;

const design =
parseFloat(card.querySelector(".designSqft").value)||0;

total += design;

}else{

card.querySelector(".borderArea").textContent = 0;
}
card.querySelector(".grandCeiling").textContent =
total.toFixed(2);

// Material Price
const materialPrice =
parseFloat(card.querySelector(".materialPrice").value) || 0;

// Material Cost
const materialCost = total * materialPrice;

// Create Material Cost label only once
let cost = card.querySelector(".materialCost");

if(!cost){

cost = document.createElement("p");

cost.className = "materialCost";

card.appendChild(cost);

}

cost.innerHTML =
"<strong>Material Cost : ₹ " +
materialCost.toFixed(2) +
"</strong>";
let panel =
parseFloat(card.querySelector(".panelSize").value);

if(panel==0){

const l =
parseFloat(card.querySelector(".panelLength").value)||0;

const w =
parseFloat(card.querySelector(".panelWidth").value)||0;

panel=l*w;

}

const estimated =
panel>0 ? Math.ceil(total/panel) : 0;

card.querySelector(".estimatedPanels").value =
estimated;

if(card.querySelector(".finalPanels").value==""){

card.querySelector(".finalPanels").value=
estimated;

}
ceilingTotal += total;

});
  document.getElementById("wallArea").textContent=wallTotal.toFixed(2);
  document.getElementById("ceilingArea").textContent=ceilingTotal.toFixed(2);
  const net=wallTotal+ceilingTotal;
  document.getElementById("netArea").textContent=net.toFixed(2);
  let panel=parseFloat(document.getElementById("panelSize").value);
  if(isNaN(panel)) panel=16;
  const panelCount=Math.ceil(net/panel);
  document.getElementById("panelCount").textContent=panelCount;
  const waste=parseFloat(document.getElementById("wastage").value)||0;
  document.getElementById("finalPanels").textContent=Math.ceil(panelCount*(1+waste/100));
  //================ COST ESTIMATION ================

let wallHTML = "";
let ceilingHTML = "";

let materialTotal = 0;
document.getElementById("wallCostList").innerHTML = "";
document.getElementById("ceilingCostList").innerHTML = "";

// WALLS

document.querySelectorAll(".wall-card").forEach((card,index)=>{

const area =
parseFloat(card.querySelector(".wallArea").textContent)||0;

const material =
card.querySelector(".ceilingMaterial").selectedOptions[0].text;

const price =
parseFloat(card.querySelector(".materialPrice").value)||0;

const amount =
area*price;
if(area > 0 && price > 0){
document.getElementById("wallCostList").innerHTML += `
<div style="margin:10px 0;padding:10px;border:1px solid #555;border-radius:8px;">
<b>Wall ${index+1}</b><br>
Material : ${material}<br>
Area : ${area.toFixed(2)} sqft<br>
Price : ₹${price}/sqft<br>
<b>Amount : ₹${amount.toFixed(2)}</b>
</div>`;
}

materialTotal+=amount;

wallHTML+=`

<div style="margin-bottom:15px;
padding:10px;
border:1px solid #555;
border-radius:8px;">

<b>Wall ${index+1}</b><br>

Material : ${material}<br>

Area : ${area.toFixed(2)} sqft<br>

Price : ₹${price}/sqft<br>

<b>Amount : ₹${amount.toFixed(2)}</b>

</div>

`;

});

// CEILINGS

document.querySelectorAll(".ceiling-card").forEach((card,index)=>{

const area =
parseFloat(card.querySelector(".grandCeiling").textContent)||0;

const material =
card.querySelector(".ceilingMaterial").selectedOptions[0].text;

const price =
parseFloat(card.querySelector(".materialPrice").value)||0;

const amount =
area*price;
if(area > 0 && price > 0){
document.getElementById("ceilingCostList").innerHTML += `
<div style="margin:10px 0;padding:10px;border:1px solid #555;border-radius:8px;">
<b>Ceiling ${index+1}</b><br>
Material : ${material}<br>
Area : ${area.toFixed(2)} sqft<br>
Price : ₹${price}/sqft<br>
<b>Amount : ₹${amount.toFixed(2)}</b>
</div>`;
}
materialTotal+=amount;

ceilingHTML+=`

<div style="margin-bottom:15px;
padding:10px;
border:1px solid #555;
border-radius:8px;">

<b>Ceiling ${index+1}</b><br>

Material : ${material}<br>

Area : ${area.toFixed(2)} sqft<br>

Price : ₹${price}/sqft<br>

<b>Amount : ₹${amount.toFixed(2)}</b>

</div>

`;

});

document.getElementById("materialTotal").textContent =
materialTotal.toFixed(2);

const other =
parseFloat(document.getElementById("otherCharges").value)||0;

const discount =
parseFloat(document.getElementById("discount").value)||0;

const grand =
materialTotal + other - discount;

document.getElementById("grandTotal").textContent =
grand.toFixed(2);
}
function previewImage(input){

const file = input.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

const preview = input.nextElementSibling;

preview.src = e.target.result;

preview.style.display = "block";

};

reader.readAsDataURL(file);

}
function updateMaterialPrice(select){

const priceInput =
select.parentElement.querySelector(".materialPrice");

priceInput.value = select.value;

calculateTotals();

}
document.addEventListener("change",function(e){

if(e.target.classList.contains("panelSize")){

const box =
e.target.parentElement.querySelector(".customPanel");

box.style.display =
e.target.value=="0" ? "block" : "none";

calculateTotals();

}

});
document.getElementById("agreementBtn").addEventListener("click", generateAgreement);
document.getElementById("pdfBtn")?.addEventListener("click", downloadPDF);
function generateAgreement(){

const customer=document.getElementById("customerName").value;
const phone=document.getElementById("customerPhone").value;
const project=document.getElementById("projectName").value;
const date=document.getElementById("projectDate").value;
const address=document.getElementById("projectAddress").value;

const dealer=document.getElementById("dealerName").value;
const dealerPhone=document.getElementById("dealerPhone").value;

const wallArea=document.getElementById("wallArea").textContent;
const ceilingArea=document.getElementById("ceilingArea").textContent;
const netArea=document.getElementById("netArea").textContent;

const materialTotal=document.getElementById("materialTotal").textContent;
const other=document.getElementById("otherCharges").value||0;
const discount=document.getElementById("discount").value||0;
const grand=document.getElementById("grandTotal").textContent;

let rows="";

document.querySelectorAll(".wall-card").forEach((card,index)=>{

const area=parseFloat(card.querySelector(".wallArea").textContent)||0;

const material=card.querySelector(".ceilingMaterial").selectedOptions[0].text;

const price=parseFloat(card.querySelector(".materialPrice").value)||0;

const amount=area*price;

rows+=`
<tr>
<td>Wall ${index+1}</td>
<td>${material}</td>
<td>${area.toFixed(2)}</td>
<td>₹${price}</td>
<td>₹${amount.toFixed(2)}</td>
</tr>`;
});

document.querySelectorAll(".ceiling-card").forEach((card,index)=>{

const area=parseFloat(card.querySelector(".grandCeiling").textContent)||0;

const material=card.querySelector(".ceilingMaterial").selectedOptions[0].text;

const price=parseFloat(card.querySelector(".materialPrice").value)||0;

const amount=area*price;

rows+=`
<tr>
<td>Ceiling ${index+1}</td>
<td>${material}</td>
<td>${area.toFixed(2)}</td>
<td>₹${price}</td>
<td>₹${amount.toFixed(2)}</td>
</tr>`;
});
const agreement=`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>Empire Traders Agreement</title>

<style>
@page{
size:A4;
margin:12mm;
}

body{
font-family:Arial,sans-serif;
margin:0;
padding:0;
background:#f4f4f4;
color:#222;
}

.container{
background:#fff;
border:4px solid #C9A227;
padding:25px;
}

.header{
display:flex;
align-items:center;
justify-content:space-between;
background:#111;
color:white;
padding:20px;
border-bottom:6px solid #C9A227;
margin:-25px -25px 25px -25px;
}

.logo{
width:80px;
height:80px;
border:3px solid #D4AF37;
background:white;
display:flex;
align-items:center;
justify-content:center;
border-radius:10px;
overflow:hidden;
padding:5px;
}
border:3px solid #ffc400;
background:white;
display:flex;
justify-content:center;
align-items:center;
font-weight:bold;
color:#111;
}

.company h1{
font-size:24px;
}
color:#C9A227;
letter-spacing:2px;
}

.company h3{
margin:5px 0;
color:#fff;
font-weight:normal;
}

.company p{
color:#ddd;
margin-top:8px;
}

h2{
background:#111;
color:#C9A227;
padding:10px;
text-align:center;
border-radius:4px;
}

h3{
color:#111;
border-left:6px solid #C9A227;
padding-left:10px;
}

table{
width:100%;
border-collapse:collapse;
margin-top:12px;
margin-bottom:20px;
}

table,th,td{
border:1px solid #999;
}

th{
background:#111;
color:#C9A227;
padding:10px;
}

th,td{
padding:5px;
font-size:12px;
}

.info td{
text-align:left;
}

.summary tr:last-child{
background:#111;
color:#C9A227;
font-weight:bold;
font-size:18px;
}

ol{
line-height:1.8;
}

.signature{
display:flex;
justify-content:space-between;
margin-top:25px;
}
.sign{
width:220px;
text-align:center;
font-weight:bold;
}

.sign hr{
border:0;
border-top:2px solid #111;
margin-bottom:10px;
}

.footer{
margin-top:30px;
background:#111;
color:#C9A227;
text-align:center;
padding:12px;
font-weight:bold;
letter-spacing:1px;
}
</style>

</head>

<body>

<div class="container">

<div class="header">

<div class="logo">
<img src="images/logo.png"
style="
width:100%;
height:100%;
object-fit:contain;
display:block;
">
</div>
<div class="company">

<h1>EMPIRE TRADERS</h1>

<h3>Interior & Ceiling Solutions</h3>

<p>${dealer}<br>${dealerPhone}</p>

</div>

</div>

<h2>WORK ORDER & AGREEMENT</h2>

<table class="info">

<tr>

<td><b>Customer</b></td>

<td>${customer}</td>

<td><b>Phone</b></td>

<td>${phone}</td>

</tr>

<tr>

<td><b>Project</b></td>

<td>${project}</td>

<td><b>Date</b></td>

<td>${date}</td>

</tr>

<tr>

<td><b>Address</b></td>

<td colspan="3">${address}</td>

</tr>

</table>

<h3>Measurement Details</h3>

<table>

<tr>

<th>Item</th>

<th>Material</th>

<th>Area (Sqft)</th>

<th>Rate</th>

<th>Amount</th>

</tr>

${rows}

</table>

<h3>Project Summary</h3>

<table class="summary">

<tr>

<td>Total Wall Area</td>

<td>${wallArea} Sqft</td>

</tr>

<tr>

<td>Total Ceiling Area</td>

<td>${ceilingArea} Sqft</td>

</tr>

<tr>

<td>Net Area</td>

<td>${netArea} Sqft</td>

</tr>

<tr>

<td>Material Cost</td>

<td>₹ ${materialTotal}</td>

</tr>

<tr>

<td>Other Charges</td>

<td>₹ ${other}</td>

</tr>

<tr>

<td>Discount</td>

<td>₹ ${discount}</td>

</tr>

<tr class="total">

<td>GRAND TOTAL</td>

<td>₹ ${grand}</td>

</tr>

</table>

<h3>Terms & Conditions</h3>

<ol style="margin:0;padding-left:18px;font-size:12px;line-height:1.3;">

<li>Advance payment cumplsory.</li>

<li>Balance payment must be paid immediately after work completion if not severe action will taken.</li>

<li>Additional work will be charged separately.</li>

<li>Measurements and material selection are approved by the customer.</li>

</ol>
<div class="signature">

<div class="sign">

<hr>

Dealer Signature

</div>

<div class="sign">

<hr>

Customer Signature

</div>

</div>

<div class="footer">

<b>EMPIRE TRADERS</b><br>

Interior • PVC Panels • WPC • Fluted Panels • Gypsum • Ceiling Works
Thank you for choosing Empire Traders.

</div>

</body>

</html>
`;

const win=window.open("","_blank");
win.document.write(agreement);
win.document.close();
win.focus();
win.print();

}
function checkPassword(){

const pass=document.getElementById("password").value;

if(pass==="666"){

document.getElementById("loginScreen").style.display="none";

document.getElementById("calculatorApp").style.display="block";

}else{

document.getElementById("loginError").innerHTML="Wrong Password";

}

}
async function downloadPDF(){

const { jsPDF } = window.jspdf;

const pdf = new jsPDF("p","mm","a4");

const page = document.getElementById("calculatorApp");
const logo = new Image();
logo.src = "images/logo.png";

await new Promise(resolve=>{
logo.onload = resolve;
});
const canvas = await html2canvas(page,{
scale:2,
useCORS:true,
allowTaint:true,
scrollY:-window.scrollY
});

const imgData = canvas.toDataURL("image/png");

const pdfWidth = 210;

const pdfHeight = 297;

const margin = 10;

const imgWidth = pdfWidth - (margin * 2);

const imgHeight = canvas.height * imgWidth / canvas.width;

let heightLeft = imgHeight;

let position = 0;

pdf.addImage(
imgData,
"PNG",
margin,
position,
imgWidth,
imgHeight
);

heightLeft -= pdfHeight;

while(heightLeft > 0){

position = heightLeft - imgHeight;

pdf.addPage();

pdf.addImage(
imgData,
"PNG",
margin,
position,
imgWidth,
imgHeight
);

heightLeft -= pdfHeight;

}

pdf.save("Empire_Traders_Project_Report.pdf");

}