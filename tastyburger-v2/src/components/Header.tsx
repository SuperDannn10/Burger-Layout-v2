import type { Cart } from "../types";
import { money, products } from "../data";

interface Props {
  cart: Cart;
}

export default function Header({ cart }: Props) {
  const lines = products.filter((p) => cart[p.id]);
  const count = lines.reduce((s, p) => s + cart[p.id], 0);
  const total = lines.reduce((s, p) => s + cart[p.id] * p.price, 0);

  return (
    <header className="header" id="top">
      <a className="brand" href="#top" aria-label="Tasty Burger home">
        <span className="logo-mark" aria-hidden>≡</span>
        <span className="brand-copy"><strong>Tasty Burger</strong><small>LAYOUT V2</small></span>
      </a>
      <a className="header-cart" href="#your-order" aria-label={`Cart with ${count} items, ${money(total)}`}>
        <span aria-hidden>🛒</span><span>Cart ({count})</span>
      </a>
    </header>
  );
}
