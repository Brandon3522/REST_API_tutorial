const {sortPages} = require('./report.js')
const {test, expect} = require('@jest/globals')

// Tests for sortPages function
test('sortPages 2 pages', () => {
    const input = {
        'https://wagslane.dev': 1,
        'https://wagslane.dev/path': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path', 3],
        ['https://wagslane.dev', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev/path3': 3,
        'https://wagslane.dev/path2': 2,
        'https://wagslane.dev/path8': 8,
        'https://wagslane.dev/path10': 10
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path10', 10],
        ['https://wagslane.dev/path8', 8],
        ['https://wagslane.dev/path3', 3],
        ['https://wagslane.dev/path2', 2],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})
