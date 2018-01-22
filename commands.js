module.exports = {
  pwd: function() {
    process.stdout.write(process.env.PWD);
  },
  date: function() {
    process.stdout.write(Date());
  }
};
