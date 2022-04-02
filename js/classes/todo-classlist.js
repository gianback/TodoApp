export class TodoList {
  constructor() {
    this.cargarLocalStorage();
  }

  agregarTodo(todo) {
    this.todos.push(todo);
    this.agregarLocalStorage();
  }
  eliminarTodo(id) {
    this.todos = this.todos.filter((elemento) => elemento.id !== id);
    this.agregarLocalStorage();
  }

  borrarCompletados() {
    this.todos = this.todos.filter((todo) => todo.completado === false);
    this.agregarLocalStorage();
  }

  agregarLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(this.todos));
  }

  cargarLocalStorage() {
    this.todos = localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : [];
  }
}
