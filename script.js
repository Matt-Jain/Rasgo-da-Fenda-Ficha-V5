const loginPage = document.getElementById("loginPage");
const appPage = document.getElementById("appPage");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

let fichas = JSON.parse(localStorage.getItem("fichas")) || [];

/* LOGIN FAKE */
loginBtn.onclick = () => {
  loginPage.classList.remove("active");
  appPage.classList.add("active");
  render();
};

/* LOGOUT */
logoutBtn.onclick = () => {
  appPage.classList.remove("active");
  loginPage.classList.add("active");
};

/* TABS */
document.querySelectorAll("nav button[data-tab]").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.getElementById(btn.dataset.tab).classList.add("active");
  };
});

/* SALVAR */
document.getElementById("salvar").onclick = () => {
  const ficha = {
    tipo: tipo.value,
    nome: nome.value,
    jogador: jogador.value,
    aparencia: aparencia.value,
    historia: historia.value,
    atributos: {
      forca: forca.value,
      agilidade: agilidade.value,
      intelecto: intelecto.value,
      presenca: presenca.value
    },
    status: {
      vida: vida.value,
      sanidade: sanidade.value,
      medo: medo.value
    },
    notas: notas.value
  };

  fichas.push(ficha);
  localStorage.setItem("fichas", JSON.stringify(fichas));
  alert("Ficha salva!");
  render();
};

/* RENDER */
function render() {
  listaPersonagens.innerHTML = "";
  listaNPCs.innerHTML = "";

  fichas.forEach(f => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${f.nome}</strong><br>${f.jogador || ""}`;

    if (f.tipo === "npc") listaNPCs.appendChild(div);
    else listaPersonagens.appendChild(div);
  });
}

/* DADOS */
function roll(lados) {
  diceResult.innerText = `Resultado D${lados}: ${Math.floor(Math.random() * lados) + 1}`;
}
