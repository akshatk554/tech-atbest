import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/policies/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — tech.at.best" },
      { name: "description", content: "How tech.at.best collects, uses and protects your personal data, including cookies, analytics and your rights under DPDP/GDPR." },
      { property: "og:title", content: "Privacy policy — tech.at.best" },
      { property: "og:description", content: "What we collect, why, and your rights." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-mono text-[11px] uppercase tracking-widest text-accent">// policies / privacy</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Privacy policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: 10 June 2026</p>

      <article className="prose mt-8 max-w-none space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-foreground [&_strong]:text-foreground">
        <p>This policy explains what data we collect when you use tech.at.best, why we collect it and how we keep it safe. We comply with India's Digital Personal Data Protection Act (DPDP) 2023 and align with GDPR principles for visitors from the EU.</p>

        <h2>1. What we collect</h2>
        <ul className="list-disc pl-5">
          <li><strong>Account data:</strong> name, email, phone, and (optionally) GSTIN.</li>
          <li><strong>Order data:</strong> shipping address, billing address, items purchased, invoices.</li>
          <li><strong>Device data:</strong> IP, browser/OS, referrer, anonymised analytics events.</li>
          <li><strong>On-device storage:</strong> cart, wishlist, compare list, theme preference and recently viewed history are stored in your browser's <code>localStorage</code> — they never leave your device unless you sign in.</li>
        </ul>

        <h2>2. Why we use it</h2>
        <ul className="list-disc pl-5">
          <li>To process orders, ship products and handle returns/refunds.</li>
          <li>To provide customer support and warranty claims.</li>
          <li>To improve the website (anonymous analytics, never sold).</li>
          <li>To send transactional emails. Marketing emails only if you opt in.</li>
        </ul>

        <h2>3. Cookies</h2>
        <p>We use strictly-necessary cookies for sign-in and cart, and privacy-respecting analytics that do not fingerprint you. You can clear cookies any time from your browser settings.</p>

        <h2>4. Sharing</h2>
        <p>We share data only with the parties needed to fulfil an order — payment processors, courier partners and tax authorities. We never sell your data.</p>

        <h2>5. Your rights</h2>
        <p>You can request access, correction or deletion of your data at any time by emailing <a href="mailto:akshatk554@gmail.com" className="text-accent hover:underline">akshatk554@gmail.com</a>. We respond within 30 days.</p>

        <h2>6. Security</h2>
        <p>Data is encrypted in transit (TLS) and at rest. Payment data is handled exclusively by PCI-DSS certified processors — we never see your full card number.</p>

        <h2>7. Children</h2>
        <p>The service is intended for users aged 18+. We do not knowingly collect data from children.</p>

        <h2>8. Changes</h2>
        <p>We'll post updates here and, for material changes, notify you by email. Continued use after an update means you accept the revised policy.</p>

        <h2>9. Contact</h2>
        <p>Questions? Email <a href="mailto:akshatk554@gmail.com" className="text-accent hover:underline">akshatk554@gmail.com</a>.</p>
      </article>
    </div>
  );
}
