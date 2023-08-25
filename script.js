const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    duration:.5
});

function firsPageAnim(){
    var tl=gsap.timeline();

    tl.from("#nav", {
        y:'-10',
        opacity: 0,
        duration:1.5,
        ease:Expo.easeInOut
    })
        .to(".boundingelem", {
            y:0,
            duration:2,
            delay:-1,
            ease:Expo.easeInOut,
            stagger:.2
        })
            .from("#hero-footer", {
                y:-10,
                opacity: 0,
                duration:1.5,
                delay:-1,
                ease:Expo.easeInOut
            })
}

var timeout;
function circleskew(){
   
    var xscale=1;
    var yscale=1;

    var xprevious=0;
    var yprevious=0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        xscale=gsap.utils.clamp(.8,1.2,dets.clientX-xprevious);
        yscale=gsap.utils.clamp(.8,1.2,dets.clientY-yprevious);

        xprevious=dets.clientX;
        yprevious=dets.clientY;

        circleMouseFollower(xscale,yscale);
        timeout=setTimeout(function(){
            document.querySelector("#mini-circle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        }, 100);
    })
}

function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        //console.log(dets.clientX,dets.clientY);
        document.querySelector("#mini-circle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`; //scale(${xscale},${yscale})
    })
}

circleskew();
circleMouseFollower();
firsPageAnim();


//image animations
document.querySelectorAll('.elem')
.forEach(function(elem){
    var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
    gsap.to(elem.querySelector("h1"),{
        opacity:.5,
        ease:Power3,
        duration: 0.8,
    });
  });
    elem.addEventListener("mousemove",function(dets){

        // var diff=dets.clientY - elem.getBoundingClientRect().top;
        // diff=diff-diff; //!!!!!to make follower centered
       
        gsap.to(elem.querySelector("h1"),{
            opacity:0.2,
            ease:Power3,
        });
        var lft=dets.clientX;
        lft=lft-lft/3;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top:0,
            left:lft,
            right:lft,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
           
        });
        
    });

});

//Extended MEnu

function menuExtend(){
    
 var menu_trigger=document.querySelector("#menu-trigger");
 menu_trigger.addEventListener("click",function(){
    //console.log('hi from MenuExtender');
    gsap.to(menu_trigger, {
        opacity: 0,
        onComplete: function() {
            menu_trigger.style.display = "none"; // Hide the element after animation
        }
    });

    gsap.to(document.querySelector("#extended-menu"),{
        opacity:1,
        y:'-10',
        duration:1.5,
        ease:Expo.easeInOut     
    });

 });  
}
menuExtend();

/*Mobile pop up*/
function mobilePopup() {
    var menu_trigger = document.querySelector('#menu-trigger');
    var mobile_popup = document.querySelector("#mobile-popup");
    var menu_close = document.querySelector('#menu-close');

    function openMobilePopup() {
        mobile_popup.style.display = 'block';
        mobile_popup.style.width = '100%';
        mobile_popup.style.height = '100vh';
        mobile_popup.classList.add('mobile-popup-active');
    }

    function closeMobilePopup() {
        mobile_popup.style.display = 'none';
        menu_trigger.style.opacity = 1;
        menu_trigger.style.display = 'block';
    }

    menu_trigger.addEventListener('click', function () {
        if (window.innerWidth <= 768) { // Only for screens up to 768px width (example for mobile devices)
            openMobilePopup();
        }
    });

    menu_close.addEventListener('click', function () {
        closeMobilePopup();
    });

   
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            closeMobilePopup();
        }
    });
}


mobilePopup();
