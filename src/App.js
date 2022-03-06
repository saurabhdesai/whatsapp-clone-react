import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./axios";
import { GoogleLogin } from "react-google-login";
function App() {
  const [messages, setmessages] = useState([]);
  const [user, setuser] = useState("");
  useEffect(() => {
    axios.get("/messages/get").then((response) => {
      // console.log(response.data);
      setmessages(response.data);
    });
    // return () => {
    //     cleanup;
    //   };
  }, []);
  useEffect(() => {
    var pusher = new Pusher(`${process.env.REACT_APP_PUSHER_KEY}`, {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      // alert(JSON.stringify(data));
      setmessages([...messages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  // const responseGoogle = (response) => {
  //   setuser(response.ba);
  // };
  // if (user) {
  //   alert("in");
  // } else {
  //   alert("out");
  //   console.log(user);
  // }

  return (
    <div className="app">
      <div className="app_body">
        {/* <GoogleLogin
          
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        /> */}
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
