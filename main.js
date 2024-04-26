const cells=Array.from(document.getElementsByClassName('cell'));
const scoreboard=document.getElementsByClassName('scoreboard')[0];
const root=document.getElementById('root');
const playerX=document.getElementById('playerX');
const playerO=document.getElementById('playerO');
const ties=document.getElementById('ties');
const cancelButton=document.getElementById('cancel');
const frame=document.querySelector('.Message-frame');

const combinations=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const createMessage=(message)=>{
    const text=document.querySelector('.Message-text');
    frame.style.display='flex';
    text.innerHTML=message;
}

class Game{
    constructor(items){
        this.moves=Array(9).fill(null);
        this.items=items;
        this.isX_turn=true;
        this.score={
            Player_X:0,
            Player_O:0,
            Ties:0
        }
    }
    assignProperties(){
        this.items.forEach((item,i)=>{
           item.addEventListener('click',()=>{
            if(this.isX_turn===true){
                item.textContent='X';
                this.moves[i]='X';
                this.isX_turn=false;
              }
              else{
                item.textContent='O';
                this.moves[i]='O';
                this.isX_turn=true;
              }
              item.disabled=true;
              this.result();
            });
            
        });     
    }
    result(){
        if(this.findWinner()){
           setTimeout(()=>createMessage(`The Winner is Player ${this.findWinner()}`),800);
           if(this.findWinner()==='X'){
             ++this.score.Player_X;
             playerX.innerHTML=this.score.Player_X;
           }
           else{
             ++this.score.Player_O;
             playerO.innerHTML=this.score.Player_O
           }
        }
        else if(this.moves.every(move=>move!==null)){
            setTimeout(()=>createMessage("It's a Tie."),800);
            ++this.score.Ties;
            ties.innerHTML=this.score.Ties;
        }
    }
    findWinner(){
        for(let combination of combinations){
            if(this.moves[combination[0]]&&this.moves[combination[0]]===this.moves[combination[1]]&&this.moves[combination[1]]===this.moves[combination[2]]){
                for(let index of combination){
                    this.items[index].style.backgroundColor='green';
                }
                return this.moves[combination[0]];
            }    
        } 
        
    }
    reset(){
       this.moves.fill(null);
       this.items.forEach(item=>{
        item.textContent='';
        item.style.backgroundColor='inherit';
        item.disabled=false;
       });
       this.isX_turn=true;
    }
    
};

const TicTacToe=new Game(cells);



TicTacToe.assignProperties();

cancelButton.addEventListener('click',()=>{
    frame.style.display='none';
    TicTacToe.reset();
});

document.getElementById('reset').onclick=()=>TicTacToe.reset();