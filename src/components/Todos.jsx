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

};

class Todos extends React.Component {
  state = { ...INITIAL_STATE };

  submitTodo = (event) => {
    const { currentTodo } = this.state;
    if(currentTodo.trim()==="")
    {
alert("Please Enter your todo")
this.setState({ currentTodo: "" });
    }
else{
    const today = new Date();
    const date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    db.ref("todos")
      .push()
      .set(currentTodo + " " + date + " " + time)
      .then(console.log("Data succesfully written to database"))
      .catch((error) => {
        console.error(error);
      });

    window.setTimeout(() => {
      window.location.reload();
    });
   

    
  }
  event.preventDefault();
  };

  componentWillMount() {
    db.ref("todos")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.setState({ todos: Object.entries(snapshot.val()).reverse() });
          console.log(Object.entries(snapshot.val()).reverse());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({ loaded: true });
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
            {todos.map((thistodo) => {
              return (
                <div>
                  {
                    <Todoitem
                      todo={thistodo[1]}
                      todoId={thistodo[0]}
                      date={this.state.date}
                      time={this.state.time}
                    />
                  }
                </div>
              );
            })}
          </div>
        </div>
      </center>
    );
  }
}

export default Todos;

//
