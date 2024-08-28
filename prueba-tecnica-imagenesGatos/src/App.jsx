import { useEffect, useState } from "react";

//const IMAGEN_URL_GATO_ENDPOINT =
//"https://cataas.com/cat/says/${primeraPalabra}?size=50&color=red&json=true";

const RANDOM_FACT_GATO_ENDPOINT = "https://catfact.ninja/fact";
export function App() {
  const [fact, setFact] = useState();

  useEffect(() => {
    fetch(RANDOM_FACT_GATO_ENDPOINT)
      .then((res) => res.json())
      .then((data) => setFact(data.fact));
  }, []);

  return (
    <main>
      <h1>App de gatos</h1>
      {fact && <p>{fact}</p>}
    </main>
  );
}
