"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { siteInfo } from "@/lib/data";
import { contactFormSchema, type ContactFormSchema } from "@/lib/validations/contact";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [remaining, setRemaining] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Rate limited
      if (response.status === 429) {
        setRemaining(0);
        setSubmitStatus({
          type: "error",
          message: result.error ?? "You've reached the daily limit. Please try again later.",
        });
        return;
      }

      if (!response.ok) {
        setSubmitStatus({
          type: "error",
          message: result.error ?? result.message ?? "Failed to send message. Please try again.",
        });
        return;
      }

      // Success
      if (result.success) {
        setRemaining(result.remaining);
        setSubmitStatus({
          type: "success",
          message: result.message ?? "Message sent successfully. I'll get back to you soon.",
        });
        reset();
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  const isLimitReached = remaining === 0;

  return (
    <SectionWrapper id="contact">
      <ScrollRevealGroup className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <ScrollRevealItem className="col-span-full">
          <SectionHeading
            title="Contact"
            subtitle="Get in touch for opportunities, collaborations, or questions."
          />
        </ScrollRevealItem>

        <ScrollRevealItem className="lg:col-span-5">
          <Card className="flex flex-col gap-6">
            <div>
              <h3 className="font-mono text-base font-semibold text-body-text">
                Direct Contact
              </h3>
              <a
                href={`mailto:${siteInfo.email}`}
                className="mt-3 inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-tertiary"
              >
                <Mail size={16} />
                {siteInfo.email}
              </a>
            </div>

            <div>
              <h3 className="font-mono text-base font-semibold text-body-text">
                Social Profiles
              </h3>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href="https://github.com/Ashiq04-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-tertiary"
                >
                  <GitHubIcon width={16} height={16} />
                  github.com/Ashiq04-hub
                </a>
                <a
                  href="https://www.linkedin.com/in/ashiq-alsinawi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-tertiary"
                >
                  <LinkedInIcon width={16} height={16} />
                  linkedin.com/in/ashiq-alsinawi
                </a>
              </div>
            </div>
          </Card>
        </ScrollRevealItem>

        <ScrollRevealItem className="lg:col-span-7">
          <Card>
            {/* position: relative so the honeypot's absolute positioning is contained */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
              style={{ position: "relative" }}
            >
              {/* Honeypot field — hidden from humans, filled by bots */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: "-9999px",
                  opacity: 0,
                  pointerEvents: "none",
                  height: 0,
                  overflow: "hidden",
                }}
              >
                <label htmlFor="website">Website (do not fill this in)</label>
                <input
                  id="website"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  {...register("website")}
                />
              </div>

              <Input
                label="Name"
                placeholder="Your name"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Subject"
                placeholder="What is this about?"
                error={errors.subject?.message}
                {...register("subject")}
              />
              <Textarea
                label="Message"
                placeholder="Your message..."
                error={errors.message?.message}
                {...register("message")}
              />

              {submitStatus && (
                <p
                  className={
                    submitStatus.type === "success"
                      ? "text-sm text-tertiary"
                      : "text-sm text-error"
                  }
                  role="status"
                >
                  {submitStatus.message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || isLimitReached}
                className={isLimitReached ? "opacity-50 cursor-not-allowed" : ""}
              >
                {isLimitReached
                  ? "Limit Reached"
                  : isSubmitting
                  ? "Sending..."
                  : "Send Message"}
              </Button>

              {remaining !== null && remaining > 0 && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  {remaining} message{remaining !== 1 ? "s" : ""} remaining today
                </p>
              )}

              {isLimitReached && (
                <p className="text-xs text-amber-400 text-center mt-2 flex items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Daily limit reached. Come back tomorrow.
                </p>
              )}
            </form>
          </Card>
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </SectionWrapper>
  );
}
