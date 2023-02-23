const {JSDOM} = require('jsdom'); // Access DOM APIs


// Recursively parse through each page associated with base URL
async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);

    // Base Case
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizeCurrentURL = normalizeURL(currentURL)

    // Base Case
    // If page is already viewed, increment the number of times viewed and don't repeat
    if (pages[normalizeCurrentURL] > 0) {
        pages[normalizeCurrentURL]++
        return pages
    }

    // Initialize pages
    pages[normalizeCurrentURL] = 1

    console.log(`Crawling: ${currentURL}`);

    // Fetch data from URL
    try {
        const resp = await fetch(currentURL)

        if (resp.status > 399) {
            console.log(`Error in fetch with status: ${resp.status} on page: ${currentURL}`);
            return pages
        }

        // Check that content is HTML
        const contentType = resp.headers.get("Content-type")
        if (!contentType.includes('text/html')) {
            console.log(`Not an HTML response: ${contentType}, on page: ${currentURL}`);
            return pages
        }

        const htmlBody = await resp.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch (error) {
        console.log(`Error fetching: ${error.message}, on page: ${currentURL}`)
    }

    return pages    
}

// Get all links in HTML document,
// Return in array of strings
function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        //console.log(linkElement.href)
        if (linkElement.href.slice(0, 1) === '/') {
            // relative link
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`) // Throw error if not valid URL
                urls.push(urlObj.href)
            } catch (error) {
                console.log("Error with relative URL:" + error.message)
            }
            
        }
        else {
            // absolute link
            try {
                const urlObj = new URL(linkElement.href) // Throw error if not valid URL
                urls.push(urlObj.href)
            } catch (error) {
                console.log("Error with absolute URL:" + error.message)
            }
        }
    }
    return urls;
}


// Normalize URLs if they represent the same webpage
// Extract domain and path, remove the trailing slash
function normalizeURL(urlString) {
    const urlObj = new URL(urlString); // also lowers capitals
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    } 
    return hostPath;
    
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}