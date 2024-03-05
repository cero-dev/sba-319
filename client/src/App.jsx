import { useEffect, useState} from "react";

export default function App() {
  const [message, setMessage] = useState("")

  useEffect(()=>{
    async function getComics(){
      const res = await fetch("/api/comics")
      const comics = await res.json();

      setMessage(comics.msg);
    }

    getComics();
  },[])

  return (
    <div>
      <main className="container">
        <h1>Comic Book Collection</h1>
        {message && <p>{message}</p>}
      </main>
    </div>
  );
}

