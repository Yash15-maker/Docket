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
  position: "absolute",
  zIndex: "1",
  backgroundColor: "white",
  borderRadius: "0 30px 30px 0",
  marginTop: "50px",
  fontFamily: "fantasy",
  padding: "10px",
  overflowY: "scroll",
  height: "15rem",
  width: "70%",
};
export default class Todoitem extends Component {
  state = { ...INITIAL_STATE };

  onDeleteTodo(temp) {
    if (window.confirm("Are You sure you want to delete this todo :(")) {
      db.ref(`todos/${temp}`).remove((err) => {
        if (err) {
          console.log(err);
        } //else {
        //   this.setState({ toDelete: "" });
        // }
      });
      window.setTimeout(() => {
        window.location.reload();
      });
    }
  }

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

      window.setTimeout(() => {
        window.location.reload();
      });
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
      <div style={{ display: "flex" }}>
        <div style={style}>
          <h1 style={{ textAlign: "left" }}>{str}</h1>
          <h3>
            <br />
            {arr[le - 2]}
          </h3>
          <h3>{arr[le - 1]}</h3>

          <div>
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
          </div>
        </div>
        <Button
          size="lg"
          className="button"
          variant="primary"
          onClick={() => {
            this.onDeleteTodo(this.props.todoId);
          }}
        >
          Delete
        </Button>
      </div>
    );
  }
}
