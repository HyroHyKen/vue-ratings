export function serialize(value) {
    if (typeof value === 'function') {
        return value.toString();
    }
    if (typeof value === 'object') {
        var serializeObject = {};
        for (const [objectKey, objectValue] of Object.entries(value)) {
            serializeObject[objectKey] = serialize(objectValue);
        }
        return serializeObject;
    }

    return value;
}

export function deserialize(valueNew) {

    if (typeof valueNew === 'object') {
        var deserializeObject = {};
        for (const [objectKey, objectValue] of Object.entries(valueNew)) {
            deserializeObject[objectKey] = deserialize(objectValue);
        }
        return deserializeObject;
    }

    return valueNew;
}