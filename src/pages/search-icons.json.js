// The icons the search results use (lib/search-icons.js), as SVG markup by name. The search
// dialog fetches them with its index on first use, instead of every page carrying all of them
// (some 19 KB a page) in a template.
import { getIconData, iconToSVG, iconToHTML } from "@iconify/utils";
import { icons } from "@iconify-json/iconoir";
import { SEARCH_ICONS } from "../lib/search-icons.js";

export function GET() {
  const out = {};
  for (const name of SEARCH_ICONS) {
    const data = getIconData(icons, name.split(":")[1]);
    if (!data) throw new Error(`search icon ${name} is not in the iconoir set`);
    const { attributes, body } = iconToSVG(data);
    out[name] = iconToHTML(body, { ...attributes, width: "1em", height: "1em", class: "ico", "aria-hidden": "true", "data-k": name });
  }
  return new Response(JSON.stringify(out), { headers: { "Content-Type": "application/json" } });
}
