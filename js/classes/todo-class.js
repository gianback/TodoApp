export class Todo {
  constructor(tarea) {
    this.id = new Date().getTime();
    this.tarea = tarea;
    this.fecha = new Date();
    this.completado = false;
  }
}
