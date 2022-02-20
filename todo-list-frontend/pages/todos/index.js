import { hello } from "config";
import { TransactionContext } from "contexts/TransactionContext";
import React, { useContext, useEffect, useState } from "react";

const TodosPage = () => {
  const {
    userData,
    connectWallet,
    logoutUser,
    web3Instance,
    smartContractInstance,
  } = useContext(TransactionContext);

  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    if (smartContractInstance) {
      getTodos();
    }
  }, [smartContractInstance]);

  const getTodos = async () => {
    const todoCount = await smartContractInstance.methods.todoCount().call();

    const totalList = [];
    for (let i = 1; i <= todoCount; i++) {
      const { id, content, completed, isExist } =
        await smartContractInstance.methods.getTodo(i).call();
      totalList.push({
        id,
        content,
        completed,
        isExist,
      });
    }

    setTodoList(totalList);
  };

  const handleChangeTodo = (todo, event) => {
    const checked = event.target.checked;

    // TODO:
  };

  return (
    <div className="todos">
      <div className="app-container">
        <div className="account">
          {userData?.account ? (
            <div className="connected">
              <div className="text">{userData?.account}</div>
              <button className="logout-btn" onClick={logoutUser}>
                Logout
              </button>
            </div>
          ) : (
            <button className="connect-btn" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      <div className="todos-container">
        <h4>Todo List</h4>
        <ul>
          {todoList.length > 0
            ? todoList.map((todo) => (
                <li key={todo.id}>
                  <label htmlFor={todo.id}>
                    <input
                      type="checkbox"
                      name={todo.id}
                      id={todo.id}
                      value={todo.completed}
                      onChange={(e) => {
                        handleChangeTodo(todo, e);
                      }}
                    />
                    {todo.content}
                  </label>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default TodosPage;
