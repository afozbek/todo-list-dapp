// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

contract TodoList {
    uint256 public todoCount = 0;

    struct Todo {
        uint256 id;
        string content;
        bool completed;
        bool isExist;
    }

    mapping(uint256 => Todo) public todos;

    event TodoCreated(uint256 id, string content, bool completed);

    event TodoCompleted(uint256 id, bool completed);

    event TodoDeleted(uint256 _id, bool isExist);

    constructor() {
        createTodo("Markete gitmelisin");
    }

    function getTodo(uint256 id) public view returns (Todo memory) {
        return todos[id];
    }

    function createTodo(string memory _content) public payable {
        todoCount++;
        todos[todoCount] = Todo(todoCount, _content, false, true);
        emit TodoCreated(todoCount, _content, false);
    }

    function toggleCompleted(uint256 _id) public payable {
        Todo memory _todo = todos[_id];
        _todo.completed = !_todo.completed;
        todos[_id] = _todo;
        emit TodoCompleted(_id, _todo.completed);
    }

    function editTodo(uint256 _id, string memory _content) public payable {
        Todo memory todo = todos[_id];
        todo.completed = !todo.completed;
        todo.content = _content;

        todos[_id] = todo;
        emit TodoCompleted(_id, todo.completed);
    }

    function deleteTodo(uint256 _id) public payable {
        Todo memory todo = todos[_id];
        todo.isExist = false;

        todos[_id] = todo;
        emit TodoDeleted(_id, todo.isExist);
    }
}
