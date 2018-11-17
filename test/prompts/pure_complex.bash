function _promptconfig_working_directory() {
  dirs +0
}

function _promptconfig_git_in_directory() {
  git rev-parse --git-dir > /dev/null 2>&1
}

function _promptconfig_git_branch_name() {
  if _promptconfig_git_in_directory; then
    printf "$(git branch 2> /dev/null | grep '^*' | colrm 1 2)"
  fi
}

function _promptconfig_git_upstream_configured() {
  git rev-parse --abbrev-ref @'{u}' > /dev/null 2>&1
}

function _promptconfig_git_behind_upstream() {
  if _promptconfig_git_in_directory; then
    if _promptconfig_git_upstream_configured; then
      local commits_behind=$(git rev-list --right-only --count HEAD...@"{u}" 2> /dev/null)
      [ $commits_behind -gt 0 ]
    else
      false
    fi
  else
    false
  fi
}

function _promptconfig_git_ahead_of_upstream() {
  if _promptconfig_git_in_directory; then
    if _promptconfig_git_upstream_configured; then
      local commits_ahead=$(git rev-list --left-only --count HEAD...@"{u}" 2> /dev/null)
      [ $commits_ahead -gt 0 ]
    else
      false
    fi
  else
    false
  fi
}

function _promptconfig_component_git_behind_upstream() {
  if $(_promptconfig_git_behind_upstream); then
    printf '⇣'
  fi
}

function _promptconfig_component_git_ahead_of_upstream() {
  if $(_promptconfig_git_ahead_of_upstream); then
    printf '⇡'
  fi
}

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
  prompt+=$(tput setaf 4)
  prompt+=$(_promptconfig_working_directory)
  prompt+=$(tput sgr0)
  prompt+=' '
  prompt+=$(tput setaf 242)
  prompt+=$(_promptconfig_git_branch_name)
  prompt+=$(tput sgr0)
  prompt+=' '
  prompt+=$(tput setaf 6)
  prompt+=$(_promptconfig_component_git_behind_upstream)
  prompt+=$(tput sgr0)
  prompt+=$(tput setaf 6)
  prompt+=$(_promptconfig_component_git_ahead_of_upstream)
  prompt+=$(tput sgr0)
  prompt+='\n'
  prompt+=$(_promptconfig_color_prompt_character)
  prompt+='❯'
  prompt+=$(tput sgr0)
  prompt+=' '
  PS1=$prompt
}

PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"
