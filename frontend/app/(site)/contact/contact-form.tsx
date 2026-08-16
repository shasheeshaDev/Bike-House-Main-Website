"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendServiceInquiry, type FormState } from "@/app/actions";
import { site } from "@/lib/site";

const initialState: FormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn" type="submit" disabled={pending}>
      {pending ? "Sending…" : "Send Inquiry"} <span className="arrow" />
    </button>
  );
}

export default function ContactForm({ services }: { services: string[] }) {
  const [state, formAction] = useActionState(sendServiceInquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="form-success show" role="status">
        <div className="h4">Booking received.</div>
        <p>
          We&apos;ll call you back to confirm a slot — usually the same day.
          If it&apos;s urgent, ring the workshop on {site.phone}.
        </p>
      </div>
    );
  }

  return (
    // noValidate hands validation to the server action: the browser's own
    // constraint UI would otherwise block submit before it ever runs.
    <form className="form" action={formAction} noValidate>
      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="honeypot"
      />

      <div className="row">
        <div className="field">
          <label htmlFor="cf-name">Your Name</label>
          <input id="cf-name" name="name" type="text" placeholder="First and last" required />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" name="phone" type="tel" placeholder="+94 77 …" required />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="cf-email">
            Email <span className="optional">(optional)</span>
          </label>
          <input id="cf-email" name="email" type="email" placeholder="you@example.lk" />
        </div>
        <div className="field">
          <label htmlFor="cf-service">Service Needed</label>
          <select id="cf-service" name="service" defaultValue="">
            <option value="">Choose one…</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            <option value="Other / Not Sure">Other / Not Sure</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="cf-bike">Bike Make &amp; Model</label>
          <input id="cf-bike" name="bike" type="text" placeholder="e.g. BMW S1000RR 2022" required />
        </div>
        <div className="field">
          <label htmlFor="cf-date">Preferred Date</label>
          <input id="cf-date" name="date" type="date" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-message">Tell us what&apos;s happening</label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder="Symptoms, recent service history, anything we should know…"
          required
        />
      </div>

      {state.status === "error" && (
        <p className="form-error" role="alert">
          {state.message}
        </p>
      )}

      <div className="form-actions">
        <SubmitButton />
        <span className="spec-line">
          or call{" "}
          <a href={site.phoneHref} className="red">
            {site.phone}
          </a>
        </span>
      </div>
    </form>
  );
}
