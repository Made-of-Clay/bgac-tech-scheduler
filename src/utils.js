export function uniqid(prefixParam = '') {
    let prefix = (isString(prefixParam) && prefixParam !== '') ? `${prefixParam}-` : '';
    let newID = `${prefix}${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

    if (document && document.getElementById(newID)) {
        newID = uniqid(prefixParam);
    }
    return newID;

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}

export function isString(val) {
    return typeof val === 'string';
}

export function isArray(val) {
    return Array.isArray(val);
}

export function isObject(value) {
    return typeof value === 'object' && value instanceof Object;
}

export function isProp(key, object) {
    return key in object;
}

export function clone(obj, deep = false) {
    if (deep) {
        let copy = isArray(obj) ? [] : {};
        for (let key in obj) {
            let value = obj[key];
            if (isArray(value) || isObject(value)) {
                copy[key] = clone(value, deep);
            } else {
                copy[key] = value;
            }
        }
        return copy;
    } else {
        return Object.assign({}, obj);
    }
}

export function inObject(value, object) {
    let values = Object.values;
    if (!values) {
        values = obj => {
            let arr = [];
            for (let key in obj) {
                arr.push(obj[key]);
            }
            return arr;
        };
    }
    return (values(object)).indexOf(value) > -1;
}
