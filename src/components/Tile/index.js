import React, { Component } from 'react'
import Slug from 'libe-components/lib/text-levels/Slug'
import BlockTitle from 'libe-components/lib/text-levels/BlockTitle'
import JSXInterpreter from 'libe-components/lib/logic/JSXInterpreter'

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
    if (props.subscribers && props.subscribers !== '0') classes.push(`${c}_subscribers-only`)

    /* Display */
    return <div
      className={classes.join(' ')}
      onClick={this.toggleActive}>
      <a href={props.article_url} target='blank'>
        <div className={`${c}-inner`}>
          <div className={`${c}-photo`} style={photoStyle} />
          <div className={`${c}-titles`}>
            <div className={`${c}-slug-and-subscribers`}>
              <div className={`${c}-slug`}><Slug>{props.slug}</Slug></div>
              <div className={`${c}-subscribers-only`}><Slug>Abonnés</Slug></div>
            </div>
            <div className={`${c}-title`}>
              <BlockTitle {...props.textSizes}>
                <JSXInterpreter content={props.display_title} />
              </BlockTitle>
            </div>
          </div>
        </div>
      </a>
    </div>
  }
}
