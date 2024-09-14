
import { FormEvent, useState } from 'react'
import './App.css'
import Style from "./game.module.css"

interface Game{
  id:number;
  title: string;
  cover:string;
}

export default function App() {
  const [games, setGame] = useState<Game[]>(()=>{
    const store:any = localStorage.getItem("obc-game-lib")
    if(!store) return [];
    const gameArray = JSON.parse(store);
    return gameArray;

  });
  const [title, setTitle] = useState<string>("");
  const [cover, setCover] = useState<string>("");

  const addGame = (title:string, cover: string)=>{
      const id = Math.floor(Math.random()*10000000);
      const game = {title, cover, id};
      setGame(stt => {
        const newState = [...stt, game]
        localStorage.setItem("obc-game-lib", JSON.stringify(newState))
        return newState;
      });
  }

  const handleSubmit = (ev: FormEvent<HTMLFormElement>)=>{
    ev.preventDefault();
    addGame(title, cover);
    setTitle("");
    setCover("");
  }

  const removeGame = (id:number)=>{
    setGame(state =>{
      const newState = state.filter(game => game.id !== id)
      localStorage.setItem("obc-game-lib", JSON.stringify(newState))
      return newState;
    }
)
  }

  return(
  <>
    <div id='app' className={Style.allContent}>
        <h1>Biblioteca de jogos</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Título</label>
            <input 
              type="text" 
              name='text' 
              id='text'
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="cover">Capa:</label>
            <input 
              type="text" 
              name='cover' 
              id='cover'
              value={cover}
              onChange={(e)=> setCover(e.target.value)} 
            />
          </div>
          <button>Adicionar a biblioteca</button>

        </form>
        <div className={Style.all}>
            {games.map((game)=>(
              <div key={game.id} className={Style.card}>
                  <img className={Style.game} src={game.cover} alt="" />
                  <div>
                    <h2>{game.title}</h2>
                    <button className={Style.delBtn} onClick={()=> removeGame(game.id)}>Remover</button>
                  </div>
              </div>
            ))}

        </div>
    </div>
  </>
  )

}
