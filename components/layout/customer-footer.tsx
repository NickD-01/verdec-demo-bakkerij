import Link from "next/link";
import { Croissant } from "lucide-react";

interface CustomerFooterProps {
  restaurantName: string;
  address: string;
  phone: string;
}

export function CustomerFooter({ restaurantName, address, phone }: CustomerFooterProps) {
  return (
    <footer className="border-t bg-verdec-black text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2.5 font-bold">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-verdec-yellow text-white">
                <Croissant className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-semibold">{restaurantName}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Dagelijks vers gebakken brood en gebak, online gereserveerd en klaar voor afhaling.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-display font-semibold text-verdec-yellow">Navigatie</h4>
            <nav className="flex flex-col gap-2 text-sm text-white/60">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/menu" className="hover:text-white">Menu</Link>
              <Link href="/cart" className="hover:text-white">Winkelwagen</Link>
            </nav>
          </div>
          <div>
            <h4 className="mb-3 font-display font-semibold text-verdec-yellow">Contact</h4>
            <p className="text-sm text-white/60">{address}</p>
            <p className="mt-1 text-sm text-white/60">{phone}</p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          © {new Date().getFullYear()} {restaurantName} · Powered by Verdec
        </div>
      </div>
    </footer>
  );
}
