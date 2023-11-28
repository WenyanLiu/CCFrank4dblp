
const apiCache = {};

// cached values become stale after (86400000 = 24h) millisecs
apiCache.expiresAfter = 86400000;

// save a key-value pair to cache
apiCache.setItem = function ( key, value ) {

    let now = new Date();
    let item = { value: value, expires: now.getTime() + apiCache.expiresAfter }
    return localStorage.setItem( key, JSON.stringify(item) )
};

// get cached value of key
apiCache.getItem = function ( key ) {

    let itemStr = localStorage.getItem(key);
    if( itemStr == null ) return null;

    let now = new Date();
    let item = JSON.parse(itemStr)

    if( item == null || now.getTime() > item.expires ) {
	localStorage.removeItem( key );
	return null;
    }
    return item.value;
};

// remove cached value for key
apiCache.removeItem = function ( key ) {

    return localStorage.removeItem( key );
};
