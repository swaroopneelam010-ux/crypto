const FilterInput = ({filter,onFilterChange}) => {
    return ( <div className="filter">
        <input 
        type="text"
        value={filter} 
        placeholder="filter coin by symbol or name"
        onChange={(e)=>onFilterChange(e.target.value)}/>
    </div> );
}
 
export default FilterInput;