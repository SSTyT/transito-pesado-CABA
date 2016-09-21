import measured from 'measured';

function MeasuredFactory() {
  var collections = {};

  return {
    getCollection: (name) => {
      if (!collections[name]) {
        collections[name] = measured.createCollection();
      }
      return collections[name];
    }
  }
}

export default [MeasuredFactory];
