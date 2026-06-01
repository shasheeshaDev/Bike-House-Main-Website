export const linkQuery = `
    _key,
    ...,
    "href": select(
      isExternal => href,
      @.internalLink->slug.current == "index" => "/",
      "/" + @.internalLink->slug.current
    )
`;
