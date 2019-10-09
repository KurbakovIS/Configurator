const Service = require('node-service-linux').Service

// Create a new service object
const svc = new Service({
  name: 'Configurator',
  description: 'Configurator BackEnd.',
  script: './server.js'
})

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
  svc.start()
})

svc.install()
