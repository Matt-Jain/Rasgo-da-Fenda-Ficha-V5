let characters = [];
let currentUser = "";

/* LOGIN FAKE */
function fakeLogin() {
  const name = document.getElementById("loginName").value;
  if (!name) return alert("Digite um nome.");
  currentUser = name;
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  showTab("create");
}

/* TABS */
function showTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  if (id === "dice") loadDice();
}

/* CRIAR */
function createCharacter() {
  const name = document.getElementById("charName").value;
  const type = document.getElementById("charType").value;
  const history = document.getElementById("charHistory").value;

  if (!name) return alert("Nome obrigatório.");

  const skills = {
    Luta: 20, Pontaria: 20, Investigação: 20, Ocultismo: 20,
    Percepção: 20, Atletismo: 20, Furtividade: 20,
    Enganação: 20, Intimidação: 20, Tecnologia: 20
  };

  characters.push({
    name, type, history,
    life: 10,
    sanity: 10,
    control: 10,
    points: 200,
    skills
  });

  document.getElementById("charName").value = "";
  document.getElementById("charHistory").value = "";

  renderLists();
  alert("Criado!");
}

/* LISTAS */
function renderLists() {
  const p = document.getElementById("playerList");
  const n = document.getElementById("npcList");
  p.innerHTML = "";
  n.innerHTML = "";

  characters.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${c.name}</strong>
      <div class="status">
        <div class="life">Vida: ${c.life}</div>
        <div class="sanity">Sanidade: ${c.sanity}</div>
        <div class="control">Incontrole: ${c.control}</div>
      </div>
    `;
    c.type === "npc" ? n.appendChild(div) : p.appendChild(div);
  });
}

/* DADOS */
function loadDice() {
  const sel = document.getElementById("diceCharacter");
  const skillsDiv = document.getElementById("skillsDice");
  sel.innerHTML = "";
  skillsDiv.innerHTML = "";

  characters.filter(c => c.type === "player").forEach((c, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = c.name;
    sel.appendChild(opt);
  });

  renderSkillsDice();
}

function renderSkillsDice() {
  const skillsDiv = document.getElementById("skillsDice");
  skillsDiv.innerHTML = "";

  const c = characters[document.getElementById("diceCharacter").value];
  if (!c) return;

  Object.entries(c.skills).forEach(([skill, val]) => {
    const div = document.createElement("div");
    div.className = "skill";
    div.innerHTML = `${skill} <strong>${val}</strong>`;
    div.onclick = () => rollDice(skill, val);
    skillsDiv.appendChild(div);
  });
}

document.getElementById("diceCharacter").onchange = renderSkillsDice;

/* ROLAGEM */
function rollDice(skill, value) {
  const roll = Math.floor(Math.random() * 100) + 1;
  const result = roll <= value ? "SUCESSO" : "FALHA";

  const panel = document.getElementById("diceResult");
  panel.classList.remove("hidden");
  panel.innerHTML = `
    <h3>${skill}</h3>
    <p>Dado: ${roll}</p>
    <strong>${result}</strong>
  `;
}
