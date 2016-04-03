'use strict';

let itemsToNotSuffixWithPx = [
  'animationIterationCount',
  'boxFlex',
  'boxFlexGroup',
  'boxOrdinalGroup',
  'columnCount',
  'fillOpacity',
  'flex',
  'flexGrow',
  'flexPositive',
  'flexShrink',
  'flexNegative',
  'flexOrder',
  'fontWeight',
  'lineClamp',
  'lineHeight',
  'opacity',
  'order',
  'orphans',
  'stopOpacity',
  'strokeDashoffset',
  'strokeOpacity',
  'strokeWidth',
  'tabSize',
  'widows',
  'zIndex',
  'zoom'
];

const shouldSuffixIfIntergerValue = attr => itemsToNotSuffixWithPx.indexOf(attr) === -1;

const getStyle = attrs => attrs.find(attr => attr.name && attr.name.name === 'style');

const transformProperties = props => {
  props.forEach(p => {
    const key = p.key.type === 'Identifier' ? p.key.name : p.key.value;
    const val = p.value.value;
    if (shouldSuffixIfIntergerValue(key) && typeof val === 'number') {
      p.value.value = `${val}px`;
    }
  });
};

const transformConditional = (o) => {
  const consequent = o.consequent;
  const alternate = o.alternate;
  if (consequent && consequent.type === 'ObjectExpression' && consequent.properties) {
    transformProperties(consequent.properties);
  } 
  if (alternate && alternate.type === 'ObjectExpression' && alternate.properties) {
    transformProperties(alternate.properties);
  } 
};

module.exports = function (file, api, options) {
  if (options.ignore) {
    const toIgnore = options.ignore.split(',');
    if (toIgnore.length) {
      itemsToNotSuffixWithPx = itemsToNotSuffixWithPx.concat(toIgnore);
    }
  }
  const shift = api.jscodeshift;
  const source = shift(file.source);
  source.find(shift.JSXOpeningElement).forEach(el => {
    const style = getStyle(el.value.attributes);
    if (style) {
      const type = style.value.expression.type;
      if (type === 'Identifier') {
        const varName = style.value.expression.name;
        source.findVariableDeclarators(varName).forEach(o => {
          let properties;
          if (o.value.init.type === 'ObjectExpression') {
            properties = o.value.init.properties;
          } else if (o.value.init.type === 'ConditionalExpression') {
            transformConditional(o.value.init);
          }
          if (properties) {
            transformProperties(properties);
          }
        }); 
      } else if (type === 'ObjectExpression') {
        const properties = style.value.expression.properties;
        if (properties) {
          transformProperties(properties);
        }
      } else if (type === 'ConditionalExpression') {
        transformConditional(style.value.expression);
      }
    }
  });
  return source.toSource();
}