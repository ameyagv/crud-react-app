import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL =
  "https://crudcrud.com/api/a78bc1f3a67f4f0e8586683fec06dab4/unicorns";

interface Item {
  id: string;
  name: string;
  description: string;
}

const ItemCRUD: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    id: "",
    name: "",
    description: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState<Item>({
    id: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    // Fetch items when the component mounts
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const createItem = async () => {
    try {
      const response = await axios.post(API_BASE_URL, newItem);
      setItems([...items, response.data]);
      setNewItem({ id: "", name: "", description: "" });
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const updateItem = async (itemToUpdate: Item) => {
    try {
      console.log(editedItem);
      await axios.put(`${API_BASE_URL}/${itemToUpdate._id}`, editedItem);
      //   const updatedItems = items.map((item) =>
      //     item._id === itemToUpdate._id ? itemToUpdate : item
      //   );
      const updatedItems = items.map((item) =>
        item._id === itemToUpdate._id ? itemToUpdate : item
      );
      setItems(updatedItems);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (itemId: string) => {
    try {
      console.log("YOYO" + itemId);
      await axios.delete(`${API_BASE_URL}/${itemId}`);
      const updatedItems = items.filter((item) => item._id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Item CRUD</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />
        <button className="btn btn-primary mt-2" onClick={createItem}>
          Create
        </button>
      </div>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item._id} className="list-group-item">
            <input
              id={item._id}
              defaultValue={item.name}
              value={editedItem.name || item.name}
              onChange={(e) =>
                setEditedItem({ ...editedItem, name: e.target.value })
              }
            />{" "}
            -{" "}
            <input
              id={item._id + "dsg"}
              defaultValue={item.description}
              value={editedItem.description || item.description}
              onChange={(e) =>
                setEditedItem({ ...editedItem, description: e.target.value })
              }
            />
            <button
              className="btn btn-warning ms-2"
              onClick={() => updateItem(item)}
            >
              Update
            </button>
            <button
              className="btn btn-danger ms-2"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemCRUD;
