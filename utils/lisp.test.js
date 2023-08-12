import {assertEquals} from 'std/assert/mod.ts'
import {createLisp} from './lisp.ts'

Deno.test.only = function only(name, fn) {
  return Deno.test({
    fn,
    name,
    only: true,
  })
}

Deno.test('creates a function', () => {
  const lisp = createLisp({})
  assertEquals(typeof lisp, 'function')
})

Deno.test('single', () => {
  const process = createLisp({
    add: (...args) => args.reduce((a, b) => a + b, 0),
  })

  const result = process(['$add', [1, 2, 3, 4]])
  const expectedResult = 10
  assertEquals(result, expectedResult)
})

Deno.test('complex', () => {
  const process = createLisp({
    add: (...args) => args.reduce((a, b) => a + b, 0),
  })

  const result = process([
    '$add',
    [
      ['$add', [1, 2, 3, 4]],
      ['$add', [1, 2, 3, 4]],
    ],
  ])
  const expectedResult = 10
  assertEquals(result, expectedResult)
})
