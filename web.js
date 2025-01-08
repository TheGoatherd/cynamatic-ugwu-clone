var timeout = 0;





let lastScrollY = 0;
  const  navbar = document.querySelector("#navbar");

  function navbarcontrol(scrollObj){
    
    const currentScrollY = scrollObj.scroll.y;
   

    if(currentScrollY > lastScrollY && currentScrollY>50){
      gsap.to(navbar,{
        y : "-100%",
        duration : 0.5,
        ease: "power4.out",
        
      });
    }
    else if(currentScrollY<lastScrollY){
      gsap.to(navbar,{
        y : "0",
        duration : 0.7,
        ease:"power4.Out" ,
       
      });
    }
    lastScrollY = currentScrollY;
  }

  const scroll = new LocomotiveScroll({
    el: document.querySelector('#panel'),
    smooth: true,
   
});



scroll.on('scroll',(obj) =>{
  console.log(obj.scroll.y); 
  navbarcontrol(obj);
});
 



//el ka mtlb hai top level element hota hai jiske andar sarri website hoti hai ye kaam ata hai website mai smooth scrolling ke 
function cursorskew(){
  // basicaly jo scale hai voh hoti maximux value means 1 ka mtlb hai ki xursor ka size 
var xscale = 1 ;
var yscale = 1 ;

// prev mtlb x and y ki purrani value jo hum 0 le rhe hai ye updtae hoti rhe gyi 
var xprev = 0;
var yprev = 0;

window.addEventListener("mousemove",function(dets){

  clearTimeout(timeout);
   // jo ye differ hai voh hai jaise hume xdiffer mai dets clientx -xprev mtlb dets clientx humre cursor ki jo current position hogi usmai se xprev ko minus kr dege usse hume jo difference hai voh mil jayega jo kaam aye gyi ball ke size ko chapta na baadda krne mai 
 
   
  // clamp gsap ka function hai jo madda krta ball ko chapta or badda krne ke liye toh humme jo .8 value diye voh minimum value hai or 1.2 voh maximium hai or xdiffer jo value  hume clamp krni hai.
  xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
  yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);


  xprev = dets.clientX;
  yprev = dets.clientY;

  
 
 
  cusrorfollow(xscale,yscale);

 timeout = setTimeout(function(xscale,yscale){
  document.querySelector("#cursor").style.transform =`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
 },30);
 
});
}


function cusrorfollow(xscale,yscale){
  window.addEventListener("mousemove",function(dets){
    document.querySelector("#cursor").style.transform =`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}



function coolpopani(){
     
  var tl = gsap.timeline();
   
  tl.to(".visible",{
    duration : 1,
    y : 0, 
    opacity : 1,
    ease : "power4.inOut",
    
  })

  .to(".popanimation",{
    duration : 1,
    y:0,
    opacity :1,
    ease: 'power3.out',
    stagger :.1,
  },"-=0.4")

  .to(".pro",{
    duration : 0.9,
    y:0,
    opacity :1,
    ease: Expo.easeInout,
    stagger : .2,
  } ,"-=0.8")

  .to("#pbot",{
    duration : 0.7,
    opacity:1,
    ease:Expo.easeInout,
  },"-=0.6");


}


  
function image(){
  document.querySelectorAll(".elem")
  .forEach(function(elem){
   
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove",function(dets){
     
     var diff = dets.clientY - elem.getBoundingClientRect().top;
     var diffrot = dets.clientX-rotate;
     rotate = dets.clientX;
     
      gsap.to(elem.querySelector("img"),{
      opacity : 1,
      ease : Power3 ,
      top:diff,
      left: dets.clientX,
      rotate : gsap.utils.clamp(-20,20,diffrot*0.5),
     
     });

     elem.addEventListener("mouseleave",function(){
      gsap.to(elem.querySelector("img"),{
       opacity:0,
       ease: Power3.easeOut,
       duration: 0.5,
       top:"0%",
       clearProps:"all",
      });
   });
 
    });
  });
}

function slide(){

 document.querySelectorAll(".slide")
 .forEach(function(slideani){

  const text =  slideani.querySelector(".slideani");
   
  slideani.addEventListener("mouseenter",function(){
    
    

    gsap.to(text,{
    opacity:0.3,
    x:"4%",
    ease: "power3.out",
    duration :0.3,
    

    });
});

slideani.addEventListener("mouseleave",function(){
  if(!slideani.contains(Event.relatedTarget)){
    gsap.to(text,{
      opacity:0.6,
      x:0,
      ease:"power3.inout",
      duration :0.3,
    });
  }
  });
});

}


 

 const progress = document.querySelector(".progress");
 const percentagegrow = document.querySelector("#percentage")
 let percentage = 0;

 function page(){
        
  if(percentage<100){
    percentage++;
    progress.style.width = percentage + "%";
    percentagegrow.textContent = percentage + "%";

    setTimeout(page,50);
  }
  else{
    landingpage();
  }
 };


 page();

 function landingpage(){
   
  var tl = gsap.timeline();

  tl.to("#land",{
    y:"-100%",
    duration:1,
    stagger: 1,
    ease:Expo.easeInout,
    onComplete: function(){
      document.querySelector("#land").style.display = "none";
      coolpopani();
      cursorskew();
      cusrorfollow();
      
    }
  });
 }



 window.onload = page;
 
 image();
 slide();





