const initialState = {
    tasks: [],
    tasksLoadingStatus: 'idle',
    filter: 'all',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ('TASKS_FETCHING'):
            return {
                ...state,
                tasksLoadingStatus: 'loading'
            }
        case ('TASKS_FETCHED'):
            return {
                ...state,
                tasks: action.payload,
                tasksLoadingStatus: 'idle'
            }
        case ('TASKS_FETCHING_ERROR'):
            return {
                ...state,
                tasksLoadingStatus: 'error'
            }
        case ('TASK_CREATE'):
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                tasksLoadingStatus: 'idle'
            }
        case ('TASK_DELETE'):
            return {
                ...state,
                tasks: state.tasks.filter(item => item.id !== action.payload),
                tasksLoadingStatus: 'idle'
            }
        case ('TASK_CHANGE'):
            return {
                ...state,
                tasks: state.tasks.map(item => item.id === action.payload.id ? {...item, ...action.payload} : item),
                tasksLoadingStatus: 'idle'
            }

        case ('FILTER_SET'):
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
}

export default reducer;