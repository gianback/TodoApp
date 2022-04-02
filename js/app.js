import { TodoList } from "./classes/todo-classlist.js";
import { todoHtml } from "./todoHtml.js";

const d = document;
export const todoList = new TodoList();

d.addEventListener("DOMContentLoaded", (e) => {
  todoList.todos.forEach((element) => {
    todoHtml(element);
  });
});
