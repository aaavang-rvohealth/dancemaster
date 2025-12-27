export let count = 0
let headerText
let isHeaderFrozen = false
export const freezeHeader = () => {
    isHeaderFrozen = true
}

export const unfreezeHeader = () => {
    isHeaderFrozen = false
}

export const updateHeader = (text) => {
    if (text && !isHeaderFrozen) {
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