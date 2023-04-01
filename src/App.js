import './App.css';
import { useState, useEffect } from 'react';

function Box({item, src ,id, index, CheckingCard, checked}){ 
  
    const[selected,setSelected]= useState(false);  // to set select
    // const[a,setA] = useState();
    // function Test(event){
    //     console.log(a);

    // }
    function HandleClick(event, selected,checked){
        
        if( event.target.selected === false) {// to select
            // console.log(event + 'should be flipp')
            // console.log(event.target.selected
            setSelected(true)
            CheckingCard(event,selected,checked);
            // setA(a);
            // Test(a);
        }
        // else{
            setTimeout(()=>{ setSelected(false);}, 1000);
        // }
    }
 
    if (selected ===true){ // when both selected and checked card up
        return <> 
        <div className = "row">
            <button className = "col down"><img className = "card "  item={item} key = {index} id = {id} src ={src}  alt= "front card"/>
            </button>
        </div>
        </>
        } 
    if(item.checked ===true){
        return <> 
        <div className = "row">
            <button className = "col up"><img className = "card "  item={item} key = {index} id = {id}   src ={src} alt= "front card"/>
            </button>
        </div>
        </>
    }
        // not checked, not selected
        return <> 
        <div className = "row"> 
            <button className = "col "><img className = "card" onClick = {(event) => HandleClick(event)} checked={checked} selected = {selected} id = {id} key = {index} src = "./img/back.png" alt="back card"/>
            </button>
        </div>
        </>
    }


function App() {
    // Hints/suggestions for assignment 2. 
    // State in App component:
    // *** remember here that hook ERROR : 훅 에러 함수안에 넣어서 **** 
    const imgList = [ // - An array of card objects;
        {src: './img/1.png', id :1, alt :"card",checked :false},
        {src: './img/2.png', id :2, alt :"card",checked :false},
        {src: './img/4.png', id :4, alt :"card",checked :false},
        {src: './img/5.png', id :5, alt :"card",checked :false},
        {src: './img/3.png', id :3, alt :"card",checked :false},
        {src: './img/6.png', id :6, alt :"card",checked :false},
        {src: './img/1.png', id :1, alt :"card",checked :false},
        {src: './img/2.png', id :2, alt :"card",checked :false},
        {src: './img/3.png', id :3, alt :"card",checked :false},
        {src: './img/4.png', id :4, alt :"card",checked :false},
        {src: './img/5.png', id :5, alt :"card",checked :false},
        {src: './img/6.png', id :6, alt :"card",checked :false}
        ].sort(() => Math.random() - 0.5)
        .map(index => ({...index}))

    const[count,setCount] = useState(0);
    const[newcard,setNewcard] = useState([...imgList])

    function CardShuffle() {
        // console.log('chekc')
        setNewcard(imgList) 
        // console.log(shuffle)
        NewGame()
    }

    // checking for selected cards 
    const[first, setFirst]=useState(null);
    const[second,setSecond]=useState(null);

    // checking for whether the lenght of matched card -> 12
    const[matched,setMatched]= useState([])

    // boolean to determine if the card is matched or unmatched
    function CheckingCard(event, selected,checked){
        // console.log(event.target)
        // console.log(newcard.id)
        // console.log('cec' + event.target.checked)
    
        if (event.target.checked === true){ // do nothing when card up
        }
        else{

        if (first===null ){ 
            setCount (count+1)
            setFirst(first + Math.floor(event.target.id)); // set first with id number 
        }
        else if(first !==null && second ===null){
    
            setSecond(second + Math.floor(event.target.id)); // set sec with id number 
        } 
        // else if ( first !== null && second !==null){
        //     // console.log('>>>>')
        //     if ( first === second){  
        //         console.log('ddd')
        // }}
    }
    }

    function ReMap (){
        // using array to update matched card 
        const set = newcard.map(item =>{
            if( item.id !== first){
                return { ...item}
            }
            else{
                return{ ...item, checked :true}
            }
            });
            setNewcard(set) // new card map
    }

    useEffect(() => {
    if (first !=null && second != null) {
        if(first === second){
        // console.log({first})
        // console.log({second})
        ReMap(first,second) // to set up with theh new 
        setMatched([...matched,first,second]) // update matched card
        // console.log({matched})
        setFirst(null) // set null back
        setSecond(null)
    } 
    else{
        // console.log({first})
        // console.log({second})
        setFirst(null)
        setSecond(null)
    }
    }

    if(matched !==null){
        if (matched.length ===12)
        { alert('Comletedw with '+  count + ' turns'); // when length is 12,done
        setMatched([])}
    }
    },[matched,first,second,count])


    function NewGame(){ // recet count and matched card
        setCount (0)
        setMatched([])
    }
        
    function twelveGrid(){ 
        CardShuffle()
    }
    function SisteenGrid(){
        alert('NOT UPDATED')
        
    }

    function ThiryGrid(){
        alert('NOT UPDATED')
    }
    
    return (

    <div className="App">
      <header className="App-header">MEMORY GAME</header>
      <div className="btnScr">
        <span className ="turn" > Turn :  {count}  </span>
        <div className="btn">
        <button className="btnIn BtnNG" onClick ={CardShuffle}> New Game</button>
        <button className="btnIn BtnRow3" onClick = {twelveGrid}> 3 x 4</button>
        <button className="btnIn BtnRow4" onClick= {SisteenGrid}> 4 x 4</button>
        <button className="btnIn BtnRow6" onClick= {ThiryGrid}>5 x 6</button>
        </div>
      </div>
      <div id = "grid" className="gridScreen">
        <>
        { newcard.map((item,index) =>( <Box CheckingCard={CheckingCard} item = {item} src={item.src} key={index} id = {item.id} checked ={item.checked} selected = {item.selected}/>
        ))}
        </>  
      </div>
    </div>
  );
}

export default App;