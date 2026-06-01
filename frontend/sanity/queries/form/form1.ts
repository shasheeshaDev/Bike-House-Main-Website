import { groq } from "next-sanity";
import { linkQuery } from "../shared/link";
import { imageQuery } from "../shared/image";

// @sanity-typegen-ignore
export const form1Query = groq`
  _type == "form-1" => {
    _type,
    _key,
    padding,
    content,
    form {
      selectedFormConfig ->{
      ...
      },
      selectedFormSheet ->{
      ...
      }
    }
  }
`;
