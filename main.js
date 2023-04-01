
const openSheetButton = document.querySelector(".draggable-area")

const sheetContents = document.querySelector(".sheet")
const draggableArea = document.querySelector(".draggable-area")

let sheetHeight = 0
const SheetOpen = () => {
    sheet.classList.add("active")
}
const SheetClose = () => {
    sheet.classList.remove("active")
}

const setSheetHeight = (value) => {

    sheetHeight = Math.max(0, Math.min(100, value))
    if (sheetHeight <= 5) return sheetContents.style.height = `${5}vh`

    sheetContents.style.height = `${sheetHeight}vh`

    if (sheetHeight >= 100) {
        sheetContents.classList.add("fullscreen")
    } else {
        sheetContents.classList.remove("fullscreen")
    }
}


// Open the sheet when clicking the 'open sheet' button
openSheetButton.addEventListener("click", () => {
    let height = Math.min(50, 720 / window.innerHeight * 100)
    if (sheet.classList.contains("active")) {
        setSheetHeight(5)
        height = 5
        SheetClose()
    } else {
        SheetOpen()
        console.log("add")
        setSheetHeight(height)
    }
})


const isFocused = element => document.activeElement === element

window.addEventListener("keyup", (event) => {
    const isSheetElementFocused =
        sheet.contains(event.target) && isFocused(event.target)

    if (event.key === "Escape" && !isSheetElementFocused) {
        SheetClose(false)
    }
})

const touchPosition = (event) =>
    event.touches ? event.touches[0] : event

let dragPosition

const onDragStart = (event) => {
    dragPosition = touchPosition(event).pageY
    sheetContents.classList.add("not-selectable")
    draggableArea.style.cursor = document.body.style.cursor = "grabbing"
}

const onDragMove = (event) => {
    if (dragPosition === undefined) return

    const y = touchPosition(event).pageY
    const deltaY = dragPosition - y
    const deltaHeight = deltaY / window.innerHeight * 100

    setSheetHeight(sheetHeight + deltaHeight)

    if (y > 950) return dragPosition = 950
    dragPosition = y
}

const onDragEnd = () => {
    dragPosition = undefined
    sheetContents.classList.remove("not-selectable")
    draggableArea.style.cursor = document.body.style.cursor = ""

    if (sheetHeight < 25) {
        setSheetHeight(5)
        SheetClose()
    } else if (sheetHeight > 75) {
        setSheetHeight(90)
        SheetOpen()
    } else {
        setSheetHeight(50)
        SheetOpen()
    }
}

draggableArea.addEventListener("mousedown", onDragStart)
draggableArea.addEventListener("touchstart", onDragStart)

window.addEventListener("mousemove", onDragMove)
window.addEventListener("touchmove", onDragMove)

window.addEventListener("mouseup", onDragEnd)
window.addEventListener("touchend", onDragEnd)
// Copyright (c) 2023 WILLY SEGURA
