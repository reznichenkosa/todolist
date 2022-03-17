import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tasksFetchingError, taskCreate } from '../actions';
import { useHttp } from '../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';

const TaskForm = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onCreate = (e) => {
        e.preventDefault();
        const newTask = {id: uuidv4(), title, description, isDone: false, date: Date.now()}
        request("http://localhost:3001/tasks", 'POST', JSON.stringify(newTask))
               .then(() => dispatch(taskCreate(newTask)))
               .catch(() => dispatch(tasksFetchingError));

        setDescription('');
        setTitle('');
    }
   
    return (
        <div className="row mt-4">
            <div className="col-lg-8 col-md-10 mx-auto">
                <form onSubmit={onCreate}>
                    <div className="input-group mb-3">
                        <input required value={title} onChange={(e) => setTitle(e.target.value)} tabIndex="1" type="text" className="form-control" placeholder="Enter your task" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button className="btn btn-success" type="submit" id="button-addon2"><i className="bi bi-plus-lg"></i></button>
                    </div>
                    <div className="mt-3">
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} tabIndex={2} className="form-control" id="exampleFormControlTextarea1" placeholder='Enter comment for your task' rows="3"></textarea>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;