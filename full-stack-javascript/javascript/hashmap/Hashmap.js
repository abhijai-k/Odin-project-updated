// HashMap.js
class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keys = [];
    for (let bucket of this.buckets) {
      for (let pair of bucket) {
        keys.push(pair[0]);
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (let bucket of this.buckets) {
      for (let pair of bucket) {
        values.push(pair[1]);
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (let bucket of this.buckets) {
      for (let pair of bucket) {
        entries.push([...pair]);
      }
    }
    return entries;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let pair of bucket) {
        this.set(pair[0], pair[1]);
      }
    }
  }
}

export default HashMap;
