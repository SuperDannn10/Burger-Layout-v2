import { useMemo, useState } from "react";
import type { Cart, Product } from "./types";
import { categories, money, products } from "./data";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

type Diet = "all" | "spicy" | "veg";

const featuredIds = [2, 5, 3];
const initialProduct = products.find((product) => product.id === 6) ?? products[0];

export default function App() {
  const [cart, setCart] = useState<Cart>({});
  const [favorites, setFavorites] = useState<number[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [diet, setDiet] = useState<Diet>("all");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [detailQty, setDetailQty] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState("");

  const setQty = (id: number, qty: number) =>
    setCart((current) => {
      const next = { ...current };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const selectProduct = (product: Product) => {
    setSelectedProduct(product);
    setDetailQty(1);
  };

  const toggleFavorite = (id: number) =>
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const counts = (id: string) => (id === "all" ? products.length : products.filter((product) => product.category === id).length);
  const cartLines = products.filter((product) => cart[product.id] > 0);
  const cartCount = cartLines.reduce((sum, product) => sum + cart[product.id], 0);
  const subtotal = cartLines.reduce((sum, product) => sum + product.price * cart[product.id], 0);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter(
      (product) =>
        (category === "all" || product.category === category) &&
        (diet === "all" || (diet === "spicy" ? product.spicy : product.vegetarian)) &&
        (!query || product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query))
    );
  }, [category, diet, search]);

  const displayedProducts = showAll || search.trim() || category !== "all" || diet !== "all" ? visible : visible.slice(0, 8);
  const featuredProduct = products.find((product) => product.id === featuredIds[featuredIndex]) ?? products[0];

  const moveFeatured = (direction: number) => {
    setFeaturedIndex((current) => (current + direction + featuredIds.length) % featuredIds.length);
  };

  return (
    <div className="app-shell">
      <Header cart={cart} />

      <main className="dashboard">
        <section className="featured-panel" aria-label="Featured burgers">
          {featuredProduct.image ? <img className="featured-image" src={featuredProduct.image} alt="" /> : null}
          <div className="featured-shade" />
          <button className="carousel-arrow previous" onClick={() => moveFeatured(-1)} aria-label="Previous featured burger">‹</button>
          <button className="carousel-arrow next" onClick={() => moveFeatured(1)} aria-label="Next featured burger">›</button>
          <div className="featured-copy">
            <span className="featured-label">{featuredProduct.badge}</span>
            <h1>{featuredProduct.name}</h1>
            <p>{featuredProduct.description}</p>
            <button className="featured-action" onClick={() => selectProduct(featuredProduct)}>View burger <span aria-hidden>→</span></button>
          </div>
          <div className="carousel-dots" aria-label="Featured burger selection">
            {featuredIds.map((id, index) => (
              <button
                key={id}
                className={index === featuredIndex ? "active" : ""}
                onClick={() => setFeaturedIndex(index)}
                aria-label={`Show featured burger ${index + 1}`}
                aria-pressed={index === featuredIndex}
              />
            ))}
          </div>
        </section>

        <aside className="cart-panel" id="your-order" aria-labelledby="cart-title">
          <div className="panel-heading">
            <h2 id="cart-title"><span aria-hidden>🛒</span> Cart Summary</h2>
            <small>{cartCount} {cartCount === 1 ? "item" : "items"}</small>
          </div>
          {cartLines.length === 0 ? (
            <p className="cart-empty">Cart is currently empty.</p>
          ) : (
            <ul className="cart-items">
              {cartLines.map((product) => (
                <li key={product.id}>
                  <img src={product.image} alt="" />
                  <div className="cart-item-info">
                    <strong>{product.name}</strong>
                    <small>{money(product.price)} each</small>
                  </div>
                  <span className="stepper cart-stepper">
                    <button onClick={() => setQty(product.id, cart[product.id] - 1)} aria-label={`Remove one ${product.name}`}>−</button>
                    <b>{cart[product.id]}</b>
                    <button onClick={() => setQty(product.id, cart[product.id] + 1)} aria-label={`Add one ${product.name}`}>+</button>
                  </span>
                  <strong className="cart-line-price">{money(product.price * cart[product.id])}</strong>
                </li>
              ))}
            </ul>
          )}
          <div className="cart-total"><span>TOTAL:</span><strong>{money(subtotal)}</strong></div>
          <button
            className="checkout-button"
            disabled={cartCount === 0}
            onClick={() => setCheckoutNotice("Online checkout is coming soon. Your order is ready above.")}
          >
            <span aria-hidden>▣</span> PROCEED TO CHECKOUT
          </button>
          {checkoutNotice && <p className="checkout-notice" role="status">{checkoutNotice}</p>}
        </aside>

        <section className="menu-panel" aria-labelledby="menu-title">
          <div className="panel-heading menu-heading">
            <h2 id="menu-title"><span aria-hidden>⊞</span> Menu Selection ({displayedProducts.length} Items Grid)</h2>
            <small>Click item to view detail card</small>
          </div>
          <div className="menu-controls">
            <label className="menu-search">
              <span className="visually-hidden">Search menu</span>
              <input value={search} onChange={(event) => { setSearch(event.target.value); setShowAll(true); }} placeholder="Search menu..." />
            </label>
            <div className="menu-filters">
              <div className="tabs" role="tablist" aria-label="Menu categories">
                {categories.map((item) => (
                  <button key={item.id} role="tab" aria-selected={category === item.id} className={category === item.id ? "on" : ""} onClick={() => { setCategory(item.id); setShowAll(item.id !== "all"); }}>
                    {item.id === "all" ? "All Burgers" : item.label} <small>{counts(item.id)}</small>
                  </button>
                ))}
              </div>
              <div className="diets" aria-label="Dietary filters">
                {([["all", "All"], ["spicy", "🌶 Spicy"], ["veg", "🌱 Veg"]] as const).map(([id, label]) => (
                  <button key={id} className={diet === id ? "on" : ""} aria-pressed={diet === id} onClick={() => { setDiet(id); setShowAll(id !== "all"); }}>{label}</button>
                ))}
              </div>
            </div>
          </div>
          {displayedProducts.length === 0 ? (
            <p className="menu-empty">No products match those filters. Try another search.</p>
          ) : (
            <div className="product-grid">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  qty={cart[product.id] ?? 0}
                  favorite={favorites.includes(product.id)}
                  selected={selectedProduct.id === product.id}
                  onSelect={selectProduct}
                  onQty={setQty}
                  onFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
          {visible.length > 8 && !showAll && !search.trim() && category === "all" && diet === "all" && (
            <button className="view-all-products" onClick={() => setShowAll(true)}>View All Products <span aria-hidden>→</span></button>
          )}
          {showAll && visible.length > 8 && category === "all" && diet === "all" && !search.trim() && (
            <button className="view-all-products" onClick={() => setShowAll(false)}>Show Featured 8 <span aria-hidden>↑</span></button>
          )}
        </section>

        <aside className="details-panel" aria-labelledby="details-title">
          <div className="panel-heading details-heading">
            <h2 id="details-title">PRODUCT DETAILS</h2>
            <span>Active Selection</span>
          </div>
          {selectedProduct.image ? (
            <div className="detail-image-wrap">
              <img className="detail-image" src={selectedProduct.image} alt={selectedProduct.name} />
              <strong className="detail-image-price">{money(selectedProduct.price)}</strong>
            </div>
          ) : null}
          <h3>{selectedProduct.name}</h3>
          <p className="detail-description">{selectedProduct.description}</p>
          <div className="detail-facts">
            <span>{selectedProduct.minutes} min prep</span>
            <span>{selectedProduct.kcal} kcal</span>
            {selectedProduct.spicy && <span>🌶 Spicy</span>}
            {selectedProduct.vegetarian && <span>🌱 Vegetarian</span>}
          </div>
          <div className="quantity-row">
            <span>Quantity:</span>
            <div className="quantity-control">
              <button onClick={() => setDetailQty((quantity) => Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
              <strong>{detailQty}</strong>
              <button onClick={() => setDetailQty((quantity) => quantity + 1)} aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button className="detail-add" onClick={() => setQty(selectedProduct.id, (cart[selectedProduct.id] ?? 0) + detailQty)}>
            <span aria-hidden>🛒</span> ADD TO CART · {money(selectedProduct.price * detailQty)}
          </button>
        </aside>
      </main>

      <footer className="dashboard-footer">TASTY BURGER <span>·</span> FRESH OFF THE GRILL, MADE FOR YOU.</footer>
    </div>
  );
}
