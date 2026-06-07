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

      if (!response.ok) {
        setSubmitStatus({
          type: "error",
          message: result.message ?? "Failed to send message. Please try again.",
        });
        return;
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully. I'll get back to you soon.",
      });
      reset();
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </SectionWrapper>
  );
}
