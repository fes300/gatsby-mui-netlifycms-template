import * as React from "react"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import {
  FileNode,
  IGatsbyImageDataParent,
} from "gatsby-plugin-image/dist/src/components/hooks"

type Props = {
  imageData: FileNode | IGatsbyImageDataParent | IGatsbyImageData
}

const BackgroundImageDiv: React.FC<Props> = ({ imageData, children }) => {
  const image = getImage(imageData)

  return (
    <div style={{ display: "grid" }}>
      {image !== undefined && (
        <GatsbyImage
          style={{
            gridArea: "1/1",
            // You can set a maximum height for the image, if you wish.
            // maxHeight: 600,
          }}
          // This is a presentational image, so the alt should be an empty string
          alt=""
          image={image}
        />
      )}
      <div
        style={{
          // By using the same grid area for both, they are stacked on top of each other
          gridArea: "1/1",
          position: "relative",
          // This centers the other elements inside the hero component
          placeItems: "center",
          display: "grid",
        }}
      >
        {/* Any content here will be centered in the component */}
        {children}
      </div>
    </div>
  )
}

export default BackgroundImageDiv
