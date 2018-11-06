export const debounce = (fn, time = 300) => {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => fn(...args), time);
    };
};
