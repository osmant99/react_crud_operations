import React from "react";

export default function UserInput({
  books,
  handleChange,
  handleSubmit,
  btnText,
}) {
  return (
    <>
      <div className="container my-5">
        <h1 className="mb-5 text-center">Updating Our Shelves</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Enter book name"
              name="name"
              onChange={(e) => handleChange(e)}
              value={books.name}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id=""
              name="author"
              placeholder="Enter author name"
              onChange={(e) => handleChange(e)}
              value={books.author}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id=""
              name="description"
              placeholder="Enter book description"
              onChange={(e) => handleChange(e)}
              value={books.description}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id=""
              name="edition"
              placeholder="Enter book edition"
              onChange={(e) => handleChange(e)}
              value={books.edition}
              required
            />
          </div>
          <div class="d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-primary" type="submit">
              {btnText}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
