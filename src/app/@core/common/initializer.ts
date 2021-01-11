export const initializeObject = <TTarget, TSource>(target: TTarget, source: TSource) => {
    if (target === undefined || source === undefined) {
        return;
    }
    Object.keys(source).forEach(key => {
        target[key] = source[key];
    });
};

export const titleCase = str => {
    if (str) {
        str = str.toLowerCase().split(' ');
        for (let i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    } else {
        return '';
    }
};

export const hasMatch = (left: Array<string>, right: Array<string>) => {
    const intersected = right.reduce((acc, curr) => {
        return [...acc, ...left.filter(item => item.trim().toUpperCase() === curr.trim().toUpperCase())];
    }, []);
    return intersected.length > 0;
};

export const groupBy = (items, key) =>
    items.reduce(
        (result, item) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item]
        }),
        {}
    );
export const toMilliSeconds = (h, m, s) => (h * 60 * 60 + m * 60 + s) * 1000;

// Usage
export const dhm = t => {
    // tslint:disable-next-line:prefer-const
    let cd = 24 * 60 * 60 * 1000,
        // tslint:disable-next-line:prefer-const
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000),
        // tslint:disable-next-line:prefer-const
        pad = function(n) {
            return n < 10 ? '0' + n : n;
        };
    if (m === 60) {
        h++;
        m = 0;
    }
    if (h === 24) {
        d++;
        h = 0;
    }
    return d + ' days : ' + pad(h) + ' hours : ' + pad(m) + ' mins ';
};

export const countdown = (function() {
    const pad = t => {
        return (t + '').length < 2 ? pad('0' + t + '') : t;
    };
    return s => {
        const d = Math.floor(s / (3600 * 24));
        s -= d * 3600 * 24;
        const h = Math.floor(s / 3600);
        s -= h * 3600;
        const m = Math.floor(s / 60);
        s -= m * 60;
        const tmp = [];
        // tslint:disable-next-line:no-unused-expression
        d && tmp.push(d + 'd');
        // tslint:disable-next-line:no-unused-expression
        (d || h) && tmp.push(h + 'h');
        // tslint:disable-next-line:no-unused-expression
        (d || h || m) && tmp.push(m + 'm');
        tmp.push(s + 's');
        return tmp.join(' ');
    };
})();

export class ObjectUtils {
    static getChildObjectValue = (o, id) => {
        if (o[id] === id) {
            return o;
        }
        let result, p;
        for (p in o) {
            if (o.hasOwnProperty(p) && typeof o[p] === 'object') {
                if (o[p]) {
                    result = ObjectUtils.getChildObjectValue(o[p], id);
                    if (result) {
                        return result;
                    }
                }
            }
        }
        return result;
    }
    static getNestedObject = (nestedObj, pathArr) => {
        return pathArr.reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined), nestedObj);
    }
    // tslint:disable-next-line:max-line-length
    static removeEmptyProperties = <TSource>(source: TSource, removeEmpty: boolean = true, removeNull: boolean = true, removeFalse: boolean = true) => {
        if (source === undefined) {
            return;
        }
        Object.keys(source).forEach(key => {
            if (removeNull && (source[key] === null || source[key] === undefined)) {
                delete source[key];
            }
            if (removeEmpty && source[key] === '') {
                delete source[key];
            }
            if (removeFalse && source[key] === false) {
                delete source[key];
            }
        });
    }

    static objectsAreSame(x, y) {
        let objectsAreSame = true;
        for (const propertyName in x) {
            if (x[propertyName] !== y[propertyName]) {
                objectsAreSame = false;
                break;
            }
        }
        return objectsAreSame;
    }

    static isArrayEqual(value, other) {
        // Get the value type
        const type = Object.prototype.toString.call(value);

        // If the two objects are not the same type, return false
        if (type !== Object.prototype.toString.call(other)) {
            return false;
        }

        // If items are not an object or array, return false
        if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
            return false;
        }

        // Compare the length of the length of the two items
        const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
        const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
        if (valueLen !== otherLen) {
            return false;
        }

        // Compare two items
        const compare = function(item1, item2) {
            // Get the object type
            const itemType = Object.prototype.toString.call(item1);

            // If an object or array, compare recursively
            if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
                if (!ObjectUtils.isArrayEqual(item1, item2)) {
                    return false;
                }
            } else {
                // If the two items are not the same type, return false
                if (itemType !== Object.prototype.toString.call(item2)) {
                    return false;
                }

                // Else if it's a function, convert to a string and compare
                // Otherwise, just compare
                if (itemType === '[object Function]') {
                    if (item1.toString() !== item2.toString()) {
                        return false;
                    }
                } else {
                    if (item1 !== item2) {
                        return false;
                    }
                }
            }
        };

        // Compare properties
        if (type === '[object Array]') {
            for (let i = 0; i < valueLen; i++) {
                if (compare(value[i], other[i]) === false) {
                    return false;
                }
            }
        } else {
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    if (compare(value[key], other[key]) === false) {
                        return false;
                    }
                }
            }
        }

        // If nothing failed, return true
        return true;
    }

    static groupBy(array: any[], f: Function) {
        const groups = {};
        array.forEach(o => {
            const group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        return Object.keys(groups).map(group => {
            return groups[group];
        });
    }

    static checkTrueProperty = <TSource>(source: TSource, count: number = 0) => {
        if (source === undefined) {
            return;
        }
        Object.keys(source).forEach(key => {
            if (source[key] === true) {
                count++;
            }
        });

        return count;
    }
}
