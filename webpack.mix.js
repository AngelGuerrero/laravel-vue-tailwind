const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const tailwindcss = require('tailwindcss')

mix
  .js('resources/js/app.js', 'public/js')
  .options({
    hmrOptions: {
      host: 'localhost', // site's host name
      port: 8080
    }
  })
  .sourceMaps()

mix.sass('resources/scss/app.scss', 'public/css').options({
  processCssUrls: false,
  postCss: [tailwindcss('tailwind.config.js')]
})

// fix css files 404 issue
mix.webpackConfig({
  // add any webpack dev server config here
  devServer: {
    proxy: {
      host: 'localhost', // host machine ip
      port: 8080
    },
    watchOptions: {
      aggregateTimeout: 200,
      poll: 5000
    }
  }
})
