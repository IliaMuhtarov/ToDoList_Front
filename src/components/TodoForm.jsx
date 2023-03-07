import React, { useRef, useState } from "react";

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : "");
    const inputRef = useRef(null);
    
    const handleChange = (e) => {
        setInput(e.target.value);
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
          id: Math.floor(Math.random() * 10000),
          text: input,
        })  

        setInput("");
    };
    return (
        <form className="todo_form">
            {props.edit?(
            <>
            <input
            placeholder="Добавьте задачу здесь..."
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="input-edit"
            />
            <button onClick={handleSubmit} className="edit-button">Редактировать</button>
            </>):(
                <>
            <input
            placeholder="Добавьте задачу здесь..."
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="input-add"
            />
            <button onClick={handleSubmit} className="add-button">Добавить</button>
            </>

            )}
        </form>
    )
}

export default TodoForm