export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g

  // ? é usado para definir o nome de um (grupo) no RegEx
  // 1$ significa que usamos o valor do Regex anterior como nome do grupo
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
