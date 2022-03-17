import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../hooks/http.hook';
import TasksListItem from './TasksListItem';
import { tasksFetching, tasksFetched, tasksFetchingError, taskDelete, taskChange } from '../actions/index';
import Task from './Task';

import sortingByParam from '../utils/sorting';

const TasksList = () => {

    const { tasks, tasksLoadingStatus, filter } = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [sort, setSort] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [editTask, setEditTask] = useState(false);

    const filteredTasks = filter === "all" ? tasks :
                          filter ? tasks.filter(item => item.isDone) : tasks.filter(item => !item.isDone)

    useEffect(() => {
        dispatch(tasksFetching());
        request("http://localhost:3001/tasks")
               .then(data => dispatch(tasksFetched(data)))
               .catch(() => dispatch(tasksFetchingError()));
    }, []);

    const onDelete = useCallback((id) => {
        request("http://localhost:3001/tasks/" + id, 'DELETE')
            .then(dispatch(taskDelete(id)))
            .catch(() => dispatch(tasksFetchingError()));
    }, [request, dispatch]);

    const onChange = useCallback((item, params) => {
        const changesTask = {...item, ...params}
        request("http://localhost:3001/tasks/" + item.id, 'PUT', JSON.stringify(changesTask))
               .then(dispatch(taskChange(changesTask)))
               .catch(() => dispatch(tasksFetchingError()));
    }, [request, dispatch]);

    const sortedAndFilteredTask = sortingByParam(filteredTasks, sort);

    return (
        <div className="row mt-4">
            <div className="col-lg-8 col-md-10 mx-auto">
            
                {tasksLoadingStatus === "loading" ? 
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : sortedAndFilteredTask.length === 0 ? 
                    <div className="d-flex justify-content-center">
                        <div className="badge bg-success text-wrap text-center mx-auto">
                            There are not tasks
                        </div>
                    </div> :
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th onClick={() => sort === 'doneUpDown' ? setSort('doneDownUp') : setSort('doneUpDown')} className='pointer col-1 text-center'>Ok <i className={sort === 'doneUpDown' ? "bi bi-arrow-down active" : "bi bi-arrow-down"}></i></th>
                                <th onClick={() => sort === 'titleUpDown' ? setSort('titleDownUp') : setSort('titleUpDown')} className='pointer'>Tasks <i className={sort === 'titleUpDown' ? "bi bi-arrow-down active" : "bi bi-arrow-down"}></i></th>
                                <th onClick={() => sort === 'dateUpDown' ? setSort('dateDownUp') : setSort('dateUpDown')} className='pointer col-3 text-end'>Date <i className={sort === 'dateUpDown' ? "bi bi-arrow-down active" : "bi bi-arrow-down"}></i></th>
                                <th className='col-1 text-end'>Edit</th>
                                <th className='col-1 text-center'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sortedAndFilteredTask.map(item => <TasksListItem setEditTask={setEditTask} setCurrentTask={setCurrentTask} onDone={() => onChange(item, {isDone: !item.isDone})} onDelete={() => onDelete(item.id)} key={item.id} {...item}/>)
                            }
                        </tbody>
                    </table>
                }
                <Task {...currentTask} setCurrentTask={setCurrentTask} onChange={onChange} setEditTask={setEditTask} editTask={editTask}/>
            </div>
        </div>
    );
};

export default TasksList;