import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
export default function TableData({
  userData,
  fetchErr,
  handleDelete,
  isLoading,
  handleEdit,
}) {
  return (
    <>
      <div className="container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Book</th>
              <th scope="col">Author</th>
              <th scope="col">Description</th>
              <th scope="col">Edition</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <p>loading data...</p>}
            {fetchErr && <p style={{ color: "red" }}>{`Error: ${fetchErr}`}</p>}
            {!fetchErr &&
              !isLoading &&
              userData.map((data) => (
                <tr key={data.id}>
                  <th scope="row">{data.id}</th>
                  <td>{data.name}</td>
                  <td>{data.author}</td>
                  <td>{data.description}</td>
                  <td>{data.edition}</td>
                  <td>
                    <FaEdit
                      className="me-3"
                      role="button"
                      onClick={() => {
                        handleEdit(data.id);
                      }}
                    />
                    <FaTrashAlt
                      role="button"
                      onClick={() => {
                        handleDelete(data.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
