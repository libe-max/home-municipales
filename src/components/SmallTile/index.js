import React, { Component } from 'react'
import Slug from 'libe-components/lib/text-levels/Slug'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import Annotation from 'libe-components/lib/text-levels/Annotation'
import LogoGlyph from 'libe-components/lib/blocks/LogoGlyph'

export default class SmallTile extends Component {
  constructor () {
    super()
    this.c = 'home-municipales__small-tile'
  }

  render () {
    const { c, props } = this

    /* Inner logic */
    const photoStyle = {
      backgroundImage: `url(${props.photo_url})`
    }

    /* Assign classes */
    const classes = [c]
    if (props.subscribers && props.subscribers !== '0') classes.push(`${c}_subscribers-only`)

    /* Display */
    return <div className={classes.join(' ')}>
      <a href={props.article_url} target='blank'>
        <div className={`${c}-inner`}>
          <div className={`${c}-titles`}>
            <div className={`${c}-title`}>
              <Paragraph>{props.display_title || props.original_title || 'Article sans titre'}</Paragraph>
            </div>
            <div className={`${c}-date`}>
              <Annotation>
                <LogoGlyph />&nbsp;&nbsp;
                {props.display_date}&nbsp;&nbsp;
                <span className={`${c}-subscribers-only`}><Slug small>Abonnés</Slug></span>
              </Annotation>
            </div>
          </div>
          <div className={`${c}-photo`} style={photoStyle} />
        </div>
      </a>
    </div>
  }
}
