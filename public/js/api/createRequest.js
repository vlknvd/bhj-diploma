/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData;
    let url;

    if(options.method === 'GET') {
        if(options.data) {
            let dataValue = Object.values(options.data);
            url = options.url + '?' + dataValue[0] + '&' + dataValue[1];
        }
        url = options.url;
    } else {
        for (const [key,value] in Object.entries(options.data)) {
            formData.append[key, value];
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
