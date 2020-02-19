import React, { Component } from 'react'
import Slug from 'libe-components/lib/text-levels/Slug'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import JSXInterpreter from 'libe-components/lib/logic/JSXInterpreter'
import SmallTile from '../SmallTile'

export default class CategoryIndex extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.state = { nb_displayed: 4 }
    this.c = 'home-municipales__category-index'
    this.handleShowMoreClick = this.handleShowMoreClick.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * HANDLE SHOW MORE CLICK
   *
   * * * * * * * * * * * * * * * * */
  handleShowMoreClick () {
    this.setState({ nb_displayed: this.state.nb_displayed + 8 })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props, state } = this

    /* Assign classes */
    const classes = [c]
    classes.push(`${c}_${props.category.category}`)
    if (props.articles.length > state.nb_displayed) classes.push(`${c}_display-show-more`)

    /* Display */
    return <div className={classes.join(' ')}>
      <div className={`${c}-title`}>
        <Slug big><JSXInterpreter content={props.category.category_name} /></Slug>
      </div>
      <div className={`${c}-list`}>{
        props.articles
          .slice(0, state.nb_displayed)
          .map(art => <div
            className={`${c}-article`}
            key={art.article_url || Math.random().toString(36)}>
            <SmallTile {...art} />
          </div>)
      }</div>
      <div className={`${c}-show-more`} onClick={this.handleShowMoreClick}>
        <Paragraph small><a>Voir plus</a></Paragraph>
      </div>
    </div>
  }
}
