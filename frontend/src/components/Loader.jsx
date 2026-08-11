export default function Loader({ label = "Loading recipes…" }) {
  return (
    <div className="loader">
      <span className="loader__ring" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
