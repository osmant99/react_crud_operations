import React, { useEffect, useState } from "react";
import UserInput from "./UserInput";
import TableData from "./TableData";
import apiRequest from "./apiRequest";

function App() {
  const api_Url = "http://localhost:3500/books";

  /* useState */

  const [books, setBooks] = useState({
    name: "",
    author: "",
    description: "",
    edition: "",
  });
  const [newItem, setNewItem] = useState({});
  const [fetchErr, setFetchErr] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [btnText, setBtnText] = useState("Add record");

  /* useEffect */

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(api_Url);
        if (!response.ok) throw Error("Did not receive expected data");
        const bookItems = await response.json();
        setUserData(bookItems);
      } catch (error) {
        console.log(error);
        setFetchErr(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => fetchBooks(), 2000);
  }, [userData]);

  /* handleChange */

  const handleChange = (e) => {
    const id = userData.length ? userData[userData.length - 1].id + 1 : 1;
    const myBook = { id, ...books, [e.target.name]: e.target.value };
    setNewItem(myBook);
    setBooks(myBook);
  };

  /* patchBooks */

  const patchBooks = async () => {
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: books.name,
        author: books.author,
        description: books.description,
        edition: books.edition,
      }),
    };
    const reqUrl = `${api_Url}/${editId}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchErr(result);

    setBooks({ name: "", author: "", description: "", edition: "" });
    setEditId(null);
    setBtnText("Add record");
  };

  /* handleSubmit */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      patchBooks();
    } else {
      setUserData([...userData, books]);
      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      };
      const result = await apiRequest(api_Url, postOptions);
      if (result) setFetchErr(result);
      setNewItem("");
      setBooks({ name: "", author: "", description: "", edition: "" });
    }
  };

  /* handleDelete */

  const handleDelete = async (id) => {
    const filterData = userData.filter((data) => {
      return data.id !== id;
    });
    setUserData(filterData);
    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${api_Url}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchErr(result);
  };

  /* handleEdit */

  const handleEdit = (id) => {
    const editBookData = userData.find((data) => {
      return data.id === id;
    });
    setBooks({
      name: editBookData.name,
      author: editBookData.author,
      description: editBookData.description,
      edition: editBookData.edition,
    });
    setEditId(id);
    setBtnText("Update record");
  };
  return (
    <>
      <UserInput
        books={books}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        btnText={btnText}
      />
      <TableData
        userData={userData}
        fetchErr={fetchErr}
        handleDelete={handleDelete}
        isLoading={isLoading}
        handleEdit={handleEdit}
      />
    </>
  );
}

export default App;
