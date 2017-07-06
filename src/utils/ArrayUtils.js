
/*
    Array-aware equality checker:
    Returns whether arguments a and b are == to each other;
    however if they are equal-lengthed arrays, returns whether their
    elements are pairwise == to each other recursively under this
    definition.

    From: https://stackoverflow.com/a/10316616
*/
export default function arraysEqual(a,b) {
    if (a instanceof Array && b instanceof Array) {
        if (a.length!=b.length)  // assert same length
            return false;
        for(let i=0; i<a.length; i++)  // assert each element equal
            if (!arraysEqual(a[i],b[i]))
                return false;
        return true;
    } else {
      if (typeof a === 'string' || typeof b === 'string') {
        return a==b;
      } else {
        if (typeof a.id  !== 'undefined' && typeof b.id !== 'undefined') return a.id == b.id;
        return a==b;
      }
    }
}
