


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
    normalizeURL
}