import React, { Component } from 'react'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'

export default class FiltersBlock extends Component {
  constructor () {
    super()
    this.c = 'home-municipales__filters-block'
  }

  render () {
    const { c, props } = this
    const {
      active: activeCategory,
      categories,
      activateCategory
    } = props

    /* Inner logic */
    const categoriesWithDots = []
    categories.forEach(cat => {
      const catClasses = [`${c}-filter`]
      catClasses.push(`${c}-filter_${cat}`)
      if (!activeCategory || cat === activeCategory) {
        catClasses.push(`${c}-filter_active`)
      }
      categoriesWithDots.push(
        <button
          key={cat}
          className={catClasses.join(' ')}
          onClick={() => props.activateCategory(cat)}
        >
          <Paragraph>{cat}</Paragraph>
        </button>
      )
      categoriesWithDots.push(<div
        key={`${cat}-separator`}
        className={`${c}-filter-separator`}
      >
        <Paragraph>•</Paragraph>
      </div>)
    })
    categoriesWithDots.pop()

    /* Assign classes */
    const classes = [c]
    if (!activeCategory) classes.push(`${c}_all-active`)

    /* Display */
    return <div className={classes.join(' ')}>{
      categoriesWithDots
    }
    </div>
  }
}
