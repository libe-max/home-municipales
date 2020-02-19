import React, { Component } from 'react'
import { parseTsv } from 'libe-utils'
import Loader from 'libe-components/lib/blocks/Loader'
import LoadingError from 'libe-components/lib/blocks/LoadingError'
import ShareArticle from 'libe-components/lib/blocks/ShareArticle'
import LibeLaboLogo from 'libe-components/lib/blocks/LibeLaboLogo'
import ArticleMeta from 'libe-components/lib/blocks/ArticleMeta'
import Svg from 'libe-components/lib/primitives/Svg'
import PageTitle from 'libe-components/lib/text-levels/PageTitle'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import AnnotationTitle from 'libe-components/lib/text-levels/AnnotationTitle'
import Tile from './components/Tile'
import CategoryIndex from './components/CategoryIndex'
import FiltersBlock from './components/FiltersBlock'

export default class App extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'home-municipales'
    this.nb_tiles = 8
    Object.defineProperty(
      this,
      'nb_tiles',
      { get: () => window.LBLB_GLOBAL.current_display === 'lg' ? 8 : 4 }
    )
    this.state = {
      loading_sheet: true,
      error_sheet: null,
      data_sheet: [],
      keystrokes_history: [],
      konami_mode: false,
      active_category: null,
      scrolled: false
    }
    this.fetchSheet = this.fetchSheet.bind(this)
    this.fetchCredentials = this.fetchCredentials.bind(this)
    this.listenToKeyStrokes = this.listenToKeyStrokes.bind(this)
    this.watchForKonamiCode = this.watchForKonamiCode.bind(this)
    this.activateCategory = this.activateCategory.bind(this)
    this.isInFilter = this.isInFilter.bind(this)
    this.scrollToFirstActiveArticle = this.scrollToFirstActiveArticle.bind(this)
    this.toggleScrolledState = this.toggleScrolledState.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    document.addEventListener('keydown', this.listenToKeyStrokes)
    document.addEventListener('scroll', this.toggleScrolledState)
    this.fetchCredentials()
    if (this.props.spreadsheet) return this.fetchSheet()
    return this.setState({ loading_sheet: false })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WILL UNMOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentWillUnmount () {
    document.removeEventListener('keydown', this.listenToKeyStrokes)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * SHOULD UPDATE
   *
   * * * * * * * * * * * * * * * * */
  shouldComponentUpdate (props, nextState) {
    const changedKeys = []
    Object.keys(nextState).forEach(key => {
      if (this.state[key] !== nextState[key]) changedKeys.push(key)
    })
    if (changedKeys.length === 1 &&
      changedKeys.includes('keystrokes_history')) return false
    return true
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH CREDENTIALS
   *
   * * * * * * * * * * * * * * * * */
  async fetchCredentials () {
    const { api_url } = this.props
    const { format, article } = this.props.tracking
    const api = `${api_url}/${format}/${article}/load`
    try {
      const reach = await window.fetch(api, { method: 'POST' })
      const response = await reach.json()
      const { lblb_tracking, lblb_posting } = response._credentials
      if (!window.LBLB_GLOBAL) window.LBLB_GLOBAL = {}
      window.LBLB_GLOBAL.lblb_tracking = lblb_tracking
      window.LBLB_GLOBAL.lblb_posting = lblb_posting
      return { lblb_tracking, lblb_posting }
    } catch (error) {
      console.error('Unable to fetch credentials:')
      console.error(error)
      return Error(error)
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH SHEET
   *
   * * * * * * * * * * * * * * * * */
  async fetchSheet () {
    this.setState({ loading_sheet: true, error_sheet: null })
    const sheet = this.props.spreadsheet
    try {
      const reach = await window.fetch(this.props.spreadsheet)
      if (!reach.ok) throw reach
      const data = await reach.text()
      const parsedData = parseTsv(data, [8])[0]
      this.setState({ loading_sheet: false, error_sheet: null, data_sheet: parsedData })
      document.querySelector('#temp-header').innerHTML = ''
      return data
    } catch (error) {
      if (error.status) {
        const text = `${error.status} error while fetching : ${sheet}`
        this.setState({ loading_sheet: false, error_sheet: error })
        console.error(text, error)
        return Error(text)
      } else {
        this.setState({ loading_sheet: false, error_sheet: error })
        console.error(error)
        return Error(error)
      }
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * START LISTENING TO KEYSTROKES
   *
   * * * * * * * * * * * * * * * * */
  listenToKeyStrokes (e) {
    if (!e || !e.keyCode) return
    const currHistory = this.state.keystrokes_history
    const newHistory = [...currHistory, e.keyCode]
    this.setState({ keystrokes_history: newHistory })
    this.watchForKonamiCode()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WATCH FOR KONAMI CODE
   *
   * * * * * * * * * * * * * * * * */
  watchForKonamiCode () {
    const konamiCodeStr = '38,38,40,40,37,39,37,39,66,65'
    const lastTenKeys = this.state.keystrokes_history.slice(-10)
    if (lastTenKeys.join(',') === konamiCodeStr) this.setState({ konami_mode: true })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * ACTIVATE CATEGORY
   *
   * * * * * * * * * * * * * * * * */
  activateCategory (category) {
    const nextCategory = category !== this.state.active_category
      ? category
      : null
    this.setState(
      { active_category: nextCategory },
      this.scrollToFirstActiveArticle
    )
  }

  /* * * * * * * * * * * * * * * * *
   *
   * IS IN FILTER
   *
   * * * * * * * * * * * * * * * * */
  isInFilter (article) {
    const activeCategory = this.state.active_category
    return !activeCategory ||
      article.category === activeCategory
  }

  /* * * * * * * * * * * * * * * * *
   *
   * SCROLL TO FIRST ACTIVE ARTICLE
   *
   * * * * * * * * * * * * * * * * */
  scrollToFirstActiveArticle () {
    const { active_category: activeCategory } = this.state
    if (!activeCategory) {
      return window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
    const indexOfFirst = this.state.data_sheet.findIndex(art => this.isInFilter(art))
    const $destination = indexOfFirst < this.nb_tiles
      ? document.querySelector(`.home-municipales__tile_${indexOfFirst + 1}`)
      : document.querySelector(`.home-municipales__category-index_${activeCategory}`)
    const destinationDistance = $destination.getBoundingClientRect().y
    const destinationPosition = destinationDistance + window.scrollY
    const navHeight = window.LBLB_GLOBAL.nav_height
    const rem = window.LBLB_GLOBAL.rem
    window.scrollTo({
      top: destinationPosition - navHeight - 3.5 * rem,
      left: 0,
      behavior: 'smooth'
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * TOGGLE SCROLLED STATE
   *
   * * * * * * * * * * * * * * * * */
  toggleScrolledState (e) {
    const pScrollY = window.LBLB_GLOBAL.pScrollY || 0
    if (pScrollY < 180 && window.scrollY >= 180) this.setState({ scrolled: true })
    else if (pScrollY >= 180 && window.scrollY < 180) this.setState({ scrolled: false })
    window.LBLB_GLOBAL.pScrollY = window.scrollY
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, state, props } = this
    const articles = this.state.data_sheet

    /* Inner logic */
    const categoriesWithRank = []
    articles.forEach(article => {
      const found = categoriesWithRank.find(e => e.category === article.category)
      if (!found) { 
        categoriesWithRank.push({
          category: article.category,
          category_name: article.category_name,
          occurences: 1
        })
       } else {
         found.occurences++
       }
    })
    const categories = [...categoriesWithRank]
    const currentCategory = categories[0] ? categories[0].category : null
    const articlesInCurrentCategory = articles.filter(art => art.category === currentCategory)
    const nbOfTilesToDisplay = articlesInCurrentCategory.length >= 6 && articlesInCurrentCategory.length <= 12
      ? articlesInCurrentCategory.length
      : articlesInCurrentCategory.length < 6
      ? 6
      : 12
    const hideCurrentCategoryInSmallTiles = nbOfTilesToDisplay === articlesInCurrentCategory.length

    /* Assign classes */
    const classes = [c]
    classes.push(`${c}_${nbOfTilesToDisplay}-tiles`)
    if (state.loading_sheet) classes.push(`${c}_loading`)
    if (state.error_sheet) classes.push(`${c}_error`)
    if (state.scrolled) classes.push(`${c}_scrolled`)

    /* Load & errors */
    if (state.loading_sheet) return <div className={classes.join(' ')}><div className='lblb-default-apps-loader'><Loader /></div></div>
    if (state.error_sheet) return <div className={classes.join(' ')}><div className='lblb-default-apps-error'><LoadingError /></div></div>

    /* Display component */
    return <div className={classes.join(' ')}>

      {/* Header */}
      <div className={`${c}__header`}>
        <div
          className={`${c}__header-logo`}
          onClick={e => this.activateCategory(null)}>
          <Svg src='./logo.svg' />
        </div>
        <div className={`${c}__header-filters`}>
          <div
            className={`${c}__header-filters-title`}
            onClick={e => this.activateCategory(null)}>
            <PageTitle>Les dossiers du fil vert</PageTitle>
          </div>
          <div className={`${c}__header-filters-list`}>
            <FiltersBlock
              categories={categories.map(e => ({
                category_name: e.category_name,
                category: e.category
              })).slice(0, 1)}
              activateCategory={this.activateCategory}
              active={state.active_category} />
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      <div
        className={`${c}__scroll-to-top`}
        onClick={e => this.activateCategory(null)}>
        <Svg src='./logo.svg' />
        <AnnotationTitle>Retour à la une</AnnotationTitle>
      </div>

      {/* Fixed header mobile */}
      <div
        className={`${c}__fixed-header-mobile`}
        style={{ top: window.LBLB_GLOBAL.nav_height }}>
        <div
          onClick={e => this.activateCategory(null)}
          className={`${c}__fixed-header-mobile-logo`}>
          <Paragraph>
            Les dossiers<br />
            du fil vert
          </Paragraph>
        </div>
        <div
          onClick={e => this.activateCategory(null)}
          className={`${c}__fixed-header-mobile-filters`}>
          <Paragraph>↑ Filtres</Paragraph>
        </div>
      </div>

      {/* Tiles */}
      <div className={`${c}__tiles`}>{
        articlesInCurrentCategory.map((article, i) => {
          return i === 0
            ? <Tile
              pos={i + 1}
              {...article}
              textSizes={{ big: true }}
              key={article.display_title}
              dataCategory={article.category}
              active={this.isInFilter(article)} />
            : i < 4
            ?  <Tile
              pos={i + 1}
              {...article}
              textSizes={{ regular: true }}
              key={article.display_title}
              dataCategory={article.category}
              active={this.isInFilter(article)} />
            : <Tile
              pos={i + 1}
              {...article}
              textSizes={{ small: true }}
              key={article.display_title}
              dataCategory={article.category}
              active={this.isInFilter(article)} />
        })
      }</div>

      {/* Categories detail */}
      <div className={`${c}__categories`}>
        {!hideCurrentCategoryInSmallTiles
          && categories.length !== 1
          && <div className={`${c}__categories-title`}>
            <Paragraph>Retrouvez tous les dossiers du fil vert</Paragraph>
          </div>}
        <div className={`${c}__categories-list`}>{
          categories
            .map(category => {
              if (hideCurrentCategoryInSmallTiles
                && category.category === currentCategory) return
              const categoryArticles = articles
                .filter(art => art.category === category.category)
              return <CategoryIndex
                key={category.category}
                articles={categoryArticles}
                category={category} />
            })
        }
        </div>
      </div>

      {/* Footer */}
      <div className='lblb-default-apps-footer'>
        <ShareArticle short iconsOnly tweet={props.meta.tweet} url={props.meta.url} />
        <LibeLaboLogo target='blank' />
      </div>
    </div>
  }
}
