import {AddTodolist, ChangeFilter, ChangeTitle, FilterValuesType, RemoveTodolist, TodolistDomainType, todolistsReducer} from './todolistsReducer';
import {v1} from 'uuid';
import {TodolistType} from "../components/api/TodolistsApi";

let todolistId1:string
let todolistId2:string
let startState: Array<TodolistDomainType>

beforeEach(() => {
	 todolistId1 = v1();
	 todolistId2 = v1();

	 startState = [
		{id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0,},
		{id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0,}
	]
})

test('correct todolist should be removed', () => {

	const endState = todolistsReducer(startState, RemoveTodolist(todolistId1))
	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

	let newTodolistTitle = "New Todolist";
	const endState = todolistsReducer(startState, AddTodolist(newTodolistTitle))

	expect(endState.length).toBe(3);
	expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

	let newTodolistTitle = "New Todolist";
	const endState = todolistsReducer(startState, ChangeTitle(todolistId2, newTodolistTitle));

	expect(endState[0].title).toBe("What to learn");
	expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	let newFilter: FilterValuesType = "completed";

	const startState: Array<TodolistDomainType> = [
		{id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0,},
		{id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0,}
	]

	const endState = todolistsReducer(startState, ChangeFilter(todolistId2, newFilter));

	expect(endState[0].filter).toBe("all");
	expect(endState[1].filter).toBe(newFilter);
});




