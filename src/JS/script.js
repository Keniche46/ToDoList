const tituloInput = document.getElementById("titulo");
const descInput = document.getElementById("desc");
const botaoAdd = document.getElementById("botaoAdd");
const lista = document.getElementById("ListaToDo");
const contador = document.querySelector(".contador");
const filtros = document.querySelectorAll(".filtro");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtual = "all";

function renderizarTarefas() {
    lista.innerHTML = "";
    
    const filtradas = tarefas.filter(t => {
        if (filtroAtual === "active") return !t.feito;
        if (filtroAtual === "done") return t.feito;
        return true;
    });

    filtradas.forEach((tarefa, i) => {
        const li = document.createElement("li");
        li.className = "tarefa" + (tarefa.feito ? " feito" : "");
        li.innerHTML = `
            <div class="info">
                <div class="titulo">${tarefa.titulo}</div>
                <div class="descricao">${tarefa.desc}</div>
            </div>
            <div class="acoes">
                <button class="toggle" onclick="MarcarTarefa(${i})">✔</button>
                <button onclick="deletarTarefa(${i})">✖</button>
            </div>
        `;
        lista.appendChild(li);
    });
    
    contador.textContent = `${tarefas.length} tarefas`;
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
    const titulo = tituloInput.value.trim();
    const desc = descInput.value.trim();
    
    if (titulo === "") {
        tituloInput.style.borderColor = "red";
        return;
    }

    tituloInput.style.borderColor = "";
    tarefas.push({ titulo, desc, feito: false });
    tituloInput.value = "";
    descInput.value = "";
    
    renderizarTarefas();
}

function MarcarTarefa(index) {
    tarefas[index].feito = !tarefas[index].feito;
    renderizarTarefas();
}

function deletarTarefa(index) {
    tarefas.splice(index, 1);
    renderizarTarefas();
}

botaoAdd.addEventListener("click", adicionarTarefa);
tituloInput.addEventListener("keypress", e => { if(e.key === "Enter") adicionarTarefa(); });
descInput.addEventListener("keypress", e => { if(e.key === "Enter") adicionarTarefa(); });

filtros.forEach(btn => {
    btn.addEventListener("click", () => {
        filtros.forEach(b => b.classList.remove("ativo"));
        btn.classList.add("ativo");
        filtroAtual = btn.dataset.filter;
        renderizarTarefas();
    });
});

renderizarTarefas();