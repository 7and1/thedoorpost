type IndustryLandingBlockProps = {
  industry: string;
  benefits: string[];
};

export default function IndustryLandingBlock({
  industry,
  benefits,
}: IndustryLandingBlockProps) {
  return (
    <div className="card">
      <h3>{industry} conversion wins</h3>
      <ul style={{ marginTop: 12, paddingLeft: 20 }}>
        {benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
    </div>
  );
}
