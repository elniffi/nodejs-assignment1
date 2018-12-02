const http = require('http')
const url = require('url')
const { port } = require('./config')
const handlers = require('./handlers')

const notFoundHandler = (callback) => {
  callback(404)
}

const sendResponse = (res, statusCode = 200, payload = {}) => {
  const payloadString = JSON.stringify(payload)

  res.setHeader('Content-Type', 'application/json')
  res.writeHead(statusCode)

  // Only send the payload if it's not an empty object
  if (payloadString !== '{}') {
    res.end(payloadString)
  } else {
    res.end()
  }
}

const unifiedServer = (req, res) => {
  const parsedUrl = url.parse(req.url, true)

  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  const method = req.method.toLowerCase()

  if (handlers[trimmedPath] && handlers[trimmedPath][method]) {
    const handler = handlers[trimmedPath][method]

    handler(sendResponse.bind(null, res))
  } else {
    notFoundHandler(sendResponse.bind(null, res))
  }
}

const httpServer = http.createServer(unifiedServer)

httpServer.listen(port, () => {
  console.log(`The server is listening for http traffic on port ${port}`)
})