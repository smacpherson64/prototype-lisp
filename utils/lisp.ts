type Actions = Record<string, Function>
type $Keyed<A extends Actions> = {
  [Key in keyof A]: Key extends string ? `$${Key}` : never
}[string]

function identity<A>(i: A) {
  return i
}

export function createLisp<A extends Actions>(actions: A) {
  type ActionSet = [$Keyed<A>, ...any[]]

  function isAction($action: any): $action is $Keyed<A> {
    if (typeof $action !== 'string') {
      return false
    }

    if (!$action.startsWith('$')) {
      return false
    }

    const name = $action.replace(/^\$/, '')
    return name in actions
  }

  function getAction($action: string) {
    const name = $action.replace(/^\$/, '')
    const fn = actions[name] ? actions[name] : undefined
    return fn
  }

  function isActionSet(value: any): value is ActionSet {
    if (!Array.isArray(value)) {
      return false
    }

    return isAction(value[0])
  }

  return function process(input: ActionSet): Function {
    function _process(set: ActionSet): Function {
      const [action, ...rest] = set

      const args = rest.map(
        (item) => (isAction(item) && getAction(item)) || item,
      )

      const result = args.reduce((acc, part) => {
        const arg = isActionSet(part) ? _process(part) : part

        if (typeof acc === 'function') {
          return acc(arg)
        }

        return arg
      }, getAction(action))

      return result
    }

    return _process(input)
  }
}
