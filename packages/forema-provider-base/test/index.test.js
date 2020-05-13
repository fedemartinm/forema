import hello from '../dist/index.js'

describe('it should say hello', () => {
  it("should greet 'World'", () => {
    expect(hello()).toBe('Hello World')
  })

  it("should greet 'e'", () => {
    expect(hello('e')).toBe('Hello e')
  })
})
