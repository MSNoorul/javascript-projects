// set  date

let date = document.getElementById("date")
date.innerHTML = new Date().getFullYear()
 

// close link 

const btn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelector(".links");
btn.addEventListener('click',function (){
    let height = links.getBoundingClientRect().height;
    let navheight = navLinks.getBoundingClientRect().height;

    if(navheight==0){ navLinks.style.height = `${height}px`}
    else{navLinks.style.height = `0px`}
   
})


// fixed navbar 

let nav = document.querySelector("nav");
 
window.addEventListener('scroll',function(){
    let navBarHeight = nav.getBoundingClientRect().height;
    if(navBarHeight < window.scrollY){
        nav.classList.add('fixed-nav')
    }
    else{nav.classList.remove('fixed-nav')}

    
// top link button 

let HomeHeight = document.querySelector("#home")
.getBoundingClientRect().height;
let topbtn = document.querySelector(".top-link");
    if(HomeHeight < window.scrollY ){
        topbtn.classList.add('show-link')
    }
    else {topbtn.classList.remove('show-link')}
})


// scroll event 



let scrollLinks = document.querySelectorAll('.scroll-link')

scrollLinks.forEach(function (link){
    link.addEventListener('click',function(e){
        e.preventDefault();

        let navBarHeight = nav.getBoundingClientRect().height;
        let height = links.getBoundingClientRect().height;

        console.log(e.currentTarget);
        let id = e.target.getAttribute("href").slice(1);
        let element = document.getElementById(id);
        let position = element.offsetTop;

        if(nav.classList.contains('fixed-nav')) {
           position = position-navBarHeight;
        }
        else{position = position-(navBarHeight*2)};

        if(navBarHeight>85){position=position+height};

        console.log(navBarHeight);
        window.scrollTo(0,position);


        // close 
        navLinks.style.height = `0px`
        
    })
})





