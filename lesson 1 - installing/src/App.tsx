import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
import Alert from "./components/Alert";
import { useState } from "react";

const items = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "San Francisco"
]


const handleSelectItem = (item: string) => {
  (item);
  return
}

function App() {
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <>
      <div>
        <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} />
      </div>

      <div>
        <Alert>
          Hello <b>World</b>
        </Alert>
      </div>

      <div>
        {alertVisible && <Alert onClose={() => setAlertVisible(false)} >This is the alert about "My Button" button!</Alert>}
        <Button color="primary" onClick={() => { setAlertVisible(true) }}>
          My Button
        </Button>
      </div>
    </>
  )
}

export default App;