const buttons = document.querySelectorAll(".btn")
const c_content = document.querySelector(".c-container__content")

const handleButtons = ({ target: el }) => {
  const newClass = el.getAttribute("data-toggle")
  if(!newClass) return
  c_content.className = `c-container__content ${newClass}`
}

buttons.forEach( button => button.addEventListener("click", handleButtons) )