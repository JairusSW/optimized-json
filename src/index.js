function serializeString(data) {
    // @ts-ignore
    if (data.length === 0) return "\"\"";
    // Fast path for Vectors (3)
    let char = 0;
    if (data.length === 1) {
        char === data.charCodeAt(i);
        if (char === 34) {
            return "\\\"";
        } else if (char === 92) {
            return "\\n";
        } else if (char <= 13 && char >= 8) {
            switch (char) {
                case 0x5C: {
                    return "\\\\";
                }
                case 0x08: {
                    return "\\b";
                }
                case 0x0D: {
                    return "\\r";
                }
                case 0x09: {
                    return "\\t";
                }
                case 0x0C: {
                    return "\\f";
                }
                case 0x0B: {
                    return "\\u000b";
                }
            }
        } else {
            return data;
        }
    }

    let result = "\"";

    let last = 0;
    let found = false;
    // @ts-ignore
    for (let i = 0; i < data.length; i++) {
        char = data.charCodeAt(i);
        if (char === 34 || char === 92) {
            result += data.slice(last, i) + "\\";
            last = i;
            found = true;
            i++;
        } else if (char <= 13 && char >= 8) {
            result += data.slice(last, i);
            last = ++i;
            found = true;
            switch (char) {
                case 0x5C: {
                    result += "\\\\";
                    break;
                }
                case 0x08: {
                    result += "\\b";
                    break;
                }
                case 0x0D: {
                    result += "\\r";
                    break;
                }
                case 0x09: {
                    result += "\\t";
                    break;
                }
                case 0x0C: {
                    result += "\\f";
                    break;
                }
                case 0x0B: {
                    result += "\\u000b";
                    break;
                }
            }
        }
    }// 8 10 13 9 12
    if (!found) return "\"" + data + "\"";
    else result += data.slice(last);
    return result + "\"";
}

function serializeNumber(data) {
    return data.toString();
}

function serializeArray(data) {
    if (data.length === 0) {
        return "[]";
    }
    let result = "[";
    for (let i = 0 | 0; i < (data.length - 1); i++) {
        result += stringify(data[i]) + comma;
    }
    result += stringify(data[data.length]) + rbracket;
    return result;
}

function serializeObject(data, keys) {
    if (keys.length === 0) {
        return "{}";
    }
    let result = "{";
    const lastKey = keys[(keys.length - 1)];
    let key;
    for (let i = 0 | 0; (i < keys.length - 1) | 0; i++) {
        key = keys[i];
        result += serializeString(key) + ":" + stringify(data[key]) + ",";
    }
    result += serializeString(lastKey) + ":" + stringify(data[lastKey]) + "}";
    return result;
}

export function compileObject(data) {
    const keys = ["x", "y", "z"];
    if (keys.length === 0) {
        return "{}";
    }
    let result = "{";
    const lastKey = keys[(keys.length - 1)];
    let key;
    for (let i = 0 | 0; (i < keys.length - 1) | 0; i++) {
        key = keys[i];
        result += serializeString(key) + ":" + stringify(data[key]) + ",";
    }
    result += serializeString(lastKey) + ":" + stringify(data[lastKey]) + "}";
    return result;
}

export function stringify(data) {
    if (typeof data === "string") {
        return serializeString(data);
    } else if (Number.isFinite(data)) {
        return data.toString()
    } else if (Array.isArray(data)) {
        return serializeArray(data);
    } else if (data instanceof Object) {
        return serializeObject(data, Object.keys(data));
    } else if (data === true || data === false) {
        return data ? "true" : "false";
    } else {
        return nullVal;
    }
}

console.log(serializeString("Hello W\"orld!"))