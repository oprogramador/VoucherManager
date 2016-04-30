dbResponseAdapter = {};

dbResponseAdapter.create = function(res) {
  this.json = function(data) {
    return res.json(data);
  }

  this.error = function(msg) {
    return res.json({error: true, msg: msg});
  }

  return this;
}

module.exports = dbResponseAdapter;
