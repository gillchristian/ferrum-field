import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"

const growth = (g: string) =>
  g === "Seedling"
    ? "🌱"
    : g === "Budding"
    ? "🌿"
    : g === "Potted"
    ? "🪴"
    : g === "Evergreen"
    ? "🌳"
    : ""

const formatGrowth = (g: string) => ({ text: growth(g), title: g })

type Segment = string | { text: string; title: string }

export default (() => {
  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    if (text) {
      const segments: Segment[] = []
      const { text: timeTaken, words: _words } = readingTime(text)

      if (fileData.dates) {
        segments.push(formatDate(getDate(cfg, fileData)!))
      }

      segments.push(timeTaken)

      const growth = fileData.frontmatter?.growth?.trim()

      if (growth) {
        segments.push(formatGrowth(growth))
      }

      const last = segments.length - 1

      return (
        <p class={`content-meta ${displayClass ?? ""}`}>
          {segments.map((s, i) => (
            <>
              {typeof s === "string" ? (
                <span key={i}>{s}</span>
              ) : (
                <>
                  <span key={i} title={s.title}>
                    {s.text}
                  </span>
                </>
              )}
              {i === last ? "" : " • "}
            </>
          ))}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = `
  .content-meta {
    margin-top: 0;
    color: var(--gray);
  }
  `
  return ContentMetadata
}) satisfies QuartzComponentConstructor
