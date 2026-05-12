import AutoCard from "./AutoCard.jsx";

export default function AutoGrid({ autos }) {
  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", 
      gap: 20 
    }}>
      {autos.map(auto => (
        <AutoCard key={auto.id} auto={auto} />
      ))}
    </div>
  );
}