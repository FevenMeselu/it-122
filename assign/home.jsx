
< !DOCTYPE html >
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Hello World</title>
      <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

      <!-- Don't use this in production: -->
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    </head>
    <body>
      <div id="root"></div>
      <script type="text/babel">

        const divStyle = {
          color: 'White',
        backgroundColor: 'Green',
};

        let items = <%- cars %>;

const ListItems = (props) => {
const ListItems = props.items.map((item) => <li key={item.model}><a href={"/cars/" + item.model}> {item.model} </a></li>);
        return <ul>{ListItems}</ul>;
}

const Greeting =(props) => {
if (props.name){
return <h1>Hello,{props.name}!</h1>;
}
        return <h1 style={divStyle}>Hello, World!</h1>;
}

const MyApp = () => {
return (
        <div>

          <ListItems items={items} />
        </div>
        )
}

        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<MyApp />);

      </script>
      <!--
      Note: this page is a great way to try React but it's not suitable for production.
      It slowly compiles JSX with Babel in the browser and uses a large development build of React.

      Read this page for starting a new React project with JSX:
      https://react.dev/learn/start-a-new-react-project

      Read this page for adding React with JSX to an existing project:
      https://react.dev/learn/add-react-to-an-existing-project
-->
    </body>
  </html>a