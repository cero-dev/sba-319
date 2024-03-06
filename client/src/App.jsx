import { useEffect, useState} from "react";

export default function App() {
  const [comics, setComics] = useState([]);
  const [series, setSeries] = useState("");
  const [issue, setIssue] = useState(0);
  const [format, setFormat] = useState("");
  const [hasRead, setHasRead] = useState(false);

  useEffect(()=>{
    async function getComics(){
      const res = await fetch("/api/comics")
      const comics = await res.json();

      setComics(comics);
    }

    getComics();
  },[])

  const createNewComic = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/comics", {
      method: "POST",
      body: JSON.stringify({
        series: series,
        issue: issue,
        format: format,
        hasRead: hasRead
      }),
      headers: {
        "Content-Type": "application/json"
      },
    });
    const newComic = await res.json();
    
    setSeries("");
    setIssue(0);
    setFormat("");
    setHasRead(false);
    setComics([...comics, newComic]);
  }

  const updateComic = async (comicId, comicHasRead) => {
    try {
      console.log("Updating comic with ID:", comicId);
  
      const res = await fetch(`/api/comics/${comicId}`, {
        method: "PATCH",
        body: JSON.stringify({ hasRead: !comicHasRead }), // Invert the value here
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      // ... rest of the code
    } catch (error) {
      console.error("Error updating comic:", error);
    }
  };
  
  
  

  return (
      <main className="container">
        <h1 className="title">Comic Book Collection</h1>
        <form onSubmit={createNewComic}>
          <input
           type="text" 
           value={series} 
           onChange={(e) => setSeries(e.target.value)} 
           placeholder = "Enter Series Name" 
           required
           />
          <input
           type="number"
           value={issue}
           onChange={(e) => setIssue(parseInt(e.target.value))}
           required
           />
          <input 
          type="text"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          required
          />
          <input 
          type="checkbox" 
          checked={hasRead} 
          onChange={() => setHasRead(!hasRead)}
          />
          <button type="submit">Add a comic book</button>
        </form>
        {comics.length > 0 &&
         comics.map((comic) => (
          <div className="card">
            <p>{comic.series}</p>
            <p>Issue: {comic.issue}</p>
            <p>Format: {comic.format}</p>
            <p>Has Read: {(comic.hasRead) ? "True": "False"}</p>
            <div>
              <button onClick={() => updateComic(comic._id, comic.hasRead)}>
                Toggle Read
              </button>
            </div>
          </div>
        ))
        }
      </main>
  );
}