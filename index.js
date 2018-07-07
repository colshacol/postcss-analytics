import postcss from 'postcss'
import fs from 'fs'

const counter = {
  stats: {},

  add(prop) {
    if (!this.stats[prop]) {
      this.stats[prop] = 1
    } else {
      this.stats[prop] += 1
    }
  }
}

const postcssAnalytics = (options = {}) => {
  return (root, result) => {
    // return root.walkRules(ruleWalker)
    root.walkDecls(declarationWalker)
    console.log(counter.stats)

    if (options.output) {
      fs.writeFileSync(options.output, JSON.stringify(counter.stats), 'utf8')
    }

    return root
  }
}

const declarationWalker = (declaration) => {
  counter.add(declaration.prop)
}

const walkRules = (rule) => {
  const { selector } = rule
}

export default postcss.plugin('postcss-analytics', postcssAnalytics)
