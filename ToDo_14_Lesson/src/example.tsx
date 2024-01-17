import React, { useState, memo, useCallback, useEffect } from "react";

type EditableListItemType = {
    text: string;
    id: number;
};

type EditableListItemProps = {
    id: number;
    text: string;
    onRemove: (id: number) => void;
};

export const EditableListItem = memo<EditableListItemProps>(
    ({ id, text, onRemove, ...props }) => {
        useEffect(() => {
            return () => {
                console.log("размонтирую", id);
            };
        }, []);
        console.log(id, text);
        return (
            <li>
                {text}
                <button onClick={() => onRemove(id)}>Удалить</button>
            </li>
        );
    }
);

let i = 0;

export const EditableList = () => {
    const [items, setItems] = useState<EditableListItemType[]>([]);

    const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = (form.name as unknown) as HTMLInputElement;
        const text = input.value;
        if (text !== "") {
            const newItem = {
                id: ++i,
                text
            };
            setItems([...items, newItem]);
            form.reset();
        }
    };

    const onRemove = useCallback((id: number) => {
        setItems((v) => v.filter((item) => item.id !== id));
    }, []);

    return (
        <div>
            <form onSubmit={handleAddItem}>
                <input name="name" type="text" />
                <button type="submit">Добавить</button>
            </form>
            <ul>
                {items.map((item) => (
                    <EditableListItem
                        key={item.id}
                        id={item.id}
                        text={item.text}
                        onRemove={onRemove}
                    />
                ))}
            </ul>
        </div>
    );
};