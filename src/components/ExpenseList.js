import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses, handleEdit, handleClear, handleDelete }) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => (
          <Item
            key={expense.id}
            expense={expense}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>

      {expenses.length >= 1 && (
        <button className="btn" onClick={handleClear}>
          clear expenses
          <MdDelete className={"btn-icon"} />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
