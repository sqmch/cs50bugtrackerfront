module.exports = function (ctx) { // can be async too
  console.log(ctx)

  // Example output on console:
  {
    dev: true,
    prod: false,
    mode: { spa: true },
    modeName: 'spa',
    target: {},
    targetName: undefined,
    arch: {},
    archName: undefined,
    debug: undefined,
    animations: 'all'
  }

  // context gets generated based on the parameters
  // with which you run "quasar dev" or "quasar build"
}
