
const getFullDate = (date) => {

    const addZeroValue = (value) => value < 10 ? "0" + value : value;

    let month = date.getMonth();
    const year = date.getFullYear(),
          day = addZeroValue(date.getDate()),
          hourse = addZeroValue(date.getHours()),
          minutes = addZeroValue(date.getMinutes()),
          seconds = addZeroValue(date.getSeconds());
          
    switch (month) {
        case 0: month="JANUARY"; break;
        case 1: month="FEBRUARY"; break;
        case 2: month="MARCH"; break;
        case 3: month="APRIL"; break;
        case 4: month="MAY"; break;
        case 5: month="JUNE"; break;
        case 6: month="JULY"; break;
        case 7: month="AUGUST"; break;
        case 8: month="SEPTEMBER"; break;
        case 9: month="OCTOBER"; break;
        case 10: month="NOVEMBER"; break;
        case 11: month="DECEMBER"; break;
        default: break;
    }

    return `${day} ${month} ${year} ${hourse}:${minutes}:${seconds}`;
}

export default getFullDate;