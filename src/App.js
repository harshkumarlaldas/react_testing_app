import "./App.css";

import { useEffect, useState } from "react";


function App() {
  return (
    <div className="App">
      <ListExpress />
    </div>
  );
}

const ListExpress = () => {
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState("");

  const fetchTodoList = async () => {
    const res = await fetch("http://localhost:3001/todos");
    setList(await res.json());
  };

  const onClickHandler = async () => {
    //post call
    const res = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: false, desc: inputText }),
    });
    await fetchTodoList();
  };

  const onTextChangeHandler = (e) => {
    setInputText(e.target.value);
    //update the input state call
  };

  const item = list.map((todos) => (
    <tr>
      <Item todos={todos} fetchTodoList={fetchTodoList} />
    </tr>
  ));

  useEffect(() => {
    fetchTodoList();
  }, []);
  return (
    <>
      <div>
        <input type="text" onChange={onTextChangeHandler} placeholder="Add Task" />
        <button onClick={onClickHandler}>ADD</button>
      </div>
      <table>
        <th>TODO LIST</th>

        {item}
      </table>
    </>
  );
};

const Item = (props) => {
  const { status, _id, desc } = props.todos;
  const onDeleteHandler = async () => {
    const res = await fetch(`http://localhost:3001/todos/${_id}`, {
      method: "DELETE",
    });
    await props.fetchTodoList();
  };

  const handleTodo = async () => {
    const res = await fetch(`http://localhost:3001/todos/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: !status, desc }),
    });
    await props.fetchTodoList();
  };
  return (
    <>
      <td>
        {status ? (
          <button onClick={handleTodo} style={{backgroundColor:"LightGreen"}}>DONE</button>
        ) : (
          <button onClick={handleTodo}>TODO</button>
        )}
      </td>
      <td>{desc}</td>
      <td>
        <button onClick={onDeleteHandler} class="material-symbols-outlined">Delete</button>
      </td>
    </>
  );
};

export default App;
