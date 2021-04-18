import { CmsConfig, CmsCollection } from "netlify-cms-core"

const colorCollection: CmsCollection = {
  label: "Color",
  name: "colors",
  folder: "src/markdown-db/colors",
  summary: "{{fields.name}}",
  create: true,
  fields: [
    { label: "Name", name: "name", widget: "string" },
    { label: "exa color", name: "color", widget: "string" },
  ],
}

const imageCollection: CmsCollection = {
  label: "Image",
  name: "images",
  folder: "src/markdown-db/images",
  summary: "{{fields.name}}",
  create: true,
  fields: [
    { label: "Image", name: "image", widget: "image" },
    { label: "Name", name: "name", widget: "string" },
    { label: "Alt", name: "alt", widget: "string" },
  ],
}

const backend: CmsConfig["backend"] = {
  ...(process.env.NODE_ENV === "development"
    ? {
        name: "proxy",
        proxy_url:
          "http://__template__website__name.lvh.me/local_backend/api/v1",
      }
    : { name: "github", branch: "master", repo: "fes300/new-website" }),
  ...{
    commit_messages: {
      create: "Create {{collection}} “{{slug}}”",
      update: "Update {{collection}} “{{slug}}”",
      delete: "Delete {{collection}} “{{slug}}”",
      uploadMedia: "[skip ci] Upload “{{path}}”",
      deleteMedia: "[skip ci] Delete “{{path}}”",
    },
  },
}

const publish_mode = "simple"

export const config: CmsConfig = {
  media_folder: "static/img",
  public_folder: "/img",
  local_backend: true,
  publish_mode,
  backend,
  collections: [colorCollection, imageCollection],
}
