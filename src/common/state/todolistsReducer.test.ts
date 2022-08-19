import {
	changeTodolistEntityStatus,
	changeTodolistFilter, createTodolist, deleteTodolist,
	FilterValuesType, setTodolists,
	TodolistDomainType,
	todolistsReducer, updateTodolistTitle
} from '../../features/Todolists/todolistsReducer';
import {v1} from 'uuid';

let todolistId1:string
let todolistId2:string
let startState: Array<TodolistDomainType>

beforeEach(() => {
	 todolistId1 = v1();
	 todolistId2 = v1();

	 startState = [
		{id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: "idle"},
		{id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: "idle"}
	]
})

test('correct todolist should be removed', () => {

	const endState = todolistsReducer(startState, deleteTodolist.fulfilled({todolistId:todolistId1}, '', todolistId1))
	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

	let newTodolistTitle = "New Todolist";
	const endState = todolistsReducer(startState, createTodolist.fulfilled({title:newTodolistTitle, todolistId:v1()}, '', newTodolistTitle))

	expect(endState.length).toBe(3);
	expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

	let newTodolistTitle = "New Todolist";
	const endState = todolistsReducer(startState, updateTodolistTitle.fulfilled({todolistId: todolistId2, title: newTodolistTitle}, '', {todolistId: todolistId2, title: newTodolistTitle}));

	expect(endState[0].title).toBe("What to learn");
	expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

	let newFilter: FilterValuesType = "completed";
	const endState = todolistsReducer(startState, changeTodolistFilter({todolistId: todolistId2, filter: newFilter}));

	expect(endState[0].filter).toBe("all");
	expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolist should be changed', () => {

	const endState = todolistsReducer(startState, changeTodolistEntityStatus({todolistId: todolistId1, status: 'succeeded'}));

	expect(endState[0].entityStatus).toBe("succeeded");
	expect(endState[1].entityStatus).toBe("idle");
});

test('todolists should be added then we set', () => {
	const endState = todolistsReducer([], setTodolists.fulfilled({todolists: startState}, '', ))
	expect(endState[0]).toBeDefined();
	expect(endState[1]).toBeDefined();
	expect(endState[0].title).toBe("What to learn");
	expect(endState.length).toBe(2);
})





