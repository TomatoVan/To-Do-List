import {addTask, changeTaskStatus, changeTaskTitle, removeTask, setTasks, tasksReducer} from "../features/Tasks/tasksReducer";
import {addTodolist, removeTodolist, TodolistDomainType, todolistsReducer} from "../features/Todolists/todolistsReducer";
import {TaskPriorities, TaskStatuses} from "../api/TodolistsApi";
import {TasksStateType} from "../features/Todolists/TodolistsList";
import {v1} from "uuid";

let startState: TasksStateType

beforeEach(() => {
	startState = {
		"todolistId1": [
			{ id: "1", title: "CSS", status: TaskStatuses.New, todoListId:'todolistId1', addedDate:'', order: 0, deadline:'', startDate:'',description:'',priority:TaskPriorities.Low},
			{ id: "2", title: "JS", status: TaskStatuses.Completed, todoListId:'todolistId1', addedDate:'', order: 0, deadline:'', startDate:'',description:'',priority:TaskPriorities.Low },
			{ id: "3", title: "React", status: TaskStatuses.New, todoListId:'todolistId1', addedDate:'', order: 0, deadline:'', startDate:'',description:'',priority:TaskPriorities.Low }
		],
		"todolistId2": [
			{ id: "1", title: "bread", status: TaskStatuses.New, todoListId:'todolistId2', addedDate:'', order: 0, deadline:'', startDate:'',description:'',priority:TaskPriorities.Low },
			{ id: "2", title: "milk", status: TaskStatuses.Completed, todoListId:'todolistId2', addedDate:'', order: 0, deadline:'', startDate:'',description:'',priority:TaskPriorities.Low },
			{ id: "3", title: "tea", status: TaskStatuses.New, todoListId:'todolistId2', addedDate:'', order: 0, deadline:'', startDate:'',description:'',priority:TaskPriorities.Low }
		]
	}
})


test('task should be added', () => {
	const endState = tasksReducer(startState, addTask({task: { id: "4", title: "apple", status: TaskStatuses.Completed, todoListId:'todolistId2', addedDate:'', order: 0, deadline:'', startDate:'',description:'',priority:TaskPriorities.Low}}))
		expect(endState["todolistId2"].length).toBe(4);
		expect(endState["todolistId2"][0].title).toBe("apple");
})

test('task should be removed', () => {
	const endState = tasksReducer(startState, removeTask({todolistId: "todolistId1", taskId: "1" }))
	expect(endState["todolistId1"].length).toBe(2);
	expect(endState["todolistId1"][0].title).toBe(startState["todolistId1"][1].title)
})


test('status of specified task should be changed', () => {
	const endState = tasksReducer(startState, changeTaskStatus({todolistId:"todolistId2", status:TaskStatuses.New,taskId: "2"}))

	expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
	expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);

});

test('title of task should be changed', () => {
	const endState = tasksReducer(startState, changeTaskTitle({todolistId:"todolistId2", title:"banana",taskId: "1"}))

	expect(endState["todolistId2"][0].title).toBe("banana");
	expect(endState["todolistId1"][0].title).toBe("CSS");

});

test('new array should be added when new todolist is added', () => {
	const endState = tasksReducer(startState, addTodolist({title:"new todolist", todolistId:v1()}))

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
	const startTodolistsState: Array<TodolistDomainType> = [];

	const action = addTodolist({title: "new todolist", todolistId: v1()});

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistsState = todolistsReducer(startTodolistsState, action)

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	expect(idFromTasks).toBe(action.payload.todolistId);
	expect(idFromTodolists).toBe(action.payload.todolistId);
});


test('property with todolistId should be deleted', () => {
	const endState = tasksReducer(startState, removeTodolist({todolistId: "todolistId2"}))

	const keys = Object.keys(endState);

	expect(keys.length).toBe(1);
	expect(endState["todolistId2"]).not.toBeDefined();
});


test('tasks should be added then we set', () => {
	const endState = tasksReducer({}, setTasks({todolistId:"todolistId1" ,tasks: startState["todolistId1"]	}))
	expect(endState["todolistId1"]).toBeDefined();
	expect(endState["todolistId1"].length).toBe(3);
})




