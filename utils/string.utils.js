function initCap(str) {
     return str.replace(/[a-z]/i, (match) => match.toUpperCase())
}

export {
     initCap
}