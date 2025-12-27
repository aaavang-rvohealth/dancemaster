export let count = 0
let headerText
export let freezeHeader = false
export const updateHeader = (text) => {
    if (text && !freezeHeader) {
        headerText = text
    }
    const header = document.getElementById('header')
    header.innerHTML = `${headerText} - ${(count % 8) + 1}`
}
export const clearHeader = () => {
    const header = document.getElementById('header')
    header.innerHTML = ''
}
export const tick = () => {
    count++;
    updateHeader();
}

export const resetCount = () => {
    count = 0
}