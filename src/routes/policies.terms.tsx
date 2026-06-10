import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/policies/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — tech.at.best" },
      { name: "description", content: "The legal agreement between you and tech.at.best when you use our website and purchase products." },
      { property: "og:title", content: "Terms of service — tech.at.best" },
      { property: "og:description", content: "Use of site, orders, pricing, IP, liability and governing law." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// policies / terms</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Terms of service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: 10 June 2026</p>

      <article className="prose mt-8 max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-foreground [&_strong]:text-foreground">
        <p>By using tech.at.best you agree to these terms. Please read them carefully.</p>

        <h2>1. Use of the site</h2>
        <p>You agree to use the site lawfully and not to attempt to interfere with its operation, security or the experience of other users.</p>

        <h2>2. Account</h2>
        <p>You are responsible for keeping your account credentials safe and for activity under your account.</p>

        <h2>3. Orders & pricing</h2>
        <ul className="list-disc pl-5">
          <li>An order is a binding contract only after we send a dispatch confirmation.</li>
          <li>We reserve the right to cancel orders containing pricing errors or stock issues; you'll get a full refund within 5 business days.</li>
          <li>All prices are in INR and include GST unless stated otherwise.</li>
        </ul>

        <h2>4. Returns & refunds</h2>
        <p>See our <a href="/policies/returns" className="text-accent hover:underline">Return & refund policy</a>. By default we offer a 7-day return window on unused items in original packaging.</p>

        <h2>5. Warranty</h2>
        <p>See our <a href="/policies/warranty" className="text-accent hover:underline">Warranty policy</a>. Products carry the manufacturer's standard warranty.</p>

        <h2>6. Intellectual property</h2>
        <p>All content on tech.at.best (brand, design, copy, images) belongs to us or our licensors. You may not copy or redistribute without written permission.</p>

        <h2>7. Third-party links</h2>
        <p>Some product cards link out to retailer pages. We are not responsible for the content, prices or policies of third-party sites.</p>

        <h2>8. Limitation of liability</h2>
        <p>To the maximum extent permitted by law, tech.at.best is not liable for indirect or consequential losses arising from your use of the site. Our maximum liability is limited to the amount you paid for the order in question.</p>

        <h2>9. Governing law</h2>
        <p>These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts of Jamshedpur, Jharkhand.</p>

        <h2>10. Contact</h2>
        <p>Reach us at <a href="mailto:akshatk554@gmail.com" className="text-accent hover:underline">akshatk554@gmail.com</a>.</p>
      </article>
    </div>
  );
}
