import { useState, useEffect } from "react";

//raccogliere dati inseriti da un utente e inviare a un server tramite post

/* 1 FASE:  */

const datiForm = {
    author: '',  //nome autore
    title: '', // titolo
    body: '',
    public: false // false perchè per ora è una bozza, sarà true quando metteremo pubblico la checkbox partira' non spuntata
};


function Form() {
    // stato react
    const [postData, setPostData] = useState(datiForm);

    // gestisco input aggiornamenti 
    const handlerChange = (event) => {
        const { name, value, type, checked } = event.target; // prendo valori html

        // Se l'input e' una checkbox, il valore da salvare sara' 'checked' (true/false)
        // Altrimenti, per input di testo e textarea, il valore sara' 'value' (la stringa digitata)

        const valoreNuovo = type === 'checkbox' ? checked : value;

        setPostData({
            ...postData,
            [name]: valoreNuovo,
        });

    };

            //inviare dati server
        const handlerSubmit = (event) => {
            event.preventDefault(); //blocca il caricamento dei form predefinito
        }
        //chiamata al server
             // -- fetch: richiesta HTTP POST --
        // fetch(url, options) è la Web API nativa del browser per le chiamate HTTP.
        //
        // Nel secondo argomento passiamo le opzioni della richiesta:
        //   - method: 'POST'  -> tipo di richiesta (GET, POST, PUT, DELETE, ecc.)

        //   - headers         -> metadati della richiesta; 'Content-Type: application/json'
        //                        dice al server che stiamo inviando JSON

        //   - body            -> il corpo della richiesta (i dati da inviare).
        //                        fetch vuole una stringa, quindi convertiamo
        //                        l'oggetto JS in JSON con JSON.stringify()

        fetch('https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts', {
            method : 'POST',
            Headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData) // stato react a una stringa
                
            })
        

        .then(response => {
          return response.json(); // promessa passata al prossimo then
        })
        .then((json) => {
        console.log(json); // riceve oggetto js con risposta server.
        });          
    

return (
    <div>
        <h1>Form post</h1>

        
        <form onSubmit={handlerSubmit}>
            <div>
                <label>autore</label>
                <input
                type="text"
                name="author"
                value={postData.author}
                onChange={handlerChange}
                 />
            </div>

            <div className="sezione-input">
                    <label>Titolo:</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={postData.title} 
                        onChange={handlerChange} 
                    />
                </div>

                <div className="sezione-input">
                    <label>Testo:</label>
                    <textarea 
                        name="body" 
                        value={postData.body} 
                        onChange={handlerChange} 
                    />
                </div>

                <div className="sezione-input">
                    <label>
                        {/* Ripasso HTML: per le checkbox si usa 'checked' al posto di 'value' */}
                        <input 
                            type="checkbox" 
                            name="public" 
                            checked={postData.public} 
                            onChange={handlerChange} 
                        />
                    </label>
                </div>
                <button type="submit">Invia Post</button>
        </form>
    </div>
);
}


export default Form;