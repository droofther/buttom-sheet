
const openSheet = document.querySelector(".draggable-content")
const openCLckSheet = document.querySelector(".controls-sheet")
const contentSheet = document.querySelector(".content-sheet")
const sheet = document.querySelector(".sheet")
const draggable = document.querySelector(".container-sheet")

let sheetHeight = 0
let dragPosition = 0

const SheetOpen = () => {
    sheet.classList.add("active")
}
const SheetClose = () => {
    sheet.classList.remove("active")
}
const contentTop = () => {
    contentSheet.scroll({
        top: 0,
        behavior: 'smooth'
    });
}

const setSheetHeight = (value) => {
    if (contentSheet.scrollTop > 3) return

    sheetHeight = Math.max(0, Math.min(100, value))
    if (sheetHeight <= 5) return sheet.style.height = `${40}px`

    sheet.style.height = `${sheetHeight}%`

    if (sheetHeight > 75) {
        contentSheet.style.overflowY = "auto";
        SheetOpen()
    }
    if (sheetHeight <= 75) {
        contentTop()
        contentSheet.style.overflowY = "hidden";
    }
}

openCLckSheet.addEventListener("click", () => {
    let height = Math.min(50, 720 / window.innerHeight * 100)
    contentTop()
    if (sheet.classList.contains("active")) {
        height = 5
        setSheetHeight(5)
        SheetClose()
    } else {
        SheetOpen()
        setSheetHeight(height)
    }
})

const touchPosition = (event) => {
    return event.touches ? event.touches[0] : event
}

const onDragStart = (event) => {
    dragPosition = touchPosition(event).pageY
    sheet.classList.add("not-selectable")
    draggable.style.cursor = document.body.style.cursor = "grabbing"
}

const onDragMove = (event) => {
    if (!dragPosition) return
    const y = touchPosition(event).pageY
    const deltaY = dragPosition - y
    const deltaHeight = deltaY / window.innerHeight * 100
    setSheetHeight(sheetHeight + deltaHeight)

    if (y > 950) return dragPosition = 950
    dragPosition = y
}

const onDragEnd = () => {
    dragPosition = 0
    sheet.classList.remove("not-selectable")
    draggable.style.cursor = document.body.style.cursor = ""

    if (sheetHeight < 25) {
        setSheetHeight(5)
        contentTop()
        SheetClose()
    } else if (sheetHeight > 70) {
        setSheetHeight(100)
        contentSheet.style.overflowY = "auto";
        SheetOpen()
    } else {
        setSheetHeight(50)
        contentSheet.style.overflowY = "hidden";
        SheetOpen()
    }
  
}

draggable.addEventListener("mousedown", onDragStart)
draggable.addEventListener("touchstart", onDragStart)

openSheet.addEventListener("mousedown", onDragStart)
openSheet.addEventListener("touchstart", onDragStart)

window.addEventListener("mousemove", onDragMove)
window.addEventListener("touchmove", onDragMove)

window.addEventListener("mouseup", onDragEnd)
window.addEventListener("touchend", onDragEnd)
// Copyright (c) 2023 WILLY SEGURA
