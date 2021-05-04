import React from "react";
import "../../styles/index.scss";
import PropTypes from "prop-types";

export function Tareas(props) {
	const deleteTask = index => {
		const newList = props.list.filter((item, indexit) => {
			return indexit != index;
		});

		props.updateList(newList);
		props.updateTodoList();
	};
	return (
		<div className="listaDiv">
			<ul>
				{props.list.map((tarea, index) => {
					return (
						<div className="lista" key={index}>
							<li>
								<i
									id="pushpin"
									className="fas fa-thumbtack"></i>
								{tarea.label}
								<button onClick={() => deleteTask(index)}>
									<i className="fas fa-times"></i>
								</button>
							</li>
						</div>
					);
				})}
			</ul>
		</div>
	);
}
Tareas.propTypes = {
	list: PropTypes.array,
	updateList: PropTypes.func,
	updateTodoList: PropTypes.func
};
