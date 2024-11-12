import React from "react";
import "./FilterSelect.css";
import { useLocation } from "react-router-dom";

function FilterSelect({label, options, color, onFunction, onCountChange}) {
    const location = useLocation();

    return (
            <div className="filter_select">
            {location.pathname.startsWith('/catalog/') && (
                <div className="selected_line">
                    <div className="selected_line_item">
                        <label htmlFor="count_item">Count of gem:</label>
                        <input type="number" id="count_item" name="count_item" min="1" defaultValue="1" onChange={(e) => onCountChange(Math.max(1, e.target.value))}/>
                    </div>
                    <div className="selected_line_item">
                        <label htmlFor="color_item">Color of gem:</label>
                        <select defaultValue={color}>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                                ))}
                        </select>
                    </div>
                </div>
                )}
            {location.pathname === '/catalog' && (
                <select defaultValue="" onChange={onFunction}>
                    <option value="">{label}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}
            </div>
    )
}

export default FilterSelect;