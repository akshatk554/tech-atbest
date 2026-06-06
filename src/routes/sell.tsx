import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Store } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell on tech.at.best" },
      { name: "description", content: "Become a seller — list your computers, components and accessories." },
    ],
  }),
  component: SellPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Invalid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  address: z.string().trim().min(10, "Add a complete address").max(300),
  products: z.string().trim().min(3, "Describe your products").max(600),
});

function SellPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast.success("Application received", { description: "We'll be in touch within 2 business days." });
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">You're on the list</h1>
        <p className="mt-3 text-muted-foreground">
          Thanks for applying to sell on tech.at.best. Our team will review your details and reach out at the email you provided.
        </p>
        <Button className="mt-8" onClick={() => setSubmitted(false)}>Submit another</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">// make_money_with_us</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Sell your product</h1>
          <p className="mt-3 text-muted-foreground">
            Got laptops, components or accessories you'd like to list? Tell us what you have and we'll
            get back with onboarding steps, commission terms and shipping logistics.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Reach buyers actively shopping for tech",
              "Flat 5% commission, no listing fees",
              "Weekly payouts, full sales dashboard",
              "Curated catalogue — no clutter, no race-to-bottom",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Store className="mt-0.5 h-4 w-4 text-accent" />
                <span className="text-muted-foreground">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-card/40 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">// seller_application</p>
          <div className="mt-4 space-y-4">
            <Field id="name" label="Full name" error={errors.name}>
              <Input id="name" name="name" placeholder="Your name" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="email" label="Email" error={errors.email}>
                <Input id="email" name="email" type="email" placeholder="you@email.com" />
              </Field>
              <Field id="phone" label="Phone" error={errors.phone}>
                <Input id="phone" name="phone" placeholder="+91 ..." />
              </Field>
            </div>
            <Field id="address" label="Pickup address" error={errors.address}>
              <Textarea id="address" name="address" rows={3} placeholder="Street, city, state, pincode" />
            </Field>
            <Field id="products" label="Products you want to sell" error={errors.products}>
              <Textarea id="products" name="products" rows={4} placeholder="e.g. 10 units MacBook Air M2 (refurbished), 50 units Logitech MX Master 3S..." />
            </Field>
            <Button type="submit" size="lg" className="w-full">Submit application</Button>
            <p className="text-center text-[11px] text-muted-foreground">
              By submitting you agree to our seller policy. We never share your data.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
