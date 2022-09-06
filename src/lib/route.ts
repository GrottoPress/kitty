export const isJson = (context: Request | Response) => {
  return !!context.headers.get('Content-Type')?.toLowerCase().includes('/json')
}
