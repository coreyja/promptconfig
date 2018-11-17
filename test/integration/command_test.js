import test from "ava"
import dedent from "dedent"
import prompt from "../../lib/prompt"
const { raw } = String

test("component command without conditions", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      command: "echo 'foo'",
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_prompt() {
      local prompt=''
      prompt+=$(echo 'foo')
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})

test("component command with conditions", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      command: "echo 'foo'",
      conditions: {
        foo: "bar"
      }
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_component_character() {
      if [ $(echo 'foo') -eq 'foo' ]; then
        printf 'bar'
      fi
    }

    function _promptconfig_prompt() {
      local prompt=''
      prompt+=$(_promptconfig_component_character)
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})

test("color command", (t) => {
  let configuration = {
    prompt: ["character"],
    components: [{
      key: "character",
      value: "❯",
      color: {
        command: "echo 'foo'",
        conditions: {
          true: "black",
        }
      }
    }],
  }

  t.is(prompt(configuration), dedent(raw`
    function _promptconfig_color_character() {
      if $(echo 'foo'); then
        printf $(tput setaf 0)
      fi
    }

    function _promptconfig_prompt() {
      local prompt=''
      prompt+=$(_promptconfig_color_character)
      prompt+='❯'
      prompt+=$(tput sgr0)
      PS1=$prompt
    }

    PROMPT_COMMAND="_promptconfig_prompt; $PROMPT_COMMAND"\n
  `))
})
