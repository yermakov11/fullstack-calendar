const allowedOrigins = [
  'http://localhost:5173',
  'https://fullstack-calendar-chi.vercel.app',
  'https://fullstack-calendar-sigma.vercel.app',
  'https://fullstack-calendar-gpio82ryc-yermakov11s-projects.vercel.app',
];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin ${origin} is not allowed`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,        
    optionsSuccessStatus: 200
  };
  
  module.exports = corsOptions;