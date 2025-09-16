/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2596568427")

  // update collection data
  unmarshal({
    "name": "svgs"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2596568427")

  // update collection data
  unmarshal({
    "name": "SVG"
  }, collection)

  return app.save(collection)
})
