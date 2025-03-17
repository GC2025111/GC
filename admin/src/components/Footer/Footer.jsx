import React, {useState, useRef} from 'react'
import "./Footer.css"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);


function Footer() {
  const p12Ref = useRef(null);
  useGSAP(()=>{
    const links=document.querySelectorAll(".link a");
    const socials=document.querySelectorAll("#socials p");
    const mm=gsap.matchMedia();
    mm.add("(min-width: 490px)",()=>{
    gsap.to(links,{
      transform:"translateY(0)",
      opacity:1,
      stagger:0.26,
      ease:"expo.out",
      duration:1.99,
      scrollTrigger:{
        trigger:"#footer",
        start:"top 45%",
        end:"top -7%",
        scrub:true,
      
      }
  })
  gsap.to(socials,{
    transform:"translateY(0)",
    opacity:1,
    stagger:0.18,
    ease:"hop.out",
    duration:1.99,
    scrollTrigger:{
      trigger:"#footer",
      start:"top 45%",
      end:"top -7%",
      scrub:true,
      
    }
  })
  gsap.to("#video-wrapper",{
    clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease:"expo.out",
    duration:3,
    scrollTrigger:{
      trigger:"#footer",
      start:"top 19%",
      end:"top -10%",
      scrub:true,
     
    }
  })
  gsap.to("#header span",{
    rotateY:0,
    transform:"scale(0.75)",             
    stagger:0.4,                
    opacity:1,
    ease:"expo.out",
    duration:2.1,
    scrollTrigger:{
      trigger:"#footer",
      start:"top 19%",
      end:"top -10%",
      scrub:true,
     
    }

  })
})
 mm.add("(max-width: 490px)",()=>{
  gsap.to(links,{
    transform:"translateY(0)",
    opacity:1,
    stagger:0.26,
    ease:"hop.out",
    scrollTrigger:{
      trigger:"#footer",
      start:"top 76%",
      end:"top 66%",
      scrub:true,
      
    }
    
  })
  gsap.to(socials,{
    transform:"translateY(0)",
    opacity:1,
    stagger:0.18,
    ease:"hop.out",
    duration:1.99,
    scrollTrigger:{
      trigger:"#footer",
      start:"top 76%",
      end:"top 67%",
      scrub:true,
      
      
    }
  })
  gsap.to("#header span",{
    rotateY:0, 
    transform:"translateY(0)",             
    stagger:0.4,                
    opacity:1,
    ease:"expo.out",
    duration:2.1,
    scrollTrigger:{
      trigger:"#footer",
      start:"top 76%",
      end:"top 67%",
      scrub:0.5,
      

    }

  })
 })
})
  return (
    <div>
      <div id="footer">
        <div id="fleft">
        <div id="fmain" ref={p12Ref} >
        IIT STORE
        </div>
        <div id="links">
          <div className="link" ><a href="#" id="on"><i className="ri-arrow-right-up-line"></i>&nbsp;Contact Us</a></div>
          <div className="link"><a href="#" className="off"><i className="ri-arrow-right-up-line closed" id="off"></i>&nbsp;About Us</a></div>
          <div className="link"><a href="#" className="off"><i className="ri-arrow-right-up-line closed" id="off"></i>&nbsp;Privacy Policy</a></div>
          <div className="link"><a href="#" className="off"><i className="ri-arrow-right-up-line closed" id="off"></i>&nbsp;Terms & Conditions</a></div>
        </div>
        <div id="video-wrapper">
          <video src="/Videos/v1.mp4" autoPlay loop muted playsInline></video>
        </div>
        </div>
        <div id="fright">
        <div id="socials">
            <div className="sub-col">
              <div className="box"><p>BHR/MHR,IIT BBS,Khurda</p></div>
              <div className="box"><p>Odisha,India</p></div>
              <div className="spacediv"></div>
              <div className="box"><p>+91 xxxxxxxxx</p></div>
              <div className="box"><p>info@iitbbs.ac.in</p></div>
              </div>
              <div className="sub-col">
              <div className="box"><a href="https://www.instagram.com/iplzone.in/"><p>INSTAGRAM</p></a></div>
              <div className="box"><a href="https://www.facebook.com/iplzone.in/"><p>FACEBOOK</p></a></div>
              <div className="box"><a href="https://twitter.com/iplzone.in"><p>TWITTER</p></a></div>
              <div className="box"><a href="https://www.youtube.com/@iplzone.in"><p>YOUTUBE</p></a></div>
              <div className="spacediv"></div>
             
            </div>
            </div>
            <div id="header">
          <span>I</span><span>I</span><span>T</span><span>&nbsp;</span><span>S</span><span>T</span><span>O</span><span>R</span><span>E</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
