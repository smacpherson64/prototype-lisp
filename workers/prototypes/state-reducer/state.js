import * as R from 'ramda'
import * as DateFNS from 'date-fns'

const dates = {
  'Date.addDays': (days) => (input) => {
    try {
      const date = DateFNS.parseISO(input)

      if (!date || !DateFNS.isValid(date)) {
        return input
      }

      const result = DateFNS.addDays(date, days)

      if (!DateFNS.isValid(result)) {
        return input
      }

      return result.toISOString()
    } catch {
      return input
    }
  },
}

const actions = {...R, ...dates}

export const defaultState = {}

function isAction($action) {
  if (typeof $action !== 'string') {
    return false
  }

  const name = $action.replace(/^\$/, '')
  return name in actions
}

function getAction($action) {
  const name = $action.replace(/^\$/, '')
  const fn = actions[name]
  return fn
}

function isActionable(set) {
  if (!Array.isArray(set)) {
    return false
  }

  const [action] = set

  if (typeof action !== 'string') {
    return false
  }

  return !!getAction(action)
}

function process(input) {
  if (!isActionable(input)) {
    return R.identity
  }

  function _process(set) {
    const [action, ...rest] = set

    const args = rest.map(
      R.cond([
        [isAction, getAction],
        [R.T, R.identity],
      ]),
    )

    return args.reduce((acc, part) => {
      const arg = isActionable(part) ? _process(part) : part

      if (typeof acc === 'function') {
        return acc(arg)
      }

      return arg
    }, getAction(action))
  }

  return _process(input)
}

export default function stateReducer(state = defaultState, action = []) {
  const task = process(action)
  const nextState = task(state)
  return nextState
}
