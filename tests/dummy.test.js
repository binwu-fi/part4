//exercise 4.3 start
const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
//exercise 4.3 end
