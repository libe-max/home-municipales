const config = {
  meta: {
    author: 'Maxime Fabas',
    title: 'Libé apps template',
    url: '',
    description: '',
    image: '',
    xiti_id: 'test',
    tweet: 'Some tweet text',
  },
  tracking: {
    active: false,
    format: 'home-municipales',
    article: 'home-municipales-2020'
  },
  show_header: true,
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : 'http://localhost:3003',
  api_url: process.env.NODE_ENV === 'production'
    ? 'https://libe-labo-2.site/api'
    : 'http://localhost:3004/api',
  stylesheet: 'home-municipales.css', // The name of the css file hosted at ${statics_url}/styles/apps/
  spreadsheet: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqRcRbi5dTEu14twLM8Cguf3YltHIwBPQIcqhVYn9AfUJG3w8zSk9YuW-bohPliwh2pWvI5PUh1p2m/pub?gid=0&single=true&output=tsv'
}

export default config
