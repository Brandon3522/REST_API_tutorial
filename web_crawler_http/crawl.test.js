const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute URL', () => {
    const inputHTMLbody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">
                Boot.dev.blog
            </a>
        </body>
    </html>
    `

    const inputBaseURL = `https://blog.boot.dev`
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative URL', () => {
    const inputHTMLbody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev.blog
            </a>
        </body>
    </html>
    `

    const inputBaseURL = `https://blog.boot.dev`
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative and absolute URL', () => {
    const inputHTMLbody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev.blog Path 1
            </a>
            <a href="/path2/">
                Boot.dev.blog Path 2
            </a>
        </body>
    </html>
    `

    const inputBaseURL = `https://blog.boot.dev`
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid URL', () => {
    const inputHTMLbody = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
    `

    const inputBaseURL = `https://blog.boot.dev`
    const actual = getURLsFromHTML(inputHTMLbody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})

