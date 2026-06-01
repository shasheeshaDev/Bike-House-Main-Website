import { PAGE_QUERYResult } from "@/sanity.types";
import ColumnBuilderRenderer from "@/components/blocks/shared/column-builder-renderer";

type ContentOption3Props = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "content-4" }
>;

const ContentOption3 = ({ contentBlock }: ContentOption3Props) => {
  return (
    <section className="content-option-3 pt-[80px] pb-[40px]">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-5">
          <div className="body-content col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-3 text-start md:text-center">
            <ColumnBuilderRenderer blocks={contentBlock} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentOption3;
