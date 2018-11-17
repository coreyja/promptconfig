function _promptconfig_color_prompt_character() {
  if $(exit $exit_status); then
    printf $(tput setaf 5)
  else
    printf $(tput setaf 1)
  fi
}

function _promptconfig_prompt() {
  local exit_status=$?
  local prompt=''
  prompt+='\n'
  prompt+=$(_promptconfig_color_prompt_character)
  prompt+='❯'
  prompt+=$(tput sgr0)
  prompt+=' '
  PS1=$prompt
}

PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"
