const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  meta: {
    author: 'Libé Labo',
    title: 'Municipales 2020 : toute l\'actu des élections à la une – Libération',
    url: 'https://www.liberation.fr/apps/2019/12/a-la-une-des-municipales',
    description: 'Le second tour des &#xE9;lections municipales 2020 doit finalement avoir lieu le 28&nbsp;juin. Suivez les principaux enjeux de la campagne dans les plus grandes villes (Paris, Lyon, Marseille&#x2026;) et pour chaque parti.',
    image: 'https://www.liberation.fr/apps/2019/12/a-la-une-des-municipales/social.jpg',
    xiti_id: 'home-municipales',
    tweet: ''
  },
  tracking: {
    active: false,
    format: 'home-municipales',
    article: 'home-municipales-2020'
  },
  show_header: true,
  statics_url: process.env.NODE_ENV === 'production'
    ? 'https://www.liberation.fr/apps/static'
    : `${currentProtocol}//${currentHostname}:3003`,
  api_url: process.env.NODE_ENV === 'production'
    ? 'https://libe-labo-2.site/api'
    : `${currentProtocol}//${currentHostname}:3004/api`,
  stylesheet: 'home-municipales.css',
  spreadsheet: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqRcRbi5dTEu14twLM8Cguf3YltHIwBPQIcqhVYn9AfUJG3w8zSk9YuW-bohPliwh2pWvI5PUh1p2m/pub?gid=0&single=true&output=tsv'
}

module.exports = config
