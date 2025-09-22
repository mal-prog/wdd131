const PI = 3.14;
let radius = 3;
              
let area = radius * radius * PI;

console.log(area);

radius = 20;

area = radius * radius * PI;

console.log(area);

const one = 1;
const two = '2';
                 
let result = one * two;
console.log(result);

result = one + Number(two);
console.log(result);


let course = "CSE131"; //global scope
if (true) {
    let student = "John";
    console.log(course);  //works just fine, course is global
    console.log(student); //works just fine, it's being accessed within the block
}
console.log(course); //works fine, course is global
//console.log(student); //does not work, can't access a block variable outside the block
               

let selectElem = document.getElementById('webdevlist');

selectElem.addEventListener('change', function(){

    let codeValue = selectElem.value;
    console.log(codeValue);
    document.getElementById(codeValue).style.color='red';
})
              
const newPara =document.createElement('p');
newPara.innerText ='added text here';

const topics = document.querySelector('#topics');

topics.appendChild(newPara);

topics.innerHTML = '<p> This is it</p>';


