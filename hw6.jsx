<html>
    <head>
      <meta charset="UTF-8" />
      <title>HW 5</title>
      <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      <!-- Don't use this in production: -->
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    </head>
    <body>
      <h1>IT 122 Home page</h1>
      <h2>Cars<h2>
        
      <div id="root"></div>
      <script type="text/babel">


        let items = <%- cars %>
          // return a list of cars
    const Cars = (props) => {
        // props is an array
        const listItems = props.data.map((item) =>
        <li key={item._id} id={item._id} onClick={props.clickHandler}>
            {item.name}
        </li>);
        return <ul>{listItems}</ul>
    }

    const ItemDetail = (props) => {
        return <div>
        <hr />
            <h3>Car Details</h3>
            <form>
                Name: <input type="text" name="id" value={props.item.name || ""} onChange={props.handleChange} /><br/>
               Make: <input type="text" name="name" value={props.item.make || ""} onChange={props.handleChange} /><br/>
                Model: <input type="text" name="model" value={props.item.model || ""} onChange={props.handleChange}/><br/>
                Year: <input type="text" name="year" value={props.item.year || ""} onChange={props.handleChange} /><br/>
            </form>
            <button name="save" onClick={props.saveItem}>Save</button>&nbsp;
            <button name="clear" onClick={props.clearForm}>Clear</button>&nbsp;
            <button name="delete" onClick={props.deleteItem}>Delete</button>&nbsp;
        </div>
    }


    const CarApp = (props) => {
        const [items, setItems] = React.useState([]);
        const [currentItem, setCurrentItem] = React.useState({});

        // load data after component has rendered
        React.useEffect(() => {
            const fetchData = async () => {
                fetch("/api/car").then(res => res.json())
                .then((json) => {
                    setItems(json);
                })
            }
            fetchData()
        }, []);

        // list click event handler
        const selectItem = (event) => {
            const found = items.find((item) => {
                return item._id === event.target.id;
            });
            setCurrentItem(found);
        }

        const clearForm = () => {
            setCurrentItem({});
        }

        const saveItem = () => {
            if (!currentItem.title) {
              return;
            }
            fetch("/api/v1/add/", {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(currentItem)
            })
            .then(res => res.json())
            .then((data) => {
                // if item has no _id, it wasn't previously saved in DB
                if (!currentItem._id) {
                    currentItem._id = data._id;
                    setCurrentItem(currentItem);
                    // update items list
                    let newItems = [...items];
                    newItems.push(currentItem);
                    setItems(newItems);
                }
            })
        }

        const deleteItem = () => {
            let id = currentItem._id;
            // delete item from DB
            fetch(`/api/car/delete/${id}`)
            .then(res => res.json())
            .then((data) => {
                // remove item from UI list
                  const newItems = items.filter((item) => {
                    return item._id !== id;
                  });
              setItems(newItems);
              // clear form
              setCurrentItem({})
            });
        }

        // update list state
        const handleChange = (event) => {
          let newItem = { ...currentItem } ;
          newItem[event.target.name] = event.target.value;
          // update currentItem state
          setCurrentItem(newItem);
          // update list state
          items.find((item, index) => {
            if (item._id == newItem._id) {
                items[index] = newItem;
                setItems(items);
            }
          })
        }

        return (
            <div> <h2>Cars Inventory</h2>
                <Cars data={items} clickHandler={selectItem} />
                <ItemDetail
                  item={currentItem}
                  handleChange={handleChange}
                  clearForm={clearForm}
                  saveItem={saveItem}
                  deleteItem={deleteItem}
                />
            </div>
        );

    }

    const container = document.getElementById('root');
    const root = ReactDOM.createRoot(container);
    root.render( <CarApp />);
      </script>
    </body>
  </html>