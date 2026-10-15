import { FaCalendarCheck } from "react-icons/fa";

import { formatPhone, primaryPhone, telHref } from "../../config/site";
import { fleet, tripTypes } from "../../data/content";
import useBookingForm from "../../hooks/useBookingForm";
import Button from "../ui/Button";
import FormField from "../ui/FormField";
import { inputClass } from "../ui/formStyles";

const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

// variant "compact": trip details + contact (hero). "full": adds email & notes (contact section).
export default function BookingForm({
  id,
  prefill,
  variant = "compact",
  title = "Book Your Cab",
  subtitle = "Fill in your trip details and we'll confirm your ride.",
}) {
  const { values, errors, status, whatsappLink, setField, handleChange, handleSubmit } =
    useBookingForm(prefill);

  const full = variant === "full";
  const fieldId = (name) => `${id}-${name}`;

  const field = (name, label, props = {}) => (
    <FormField label={label} htmlFor={fieldId(name)} error={errors[name]}>
      <input
        id={fieldId(name)}
        name={name}
        value={values[name]}
        onChange={handleChange}
        className={inputClass(errors[name])}
        {...props}
      />
    </FormField>
  );

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      noValidate
      className="scroll-mt-28 rounded-3xl border border-line bg-surface/85 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8"
    >
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-400">{subtitle}</p>

      {/* Trip type */}
      <div role="radiogroup" aria-label="Trip type" className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-surface-raised p-1.5">
        {tripTypes.map(({ id: type, label, icon: Icon }) => {
          const active = values.tripType === type;
          return (
            <button
              key={type}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setField("tripType", type)}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
                active ? "bg-brand text-ink shadow" : "text-gray-300 hover:text-white"
              }`}
            >
              <Icon aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {field("pickup", "Pickup *", { placeholder: "e.g. Sector 15, Faridabad", autoComplete: "street-address" })}
        {field("drop", "Drop", {
          placeholder: values.tripType === "airport" ? "e.g. IGI Airport T3" : "e.g. Connaught Place",
        })}
        {field("date", "Date", { type: "date", min: today() })}
        {field("time", "Time", { type: "time" })}

        <FormField label="Vehicle" htmlFor={fieldId("vehicle")} className="sm:col-span-2">
          <select
            id={fieldId("vehicle")}
            name="vehicle"
            value={values.vehicle}
            onChange={handleChange}
            className={inputClass()}
          >
            <option value="">Any available vehicle</option>
            {fleet.map((car) => (
              <option key={car.name} value={car.name}>
                {car.name} ({car.seats})
              </option>
            ))}
          </select>
        </FormField>

        {field("name", "Your Name *", { placeholder: "Full name", autoComplete: "name" })}
        {field("phone", "Mobile Number *", { type: "tel", placeholder: "10-digit mobile", autoComplete: "tel" })}

        {full && (
          <>
            <div className="sm:col-span-2">
              {field("email", "Email", { type: "email", placeholder: "you@example.com", autoComplete: "email" })}
            </div>
            <FormField label="Notes" htmlFor={fieldId("message")} className="sm:col-span-2">
              <textarea
                id={fieldId("message")}
                name="message"
                rows="4"
                value={values.message}
                onChange={handleChange}
                placeholder="Return trip, luggage, number of passengers..."
                className={`${inputClass()} resize-none`}
              />
            </FormField>
          </>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        block
        icon={FaCalendarCheck}
        disabled={status === "sending"}
        className="mt-6"
      >
        {status === "sending" ? "Sending..." : "Request Booking"}
      </Button>

      <div aria-live="polite" className="text-sm leading-6">
        {status === "success" && (
          <p className="mt-4 text-green-400">
            Thank you! Your booking request has been sent. We will call you shortly to confirm.
          </p>
        )}

        {status === "whatsapp" && (
          <p className="mt-4 text-green-400">
            Your booking request has been opened in WhatsApp — just press send.{" "}
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="underline">
              Open again
            </a>
          </p>
        )}

        {status === "error" && (
          <p className="mt-4 text-red-400" role="alert">
            Sorry, we couldn't send your request right now.{" "}
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="text-green-400 underline">
              Send it on WhatsApp
            </a>{" "}
            or call{" "}
            <a href={telHref()} className="text-brand-light underline">
              {formatPhone(primaryPhone)}
            </a>
            .
          </p>
        )}

        {status === "idle" && (
          <p className="mt-4 text-center text-gray-500">
            Prefer to talk?{" "}
            <a href={telHref()} className="font-semibold text-brand-light hover:underline">
              Call {formatPhone(primaryPhone)}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
