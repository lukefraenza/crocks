const isFunction = require('../internal/isFunction')
const isType    = require('../internal/isType')

const constant  = require('../combinators/constant')
const composeB  = require('../combinators/composeB')

const _type = constant('Identity')
const _of   = Identity

function Identity(x) {
  if(!arguments.length) {
    throw new TypeError('Identity must wrap something')
  }

  const value = constant(x)
  const type  = _type
  const of    = _of

  const equals = m => isType(type(), m) && x === m.value()

  function map(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('Identity.map: function required')
    }

    return composeB(Identity, fn, x)
  }

  function ap(m) {
    if(!isFunction(x)) {
      throw new TypeError('Identity.ap: Wrapped value must be a function')
    }

    if(!isType(type(), m)) {
      throw new TypeError('Identity.ap: Identity required')
    }
    return m.map(x)
  }

  function chain(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('Identity.chain: function required')
    }

    return map(fn).value()
  }

  return { value, type, equals, map, ap, of, chain }
}

Identity.of   = _of
Identity.type = _type

module.exports = Identity