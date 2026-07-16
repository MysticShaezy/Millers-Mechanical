"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, ChevronLeft, Car, Wrench, User, CheckCircle, Send } from "lucide-react";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/validation";
import { services } from "@/data/services";
import { analytics } from "@/lib/analytics";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Vehicle", icon: Car },
  { id: 2, label: "Service", icon: Wrench },
  { id: 3, label: "Contact", icon: User },
];

export default function QuoteWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    mode: "onTouched",
  });

  const validateStep = async (): Promise<boolean> => {
    if (currentStep === 1) {
      return await trigger(["vehicleMake", "vehicleModel", "vehicleYear"]);
    }
    if (currentStep === 2) {
      return await trigger(["serviceType", "description"]);
    }
    if (currentStep === 3) {
      return await trigger(["name", "phone", "email"]);
    }
    return true;
  };

  const nextStep = async () => {
    const valid = await validateStep();
    if (valid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: QuoteFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Quote wizard data:", data);
    analytics.formSubmit("quote_wizard");
    setIsSubmitted(true);
    reset();
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full px-4 py-3 rounded-lg border bg-white outline-none transition-all duration-fast",
      "focus:ring-2 focus:ring-primary/20 focus:border-primary",
      hasError ? "border-error ring-2 ring-error/20" : "border-border"
    );

  if (isSubmitted) {
    return (
      <section className="py-section bg-brand-black">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <FadeIn>
            <div className="bg-surface-dark-elevated rounded-2xl border border-border-dark p-12">
              <CheckCircle className="text-success mx-auto mb-6" size={56} />
              <h3 className="text-3xl font-bold text-white mb-3">Quote Request Sent!</h3>
              <p className="text-gray-400 text-lg">
                Thanks for your enquiry. We&apos;ll review your details and get
                back to you within 24 hours.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section className="py-section bg-brand-black">
      <div className="container mx-auto px-4 max-w-2xl">
        <FadeIn>
          <SectionHeading
            title="Get a Free Quote"
            subtitle="Tell us about your vehicle and we'll get back to you with a quote."
            dark
          />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="bg-surface-dark-elevated rounded-2xl border border-border-dark p-6 md:p-10">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-10">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-normal",
                        currentStep >= step.id
                          ? "bg-primary text-white"
                          : "bg-brand-gray text-gray-500"
                      )}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle size={18} />
                      ) : (
                        <step.icon size={18} />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs mt-2 font-medium hidden sm:block",
                        currentStep >= step.id
                          ? "text-white"
                          : "text-gray-600"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 mx-3 rounded-full transition-colors duration-normal",
                        currentStep > step.id
                          ? "bg-primary"
                          : "bg-brand-gray"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Step 1: Vehicle */}
              <div className={cn(currentStep !== 1 && "hidden")}>
                <h3 className="text-xl font-bold text-white mb-6">
                  Your Vehicle Details
                </h3>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="vehicleMake" className="block text-sm font-semibold text-gray-300 mb-2">
                      Vehicle Make <span className="text-primary">*</span>
                    </label>
                    <input
                      id="vehicleMake"
                      type="text"
                      {...register("vehicleMake")}
                      className={inputClass(!!errors.vehicleMake)}
                      placeholder="e.g. Toyota, Ford, Holden"
                    />
                    {errors.vehicleMake && (
                      <p className="text-error text-sm mt-1" role="alert">{errors.vehicleMake.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="vehicleModel" className="block text-sm font-semibold text-gray-300 mb-2">
                        Model <span className="text-primary">*</span>
                      </label>
                      <input
                        id="vehicleModel"
                        type="text"
                        {...register("vehicleModel")}
                        className={inputClass(!!errors.vehicleModel)}
                        placeholder="e.g. Hilux, Ranger"
                      />
                      {errors.vehicleModel && (
                        <p className="text-error text-sm mt-1" role="alert">{errors.vehicleModel.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="vehicleYear" className="block text-sm font-semibold text-gray-300 mb-2">
                        Year <span className="text-primary">*</span>
                      </label>
                      <input
                        id="vehicleYear"
                        type="text"
                        {...register("vehicleYear")}
                        className={inputClass(!!errors.vehicleYear)}
                        placeholder="e.g. 2020"
                        maxLength={4}
                      />
                      {errors.vehicleYear && (
                        <p className="text-error text-sm mt-1" role="alert">{errors.vehicleYear.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Service */}
              <div className={cn(currentStep !== 2 && "hidden")}>
                <h3 className="text-xl font-bold text-white mb-6">
                  Service Required
                </h3>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-300 mb-2">
                      Service Type <span className="text-primary">*</span>
                    </label>
                    <select
                      id="serviceType"
                      {...register("serviceType")}
                      className={cn(inputClass(!!errors.serviceType), "appearance-none")}
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.title}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                    {errors.serviceType && (
                      <p className="text-error text-sm mt-1" role="alert">{errors.serviceType.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
                      Describe the Issue <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      {...register("description")}
                      className={cn(inputClass(!!errors.description), "resize-none")}
                      placeholder="Tell us what's happening with your vehicle..."
                    />
                    {errors.description && (
                      <p className="text-error text-sm mt-1" role="alert">{errors.description.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 3: Contact */}
              <div className={cn(currentStep !== 3 && "hidden")}>
                <h3 className="text-xl font-bold text-white mb-6">
                  Your Contact Details
                </h3>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="quote-name" className="block text-sm font-semibold text-gray-300 mb-2">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      {...register("name")}
                      className={inputClass(!!errors.name)}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-error text-sm mt-1" role="alert">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="quote-phone" className="block text-sm font-semibold text-gray-300 mb-2">
                        Phone <span className="text-primary">*</span>
                      </label>
                      <input
                        id="quote-phone"
                        type="tel"
                        {...register("phone")}
                        className={inputClass(!!errors.phone)}
                        placeholder="Your phone number"
                      />
                      {errors.phone && (
                        <p className="text-error text-sm mt-1" role="alert">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="quote-email" className="block text-sm font-semibold text-gray-300 mb-2">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        {...register("email")}
                        className={inputClass(!!errors.email)}
                        placeholder="Your email address"
                      />
                      {errors.email && (
                        <p className="text-error text-sm mt-1" role="alert">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-300 mb-2">
                      Preferred Date <span className="text-gray-600">(optional)</span>
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      {...register("preferredDate")}
                      className={inputClass(false)}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-border-dark">
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    icon={<ChevronLeft size={18} />}
                    className="text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={nextStep}
                    icon={<ChevronRight size={18} />}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    glow
                    icon={<Send size={18} />}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Submit Quote Request"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
