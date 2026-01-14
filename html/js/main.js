
// Datos
const preguntas = [
  {
    texto: "¿Cuál es la raíz cuadrada de 25?",
    opciones: ["5", "3", "25 no tiene raíz cuadrada", "2"],
    correcta: 0
  },
  {
    texto: "¿Cuánto es 10 + 5?",
    opciones: ["12", "15", "20", "10"],
    correcta: 1
  }
];

const TOTAL_PREGUNTAS = 10;

// Estado 
let preguntaActual = 0;
const respuestasUsuario = [];

// Recuperar respuestas guardadas
const respuestasGuardadas = JSON.parse(localStorage.getItem("respuestas"));
if (respuestasGuardadas) {
  respuestasUsuario.push(...respuestasGuardadas);
}

// Referencias al DOM
const preguntaTexto = document.getElementById("pregunta");
const opcionesContainer = document.getElementById("opciones");
const contador = document.getElementById("contador");
const total = document.getElementById("total");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");


// Funciones
function mostrarPregunta() {
  const pregunta = preguntas[preguntaActual];

  contador.textContent = `Pregunta ${preguntaActual + 1}`;
  

  preguntaTexto.textContent = pregunta.texto;
  opcionesContainer.innerHTML = "";

  pregunta.opciones.forEach((opcion, index) => {
    const div = document.createElement("div");
    div.classList.add("form-check");

    const checked =
      respuestasUsuario[preguntaActual] === index ? "checked" : "";

    div.innerHTML = `
      <input class="form-check-input"
             type="radio"
             name="respuesta"
             id="opcion${index}"
             value="${index}"
             ${checked}>
      <label class="form-check-label" for="opcion${index}">
        ${opcion}
      </label>
    `;

    opcionesContainer.appendChild(div);
  });

  btnAnterior.disabled = preguntaActual === 0;
}

//Eventos
opcionesContainer.addEventListener("change", (e) => {
  respuestasUsuario[preguntaActual] = parseInt(e.target.value);
  localStorage.setItem("respuestas", JSON.stringify(respuestasUsuario));
});

btnSiguiente.addEventListener("click", () => {
  if (preguntaActual < preguntas.length - 1) {
    preguntaActual++;
    mostrarPregunta();
  } else {
    finalizarCuestionario();
  }
});

btnAnterior.addEventListener("click", () => {
  if (preguntaActual > 0) {
    preguntaActual--;
    mostrarPregunta();
  }
});

// Finalizar cuestionario 
function finalizarCuestionario() {
  let aciertos = 0;

  preguntas.forEach((pregunta, index) => {
    if (respuestasUsuario[index] === pregunta.correcta) {
      aciertos++;
    }
  });

  const errores = preguntas.length - aciertos;

  document.querySelector(".container").innerHTML = `
    <div class="text-center mt-5">
      <h2>Resultados</h2>
      <p><strong>Aciertos:</strong> ${aciertos}</p>
      <p><strong>Errores:</strong> ${errores}</p>
      <button class="btn btn-primary mt-3" onclick="reiniciar()">Reiniciar</button>
    </div>
  `;
}

function reiniciar() {
  localStorage.removeItem("respuestas");
  location.reload();
}

// Inicialización, llamar a la función 
mostrarPregunta();

