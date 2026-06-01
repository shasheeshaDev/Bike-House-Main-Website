"use client";

import SectionContainer from "@/components/ui/section-container";
import { PAGE_QUERYResult } from "@/sanity.types";
import PortableTextRenderer from "@/components/portable-text-renderer";
import DynamicForm from "@/components/forms/dynamic-form";

type Form1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "form-1" }
>;

export default function Form1({ padding, content, form }: Form1Props) {

  return (
    <SectionContainer padding={padding}>
      {content && (
        <div className="mx-auto max-w-3xl mb-12 text-center">
          <PortableTextRenderer value={content} />
        </div>
      )}
      {form && form.selectedFormSheet && form.selectedFormConfig && <DynamicForm formSettings={form} />}
    </SectionContainer>
  );
}
