export const currency = (value) => {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const capitalize = string => {
    return string.toUpperCase();
}