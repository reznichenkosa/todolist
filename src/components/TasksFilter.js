import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterSet, taskDelete, tasksFetchingError, taskChange } from '../actions';
import { useHttp } from '../hooks/http.hook';

const TasksFilter = () => {

    const {tasks} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onFilterSet = (value) => {
        dispatch(filterSet(value));
    }

    const onDelete = useCallback((id) => {
        request("http://localhost:3001/tasks/" + id, 'DELETE')
               .then(dispatch(taskDelete(id)))
               .catch(() => dispatch(tasksFetchingError()));
    }, [request, dispatch]);

    const onDone = useCallback((item) => {
        const changesTask = {...item, isDone: !item.isDone}
        request("http://localhost:3001/tasks/" + item.id, 'PUT', JSON.stringify(changesTask))
               .then(dispatch(taskChange(changesTask)))
               .catch(() => dispatch(tasksFetchingError()));
    }, [request, dispatch]);

    const onDeleteAllDone = () => {
        if (window.confirm('Do you want to delete all done task?')) {
            tasks.forEach(item => {
                if (item.isDone) {
                    onDelete(item.id)
                }
            })
        }
    }

    const onDoneAll = () => {
        tasks.forEach(item => {
            if (!item.isDone) {
                onDone(item)
            }
        })
    }

    return (
        <div className="row mt-4 d-flex justify-content-between">
            <div className="col-lg-4 col-md-3 offset-lg-2 offset-md-1">
                <button onClick={() => onFilterSet('all')} type="button" className="btn btn-outline-success me-1">All</button>
                <button onClick={() => onFilterSet(false)} type="button" className="btn btn-outline-success me-1">Waiting</button>
                <button onClick={() => onFilterSet(true)} type="button" className="btn btn-outline-success">Done</button>
            </div>
            <div className="col-lg-4 col-md-3">
                <button onClick={onDoneAll} type="button" className="btn btn-success me-1">All done</button>
                <button onClick={onDeleteAllDone} type="button" className="btn btn-success me-1">Delete done</button>
            </div>
        </div>
    );
};

export default TasksFilter;