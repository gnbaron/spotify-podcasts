const updateCustomVariable = () => {
  const doc = document.documentElement
  doc.style.setProperty('--vh', `${window.innerHeight}px`)
}

export function addViewportHeightListener() {
  window.addEventListener('resize', updateCustomVariable)
  updateCustomVariable()
  return () => window.removeEventListener('resize', updateCustomVariable)
}
