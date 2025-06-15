//=====================lenis=======================================//

const lenis = new Lenis();

lenis.stop();

document.body.classList.add('no-scroll'); 

//==============================================CURSOR===================================//
function mainmouse(){
    const circleElement = document.querySelector(".circle");
    const flag = document.querySelector("#flag");

    const mouse = { x: 0, y: 0 }, circle = { x: 0, y: 0 };

    window.addEventListener('mousemove', e => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    const speed = 0.5;

    const tick = () => {
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;

        circleElement.style.transform = `translate(${circle.x}px, ${circle.y}px)`;
        flag.style.transform = `translate(${circle.x}px, ${circle.y}px)`;
        window.requestAnimationFrame(tick);
    }

    tick();
 
}
mainmouse();
//==============================================FLAG ANIMATION===============================//
function flag(){
    var flag = document.querySelectorAll("#change");

    flag.forEach(function(elements){
        elements.addEventListener("mousemove",function(){
            gsap.to("#flag",{
                opacity:1
            })

        });

        elements.addEventListener("mouseleave",function(){
            gsap.to("#flag",{
                opacity:0
            })

        });

    });
}
flag();
//==============================================VIDEO MOUSE===============================//
function videomouse(){
    var video = document.querySelector("#video-con");
    var vidmouse = document.querySelector("#m-play");
    var videoplay = document.querySelector("#video-con video");
    var videoback = document.querySelector("#video-con img");


video.addEventListener("mousemove", function (dets) {
    gsap.to(".circle", {
        opacity: 0,
    });

    gsap.to(vidmouse, {
        left: dets.x - 400,
        top: dets.y - 200
    });
});


video.addEventListener("mouseleave", function () {
    gsap.to(".circle", {
        opacity: 1,     
    });

    gsap.to(vidmouse, {
        left: "80%",
        top: "-10%"
    });
});

var flag = 0
videoback.addEventListener("click", function () {
    if(flag === 0){
        videoplay.play();
        videoback.style.opacity = 0;
        vidmouse.innerHTML=`<i class="ri-pause-line"></i>`
        gsap.to(vidmouse,{
            scale:0.5
        })
        flag = 1
    }
    else{
        videoplay.pause();
        videoback.style.opacity = 1;
        vidmouse.innerHTML=`<i class="ri-play-fill"></i>`
        gsap.to(vidmouse,{
            scale:1
        })
        flag = 0
    }
    
});
}
videomouse();
//==============================================LOADER===============================//

    var num = document.querySelector(".text-line1 span");
    var counter = 0;

    var int = setInterval(function(){

        if(counter === 99){
            clearInterval(int);
        }

        counter++
        num.textContent=counter
    },29)


    var p1TL = gsap.timeline();

    p1TL.from(".text-line1 h2,.text-line1 h3",{
        y:50,
        opacity:0,
        stagger:0.20,
        duration:0.50
    })

    p1TL.from(".text-line2 h2",{
        y:50,
        opacity:0,
        stagger:0.20,
        duration:0.50
    })

    p1TL.from(".text-line3 h2,.text-line3 h3",{
        y:150,
        opacity:0,
        stagger:0.20,
        duration:0.50
    })

    p1TL.from("#loader #text-message h6",{
        opacity:0,
        duration:0.50
    })


    p1TL.to(".text-line1 h2,.text-line1 h3",{
        opacity:0,
        stagger:0.20,
        duration:1.5
    })

    p1TL.to("#loader #text-message h6",{
        opacity:0,
        duration:0.50
    })


    p1TL.to(".text-line3 h2",{
        opacity:0,
        stagger:0.20,
        duration:0.25,
    },"same")

    p1TL.to(".text-line3 h3",{
        display:"none"
    },"same")

    p1TL.to(".text-line2 h2",{
        opacity:0,
        stagger:0.20,
        duration:0.70
    })


    p1TL.to("#loader", {
        y: -500,
        opacity: 0,
        duration: 0.30,
        display: "none",
        onComplete: function() {
            // Add this to your existing onComplete:
            document.body.classList.remove('no-scroll');
            lenis.start();
            
            // Now set up the Lenis scroll listeners
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }
    });


//====================================MENU==================================//
function menu(){
    var menu = document.querySelector("#menu");
    var menubutton = document.querySelector(".menu-opener__square");

    let isMenuOpen = false;

    menubutton.addEventListener("click", function () {
        if (!isMenuOpen) {
            
            lenis.stop();

            gsap.to(menu, {
                top: 0,
                duration: 1,
                ease: "power2.out"
            });

            gsap.fromTo("#menu-left h2",
                {
                    y: 100,
                    opacity: 0
                },
                {
                    delay: 0.5,
                    y: 0,
                    opacity: 1,
                    stagger: 0.3,
                    ease: "power2.out"
                }
            );

            gsap.fromTo("#menu-center-left, #menu-center-center, #menu-center-right",
                {
                    y: 50,
                    opacity: 0
                },
                {
                    delay: 0.75,
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    ease: "power2.out"
                }
            );

        } else {
            // Close child elements first
            gsap.to("#menu-left h2", {
                opacity: 0,
                y: -100,
                duration: 0.5,
                ease: "power2.in"
            });

            gsap.to("#menu-center-left, #menu-center-center, #menu-center-right", {
                opacity: 0,
                y: -50,
                duration: 0.5,
                ease: "power2.in"
            });

            // Then hide the menu
            gsap.to(menu, {
                top: "-100%",
                delay: 0.5,
                duration: 0.75,
                ease: "power2.in",
                onComplete: function() {
                    // Add this to your existing onComplete:
                    document.body.classList.remove('no-scroll');
                    lenis.start();
                    
                    // Now set up the Lenis scroll listeners
                    lenis.on('scroll', ScrollTrigger.update);
                    gsap.ticker.add((time) => {
                        lenis.raf(time * 1000);
                    });
                    gsap.ticker.lagSmoothing(0);
                }
            });
        }

        isMenuOpen = !isMenuOpen;
    });

}
menu();
//====================================PAGE 1==================================//

p1TL.from("nav", {
    opacity:0,
    duration:1
})

Shery.makeMagnet("#nav-right h3");
Shery.makeMagnet(".menu-opener__square");

p1TL.from(".hero",{
    y:40,
    opacity:0,
    stagger:0.2,
    duration:0.5
})

document.getElementById('work').addEventListener('click', function() {
    document.getElementById('page3').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('about').addEventListener('click', function() {
    document.getElementById('page4').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('contact').addEventListener('click', function() {
    document.getElementById('page6').scrollIntoView({ behavior: 'smooth' });
});
//=============================PAGE 2==========================================//

var p2TL = gsap.timeline({
    scrollTrigger:{
        trigger:"#page2",
        start:"top 80%",
        end:"top 20%",
        scrub:1
    }
});

p2TL.from("#video-con",{
    opacity:0
})

//=============================PAGE 3==========================================//

var p3TL = gsap.timeline({
    scrollTrigger:{
        trigger:"#page3",
        start:"top 80%",
        end:"top 20%",
        scrub:2
    }
});

p3TL.from("#page3-title h2",{
    y:50,
    opacity:0,
})

p3TL.from(".underline2",{
    x:100,
})

p3TL.from(".img-con, .img-con2",{
    opacity:1,
    stagger:0.80,
    duration:3
})

var p3TLloco = gsap.timeline({
    scrollTrigger:{
        trigger:"#page3-center",
        start:"top bottom",
        end:"bottom top",
        scrub:2
    }
});



//=============================PAGE 4==========================================//

var p4TL = gsap.timeline({
    scrollTrigger:{
        trigger:"#page4",
        start:"top 80%",
        end:"top 20%",
        scrub:1
    }
});

p4TL.from("#page4-title h2",{
    y:50,
    opacity:0,
    stagger:0.75,
},"same")

p4TL.from("#page4-title p",{
    y:60,
    opacity:0,
},"same")

p4TL.from(".underline",{
    x:900,
    opacity:0,
},"same")

var p4TLM = gsap.timeline({
    scrollTrigger:{
        trigger:"#page4-bottom-main1",
        start:"top 80%",
        end:"top 20%",
        scrub:1,
    }
});

p4TLM.from("#page4-bottom-main1 img",{
    opacity:0,
})

gsap.to("#page4-bottom-main1 img", {
    y: -50,
    scrollTrigger: {
      trigger: "#page4",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
});

p4TLM.from("#page4-bottom-main1-text p",{
    x:50,
    opacity:0,
    stagger:1
})

var p4TLM2 = gsap.timeline({
    scrollTrigger:{
        trigger:"#page4-bottom-main2",
        start:"top 100%",
        end:"top 15%",
        scrub:1,
    }
});

p4TLM2.from("#page4-bottom-main-box",{
    opacity:0
})

gsap.to("#page4-bottom-main-box", {
    y: -80,
    scrollTrigger: {
      trigger: "#page4-bottom-main2",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
});

p4TLM2.from(".underline1",{
    x:900,
    opacity:0,
    duration:3
})

p4TLM2.from("#page4-bottom-main2 h6",{
    opacity:0,
})

//=============================PAGE 5==========================================//

var p5TL = gsap.timeline({
    scrollTrigger:{
        trigger:"#page5",
        top:"top 80%",
        end:"top 20%",
        scrub:2
    }
});

p5TL.from("#page5",{
    opacity:0
})


//=============================PAGE 6==========================================//

var p6Tl = gsap.timeline({
    scrollTrigger:{
        trigger:"#page6",
        start:"top 80%",
        end:"top 20%",
        scrub:2
    }
})

p6Tl.from("#page6-title h2",{
    y:100,
    opacity:0,
    stagger:0.50
},"move")

p6Tl.from("#page6-title svg",{
    x:100,
    opacity:0,
    stagger:0.50
},"move")

p6Tl.from("#page6-center-left,#page6-center-center,#page6-center-right",{
    opacity:0,
    stagger:1,
    duration:4
})

p6Tl.from(".underline3, #page6-footer h3",{
    x:100,
    opacity:0,
    stagger:1
})


function textsplit(){
    Splitting(); // Initialize Splitting.js

    const chars = document.querySelectorAll('.char');
    const heading = document.querySelector('#page6-title h2');

    heading.addEventListener('mouseenter', () => {
        chars.forEach((char, i) => {
        setTimeout(() => {
            char.classList.add('hovered');
            }, i * 100);
        });
    });

    heading.addEventListener('mouseleave', () => {
        chars.forEach((char, i) => {
            setTimeout(() => {
            char.classList.remove('hovered');
            }, i * 100);
        });
    });
}

textsplit();