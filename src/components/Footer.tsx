import { Link } from "@tanstack/react-router";
import { Mail, Phone, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-sm font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-accent-foreground">
              <Cpu className="h-4 w-4" />
            </span>
            tech<span className="text-accent">.</span>at<span className="text-accent">.</span>best
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Curated computers & accessories. Hand-picked specs, transparent pricing, fast checkout.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-accent">// Connect with us</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              <a href="mailto:akshatk554@gmail.com" className="hover:text-foreground">akshatk554@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              <a href="tel:+917004646000" className="hover:text-foreground">+91 7004646xxx</a>
            </li>
            <li>Mon–Sat · 10:00 – 19:00 IST</li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-accent">// Policies</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/policies/returns" className="hover:text-foreground">Return & refund policy</Link></li>
            <li><a className="hover:text-foreground" href="#">Shipping & delivery</a></li>
            <li><a className="hover:text-foreground" href="#">Warranty</a></li>
            <li><a className="hover:text-foreground" href="#">Privacy & terms</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-accent">// Make money with us</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/sell" className="hover:text-foreground">Sell your product</Link></li>
            <li><a className="hover:text-foreground" href="#">Affiliate program</a></li>
            <li><a className="hover:text-foreground" href="#">Become a partner</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} tech.at.best — All systems nominal.</p>
          <p className="font-mono">[ build · v1.0.0 ]</p>
        </div>
      </div>
    </footer>
  );
}
