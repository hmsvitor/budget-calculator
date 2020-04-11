import React, { useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import uuid from "uuid/v4";

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 }
];

function App() {
  // ************************ state values ************************
  // all expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  // single charge
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);
  // ************************ functionality ************************
  const handleCharge = e => {
    console.log(`charge: ${e.target.value}`);
    setCharge(e.target.value);
  };

  const handleAmount = e => {
    console.log(`amount: ${e.target.value}`);
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 4200);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item edited successfuly!" });
      } else {
        const singleExpense = {
          id: uuid(),
          charge,
          amount
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "Item added successfuly!" });
      }

      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: "Charge can't be empty and amount must be greater than zero."
      });
    }
  };

  const handleClear = () => {
    console.log("items cleared");
    setExpenses([]);
    handleAlert({ type: "danger", text: "All items deleted successfuly" });
  };

  const handleDelete = id => {
    console.log(`item deleted: ${id}`);
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item deleted successfuly" });
  };

  const handleEdit = id => {
    console.log(`item edited: ${id}`);
    setEdit(true);
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleClear={handleClear}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          $ {console.log(expenses)}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;

//1:08
