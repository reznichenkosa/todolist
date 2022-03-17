const sortingByParam = (tasks, sortBy) => {
    switch (sortBy) {
        case ('dateDownUp'):
            return [...tasks].sort((a, b) => a.date - b.date);
        case ('dateUpDown'):
            return [...tasks].sort((a, b) => b.date - a.date);
        case ('doneUpDown'):
            return [...tasks].sort((a, b) => {
                if (a.isDone && !b.isDone) return 1;
                if (!a.isDone && b.isDone) return -1;
                return a.date - b.date;
            });
        case ('doneDownUp'):
            return [...tasks].sort((a, b) => {
                if (a.isDone && !b.isDone) return -1;
                if (!a.isDone && b.isDone) return 1;
                return a.date - b.date;
            });
        case ('titleDownUp'):
            return [...tasks].sort((a,b) => a.title.localeCompare(b.title));
        case ('titleUpDown'):
            return [...tasks].sort((a,b) => b.title.localeCompare(a.title));
        default:
            return [...tasks];
    }
}

export default sortingByParam;