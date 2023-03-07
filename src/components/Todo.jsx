import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const strinssil = "http://localhost:3005/";

function Todo() {
    const[todos,setTodos]= useState([])
        useEffect(() => {
            fetch(strinssil+'todos')
            .then(response => response.json())
            .then(json => setTodos(json))
          }, []);
    const addTodo = (todo) => {
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
        fetch(strinssil+'todos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todo)
          });  
        console.log(...todos);
      };
      const updateTodo = (todoId, newValue) => {
        setTodos((prev) =>
          prev.map((item) => (item.id === todoId ? newValue : item))
        );
        fetch(strinssil+'todos/'+todoId, {//PUT запрос для изменения
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newValue)
          });  
      };

      const removeTodo = (id) => {
        fetch(strinssil+"todos/"+id, {
            method: 'delete'
          })
          .then(response => response.json());
        const removedArr = [...todos].filter((todo) => todo.id !== id);
    
        setTodos(removedArr);
      };

      const completeTodo = (id) => {
        let updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
          }
          return todo;
        });
        setTodos(updatedTodos);
      };

    return (
        (<div>
            <h1 className="header">Добавьте вашу задачу!</h1>
            <TodoForm onSubmit={addTodo}/>
            <TodoList todos={todos} updateTodo={updateTodo} removeTodo={removeTodo} completeTodo={completeTodo}/>
        </div>)
    )
}

export default Todo