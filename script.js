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
function circleTouchFollower(xscale, yscale) {
    const miniCircle = document.querySelector("#mini-circle");

    function moveCircle(x, y) {
        miniCircle.style.transform = `translate(${x}px, ${y}px) scale(${xscale}, ${yscale})`;
    }

    document.addEventListener('touchmove', function (event) {
        const touch = event.touches[0]; // Get the first touch

        if (touch) {
            const x = touch.clientX;
            const y = touch.clientY;
            moveCircle(x, y);
        }
    }, { passive: false }); // Allow preventing default behavior

    // Reset the circle's position when touch ends
    
}


circleTouchFollower(1, 1);

circleskew();
circleMouseFollower();
firsPageAnim();


//image animations
document.querySelectorAll('.elem').forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    function onMouseLeave() {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: "power3",
            duration: 0.5,
        });
        gsap.to(elem.querySelector("h1"), {
            opacity: 0.5,
            ease: "power3",
            duration: 0.8,
        });
    }

    function onMouseMove(event) {
        gsap.to(elem.querySelector("h1"), {
            opacity: 0.2,
            ease: "power3",
        });

        var lft = event.clientX;
        lft = lft - lft / 3;
        diffrot = event.clientX - rotate;
        rotate = event.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: "power3",
            top: 0,
            left: lft,
            right: lft,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    }

    elem.addEventListener("mouseleave", onMouseLeave);

    elem.addEventListener("mousemove", onMouseMove);

    elem.addEventListener("touchend", onMouseLeave);

    elem.addEventListener("touchmove", function(event) {
        event.preventDefault(); // Prevent default touch move behavior

        // Use the first touch in the touches array
        var touch = event.touches[0];

        if (touch) {
            onMouseMove(touch);
        }
    });

});

// document.querySelectorAll('.elem')
// .forEach(function(elem){
//     var rotate = 0;
//   var diffrot = 0;

//   elem.addEventListener("mouseleave", function (dets) {
//     gsap.to(elem.querySelector("img"), {
//       opacity: 0,
//       ease: Power3,
//       duration: 0.5,
//     });
//     gsap.to(elem.querySelector("h1"),{
//         opacity:.5,
//         ease:Power3,
//         duration: 0.8,
//     });
//   });
//     elem.addEventListener("mousemove",function(dets){

//         // var diff=dets.clientY - elem.getBoundingClientRect().top;
//         // diff=diff-diff; //!!!!!to make follower centered
       
//         gsap.to(elem.querySelector("h1"),{
//             opacity:0.2,
//             ease:Power3,
//         });
//         var lft=dets.clientX;
//         lft=lft-lft/3;
//         diffrot = dets.clientX - rotate;
//         rotate = dets.clientX;
//         gsap.to(elem.querySelector("img"),{
//             opacity:1,
//             ease:Power3,
//             top:0,
//             left:lft,
//             right:lft,
//             rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
           
//         });
        
//     });

// });

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

    // Close the popup if the window is resized beyond the mobile breakpoint
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            closeMobilePopup();
        }
    });
}

// Call the function to set up the event listener
mobilePopup();
document.addEventListener("click", function () {
    const miniCircle = document.querySelector('#mini-circle');
    
    
    miniCircle.style.width = '25px';
    miniCircle.style.height = '25px';
    miniCircle.style.backgroundColor = 'white';
    miniCircle.style.transition = 'width 1s ease, height 1s ease, background-color 1s ease';

    
    setTimeout(function () {
        miniCircle.style.width = ''; 
        miniCircle.style.height = ''; 
        miniCircle.style.backgroundColor = ''; 
        miniCircle.style.transition = 'width 1s ease, height 1s ease, background-color 1s ease';
    }, 1000);
});