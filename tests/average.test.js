const { average } = require('../utils/for_testing')
const { test, expect, describe } = require('@jest/globals')

describe.skip('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })

  test('of undefined is zero', () => {
    expect(average()).toBe(0)
  })
})