// sectionAnchor is an optional field that appends a #hash to internal URLs.
// Examples:  internalLink = "contact", sectionAnchor = "book"  →  /contact#book
//            internalLink = "index",   sectionAnchor = "hero"  →  /#hero
export const linkQuery = `
    _key,
    ...,
    sectionAnchor,
    "href": select(
      isExternal => href,
      !isExternal && defined(sectionAnchor) && @.internalLink->slug.current == "index" => "/#" + sectionAnchor,
      !isExternal && defined(sectionAnchor) => "/" + @.internalLink->slug.current + "#" + sectionAnchor,
      !isExternal && @.internalLink->slug.current == "index" => "/",
      !isExternal && defined(@.internalLink->slug.current) => "/" + @.internalLink->slug.current,
      null
    )
`;
