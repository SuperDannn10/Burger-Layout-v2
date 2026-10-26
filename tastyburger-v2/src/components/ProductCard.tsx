import type { Product } from "../types";
import { money } from "../data";

interface Props {
  product: Product;
  qty: number;
  favorite: boolean;
  selected: boolean;
  onSelect: (product: Product) => void;
  onQty: (id: number, qty: number) => void;
  onFavorite: (id: number) => void;
}

const stars = (r: number) => "★".repeat(Math.floor(r)) + (r % 1 ? "★" : "") + "☆".repeat(5 - Math.ceil(r));

export default function ProductCard({ product: p, qty, favorite, selected, onSelect, onQty, onFavorite }: Props) {
  return (
    <article className={`card${selected ? " selected" : ""}`}>
      <div className={`media${p.image ? " has-image" : ""}`} style={{ background: p.color }}>
        <button className="media-preview" onClick={() => onSelect(p)} aria-label={`View details for ${p.name}`}>
          {p.image ? <img src={p.image} alt="" loading="lazy" /> : <span className="emoji" aria-hidden>{p.emoji}</span>}
        </button>
        <span className={`badge ${p.spicy ? "hot" : ""}`}>{p.badge.toUpperCase()}</span>
        <button className={`heart ${favorite ? "on" : ""}`} onClick={() => onFavorite(p.id)} aria-pressed={favorite} aria-label={`Favorite ${p.name}`}>♥</button>
        {p.spicy && <span className="spicy-mark" aria-label="Spicy">🌶</span>}
      </div>

      <div className="body">
        <p className="rating"><span aria-label={`${p.rating} out of 5`}>{stars(p.rating)}</span> <small>({p.reviews})</small></p>
        <h3><button className="product-name" onClick={() => onSelect(p)}>{p.name}</button></h3>
        <p className="desc">{p.description}</p>

        <div className="buy">
          <strong className="product-price">{money(p.price)}</strong>
          {qty === 0 ? (
            <button className="add-round" onClick={() => onQty(p.id, 1)} aria-label={`Add ${p.name} to your order`}>+</button>
          ) : (
            <span className="stepper">
              <button onClick={() => onQty(p.id, qty - 1)} aria-label={`Remove one ${p.name}`}>−</button>
              <b>{qty}</b>
              <button onClick={() => onQty(p.id, qty + 1)} aria-label={`Add one ${p.name}`}>+</button>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
