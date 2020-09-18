console.log("Inside jsapp")



const myForm=document.querySelector('form')
const address=document.getElementById('address')
const myPara=document.getElementById('para1')

myForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const name = address.value
    myPara.textContent="Loading......."
     
    fetch('/weather?address='+name)
    .then(response=>{
    response.json().then(data=>{
        console.log(myPara)
        //console.log("hello")
        myPara.textContent=data.location
        const temperature=data.temperature
    })
})    
})
