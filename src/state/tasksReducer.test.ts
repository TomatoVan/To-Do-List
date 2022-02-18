import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask, tasksReducer} from "./tasksReducer";
import {TasksStateType, TodolistsType} from "../App";
import {AddTodolist, RemoveTodolist, todolistsReducer} from "./todolistsReducer";

let startState: TasksStateType

beforeEach(() => {
	startState = {
		"todolistId1": [
			{ id: "1", title: "CSS", isDone: false },
			{ id: "2", title: "JS", isDone: true },
			{ id: "3", title: "React", isDone: false }
		],
		"todolistId2": [
			{ id: "1", title: "bread", isDone: false },
			{ id: "2", title: "milk", isDone: true },
			{ id: "3", title: "tea", isDone: false }
		]
	}
})


test('correct task should be deleted from correct array', () => {
	const endState = tasksReducer(startState, RemoveTask("todolistId2", "2"))

	expect(endState).toEqual({
		"todolistId1": [
			{ id: "1", title: "CSS", isDone: false },
			{ id: "2", title: "JS", isDone: true },
			{ id: "3", title: "React", isDone: false }
		],
		"todolistId2": [
			{ id: "1", title: "bread", isDone: false },
			{ id: "3", title: "tea", isDone: false }
		]
	});

});


test('correct task should be added to correct array', () => {
	const endState = tasksReducer(startState, AddTask("todolistId2","juice" ))

	expect(endState["todolistId1"].length).toBe(3);
	expect(endState["todolistId2"].length).toBe(4);
	expect(endState["todolistId2"][0].id).toBeDefined();
	expect(endState["todolistId2"][0].title).toBe("juice");
	expect(endState["todolistId2"][0].isDone).toBe(false);
})


test('status of specified task should be changed', () => {
	const endState = tasksReducer(startState, ChangeTaskStatus("todolistId2", false, "2"))

	expect(endState["todolistId2"][1].isDone).toBe(false);
	expect(endState["todolistId1"][1].isDone).toBe(true);

});

test('title of task should be changed', () => {
	const endState = tasksReducer(startState, ChangeTaskTitle("todolistId2", "banana", "1"))

	expect(endState["todolistId2"][0].title).toBe("banana");
	expect(endState["todolistId1"][0].title).toBe("CSS");

});

test('new array should be added when new todolist is added', () => {
	const endState = tasksReducer(startState, AddTodolist("new todolist"))

	const keys = Object.keys(endState);
	const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
	if (!newKey) {
		throw Error("new key should be added")
	}

	expect(keys.length).toBe(3);
	expect(endState[newKey]).toEqual([]);
});

test('ids should be equals', () => {
	const startTasksState: TasksStateType = {};
	const startTodolistsState: Array<TodolistsType> = [];

	const action = AddTodolist("new todolist");

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	expect(idFromTasks).toBe(action.payload.todolistId);
	expect(idFromTodolists).toBe(action.payload.todolistId);
});


test('property with todolistId should be deleted', () => {
	const endState = tasksReducer(startState, RemoveTodolist("todolistId2"))

	const keys = Object.keys(endState);

	expect(keys.length).toBe(1);
	expect(endState["todolistId2"]).not.toBeDefined();
});







