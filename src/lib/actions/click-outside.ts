export default (node: HTMLElement, handler: () => void) => {
  const onClick = (event: Event) => {
    !node.contains(event.target as HTMLElement) &&
    !event.defaultPrevented &&
    handler()
  }

  document.addEventListener('click', onClick, true)

  return {
    destroy() {
      document.removeEventListener('click', onClick, true)
    }
  }
}
