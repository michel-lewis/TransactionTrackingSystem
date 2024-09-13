import React, { useState } from "react";

type SearchBarProps = {
  onSearch: (startDate: string, endDate: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(startDate, endDate);
    console.log("date ", startDate, endDate )
  };


  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="end-date">End Date:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button className={ startDate !="" && endDate !="" ? "submit-button" :"submit-button-disabled"} type="submit" disabled ={!startDate || !endDate }>Search</button>
    </form>
  );
};

export default SearchBar;
