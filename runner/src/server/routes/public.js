module.exports = [{
  method: 'GET',
  path: '/assets/govuk-template.js',
  options: {
    handler: {
      file: 'public/static/govuk-template.js'
    }
  }
}, {
  method: 'GET',
  path: '/assets/all.js',
  options: {
    handler: {
      file: 'node_modules/govuk-frontend/govuk/all.js'
    }
  }
}, {
  method: 'GET',
  path: '/assets/ukaddressfield.js',
  options: {
    handler: {
      file: 'node_modules/digital-form-builder-engine/client/ukaddressfield.js'
    }
  }
}, {
  method: 'GET',
  path: '/assets/{path*}',
  options: {
    handler: {
      directory: {
        path: [
          'public/static',
          'public/build',
          'node_modules/govuk-frontend/govuk/assets',
          'node_modules/hmpo-components/assets'
        ]
      }
    }
  }
}]
