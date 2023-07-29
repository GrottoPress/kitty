export const isJson = (context: Request | Response) => {
  const header = context.headers.get('Content-Type')
  return header && header.toLowerCase().indexOf('/json') >= 0
}
