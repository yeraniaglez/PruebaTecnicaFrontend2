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

// Estado (número de pregunta)
let preguntaActual = 0;

// Referencias al DOM
const preguntaTexto = document.getElementById("pregunta");
const opcionesContainer = document.getElementById("opciones");
const contador = document.getElementById("contador");

// Funciones
function mostrarPregunta() {
  const pregunta = preguntas[preguntaActual];

  contador.textContent = `Pregunta ${preguntaActual + 1} de ${TOTAL_PREGUNTAS}`;
  preguntaTexto.textContent = pregunta.texto;

  opcionesContainer.innerHTML = "";

  pregunta.opciones.forEach((opcion, index) => {
    const div = document.createElement("div");
    div.classList.add("form-check");

    div.innerHTML = `
      <input class="form-check-input" type="radio" name="respuesta" id="opcion${index}">
      <label class="form-check-label" for="opcion${index}">
        ${opcion}
      </label>
    `;

    opcionesContainer.appendChild(div);
  });
}

// Inicialización, llamar a la función 
mostrarPregunta();
