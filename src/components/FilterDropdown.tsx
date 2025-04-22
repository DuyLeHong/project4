import React from "react";

interface FilterDropdownProps {
  genres: { id: number; name: string }[];
  onSelectGenre: (genreId: number) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  genres,
  onSelectGenre,
}) => {
  return (
    <select
      className="p-2 border rounded-md"
      onChange={(e) => onSelectGenre(Number(e.target.value))}
    >
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
