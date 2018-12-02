module.exports = {
  hello: {
    post: (callback) => {
      callback(200, {message: 'Hi there!, hope you are having an awesome day!'})
    }
  }
}