import React, { useEffect, useState } from 'react';
import getFullDate from '../utils/date';

const Task = ({setCurrentTask, onChange, setEditTask, editTask, id, title, description, isDone, date}) => {

    const dateFull = getFullDate(new Date(date));
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    useEffect(() =>{
        if (title) setNewTitle(title);
        if (description) setNewDescription(description);
    }, [editTask]);


    const changedTask = {id, title: newTitle, description: newDescription, isDone, date};

    const onSubmit = (e) => {
        e.preventDefault();
        onChange(changedTask);
        setEditTask(false);
        setCurrentTask(changedTask);
    }

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    { !editTask ?
                        <>
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
                                <button onClick={() => setEditTask(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p className='date'>{dateFull}</p>
                                {description ? description :
                                    <div className="d-flex justify-content-center">
                                        <div className="badge bg-success text-wrap text-center mx-auto">
                                            There are not description
                                        </div>
                                    </div>
                                }
                                
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => setEditTask(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={() => setEditTask(true)} type="button" className="btn btn-primary">Edit</button>
                            </div>
                        </>
                        :
                        <form onSubmit={onSubmit}>
                            <div className="modal-header">
                                <input required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} type="text" className="form-control" placeholder="Enter your task" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                <button onClick={() => setEditTask(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p className='date'>{dateFull}</p>
                                <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="form-control" id="exampleFormControlTextarea1" placeholder='Enter comment for your task' rows="3"></textarea>          
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => setEditTask(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Change</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>



    );
};

export default Task;