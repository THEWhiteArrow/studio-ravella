require('dotenv').config()




module.exports = {
   purge: process.env.NODE_ENV === 'production' ? ['*.html', './public/javascripts/**/*.js'] : [],
   darkMode: false, // or 'media' or 'class'
   theme: {
      extend: {},
   },
   variants: {
      extend: {},
   },
   plugins: [],
}
