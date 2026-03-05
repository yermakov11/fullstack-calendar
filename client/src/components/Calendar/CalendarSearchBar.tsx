interface PropsSearch {
  searchText: string;
  setSearchText: (text: string) => void;
}

export const CalendarSearchBar = ({ searchText, setSearchText }: PropsSearch) => (
  <input
    type="text"
    value={searchText}
    placeholder="Search event..."
    onChange={(e) => setSearchText(e.target.value)}
  />
);