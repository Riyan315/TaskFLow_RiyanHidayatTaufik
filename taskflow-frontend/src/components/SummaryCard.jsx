function SummaryCard({ label, value }) {
  return (
    <article className="summary-card">
      <p className="summary-card__value">{value}</p>
      <p className="summary-card__label">{label}</p>
    </article>
  )
}

export default SummaryCard
