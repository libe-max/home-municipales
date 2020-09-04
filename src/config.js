const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  meta: {
    author: 'Libé Labo',
    title: 'Les dossiers du Fil vert',
    url: 'https://www.liberation.fr/apps/les-dossiers-du-fil-vert',
    description: '«Libération» met l\'accent sur l\'écologie et décrypte chaque mois une thématique de l\'actualité environnementale dans un dossier de fond.',
    image: '/apps/les-dossiers-du-fil-vert/social.jpg',
    xiti_id: 'les-dossiers-du-fil-vert',
    tweet: ''
  },
  tracking: {
    active: false,
    format: 'les-dossiers-du-fil-vert',
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
<<<<<<< HEAD
  spreadsheet: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSHUpF7HFqOK91Vm8syIujR4sX6uxoixwa_ei9hxYWiu-M21r9a5KvgRvLUlp9_wIPxDk8az7KkjT98/pub?gid=0&single=true&output=tsv'
=======
  // spreadsheet: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVTpXiMkmWiUGeIqFPoagvKjALYlJWUx7EhdSsM9RQB5TpS-NvnmWdjgGNJV7yOo6AaE60fLsQ_7IV/pub?output=tsv'
  spreadsheet: './data.tsv'
>>>>>>> a7048ad911cdc9bf069c38973e8b0f1dcdd21889
}

module.exports = config
