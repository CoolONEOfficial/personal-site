export const actions = {
  nuxtServerInit() {
    ;(global as any).XMLHttpRequest = require('xhr2')
  }
}
