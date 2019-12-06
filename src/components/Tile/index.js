import React, { Component } from 'react'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'

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

    /* Assign classes */
    const classes = [c]
    classes.push(`${c}_${props.pos}`)
    return <div className={classes.join(' ')}>
      <div className={`${c}-inner`}>
        <Paragraph>Tile: {props.pos}</Paragraph>
      </div>
    </div>
  }
}