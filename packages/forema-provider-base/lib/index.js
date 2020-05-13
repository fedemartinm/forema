// @flow
function hello(name = 'World') {
  const n: string = name
  return `Hello ${n}`
}

export default hello
