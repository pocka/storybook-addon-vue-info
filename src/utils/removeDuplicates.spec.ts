import removeDuplicates from './removeDuplicates'

it('Remove duplicates', () => {
  expect(removeDuplicates([1, 2, 3, '1', 'bar', 3, 'foo', 'foo'])).toEqual([
    1,
    2,
    3,
    '1',
    'bar',
    'foo'
  ])
})
