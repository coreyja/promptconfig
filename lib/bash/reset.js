const { raw } = String

export default (useTput=true) => {
  if (useTput) {
    return '$(tput sgr0)'
  } else {
    return raw`'\[\e[0m\]'`
  }
}
