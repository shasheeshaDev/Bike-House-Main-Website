"use client";

import React, { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { sendEnquiryEmail } from "@/app/actions/contact/actions";
import { toast } from "sonner";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { useParams } from "next/navigation";
import { cleanSanityString } from "@/lib/utils";
import type { FormSheet, FormConfig } from "@/sanity.types";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormSettings {
  selectedFormSheet?: FormSheet | null;
  selectedFormConfig?: FormConfig | null;
  uniqKey?: string;
}

interface FormProps {
  formSettings: FormSettings;
  bgcolor?: string | undefined;
  hiddenData?: Record<string, string>;
  /** "light" = cream inputs on white bg (default). "dark" = translucent inputs on navy bg. */
  variant?: "light" | "dark";
}

// ── Light variant — white/cream backgrounds ──────────────────────────────────
const lightInput =
  "w-full font-dmSans text-[14px] font-light text-eh-charcoal bg-white border border-transparent rounded-none px-4 py-[14px] h-auto outline-none focus:border-eh-gold focus:bg-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-[border-color,background] duration-200 placeholder:text-eh-charcoal/40 appearance-none";

const lightTextarea =
  "w-full font-dmSans text-[14px] font-light text-eh-charcoal bg-eh-cream border border-transparent rounded-none px-4 py-[14px] outline-none focus:border-eh-gold focus:bg-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-[border-color,background] duration-200 placeholder:text-eh-charcoal/40 resize-y min-h-[120px]";

const lightLabel =
  "font-dmSans text-[10px] font-bold tracking-[0.15em] uppercase text-eh-charcoal";

// ── Dark variant — navy sidebar backgrounds ───────────────────────────────────
const darkInput =
  "w-full font-dmSans text-[14px] font-light text-white bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] rounded-none px-[14px] py-3 h-auto outline-none focus:border-eh-gold focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-[border-color] duration-200 placeholder:text-white/40 appearance-none";

const darkTextarea =
  "w-full font-dmSans text-[14px] font-light text-white bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] rounded-none px-[14px] py-3 outline-none focus:border-eh-gold focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-[border-color] duration-200 placeholder:text-white/40 resize-none min-h-[80px]";

const darkLabel =
  "font-dmSans text-[10px] font-bold tracking-[0.15em] uppercase text-white/60";

const DynamicForm = ({ formSettings, bgcolor, hiddenData, variant = "light" }: FormProps) => {
  const isDark = variant === "dark";
  const ehInput = isDark ? darkInput : lightInput;
  const ehTextarea = isDark ? darkTextarea : lightTextarea;
  const ehLabel = isDark ? darkLabel : lightLabel;
  const params = useParams();
  const slug = params?.slug;
  const [fileMap, setFileMap] = React.useState<Record<string, File | null>>({});

  const { selectedFormSheet, selectedFormConfig, uniqKey } = formSettings;
  const fields = selectedFormSheet?.fields || [];

  // Helper to generate consistent field names
  const getFieldName = (field: NonNullable<FormSheet["fields"]>[number], index: number) => {
    const cleanLabel = cleanSanityString(field.label);
    const cleanPlaceholder = cleanSanityString(field.placeholder);
    return (
      cleanLabel?.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") ||
      cleanPlaceholder?.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") ||
      `field_${index}`
    );
  };

  // Generate Zod schema dynamically
  const formSchema = useMemo(() => {
    const schemaMap: Record<string, any> = {};

    for (let index = 0; index < fields.length; index++) {
      const field = fields[index];
      const fieldName = getFieldName(field, index);
      let validator: z.ZodTypeAny;

      switch (field.fieldType) {
        case "email": {
          let v: z.ZodType<any> = z.string();
          if (field.required) {
            v = (v as z.ZodString).min(1, "Required").email("Invalid email address");
          } else {
            v = v.optional().or(z.literal(""));
          }
          validator = v;
          break;
        }
        case "checkbox": {
          let v = z.boolean().default(false);
          if (field.required) {
            v = v.refine((val) => val === true, { message: "Required" });
          }
          validator = v;
          break;
        }
        case "checkboxGroup": {
          let v = z.array(z.string());
          if (field.required) {
            v = v.min(1, "Select at least one option");
          }
          validator = v.default([]);
          break;
        }
        case "url": {
          validator = z.string().optional().or(z.literal(""));
          break;
        }
        case "file": {
          // File handled via fileMap state — just a string placeholder for filename
          validator = z.string().optional().or(z.literal(""));
          break;
        }
        case "date": {
          let v: z.ZodType<any> = z.string();
          if (field.required) {
            v = (v as z.ZodString).min(1, "Please select a date");
          } else {
            v = v.optional().or(z.literal(""));
          }
          validator = v;
          break;
        }
        case "dateRange": {
          // Two fields: start and end date
          const startKey = `${fieldName}_start`;
          const endKey = `${fieldName}_end`;
          const dateValidator = field.required
            ? z.string().min(1, "Required")
            : z.string().optional().or(z.literal(""));
          schemaMap[startKey] = dateValidator;
          schemaMap[endKey] = dateValidator;
          continue; // skip the default schemaMap[fieldName] assignment
        }
        default: {
          let v: z.ZodType<any> = z.string();
          if (field.required) {
            v = (v as z.ZodString).min(1, "Required");
          } else {
            v = v.optional().or(z.literal(""));
          }
          validator = v;
          break;
        }
      }
      schemaMap[fieldName] = validator!;
    }

    return z.object(schemaMap);
  }, [fields]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field, index) => {
      const fieldName = getFieldName(field, index);
      if (field.fieldType === "checkboxGroup") acc[fieldName] = [];
      else if (field.fieldType === "checkbox") acc[fieldName] = false;
      else if (field.fieldType === "dateRange") {
        acc[`${fieldName}_start`] = "";
        acc[`${fieldName}_end`] = "";
      } else acc[fieldName] = "";
      return acc;
    }, {} as Record<string, any>),
  });

  // Auto-populate hidden URL fields with the current page URL after mount
  useEffect(() => {
    fields.forEach((field, index) => {
      if (field.fieldType === "url") {
        form.setValue(getFieldName(field, index), window.location.href);
      }
    });
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Merge form values, file names, and hidden data
    const fileEntries: Record<string, string> = {};
    Object.entries(fileMap).forEach(([key, file]) => {
      if (file) fileEntries[key] = file.name;
    });
    const data = {
      ...values,
      ...fileEntries,
      ...hiddenData,
    } as Record<string, string | boolean | string[] | File[] | undefined>;

    // Find email field for Reply-To
    let replyTo: string | undefined;
    const emailField = fields.find((f) => f.fieldType === "email");
    if (emailField) {
      const emailFieldName = getFieldName(emailField, fields.indexOf(emailField));
      const emailVal = data[emailFieldName];
      if (typeof emailVal === "string") {
        replyTo = emailVal;
      }
    }

    const sendEmail = await sendEnquiryEmail({
      subject: selectedFormConfig?.formSubject || "Enquiry",
      data,
      toEmail: selectedFormConfig?.toEmail || "[EMAIL_ADDRESS]",
      ccEmails: selectedFormConfig?.ccEmails,
      bccEmails: selectedFormConfig?.bccEmails,
      fromName: selectedFormConfig?.fromName || "Website Enquiry",
      replyTo,
    });

    if (sendEmail) {
      if (slug && slug[0] === "maintenance-request") {
        trackMetaEvent("Contact", {
          content_name: "Service Request",
          content_category: "General",
        });
      }
      toast.success(
        selectedFormSheet?.successMessage ??
        "Thank you for your enquiry. We'll be in touch soon!"
      );
      form.reset();
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`w-full flex flex-col ${bgcolor === "primary" || bgcolor === "secondary"
            ? "text-primary-foreground"
            : "text-black"
            }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map((field, index) => {
              const {
                label,
                fieldType,
                placeholder = "",
                required,
                disabled,
                options,
                fieldWidth = "full",
                allowedCountries,
              } = field;

              if (
                fieldType &&
                ["dropdown", "radio", "checkboxGroup"].includes(fieldType) &&
                !options?.length
              )
                return null;

              const cleanLabel = cleanSanityString(label) || null;
              const cleanPlaceholder = cleanSanityString(placeholder);
              const fieldName = getFieldName(field, index);
              const fieldId = `${fieldName}_${uniqKey}_${index}`;
              const fieldClass = `field-wrp flex flex-col justify-start ${cleanSanityString(fieldWidth) === "full"
                ? "col-span-1 md:col-span-2"
                : "col-span-1"
                }`;

              if (
                fieldType === "text" ||
                fieldType === "email" ||
                fieldType === "number" ||
                fieldType === "password"
              ) {
                const textPlaceholder =
                  cleanSanityString(placeholder) || `Enter ${label}`;
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem>
                          {cleanLabel && (
                            <FormLabel className={ehLabel}>
                              {cleanLabel}{required && " *"}
                            </FormLabel>
                          )}
                          <FormControl>
                            <input
                              {...formField}
                              type={fieldType}
                              id={fieldId}
                              placeholder={textPlaceholder}
                              disabled={disabled}
                              value={formField.value?.toString() ?? ""}
                              className={ehInput}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "tel") {
                const telPlaceholder =
                  cleanSanityString(placeholder) || `Enter phone number`;
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem>
                          {cleanLabel && (
                            <FormLabel className={ehLabel}>
                              {cleanLabel}{required && " *"}
                            </FormLabel>
                          )}
                          <FormControl>
                            <PhoneInput
                              id={fieldId}
                              name={fieldName}
                              value={formField.value?.toString() ?? ""}
                              placeholder={telPlaceholder}
                              required={required}
                              disabled={disabled}
                              allowedCountries={allowedCountries as string[] | undefined}
                              variant={isDark ? "dark" : "light"}
                              onChange={(_phone, _country, fullValue) => {
                                formField.onChange(fullValue);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "textarea") {
                const textareaPlaceholder =
                  cleanSanityString(placeholder) || `Enter ${label}`;
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem>
                          {cleanLabel && (
                            <FormLabel className={ehLabel}>
                              {cleanLabel}{required && " *"}
                            </FormLabel>
                          )}
                          <FormControl>
                            <textarea
                              {...formField}
                              id={fieldId}
                              placeholder={textareaPlaceholder}
                              disabled={disabled}
                              value={formField.value?.toString() ?? ""}
                              className={ehTextarea}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "dropdown") {
                const dropdownPlaceholder =
                  cleanSanityString(placeholder) || `Select ${cleanSanityString(label)}`;
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem>
                          {cleanLabel && (
                            <FormLabel className={ehLabel}>
                              {cleanLabel}{required && " *"}
                            </FormLabel>
                          )}
                          <FormControl>
                            {/* Native select — matches design's appearance-none styled select */}
                            <div className="relative">
                              <select
                                id={fieldId}
                                disabled={disabled}
                                value={formField.value as string}
                                onChange={(e) => formField.onChange(e.target.value)}
                                className={`${ehInput} cursor-pointer pr-10`}
                              >
                                <option value="">{dropdownPlaceholder}</option>
                                {options?.map((option) => (
                                  <option key={option} value={cleanSanityString(option)}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-eh-charcoal/50 pointer-events-none" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "checkbox") {
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={formField.value as boolean}
                              onCheckedChange={formField.onChange}
                              disabled={disabled}
                              id={fieldId}
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={fieldId}
                            className="label font-normal m-0"
                          >
                            {cleanLabel}
                            {required && "*"}
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "checkboxGroup") {
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={() => (
                        <FormItem>
                          <div className="mb-3">
                            <FormLabel className={ehLabel}>
                              {cleanLabel}{required && " *"}
                            </FormLabel>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {options?.map((option, optIndex) => {
                              const optionValue = cleanSanityString(option);
                              const checkboxId = `${fieldName}_${uniqKey}_${optIndex}`;
                              return (
                                <FormField
                                  key={checkboxId}
                                  control={form.control}
                                  name={fieldName}
                                  render={({ field: formField }) => {
                                    return (
                                      <FormItem
                                        key={checkboxId}
                                        className="flex items-center space-x-2 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={(
                                              formField.value as string[]
                                            )?.includes(optionValue)}
                                            onCheckedChange={(checked) => {
                                              const currentValue = (formField.value as string[]) || [];
                                              return checked
                                                ? formField.onChange([
                                                  ...currentValue,
                                                  optionValue,
                                                ])
                                                : formField.onChange(
                                                  currentValue.filter(
                                                    (value: string) =>
                                                      value !== optionValue
                                                  )
                                                );
                                            }}
                                            disabled={disabled}
                                            id={checkboxId}
                                          />
                                        </FormControl>
                                        <FormLabel
                                          htmlFor={checkboxId}
                                          className="font-normal"
                                        >
                                          {option}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "radio") {
                const radioGroupName = `${fieldName}_${uniqKey ?? "form"}`;
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className={ehLabel}>
                            {cleanLabel}{required && " *"}
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={formField.onChange}
                              defaultValue={formField.value as string}
                              className="flex flex-col gap-3"
                              disabled={disabled}
                              name={radioGroupName}
                            >
                              {options?.map((option, optIndex) => {
                                const optionValue = cleanSanityString(option);
                                const radioId = `${fieldName}_${uniqKey}_${optIndex}`;
                                return (
                                  <FormItem
                                    key={radioId}
                                    className="flex items-center space-x-2 space-y-0"
                                  >
                                    <FormControl>
                                      <RadioGroupItem
                                        value={optionValue}
                                        id={radioId}
                                      />
                                    </FormControl>
                                    <FormLabel
                                      htmlFor={radioId}
                                      className="font-normal"
                                    >
                                      {option}
                                    </FormLabel>
                                  </FormItem>
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              // ── Hidden URL field ──
              if (fieldType === "url") {
                return (
                  <div key={index} className="hidden">
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormControl>
                            <input type="hidden" {...formField} value={formField.value?.toString() ?? ""} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              // ── Single date picker ──
              if (fieldType === "date") {
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem>
                          {cleanLabel && (
                            <FormLabel className={ehLabel}>
                              {cleanLabel}{required && " *"}
                            </FormLabel>
                          )}
                          <FormControl>
                            <input
                              {...formField}
                              type="date"
                              id={fieldId}
                              disabled={disabled}
                              value={formField.value?.toString() ?? ""}
                              className={ehInput}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              // ── File upload ──
              if (fieldType === "file") {
                const acceptedTypes = (field as any).acceptedFileTypes || ".pdf,.doc,.docx";
                const fileNote = (field as any).fileNote || "PDF or Word · Max 5MB";
                const selectedFile = fileMap[fieldName] ?? null;

                const uploadBg = isDark
                  ? "bg-white/5 border border-dashed border-white/20 hover:border-eh-gold"
                  : "bg-eh-cream border border-dashed border-black/15 hover:border-eh-gold";
                const uploadLabelColor = isDark ? "text-white/50" : "text-eh-midGray";
                const uploadNoteColor = isDark ? "text-white/30" : "text-eh-midGray/60";
                const uploadFileColor = isDark ? "text-eh-gold" : "text-eh-gold";

                return (
                  <div className={fieldClass} key={index}>
                    {cleanLabel && (
                      <p className={`${ehLabel} mb-1.5`}>{cleanLabel}{required && " *"}</p>
                    )}
                    <label
                      htmlFor={fieldId}
                      className={`flex flex-col items-center justify-center gap-1.5 px-4 py-5 cursor-pointer transition-colors duration-200 ${uploadBg}`}
                    >
                      {selectedFile ? (
                        <span className={`font-dmSans text-[12px] font-medium tracking-[0.06em] ${uploadFileColor}`}>
                          {selectedFile.name}
                        </span>
                      ) : (
                        <span className={`font-dmSans text-[12px] font-medium tracking-[0.08em] uppercase ${uploadLabelColor}`}>
                          {cleanLabel ? `Upload ${cleanLabel}` : "Upload File"}
                        </span>
                      )}
                      <span className={`font-dmSans text-[11px] ${uploadNoteColor}`}>{fileNote}</span>
                      <input
                        id={fieldId}
                        type="file"
                        accept={acceptedTypes}
                        disabled={disabled}
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setFileMap((prev) => ({ ...prev, [fieldName]: file }));
                        }}
                      />
                    </label>
                  </div>
                );
              }

              // ── Date range picker ──
              if (fieldType === "dateRange") {
                const startKey = `${fieldName}_start`;
                const endKey = `${fieldName}_end`;
                const startLabel = (field as any).startDateLabel || "Check-in Date";
                const endLabel = (field as any).endDateLabel || "Check-out Date";
                return (
                  <div className={`${fieldClass} grid grid-cols-1 sm:grid-cols-2 gap-5`} key={index}>
                    <FormField
                      control={form.control}
                      name={startKey}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className={ehLabel}>{startLabel}{required && " *"}</FormLabel>
                          <FormControl>
                            <input {...formField} type="date" id={`${startKey}_${uniqKey}`} disabled={disabled} value={formField.value?.toString() ?? ""} className={ehInput} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={endKey}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className={ehLabel}>{endLabel}{required && " *"}</FormLabel>
                          <FormControl>
                            <input {...formField} type="date" id={`${endKey}_${uniqKey}`} disabled={disabled} value={formField.value?.toString() ?? ""} className={ehInput} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full font-dmSans text-[12px] font-semibold tracking-[0.12em] uppercase bg-eh-gold text-eh-navy px-9 py-[14px] hover:bg-eh-goldLight transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  {selectedFormSheet?.submitButtonText || "Submit"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DynamicForm;
