/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData;
    let url; 
    let arr = [];

    if(options.method === 'GET' && options.data) {
        for (let [key,value] of Object.entries(options.data)) {
            arr.push(key + '=' + value);
            url = options.url + '?' + arr.join('&')
        }    
    } else if (!(options.method === 'GET')) {
        for (const [key,value] in Object.entries(options.data)) {
            formData.append(key, value);
        }
        
        url = options.url;
    }

    xhr.responseType = 'json';

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch (e) {
        return new Error('Что-то пошло не так', e);
    }

    xhr.onload = () => options.callback(xhr.error, xhr.response);
};
