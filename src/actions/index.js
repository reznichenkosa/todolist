export const tasksFetching = () => {
    return {
        type: 'TASKS_FETCHING'
    }
}

export const tasksFetched = (data) => {
    return {
        type: 'TASKS_FETCHED',
        payload: data
    }
}

export const tasksFetchingError = () => {
    return {
        type: 'TASKS_FETCHING_ERROR'
    }
}

export const taskCreate = (data) => {
    return {
        type: 'TASK_CREATE',
        payload: data
    }
}

export const taskDelete = (id) => {
    return {
        type: 'TASK_DELETE',
        payload: id
    }
}

export const taskChange = (changesTask) => {
    return {
        type: 'TASK_CHANGE',
        payload: changesTask
    }
}

export const filterSet = (filter) => {
    return {
        type: 'FILTER_SET',
        payload: filter
    }
}

