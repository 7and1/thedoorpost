type PricingCTAProps = {
  plan: string;
  price: string;
  features: string[];
  ctaLabel?: string;
  href?: string;
  highlight?: boolean;
};

export default function PricingCTA({
  plan,
  price,
  features,
  ctaLabel = "Get Started",
  href = "/pricing",
  highlight = false,
}: PricingCTAProps) {
  return (
    <div
      className="card"
      style={{
        borderColor: highlight ? "var(--primary)" : "var(--border)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>{plan}</h3>
        <div style={{ fontSize: "1.6rem", fontWeight: 600 }}>{price}</div>
      </div>
      <ul style={{ marginTop: 12, paddingLeft: 20 }}>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <a className="button" style={{ marginTop: 16 }} href={href}>
        {ctaLabel}
      </a>
    </div>
  );
}
