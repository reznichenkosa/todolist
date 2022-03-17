import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import getFullDate from '../utils/date';


const TasksListItem = (props) => {
    const {setEditTask, setCurrentTask, onDone, onDelete, id, title, description, isDone, date} = props;
    const task = {id, title, description, isDone, date};
    const dateFull = getFullDate(new Date(date));

    const deleteItem = () => {
        if(window.confirm('Do you want to delete this task?')) onDelete();
    }

    const onEditTask = (data) => {
        setCurrentTask(task);
        setEditTask(true);
    }
    
    return (
        <motion.tr transition={{duration: .5}} initial={{scale: 0}} animate={{ scale: 1 }} exit={{ scale: 0 }} className="table-outline">
            <td onClick={onDone} className='pointer col-1 text-center'>
                <i className={isDone ? "bi bi-check-square" : "bi bi-square"}></i>
            </td>
            <td onClick={() => setCurrentTask(task)}
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                className={isDone ? "pointer text-decoration-line-through " : 'pointer'}>
                {title}
            </td>
            <td className='col-3 text-end'>
                <span className="date">{dateFull}</span>
            </td>
            <td onClick={() => onEditTask(task)}
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                className='pointer col-1 text-end'><i className="bi bi-pencil"></i></td>
            <td onClick={deleteItem} className='pointer col-1 text-center'><i className="bi bi-trash3"></i></td>
        </motion.tr>
    );
};

export default TasksListItem;