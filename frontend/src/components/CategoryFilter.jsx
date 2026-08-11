import { toneForLabel } from "../utils/spiceTones";

export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  if (!categories.length) return null;

  return (
    <div className="category-filter" role="tablist" aria-label="Filter by category">
      {categories.map((category) => {
        const tone = toneForLabel(category);
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`category-chip${isActive ? " is-active" : ""}`}
            style={{ "--chip-tone": tone.hex }}
            onClick={() => onSelect(isActive ? null : category)}
          >
            <span className="category-chip__dot" />
            {category}
          </button>
        );
      })}
    </div>
  );
}
