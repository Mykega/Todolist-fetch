import React, { useState, useEffect } from "react";
import { Tareas } from "./lista";
import swal from "sweetalert";
//create your first component

export function Home() {
	const [list, setList] = useState([]);
	const [task, setTask] = useState("");

	useEffect(() => {
		loadtodoList();
	}, []);
	useEffect(() => {
		console.log(list);
		updateTodoList();
	}, [list]);

	const loadtodoList = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Mykega", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => setList(data))
			.catch(error => console.error("Error: ", error));
	};

	const updateTodoList = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Mykega", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(list)
		})
			.then(resp => resp.json())
			.then(data => console.log("Respuesta del servidor: ", data))
			.catch(error => console.error("Error: ", error));
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (task === "") {
			myAlert();
		} else {
			setList([...list, { label: task, done: false }]);
		}
		setTask("");
		console.log(list);
	};

	const newTodoList = () => {
		let listArray = [];
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Mykega", {
			method: "POST",
			body: JSON.stringify(listArray),
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => {
				console.log("newTodoList ", data);
				loadtodoList();
			})
			.catch(error => console.error("Error: ", error));
	};

	const handleChange = e => {
		setTask(e.target.value);
	};
	const deleteEverything = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Mykega", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => {
				newTodoList();
				console.log(data);
			})
			.catch(error => console.error("Error: ", error));
	};

	const myAlert = () => {
		swal({
			title: "Oops!",
			text: "Need to add a task",
			icon: "warning",
			button: "Okay!"
		});
	};
	return (
		<React.Fragment>
			<div className="text-center">
				<p>todos</p>
			</div>
			{/*<p>{JSON.stringify(task)}</p>
			<p>{JSON.stringify(list)}</p>*/}
			<div className="formDiv">
				<form className="formulario" onSubmit={e => handleSubmit(e)}>
					<input
						type="text"
						placeholder="What needs to be done?"
						onChange={e => handleChange(e)}
						value={task}
					/>
				</form>
				<Tareas
					list={list}
					updateList={setList}
					updateTodoList={updateTodoList}
				/>
				<cite>{"Pending tasks: " + list.length}</cite>
			</div>
			<div className="btnDeleteContainer">
				<button
					onClick={() => {
						deleteEverything();
					}}
					className="deleteAllButton">
					Delete Everything
				</button>
			</div>
		</React.Fragment>
	);
}
