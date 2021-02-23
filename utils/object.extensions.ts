export const removeFalsy = (obj: any): any => {
    if (obj) {
        for (let [key, value] of Object.entries(obj)) {
            if (!obj[key]) {
                delete obj[key];
            }
        }
        return obj;
    }
    return undefined;
};
