function isArray(input) {
  return Array.isArray(input);
}

function myEach(collection, callback) {
  if (isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      callback(collection[i]);
    }
  } else {
    for (const key in collection) {
      callback(collection[key]);
    }
  }
  return collection;
}

function myMap(collection, callback) {
  const result = isArray(collection) ? [] : {};
  myEach(collection, (value, key) => {
    if (isArray(result)) {
      result.push(callback(value, key));
    } else {
      result[key] = callback(value, key);
    }
  });
  return result;
}

function myReduce(collection, callback, acc) {
  let initialValue = acc;
  let startIndex = 0;

  if (!isArray(collection)) {
    const keys = Object.keys(collection);
    initialValue = acc !== undefined ? acc : collection[keys[0]];
    startIndex = acc !== undefined ? 0 : 1;
  }

  for (let i = startIndex; i < collection.length; i++) {
    if (isArray(collection)) {
      initialValue = callback(initialValue, collection[i], collection);
    } else {
      initialValue = callback(initialValue, collection[keys[i]], collection);
    }
  }
  return initialValue;
}

function myFind(collection, predicate) {
  let result;
  myEach(collection, (value, key) => {
    if (predicate(value, key) && result === undefined) {
      result = value;
    }
  });
  return result;
}

function myFilter(collection, predicate) {
  const result = isArray(collection) ? [] : {};
  myEach(collection, (value, key) => {
    if (predicate(value, key)) {
      if (isArray(result)) {
        result.push(value);
      } else {
        result[key] = value;
      }
    }
  });
  return result;
}

function mySize(collection) {
  let count = 0;
  myEach(collection, () => {
    count++;
  });
  return count;
}
