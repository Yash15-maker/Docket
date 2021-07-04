import React, { Component } from "react";
import { Button } from "react-bootstrap";
import db from "../firebase/firebase";

const INITIAL_STATE = {
  toDelete: "",
  date: "",
  time: "",
  message: "",
  
};

let style = {
  border: "3.5px solid black",
  //position: "absolute",
  // zIndex: "1",
  backgroundColor: "white",
  marginTop: "50px",
  fontFamily: "fantasy",
  padding: "10px",
  overflowY: "scroll",
  height: "13rem",
  width: "90%",
};
export default class Todoitem extends Component {
  state = { ...INITIAL_STATE };

  
  onUpdateTodo(temp) {
    let ch = prompt("Enter updated todo");
    if (!ch?.trim()) {
      alert("Please Enter Something :)");
    } else {
      const today = new Date();
      const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      ch += " " + date + " " + time;

      var updates = {};
      console.log(temp);
      updates["todos/" + temp] = ch;

      db.ref().update(updates);

      window.location.reload();
    }
  }

  render() {
    const arr = this.props.todo.split(" ");
    console.log(arr);
    const le = arr.length;
    let str = "";
    for (let i = 0; i < le - 2; i++) {
      str += arr[i] + " ";
    }

    return (
      <div style={style}>
        <div style={{ display: "flex", jsutifyContent: "end" }}>
          <h1 style={{ textAlign: "left", width: "50%" }}>{str}</h1>
          <div
            style={{ textAlign: "right", position: "relative", zIndex: "1" }}
          >
            <Button
              size="sm"
              className="hui"
              variant="primary"
              style={{ marginRight: "10px" }}
              onClick={() => {
                this.onUpdateTodo(this.props.todoId);
              }}
            >
              Update
            </Button>

            <Button
              size="sm"
              className="button"
              variant="primary"
              onClick={() => {
                this.props.onDeleteTodo(this.props.todoId);
              }}
            >
              Delete
            </Button>
          </div>
        </div>

        <h3>
          <br />
          {arr[le - 2]}
        </h3>
        <h3>{arr[le - 1]}</h3>
      </div>
    );
  }
}
