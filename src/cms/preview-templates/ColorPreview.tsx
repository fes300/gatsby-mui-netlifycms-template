import * as React from "react"

const ColorPreview = ({ entry }: any) => {
  const data = entry.get("data").toJS()

  return (
    <div>
      <h1
        style={{ marginBottom: 40 }}
      >{`this is what ${data.name} looks like:`}</h1>
      <div
        style={{
          height: 80,
          width: 80,
          backgroundColor: data.color,
        }}
      ></div>
    </div>
  )
}

export default ColorPreview
