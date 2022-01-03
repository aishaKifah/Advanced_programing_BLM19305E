
document.addEventListener('DOMContentLoaded', ()=>{
    const cardsArray=[
        {
            name: 'book',
            img: 'images/resized/book.jpg'
        },
        {
            name: 'book',
            img: 'images/resized/book.jpg'
        },
        {
            name: 'car',
            img: 'images/resized/car.png'
        },
        {
            name: 'car',
            img: 'images/resized/car.png'
        },
        {
            name: 'doll',
            img: 'images/resized/doll.jpg'
        },
        {
            name: 'doll',
            img: 'images/resized/doll.jpg'
        },
        {
            name: 'heart',
            img: 'images/resized/heart.png'
        },
        {
            name: 'heart',
            img: 'images/resized/heart.png'
        },
       
        {
            name: 'pincle',
            img: 'images/resized/pincle.png'
        },
        {
            name: 'pincle',
            img: 'images/resized/pincle.png'
        },
        {
            name: 'pizza',
            img: 'images/resized/pizza.jpg'
        },
        {
            name: 'pizza',
            img: 'images/resized/pizza.jpg'
        },
        {
            name: 'umprella',
            img: 'images/resized/prella.png'
        },
        {
            name: 'umprella',
            img: 'images/resized/prella.png'
        },
        {
            name: 'lol',
            img: 'images/resized/lol.png'
        },
        {
            name: 'lol',
            img: 'images/resized/lol.png'
        }
    
    
    ]
    

    const grid= document.querySelector('.grid')
    var cardsChosen=[]
    var cardsChosenId=[]
    var cardsWon=[]
    var isWone=false;
    var finshdCheking=false;
    function creatFunctions(){
        const restBtn = document.createElement('input')
        restBtn.setAttribute('id' ,'reset')
        restBtn.setAttribute('type','button')
        restBtn.setAttribute('value','Reset')
        restBtn.fontFamily = '"Lucida Console", "Courier New", monospace;';
        restBtn.addEventListener('click', reset);
        const resultOut=document.createElement('span')
        const scoreElement=document.createElement('h3')
        resultOut.setAttribute('id','result')
        scoreElement.setAttribute('id','score')
        scoreElement.innerText="Score: "
        scoreElement.appendChild(resultOut)
        const divofFunctions=document.createElement('div')
        divofFunctions.setAttribute('id','functions')
        divofFunctions.appendChild(scoreElement)
        divofFunctions.appendChild(restBtn)
        grid.appendChild(divofFunctions)
    }
    // create gameboard 
    function createBoard(){
        
        creatFunctions()
    
        for (let i=0;i<cardsArray.length; i++){
            var card=document.createElement('img')
            var overlay = document.createElement('div')
            overlay.setAttribute('class','overlay')
            card.setAttribute('class','cards')
            card.setAttribute('src','./images/resized/cover.jpg')
            card.setAttribute('data-id',i)// giv each card an id with related order 
            card.addEventListener('click',flipCard) // add listner to check if the card clicked on to apply flipCard function
            overlay.appendChild(card)
            grid.appendChild(overlay)
        }
    
    }
    function recover(card1,card2){
   


      
        card1.setAttribute('src','images/resized/cover.jpg')
        card2.setAttribute('src','images/resized/cover.jpg')

    }
    function checkIfwon(chosenCard1,chosenCard2){
        for(i=0; i<cardsWon.length;i++){
            if(chosenCard1===cardsWon[i][0] || chosenCard2===cardsWon[i][0] ){
                return true}
        }
        return false
    }
    // check for matches 
    function checkForMatch(){
        var resultDisplay=document.querySelector('#result')


        cards=document.querySelectorAll('img')
        const optionOneId=cardsChosenId[0]
        const optionTwoId=cardsChosenId[1]
        console.log(optionOneId,optionTwoId)

        
        if(cardsChosen[0]==cardsChosen[1]){
           // cards[optionOneId].setAttribute('src','images/resized/blank.jpg')
            //cards[optionTwoId].setAttribute('src','images/resized/blank.jpg')
            cardsWon.push(cardsChosen)
        }else{

                recover(cards[optionOneId],cards[optionTwoId])
        }

        cardsChosen=[]
        cardsChosenId=[] 
        resultDisplay.textContent=cardsWon.length
        if(cardsWon.length==cardsArray.length/2 ){
            grid.innerHTML=''
            creatFunctions()
            resultDisplay=document.querySelector('#result')
            resultDisplay.innerText='Congratulations you found them all!'
            grid.style.backgroundPosition="center"
            grid.style. backgroundRepeat="no-repeat"
            grid.style.backgroundImage='url(images/resized/reset.png)'
            grid.addEventListener('click', reset);





        }


    }
    // flip cards 
    function flipCard(){
        var cardId=this.getAttribute('data-id') // get the data id created on the grid
        cardsChosen.push(cardsArray[cardId].name) // push card from cards array based on card id 
        cardsChosenId.push(cardId) // push cardid

        console.log(cardsChosen)
        const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('befor if ',isWone)
        
                        if (checkIfwon(cardsChosen[0],cardsChosen[1])==true || cardsChosen.length>2 ||cardsChosenId[0]==cardsChosenId[1] ){

                            cardsChosen.pop() // push card from cards array based on card id 
                            resolve('foo')
                            cardsChosenId.pop()
                        
                            
                        }

            }, 300);
          });
          
          myPromise
            .then( setImg(this,cardsArray[cardId].img) )
            .then( setTimeout(() =>checkForselectedCards(),700))
            .catch(handleRejectedAny)



     
        
    }
    function setImg(card,img){
        
        if (cardsChosen.length<=2 )
        card.setAttribute('src', img)
    }

    function checkForselectedCards(){
        console.log('B',cardsChosen.length);
        if( cardsChosen.length>=2){
        checkForMatch()// give some buffer time 

        } 
    }

    function handleRejectedAny(){
        console,console.log('rejected');
    }
function reset(){
    grid.innerHTML=''
    grid.style.backgroundImage="none"
    grid.removeEventListener("click", reset);
   // resultDisplay.innerText=0
    cardsChosen=[]
    cardsChosenId=[]
    scardsWon=[]
    cardsWon=[]
    cardsArray.sort(()=> 0.5 - Math.random()) // refresh the game by randomize the cards order

    createBoard()
}
 
    createBoard()
 

    
}


)
