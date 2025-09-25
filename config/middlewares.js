module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': [
            "'self'",
            env('URL', 'http://localhost:1337'),
            ...env.array('CSP_CONNECT_SRC', []),
          ],
          'img-src': ["'self'", 'data:', 'blob:', ...env.array('CSP_IMG_SRC', [])],
          'media-src': ["'self'", 'data:', 'blob:', ...env.array('CSP_MEDIA_SRC', [])],
          'script-src': ["'self'", ...env.array('CSP_SCRIPT_SRC', [])],
          'style-src': ["'self'", "'unsafe-inline'", ...env.array('CSP_STYLE_SRC', [])],
          'frame-src': ["'self'", ...env.array('CSP_FRAME_SRC', [])],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: env.array('CORS_ORIGINS', [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:1337',
      ]),
      headers: '*',
      methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
