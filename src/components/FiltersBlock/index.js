import React, { Component } from 'react'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import JSXInterpreter from 'libe-components/lib/logic/JSXInterpreter'

export default class FiltersBlock extends Component {
  constructor () {
    super()
    this.c = 'home-municipales__filters-block'
    this.handleFilterClick = this.handleFilterClick.bind(this)
  }

  handleFilterClick (e, cat) {
    // if (props.activateCategory) props.activateCategory(cat.category)
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
      catClasses.push(`${c}-filter_${cat.category}`)
      if (!activeCategory || cat.category === activeCategory) {
        catClasses.push(`${c}-filter_active`)
      }
      categoriesWithDots.push(
        <button
          disabled
          key={cat.category}
          className={catClasses.join(' ')}
          onClick={e => this.handleFilterClick(e, cat)}>
          <Paragraph><JSXInterpreter content={cat.category_name} /></Paragraph>
        </button>
      )
      categoriesWithDots.push(<div
        key={`${cat.category}-separator`}
        className={`${c}-filter-separator`}>
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
