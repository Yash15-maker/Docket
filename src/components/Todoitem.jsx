import React, { Component } from "react";
import { Button } from "react-bootstrap";
import db from "../firebase/firebase";

const INITIAL_STATE = {
  toDelete: "",
};
export default class Todoitem extends Component {
  state = { ...INITIAL_STATE };

  onDeleteTodo(temp) {
    console.log(temp);
    if (
      window.confirm(
        "Are You sure you want to delete this todo :("
      )
    ) {
      db.ref(`todos/${temp}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({ toDelete: "" });
        }
      });
    }
    window.setTimeout(() => {
      window.location.reload();
    });
  }

  // onUpdateTodo(temp) {
  //   const ch=this.props.curr;
  //   console.log(temp);
  //   db.ref(`todos`).update(
  //     {ch: prompt("Enter updated todo", "Enter Todo Here")}
  //   );

  //   window.setTimeout(() => {
  //     window.location.reload();
  //   });
  // }

  render() {
  
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "50px",
          fontFamily: "fantasy",
        }}
      >
        <h1 style={{ textAlign: "left" }}>
         
          {this.props.todo}
          <h3>
            <br />
            {this.props.date}
          </h3>
          <h3>{this.props.time}</h3>
        </h1>
        <div>
          {/* <Button
            size="sm"
            className="hui"
            variant="primary"
            style={{ marginRight: "10px" }}
            onClick={() => {
              this.onUpdateTodo(this.props.todoId);
            }}
          >
            Update
          </Button> */}

          <Button
            size="sm"
            className="hui"
            variant="primary"
            onClick={() => {
              this.onDeleteTodo(this.props.todoId);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
}
