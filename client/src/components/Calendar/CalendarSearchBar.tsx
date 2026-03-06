import { SearchInput } from "../../styles/Calendar.styled";

interface PropsSearch {
  searchText: string;
  setSearchText: (text: string) => void;
}

export const CalendarSearchBar = ({ searchText, setSearchText }: PropsSearch) => (
  <SearchInput
    type="text"
    value={searchText}
    placeholder="Search event..."
    onChange={(e) => setSearchText(e.target.value)}
  />
);