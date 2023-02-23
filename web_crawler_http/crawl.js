const {JSDOM} = require('jsdom'); // Access DOM APIs


async function crawlPage(currentURL) {
    console.log(`Crawling: ${currentURL}`);

    // Fetch data from URL
    try {
        const resp = await fetch(currentURL)

        if (resp.status > 399) {
            console.log(`Error in fetch with status: ${resp.status} on page: ${currentURL}`);
            return
        }

        // Check that content is HTML
        const contentType = resp.headers.get("Content-type")
        if (!contentType.includes('text/html')) {
            console.log(`Not an HTML response: ${contentType}, on page: ${currentURL}`);
            return
        }

        console.log(await resp.text())
    } catch (error) {
        console.log(`Error fetching: ${error.message}, on page: ${currentURL}`)
    }
    
}

// Get all links in HTML document,
// Return in array of strings
function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        console.log(linkElement.href)
        if (linkElement.href.slice(0, 1) === '/') {
            // relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`) // Throw error if not valid URL
                urls.push(urlObj.href)
            } catch (error) {
                console.log("Error with relative URL:" + error.message)
            }
            
        }
        else {
            // absolute
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