import { imageQuery } from "../shared/image";

export const testimonial1Query = `
  _type == "testimonial-1" => {
    _type,
    _key,
    padding,
    testimonials[]->{
      _id,
      name,
      role,
      title,
      quote,
      avatar {
        ${imageQuery}
      }
    },
    imageBlock {
      ${imageQuery}
    }
  }
`;
