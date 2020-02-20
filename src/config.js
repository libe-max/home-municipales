const currentProtocol = typeof window !== 'undefined' ? window.location.protocol : 'http:'
const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

const config = {
  meta: {
    author: 'Libé Labo',
    title: 'Les dossiers du Fil vert',
    url: 'https://www.liberation.fr/apps/les-dossiers-du-fil-vert',
    description: '«Libération» met l\'accent sur l\'écologie et décrypte chaque mois une thématique de l\'actualité environnementale dans un dossier de fond.',
    image: 'https://www.liberation.fr/apps/les-dossiers-du-fil-vert/social.png',
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
  spreadsheet: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSATdwtrrsA0OFWg7h3OpLcQ-m4TupxbYufhrL1Qi73t-YA3Y7SUX3AHOQXI_V0kNotSNV0oOkD9r0v/pub?output=tsv'
}

module.exports = config
