const {crawlPage} = require('./crawl.js')

// Crawl through a website and collect all links associated with the base URL
async function main() {
    // Check if website is provided
    if (process.argv.length < 3) {
        console.log("No website provided.")
        process.exit(1)
    }
    // If more than one website is provided, display message and exit
    else if (process.argv.length > 3) {
        console.log("Only one command line argument authorized.")
        process.exit(1)
    }

    const baseURL = process.argv[2]

    // Start web crawler
    console.log(`Starting web crawler on: ${baseURL}`)
    const newPages = await crawlPage(baseURL, baseURL, {})

    for (const page of Object.entries(newPages)) {
        console.log(page)
    }
 }

main()