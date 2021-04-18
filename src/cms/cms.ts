import CMS from "netlify-cms-app"
import { config } from "./config"
import ColorPreview from "./preview-templates/ColorPreview"

// eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-var-requires
const previewStyles = require("!css-loader!./preview.css")

CMS.registerPreviewStyle(previewStyles.toString(), { raw: true })

CMS.registerPreviewTemplate("colors", ColorPreview)
CMS.registerPreviewTemplate("images", () => null)

CMS.init({
  config,
})
