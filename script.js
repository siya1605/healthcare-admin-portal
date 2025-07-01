// ========== Footer Year ==========
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ========== Logout Confirmation ==========
const logoutLink = document.querySelector('a[href="login.html"]');
if (logoutLink) {
  logoutLink.addEventListener("click", function (e) {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (!confirmLogout) {
      e.preventDefault();
    }
  });
}

// ========== Dark Mode Toggle ==========
const darkToggle = document.getElementById("darkModeToggle");
if (darkToggle) {
  darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    darkToggle.checked = true;
  }
}


function saveToStorage(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}
function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// ========== Export to CSV ==========
function exportListToCSV(listId, filename) {
  const rows = Array.from(document.querySelectorAll(`#${listId} li`)).map(li =>
    li.textContent.replace(/\s*Edit\s*Delete/, "").trim()
  );
  const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ========== Patient Logic ==========
const form = document.getElementById("patientForm");
const list = document.getElementById("patientList");
let patients = loadFromStorage("patients");

function renderPatients() {
  if (!list) return;
  list.innerHTML = "";
  patients.forEach(patient => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${patient.name}</strong>, Age ${patient.age}, ${patient.gender}, Condition: ${patient.condition}
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    `;
    list.appendChild(item);
  });
}

if (form && list) {
  renderPatients();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputs = form.querySelectorAll("input");
    const patient = {
      name: inputs[0].value,
      age: inputs[1].value,
      gender: inputs[2].value,
      condition: inputs[3].value
    };
    patients.push(patient);
    saveToStorage("patients", patients);
    renderPatients();
    form.reset();
  });

  list.addEventListener("click", function (e) {
    const index = Array.from(list.children).indexOf(e.target.parentElement);
    if (e.target.classList.contains("deleteBtn")) {
      patients.splice(index, 1);
      saveToStorage("patients", patients);
      renderPatients();
    }
    if (e.target.classList.contains("editBtn")) {
      const p = patients[index];
      form.elements[0].value = p.name;
      form.elements[1].value = p.age;
      form.elements[2].value = p.gender;
      form.elements[3].value = p.condition;
      patients.splice(index, 1);
      saveToStorage("patients", patients);
      renderPatients();
    }
  });
}

// ========== Patient Search ==========
const searchInput = document.getElementById("searchPatient");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const items = document.querySelectorAll("#patientList li");
    items.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(filter) ? "block" : "none";
    });
  });
}

// ========== Appointment Logic ==========
const apptForm = document.getElementById("appointmentForm");
const apptList = document.getElementById("appointmentList");
let appointments = loadFromStorage("appointments");

function renderAppointments() {
  if (!apptList) return;
  apptList.innerHTML = "";
  appointments.forEach(appt => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${appt.name}</strong> - ${appt.date} at ${appt.time} with Dr. ${appt.doctor}
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    `;
    apptList.appendChild(item);
  });
}

if (apptForm && apptList) {
  renderAppointments();

  apptForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputs = apptForm.querySelectorAll("input");
    const appt = {
      name: inputs[0].value,
      date: inputs[1].value,
      time: inputs[2].value,
      doctor: inputs[3].value
    };
    appointments.push(appt);
    saveToStorage("appointments", appointments);
    renderAppointments();
    apptForm.reset();
  });

  apptList.addEventListener("click", function (e) {
    const index = Array.from(apptList.children).indexOf(e.target.parentElement);
    if (e.target.classList.contains("deleteBtn")) {
      appointments.splice(index, 1);
      saveToStorage("appointments", appointments);
      renderAppointments();
    }
    if (e.target.classList.contains("editBtn")) {
      const a = appointments[index];
      apptForm.elements[0].value = a.name;
      apptForm.elements[1].value = a.date;
      apptForm.elements[2].value = a.time;
      apptForm.elements[3].value = a.doctor;
      appointments.splice(index, 1);
      saveToStorage("appointments", appointments);
      renderAppointments();
    }
  });
}

// ========== Doctor Logic ==========
const docForm = document.getElementById("doctorForm");
const docList = document.getElementById("doctorList");
let doctors = loadFromStorage("doctors");

function renderDoctors() {
  if (!docList) return;
  docList.innerHTML = "";
  doctors.forEach(doc => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${doc.name}</strong> - ${doc.spec}<br/>
      📞 ${doc.phone} | ✉️ ${doc.email}
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
    `;
    docList.appendChild(item);
  });
}

if (docForm && docList) {
  renderDoctors();

  docForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputs = docForm.querySelectorAll("input");
    const doctor = {
      name: inputs[0].value,
      spec: inputs[1].value,
      phone: inputs[2].value,
      email: inputs[3].value
    };
    doctors.push(doctor);
    saveToStorage("doctors", doctors);
    renderDoctors();
    docForm.reset();
  });

  docList.addEventListener("click", function (e) {
    const index = Array.from(docList.children).indexOf(e.target.parentElement);
    if (e.target.classList.contains("deleteBtn")) {
      doctors.splice(index, 1);
      saveToStorage("doctors", doctors);
      renderDoctors();
    }
    if (e.target.classList.contains("editBtn")) {
      const d = doctors[index];
      docForm.elements[0].value = d.name;
      docForm.elements[1].value = d.spec;
      docForm.elements[2].value = d.phone;
      docForm.elements[3].value = d.email;
      doctors.splice(index, 1);
      saveToStorage("doctors", doctors);
      renderDoctors();
    }
  });
}

// ========== Inventory Logic ==========
const inventoryForm = document.getElementById("inventoryForm");
const inventoryList = document.getElementById("inventoryList");
let inventory = loadFromStorage("inventory");

function renderInventory() {
  if (!inventoryList) return;
  inventoryList.innerHTML = "";
  inventory.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.name}</strong> - Qty: ${item.qty}, Expiry: ${item.expiry}
      <button class="editBtn" onclick="editInventory(${index})">Edit</button>
      <button class="deleteBtn" onclick="deleteInventory(${index})">Delete</button>
    `;
    inventoryList.appendChild(li);
  });
}

function saveInventory() {
  saveToStorage("inventory", inventory);
  renderInventory();
}

if (inventoryForm && inventoryList) {
  renderInventory();
  inventoryForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("medName").value.trim();
    const qty = document.getElementById("medQty").value;
    const expiry = document.getElementById("medExpiry").value;

    if (name && qty && expiry) {
      inventory.push({ name, qty, expiry });
      saveInventory();
      inventoryForm.reset();
    }
  });
}

function editInventory(index) {
  const item = inventory[index];
  document.getElementById("medName").value = item.name;
  document.getElementById("medQty").value = item.qty;
  document.getElementById("medExpiry").value = item.expiry;
  inventory.splice(index, 1);
  saveInventory();
}

function deleteInventory(index) {
  if (confirm("Delete this medicine?")) {
    inventory.splice(index, 1);
    saveInventory();
  }
}




