import { useState } from "react";


interface Probs {
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Probs) {

    // Hook
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <>
            {/* Heading */}
            <h1>{heading}</h1>
            {(items.length === 0) && <p>No item found</p>}

            {/* Items list */}
            <ul className="list-group">
                {items.map((item, index) => (
                    <li
                        className={
                            selectedIndex === index
                                ? "list-group-item active"
                                : "list-group-item"
                        }
                        key={index}
                        onClick={() => { 
                            setSelectedIndex(index)
                            onSelectItem(item)
                         }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ListGroup;