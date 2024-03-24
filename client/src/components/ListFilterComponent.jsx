import { useState } from "react";
import { Dropdown, TextInput } from "flowbite-react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ListFilterComponent = ({ searchFromUrl, filterFromUrl }) => {
  const [tab, setTab] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  function handleFilterQueryChange(query) {
    const updatedUrl = `${window.location.pathname}?${
      searchQuery && searchQuery + "&"
    }${query}`;
    navigate(updatedUrl);
    let tab = query.split("=");
    setFilter(query);
    setTab(tab[1]);
  }

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value ? `search=${e.target.value}` : "");
    const updatedUrl = `${window.location.pathname}?${
      filter && filter + "&"
    }search=${e.target.value}`;
    navigate(updatedUrl);
  };

  return (
    <div>
      <div className="flex justify-between mb-5 px-2">
        <Dropdown label={`${filterFromUrl || "All"} `} inline>
          <Dropdown.Item onClick={() => handleFilterQueryChange("")}>
            All
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleFilterQueryChange("filter=last-year")}
          >
            Last year
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleFilterQueryChange("filter=last-month")}
          >
            Last month
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleFilterQueryChange("filter=last-week")}
          >
            Last week
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleFilterQueryChange("filter=today")}
          >
            Today
          </Dropdown.Item>
        </Dropdown>

        <TextInput
          id="search"
          type="text"
          icon={IoSearch}
          placeholder="search book"
          className="sm:w-72"
          onChange={handleSearchQueryChange}
          //   value={searchFromUrl || ""}
        />
      </div>
    </div>
  );
};

export default ListFilterComponent;
