export default (useTput=true) => {
  if (useTput) {
    return '$(tput bold)'
  } else {
    return '' // No support for bold without tput
  }
}
