import { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";

const ModalEditTodo = ({
	modalIsOpen,
	closeModal,
	editedTodo,
	handleEditTodo,
}) => {
	console.log({ editedTodo });
	const [content, setContent] = useState("");

	useEffect(() => {
		if (editedTodo && editedTodo.content) {
			setContent(editedTodo.content);
		}
	}, [editedTodo]);

	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			contentLabel="Example Modal"
		>
			<div className="add-todo-container">
				<form
					onSubmit={e => {
						e.preventDefault();
						handleEditTodo({
							...editedTodo,
							content,
						});
					}}
				>
					<div>
						<input
							type="text"
							name="edit-todo"
							id="edit-todo"
							value={content}
							onChange={e => {
								setContent(e.target.value);
							}}
						/>
						<input type="submit" value="Edit Todo" />
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default ModalEditTodo;
