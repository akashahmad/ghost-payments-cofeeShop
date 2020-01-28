export const distinct = (array, key) => {
    let flags = [], output = [], l = array.length, i;
    for (i = 0; i < l; i++) {
        if (flags[array[i][key]] + "" !== "undefined") {
            output[flags[array[i][key]]] = array[i];
            continue;
        }
        output.push(array[i]);
        flags[array[i][key]] = output.length - 1;
    }
    return output
};
export const distinctArray = (array) => {
    return array.filter(ditinctFunction)
};

const ditinctFunction = (value, index, self) => {
    return self.indexOf(value) === index;
};