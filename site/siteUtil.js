const siteUtil = {};

siteUtil.removeNumbers = function (raw) {
    let words = raw.split(' ');
    for (let i = 0; i < words.length; ++i) {
        if (words[i] == '' || '0' <= words[i][0] && words[i][0] <= '9' && words[i] != '11.9') {
            words.splice(i, 1);
            --i;
        }
    }
    return words.join(' ')
}

