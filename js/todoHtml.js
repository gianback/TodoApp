import { todoList } from "./app.js";
import { Todo } from "./classes/todo-class.js";

//referencias HTML
const d = document;
const btnAddTarea = d.querySelector(".btn-add-tarea");
export const divTodoList = d.querySelector(".lista-tareas");
const borrarCompletados = d.querySelector(".borrar-completados");
//buttons
const btnPendientes = d.querySelector(".btn-pendientes");
const btnCompletados = d.querySelector(".btn-completados");
const btnMostrarAmbos = d.querySelector(".btn-total-tareas");

export const todoHtml = ({ id, tarea }) => {
  const htmlTodo = `
  <li class=" pendiente mg-top visible animado" data-id="${id}" >
  <div class="view container">
  <label>${tarea}</label>
  <div class="icons-container">
  <img src="./assets/icon-check.svg" class="icon check"> 
  <img src="./assets/icon-x.svg" class="icon delete"> 
  </div>
  </div>  
  </li>
  `;

  const divTodo = d.createElement("div");
  divTodo.innerHTML = htmlTodo;

  divTodoList.appendChild(divTodo.firstElementChild);

  return divTodo.firstElementChild;
};

const validarEstado = (elemento, id) => {
  todoList.todos.forEach((todo) => {
    if (todo.id === id) {
      todo.completado = true;
    }
  });
  if (elemento.classList.contains("pendiente")) {
    elemento.classList.remove("pendiente");
    elemento.classList.add("completado");
  } else {
    elemento.classList.remove("completado");
    elemento.classList.add("pendiente");
  }
};

const cambiarClase = (elemento, oldClase, newClase) => {
  elemento.classList.remove(oldClase);
  elemento.classList.add(newClase);
};
//Eventos
btnAddTarea.addEventListener("click", () => {
  const txtInput = d.querySelector(".input-tarea");
  const colInput = d.querySelector('.input-tarea-container')

  if (txtInput.value.length === 0) return;

  const nuevoTodo = new Todo(txtInput.value);
  todoList.agregarTodo(nuevoTodo);

  todoHtml(nuevoTodo);
  if(!d.querySelector('.alerta')){
    const divAlert = d.createElement('div');
    divAlert.innerHTML = `Tarea agregada correctamente !`;
    divAlert.classList.add('alerta');
    colInput.append(divAlert);
    setTimeout(() => {
      colInput.removeChild(divAlert);
    }, 3000);
  }
  txtInput.value = "";
});

divTodoList.addEventListener("click", (e) => {
  const elemento = e.target.parentElement.parentElement.parentElement;
  const todoId = parseInt(
    e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
  );
  const btnCheck = e.target;
  if (btnCheck.classList.contains("check")) {
    cambiarClase(btnCheck, "check", "restart");
    btnCheck.src = "./assets/icon-restart.svg";
    validarEstado(elemento, todoId);
  } else if (btnCheck.classList.contains("restart")) {
    cambiarClase(btnCheck, "restart", "check");
    btnCheck.src = "./assets/icon-check.svg";
    validarEstado(elemento, todoId);
  } else if (e.target.classList.contains("delete")) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(elemento);
  }
});

borrarCompletados.addEventListener("click", (e) => {
  todoList.borrarCompletados();
  while (divTodoList.firstChild) {
    divTodoList.removeChild(divTodoList.firstChild);
  }
  todoList.todos.forEach((todo) => {
    todoHtml(todo);
  });
});

btnCompletados.addEventListener("click", () => {
  for (const nodo of divTodoList.children) {
    nodo.classList.replace("hidden", "visible");
  }
  todoList.todos.forEach((el) => {
    if (el.completado === true) {
      for (const nodo of divTodoList.children) {
        if (!nodo.classList.contains("completado")) {
          cambiarClase(nodo, "visible", "hidden");
        }
      }
    } else {
      for (const nodo of divTodoList.children) {
        if (nodo.classList.contains("pendiente")) {
          cambiarClase(nodo, "visible", "hidden");
        }
      }
    }
  });
});
btnPendientes.addEventListener("click", () => {
  //limpiamos
  for (const nodo of divTodoList.children) {
    nodo.classList.replace("hidden", "visible");
  }

  todoList.todos.forEach((el) => {
    if (el.completado === false) {
      for (const nodo of divTodoList.children) {
        if (nodo.classList.contains("pendiente")) {
          cambiarClase(nodo, "hidden", "visible");
        }
      }
    } else {
      for (const nodo of divTodoList.children) {
        if (nodo.classList.contains("completado")) {
          cambiarClase(nodo, "visible", "hidden");
        }
      }
    }
  });
});

btnMostrarAmbos.addEventListener("click", () => {
  for (const nodo of divTodoList.children) {
    cambiarClase(nodo, "hidden", "visible");
  }
});
