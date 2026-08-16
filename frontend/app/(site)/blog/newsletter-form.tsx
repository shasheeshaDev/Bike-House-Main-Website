"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { subscribeToJournal, type FormState } from "@/app/actions";

const initialState: FormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn" type="submit" disabled={pending}>
      {pending ? "Sending…" : "Subscribe"} <span className="arrow" />
    </button>
  );
}

export default function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToJournal, initialState);

  return (
    <form className="newsletter" action={formAction} noValidate>
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="honeypot"
      />
      <label htmlFor="nl-email" className="sr-only">
        Email address
      </label>
      <input
        id="nl-email"
        type="email"
        name="email"
        placeholder="you@example.lk"
        required
        disabled={state.status === "success"}
      />
      <SubmitButton />
      <p aria-live="polite" className="newsletter-status">
        {state.status === "success" && <span className="ok">✓ You&apos;re on the list.</span>}
        {state.status === "error" && <span className="err">{state.message}</span>}
      </p>
    </form>
  );
}
