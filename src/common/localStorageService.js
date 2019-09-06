export const setLocalStorage = (obj) => {
    localStorage.setItem(obj['name'], obj['value'])
}

export const getLocalStorage = (key) => {
    return localStorage.getItem(key);
}

export const clearLocalStorage = () => {
    return localStorage.clear();
}