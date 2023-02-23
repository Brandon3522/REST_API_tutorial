

// Sort from greatest to least
function sortPages(pages) {
    const pagesArray = Object.entries(pages)
    pagesArray.sort((a, b) => {
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1] // Return greatest to least search
    })

    return pagesArray
}

// Format into report
function printReport(pages) {
    console.log('#######################')
    console.log('REPORT')
    console.log('#######################')

    const sortedPages = sortPages(pages)
    for (const page of sortedPages) {
        const url = page[0]
        const hits = page[1]
        console.log(`Found ${hits} links to page:${url}`)
    }

    console.log('#######################')
    console.log('END')
    console.log('#######################')
}

module.exports = {
    sortPages,
    printReport
}