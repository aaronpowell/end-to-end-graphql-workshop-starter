import "./App.css";
import { StartGame } from "./pages/StartGame";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { JoinGame } from "./pages/JoinGame";

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<StartGame />} />
            <Route path="/game/:id/join" element={<JoinGame />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
