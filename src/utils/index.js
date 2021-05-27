export const shuffle = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = temp
  }
  return _arr
}
