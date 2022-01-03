#TO DO LIST

This app is a simple Web  application  to manage task to do with a title and a time

## How to use the application

On your first use, this is what you will see :

[[](<img](url) width="900" alt="image" src="https://user-images.githubusercontent.com/64361746/147965487-aa20385b-de4d-4f3c-9964-8e5f6e9fb771.png">
)

Then click on the button ``Add Todo``.

A dialog box will appear :

<img width="900" alt="image" src="https://user-images.githubusercontent.com/64361746/147965782-5d88bc42-48bc-49f5-819e-18df190476d6.png">

If you want to edit a task, or mark it as done, just long click on the task.

Another dialog box will appear :

<img width="900" alt="image" src="https://user-images.githubusercontent.com/64361746/147965873-f62ada07-5753-4c4d-8168-37d3710c9428.png">

And here you can modify or delete your task.

## Development

There's two activities in the project ;

*   ``Initialization``  where everything is orchestrated
	* ``onCreate`` initialized the application and the list of task
	* ``setupListViewListener`` setup the listener for the different task on the list (click and long click) and  the edit dialog box showed before
	* ``AddTODO`` is the function called when the button ``New Task`` is pressed
	* ``Update`` and ``Delete`` are the low-level function used for the persistency of the data


## Install

To build the project, run :

```bash
npm install
npm build
```
