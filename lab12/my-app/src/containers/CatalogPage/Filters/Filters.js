import "./Filters.css";
import FilterSelect from "../../../components/filter_select/FilterSelect";
import Search from "../Search/Search";


function Filters({onSearch, onSortNameChange, onSortColorChange, onSortPriceChange, searchTerm, sortName, sortColor, sortPrice}) {
    return (
        <section>
            <div className="filters_line">
                <div className="filters">
                    <FilterSelect
                        label="Name:"
                        options={[
                            {value: 'Diamond', label: 'Diamond'},
                            {value: 'Opal', label: 'Opal'},
                            {value: 'Ruby', label: 'Ruby'},
                            {value: 'Sapphire', label: 'Sapphire'},
                            {value: 'Emerald', label: 'Emerald'},
                            {value: 'Zircon', label: 'Zircon'},
                            {value: 'Tanzanite', label: 'Tanzanite'},
                            {value: 'Aquamarine', label: 'Aquamarine'}
                        ]}
                        onFunction={onSortNameChange}
                        value={sortName}
                    />
                    <FilterSelect 
                        label="Color:"
                        options={[
                            {value: 'White', label: 'White'},
                            {value: 'Blue', label: 'Blue'},
                            {value: 'Green', label: 'Green'},
                            {value: 'Yellow', label: 'Yellow'},
                            {value: 'Black', label: 'Black'},
                            {value: 'Multicolor', label: 'Multicolor'},
                            {value: 'Pink', label: 'Pink'},
                            {value: 'Red', label: 'Red'}
                        ]}
                        onFunction={onSortColorChange}
                        value={sortColor}
                    />
                    <FilterSelect
                        label="Price:"
                        options={[
                            {value: 'Descending', label: 'Descending'},
                            {value: 'Asceding', label: 'Asceding'}
                        ]}
                        onFunction={onSortPriceChange}
                        value={sortPrice}
                    />
                </div>
                <Search onSearch={onSearch} value={searchTerm} />
            </div>
        </section>
        );
}

export default Filters;