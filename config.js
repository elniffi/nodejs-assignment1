// Container for all the environments 
const environments = {
  development: {
    envName: 'development',
    port: 8080
  },
  production: {
    envName: 'production',
    port: 80
  }
} 

const currentEnvironment = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'development'
const environmentToExport = (environments[currentEnvironment]) ? environments[currentEnvironment] : environments.development

module.exports = environmentToExport