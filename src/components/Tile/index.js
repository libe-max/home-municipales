import React, { Component } from 'react'
import Slug from 'libe-components/lib/text-levels/Slug'
import BlockTitle from 'libe-components/lib/text-levels/BlockTitle'

export default class Tile extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'home-municipales__tile'
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props } = this

    /* Inner logic */
    const photoStyle = {
      backgroundImage: `url(${props.photo_url})`
    }

    /* Assign classes */
    const classes = [c]
    classes.push(`${c}_${props.pos}`)
    if (props.active) classes.push(`${c}_active`)

    return <div className={classes.join(' ')}
      onClick={this.toggleActive}>
      <a href={props.article_url} target='blank'>
        <div className={`${c}-inner`}>
          <div className={`${c}-photo`} style={photoStyle} />
          <div className={`${c}-titles`}>
            <div className={`${c}-slug`}><Slug>{props.category}</Slug></div>
            <div className={`${c}-title`}><BlockTitle {...props.textSizes}>{props.display_title}</BlockTitle></div>
          </div>
        </div>
      </a>
    </div>
  }
}