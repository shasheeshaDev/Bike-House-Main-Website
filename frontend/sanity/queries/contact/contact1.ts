export const contact1Query = `
  _type == "contact-1" => {
    _type,
    _key,
    padding,
    label,
    heading[]{
      ...
    },
    forms[]{
      _key,
      tabLabel,
      panelLabel,
      panelHeading[]{ ... },
      panelDescription,
      contactDetails[]{ _key, label, value },
      panelCta { _key, label, href, isExternal, target, buttonVariant },
      formTitle,
      selectedFormConfig->{ ... },
      selectedFormSheet->{ ... },
      successTitle,
      successMessage
    },
    mapEmbedUrl,
    mapLabel
  }
`;
