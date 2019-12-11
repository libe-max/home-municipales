const config = {
  meta: {
    author: 'Libé Labo',
    title: 'Libération - Municipales 2020',
    url: 'https://www.liberation.fr/apps/maxime/municipales-2020',
    description: '',
    image: '',
    xiti_id: 'test-home-municipales',
    tweet: 'Some tweet text'
  },
  tracking: {
    active: false,
    format: 'home-municipales',
    article: 'home-municipales-2020'
  },
  show_header: true,
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : `${window.location.protocol}//${window.location.hostname}:3003`,
  api_url: process.env.NODE_ENV === 'production'
    ? 'https://libe-labo-2.site/api'
    : `${window.location.protocol}//${window.location.hostname}:3004/api`,
  stylesheet: 'home-municipales.css',
  spreadsheet: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqRcRbi5dTEu14twLM8Cguf3YltHIwBPQIcqhVYn9AfUJG3w8zSk9YuW-bohPliwh2pWvI5PUh1p2m/pub?gid=0&single=true&output=tsv'
}

export default config
