export default function debounce (callback, wait, immediate) {
    let timeout;
    return function(){
        let context = this, args = arguments;
        const later = function(){
            timeout = null;
            if(!immediate) callback.apply(context, args);
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) callback.apply(context, args);
    }
}   