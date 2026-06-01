import { linkQuery } from "../shared/link";

export const pageHeroQuery = `
  _type == "page-hero" => {
    _type,
    _key,
    heading,
    headingAccent,
    description,
    buttons[]{
      _key,
      label,
      buttonVariant,
      isExternal,
      target,
      sectionAnchor,
      "href": select(
        isExternal => href,
        !isExternal && defined(sectionAnchor) && @.internalLink->slug.current == "index" => "/#" + sectionAnchor,
        !isExternal && defined(sectionAnchor) => "/" + @.internalLink->slug.current + "#" + sectionAnchor,
        !isExternal && @.internalLink->slug.current == "index" => "/",
        !isExternal && defined(@.internalLink->slug.current) => "/" + @.internalLink->slug.current,
        null
      )
    },
    showNotice,
    noticeIcon,
    noticeEyebrow,
    noticeTitle,
    noticeLink{
      ${linkQuery}
    }
  }
`;
