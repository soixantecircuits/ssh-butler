exports.allTrim = allTrim;
function allTrim(string) {
    return string.replace(/\s+/g,' ')
                   .replace(/^\s+|\s+$/,'');
}