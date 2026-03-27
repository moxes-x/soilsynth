import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { EASE } from "@/constants/landing";
import { defaultFormData } from "@/constants/landing-data";
import type { AccessFormData, AccessFormErrors } from "@/types/landing";
import { CheckIcon, CloseIcon } from "./icons";

type RequestAccessModalProps = {
  onClose: () => void;
};

export function RequestAccessModal({ onClose }: RequestAccessModalProps) {
  const [formData, setFormData] = useState<AccessFormData>(defaultFormData);
  const [errors, setErrors] = useState<AccessFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formEndpoint = (
    process.env.NEXT_PUBLIC_ACCESS_ENDPOINT ?? "/api/request-access"
  ).trim();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const validate = () => {
    const nextErrors: AccessFormErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Required";
    }
    if (!formData.organization.trim()) {
      nextErrors.organization = "Required";
    }
    if (!formData.role.trim()) {
      nextErrors.role = "Required";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Invalid email";
    }
    if (!formData.useCase.trim()) {
      nextErrors.useCase = "Required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const updateField = (field: keyof AccessFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          organization: formData.organization.trim(),
          role: formData.role.trim(),
          email: formData.email.trim(),
          useCase: formData.useCase.trim(),
        }),
      });

      if (!response.ok) {
        let apiError = `Submission failed with status ${response.status}`;

        try {
          const body = (await response.json()) as { error?: string };
          if (body.error) {
            apiError = body.error;
          }
        } catch {
          // Keep fallback error when response body is not JSON.
        }

        throw new Error(apiError);
      }

      setSubmitted(true);
      setFormData(defaultFormData);
      setErrors({});
    } catch (error) {
      console.error("Request access submission error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Unable to submit request right now.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "w-full rounded-none border border-black/10 bg-white px-4 py-3 text-sm text-[#111111] placeholder-[#111111]/25 outline-none transition-colors focus:border-[#1F7A63]/50";
  const labelClassName =
    "mb-2 block text-xs font-mono uppercase tracking-widest text-[#1F7A63]";
  const errorClassName = "mt-1 text-xs text-red-600";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/40 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto border border-black/[0.08] bg-white shadow-xl shadow-black/[0.06]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-[#111111]/30 transition-colors hover:text-[#111111]"
          aria-label="Close"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        <div className="p-8 md:p-10">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="py-12 text-center"
            >
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center border border-[#1F7A63]/30 bg-[#1F7A63]/8">
                <CheckIcon className="h-5 w-5 text-[#1F7A63]" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#111111]">
                Request received
              </h3>
              <p className="mx-auto max-w-xs text-sm text-[#666666]">
                We will review your details and be in touch shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 text-xs font-mono uppercase tracking-widest text-[#111111]/30 transition-colors hover:text-[#111111]"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <p className="mb-3 text-xs font-mono uppercase tracking-widest text-[#1F7A63]">
                  Early Access
                </p>
                <h2 className="mb-2 text-2xl font-bold text-[#111111]">
                  Request Access
                </h2>
                <p className="text-sm leading-relaxed text-[#666666]">
                  We are working with a small group of partners. Tell us about
                  your organization and intended use.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClassName}>Full Name</label>
                    <input
                      className={inputClassName}
                      placeholder="Jane Smith"
                      value={formData.fullName}
                      onChange={(event) =>
                        updateField("fullName", event.target.value)
                      }
                    />
                    {errors.fullName ? (
                      <p className={errorClassName}>{errors.fullName}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelClassName}>Organization</label>
                    <input
                      className={inputClassName}
                      placeholder="Ministry of Agriculture"
                      value={formData.organization}
                      onChange={(event) =>
                        updateField("organization", event.target.value)
                      }
                    />
                    {errors.organization ? (
                      <p className={errorClassName}>{errors.organization}</p>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClassName}>Role</label>
                    <input
                      className={inputClassName}
                      placeholder="Director of Programs"
                      value={formData.role}
                      onChange={(event) =>
                        updateField("role", event.target.value)
                      }
                    />
                    {errors.role ? (
                      <p className={errorClassName}>{errors.role}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className={labelClassName}>Email</label>
                    <input
                      type="email"
                      className={inputClassName}
                      placeholder="jane@example.org"
                      value={formData.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                    />
                    {errors.email ? (
                      <p className={errorClassName}>{errors.email}</p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label className={labelClassName}>Use Case</label>
                  <textarea
                    className={`${inputClassName} resize-none`}
                    rows={4}
                    placeholder="Describe how you plan to use SoilSynth..."
                    value={formData.useCase}
                    onChange={(event) =>
                      updateField("useCase", event.target.value)
                    }
                  />
                  {errors.useCase ? (
                    <p className={errorClassName}>{errors.useCase}</p>
                  ) : null}
                </div>

                {submitError ? (
                  <p className="text-sm text-red-600">{submitError}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1F7A63] py-4 text-sm font-semibold text-white transition-all hover:bg-[#1a6a55] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
