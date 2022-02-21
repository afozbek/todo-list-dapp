import { hello } from "config";
import { TransactionContext } from "contexts/TransactionContext";
import useTransactionListener from "hooks/useTransactionListener";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TRANSACTION_NAMES } from "utils/enums";

const TodosPage = () => {
	const {
		userData,
		connectWallet,
		logoutUser,
		smartContractInstance,
		transactionList,
		setTransactionList,
	} = useContext(TransactionContext);

	const [todoList, setTodoList] = useState([]);
	const [newTodoText, setNewTodoText] = useState("");

	const { lastFinishedTransaction } = useTransactionListener();

	useEffect(() => {
		if (smartContractInstance) {
			getTodos();
		}
	}, [smartContractInstance]);

	useEffect(() => {
		if (lastFinishedTransaction) {
			getTodos();
		}
	}, [lastFinishedTransaction]);

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

	const handleAddNewTodo = async e => {
		e.preventDefault();

		if (!userData?.account) {
			toast.error("User is not connected");
			throw new Error("user is not connected ");
		}

		const tx = await smartContractInstance.methods
			.createTodo(newTodoText)
			.send({ from: userData.account });
		console.log({ tx });

		setTransactionList([
			...transactionList,
			{ ...tx, hash: tx.transactionHash, name: TRANSACTION_NAMES.ADD_TODO },
		]);
	};

	const handleToggleTodo = async todo => {
		try {
			if (!userData?.account) {
				toast.error("User is not connected");
				throw new Error("user is not connected ");
			}

			const tx = await smartContractInstance.methods
				.toggleCompleted(todo.id)
				.send({ from: userData?.account });

			console.log({ tx });

			setTodoList(
				todoList.map(_todo => {
					if (_todo.id == todo.id) {
						return {
							..._todo,
							completed: !_todo.completed,
						};
					}
					return _todo;
				})
			);
		} catch (err) {
			console.log({ err });
		}
	};

	console.log({ lastFinishedTransaction });
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

			<div className="add-todo-container">
				<form onSubmit={handleAddNewTodo}>
					<div>
						<input
							type="text"
							name="add-todo"
							id="add-todo"
							value={newTodoText}
							onChange={e => {
								setNewTodoText(e.target.value);
							}}
						/>
						<input type="submit" value="Create New Todo" />
					</div>
				</form>
			</div>

			<div className="todos-container">
				<h4>Todo List</h4>
				<ul>
					{todoList.length > 0
						? todoList.map(todo => (
								<li key={todo.id}>
									<label htmlFor={todo.id}>
										<input
											type="checkbox"
											name={todo.id}
											id={todo.id}
											checked={todo.completed}
											onChange={e => {
												handleToggleTodo(todo);
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
