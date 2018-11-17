import style from "ansi-styles"
import Behavior from "./behavior"
import bold from "./bash/bold"
import bashFunction from "./bash/function"

class Bold {

  constructor({ componentKey, options }) {
    this._componentKey = componentKey

    if (typeof options === "object") {
      if (options.value)    { this._value    = options.value }
      if (options.command)  { this._command  = options.command }
      if (options.function) { this._function = options.function }

      this._conditions = options.conditions
    } else {
      this._value = options
      this._conditions = undefined
    }
  }

  get dependencyFunctionNames() {
    return this._isFunction ? [this._function] : []
  }

  invocation() {
    var boldString

    if (this._isValue) {
      boldString = bold(this._value)
    } else {
      boldString = bashFunction({ name: this._functionName, body: "" }).invocation
    }

    return boldString
  }

  get _functionName() {
    return `bold_${this._componentKey}`
  }

  _transformConditionValue(value) {
    return bold(value)
  }

  get usesExitStatusFunction() {
    return this._isFunction && this._function == "exit_status"
  }

}

export default Behavior(Bold)
