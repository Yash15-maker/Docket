import React from "react";
import { Form, Button } from "react-bootstrap";
import db from "../firebase/firebase";
import Todoitem from "./Todoitem";

const INITIAL_STATE = {
  currentTodo: "",
  todos: [],
  date: "",
  time: "",
  meassage: "",
  prevdata: [],
};

class Todos extends React.Component {
  state = { ...INITIAL_STATE };

  submitTodo = (event) => {
    const { currentTodo } = this.state;
    if (currentTodo.trim() === "") {
      alert("Please Enter your todo");
      this.setState({ currentTodo: "" });
    } else {
      const today = new Date();
      const date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      var hours =
        today.getHours().length === 1
          ? "0" + today.getHours()
          : today.getHours();
      var minutes =
        today.getMinutes().length === 1
          ? "0" + today.getMinutes()
          : today.getMinutes();
      var seconds =
        today.getSeconds().length === 1
          ? "0" + today.getSeconds()
          : today.getSeconds();
      var time = hours + ":" + minutes + ":" + seconds;
      db.ref("todos")
        .push()
        .set(currentTodo + " " + date + " " + time)
        .then(
          console.log("Data succesfully written to database"),
          db
            .ref("todos")
            .get()
            .then((snapshot) => {
              if (snapshot.exists()) {
                this.setState({
                  todos: Object.entries(snapshot.val()).reverse(),
                });
                this.setState({ currentTodo: "" });
                console.log(Object.entries(snapshot.val()).reverse());
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            })
        )
        .catch((error) => {
          console.error(error);
        });
    }
    event.preventDefault();
  };

  onDeleteTodo(temp) {
    if (window.confirm("Are You sure you want to delete this todo :(")) {
      db.ref(`todos/${temp}`).remove((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  componentWillMount() {
    db.ref("todos")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.setState({
            todos: Object.entries(snapshot.val()).reverse(),
          });
          console.log(Object.entries(snapshot.val()).reverse());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidUpdate() {
    db.ref("todos")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.todos.length!==0?
          this.setState({
            todos: Object.entries(snapshot.val()).reverse(),
          }):this.setState({
            todos: []
          });
          console.log(Object.entries(snapshot.val()).reverse());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { currentTodo, todos } = this.state;

    return (
      <center
        style={{
          minHeight: "50vh",
          marginBottom: "40px",
          fontFamily: "fantasy",
        }}
      >
        <div style={{ marginTop: "150px" }}>
          <Form className="container" onSubmit={this.submitTodo}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                <h1>TODO</h1>
              </Form.Label>
              <Form.Control
                id="mainform"
                type="text"
                placeholder=" Enter Todo..."
                value={currentTodo}
                onChange={(event) => {
                  this.setState({ currentTodo: event.target.value });
                }}
              />

              <Form.Text className="text-muted">Yuououuo..!!</Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add todo
            </Button>
          </Form>

          <div className="container">
            {todos.length!==0?todos.map((thistodo) => {
              return (
                <div>
                  {
                    <Todoitem
                      todo={thistodo[1]}
                      todoId={thistodo[0]}
                      date={this.state.date}
                      time={this.state.time}
                      onDeleteTodo={this.onDeleteTodo}
                    />
                  }
                </div>
              );
            }):<>{" "}</>}
          </div>
        </div>
      </center>
    );
  }
}

export default Todos;

//
