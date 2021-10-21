export default {
  data: {
    googleMap: localStorage.getItem(`${settings.url}/loadData.php?hash=228606d77ed7cdf39ea9d527cdce64b4`),
  },

  get(key) {
    return this.data[key];
  },

  set(key, value) {
    let data;
    if (typeof value === 'object') {
      data = JSON.stringify(value);
    } else {
      data = value;
    }

    localStorage.setItem(settings.url + key, data);
    this.data[key] = value;
  },

  remove(key) {
    localStorage.removeItem(key);
    this.data[key] = null;
  },
};
