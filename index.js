const PORT = 80

const http = require('http')
const url = require('url')

const handlers = {
  hello: {
    post: (callback) => {
      callback(200, {message: 'Hi there!, hope you are having an awesome day!'})
    }
  }
}

const notFoundHandler = (callback) => {
  callback(404)
}

const router = {
  hello: handlers.hello
}

const sendResponse = (res, statusCode = 200, payload = {}) => {
  const payloadString = JSON.stringify(payload)

  res.setHeader('Content-Type', 'application/json')
  res.writeHead(statusCode)
  res.end(payloadString)
}

const unifiedServer = (req, res) => {
  const parsedUrl = url.parse(req.url, true)

  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  const method = req.method.toLowerCase()

  if (router[trimmedPath] && router[trimmedPath][method]) {
    const handler = router[trimmedPath][method]

    handler(sendResponse.bind(null, res))
  } else {
    notFoundHandler(sendResponse.bind(null, res))
  }
}

const httpServer = http.createServer(unifiedServer)

httpServer.listen(PORT, () => {
  console.log(`The server is listening for http traffic on port ${PORT}`)
})