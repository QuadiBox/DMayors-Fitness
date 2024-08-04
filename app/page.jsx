import Sect2 from "@/components/Home/Sect2";
import Sect4 from "@/components/Home/Sect4";
import Sect5 from "@/components/Home/Sect5";
import FAQ from "@/components/Home/Faq";
import ImageTransit from "@/components/imageTransit";
import Navbar from "@/components/navbar";
import Link from "next/link";
import Footer from "@/components/Home/Footer";
import HeroSectBg from "@/components/Home/HeroSectBg";



export default function Home() {
  return (
    <main>
      <div className="grandHomeCntn">
        <Navbar></Navbar>
        <section className="heroHomeSect">
          <HeroSectBg src={"/hero_img5.jpg"}></HeroSectBg>
          <div className="homeheroTextCnt">
            <h1><span>FREE UP YOUR SOUL...</span> <span>WORK OUT YOUR BODY</span></h1>
            <p><span>"Your body is an armor wherein your soul dwells"</span>. To keep your body fit is to keep your  soul safe and free. We believe in empowering you to unlock your full potential. Join us today and start building a stronger, healthier, and more confident you.</p>
            <div className="heroCTA">
              <Link className="specBtn borderBtn" href={"/membership"}>Join us now</Link>
              <Link className="specBtn fillBtn" href={"/about"}>Learn more</Link>
            </div>

            <button className="heroDownScroller" type="button"><i className="icofont-dotted-down"></i></button>
            <div className="locationCard"><i className="icofont-map-pins"></i>32 Mafemi Crescent Utako, Abuja, Nigeria.</div>
          </div>
        </section>
        <Sect2></Sect2>
        <section className="homeSect3">
          <div className="grooveDisplay">
            <h2>Visit  <b> DMAYOR'S GROOVE</b>  <br /> <span>...a subsidiary of DMayor Enterprise</span></h2>
            <p>Are you in search for a place where culinary perfection meets with fun, relaxation and comfort?</p>
            <p>DMayor's Groove put your quests to a halt by offering all these with extra cherry on top. Enjoy various fun activities including dance parties, karaoke nights and ball, all with multitude of intresting prizes to win.</p>
            <p>EAT . DRINK . CONNECT</p>
            <a href="/">Visit Site</a>
          </div>
        </section>
        <Sect4></Sect4>
        <Sect5></Sect5>
        <section className="homeSect6">
          <h2>Embrace a <span>.DMAYOR.</span> Philosophy</h2>
          <div className="philosophyCntn">
            <div className="philosophyUnit">
              <i className="icofont-woman-bird"></i>
              <h3>Positivity</h3>
              <p>We are nurturers: we seek only to encourage, entertain, and empower.</p>
              <span>1.</span>
            </div>
            <span></span>
            <div className="philosophyUnit">
              <i className="icofont-meteor"></i>
              <h3>Fun</h3>
              <p>We know serious fitness is hard, but that doesn&apos;t mean it can&apos;t be an edge-of-your-seat, can&apos;t-get-enough, look-forward-to-your-workouts party.</p>
              <span>2.</span>
            </div>
            <span></span>
            <div className="philosophyUnit">
              <i className="icofont-unity-hand"></i>
              <h3>#NOJUDGEMENT</h3>
              <p>Here we keep open minds. There is no one type or way in our diverse community. Come as you are!</p>
              <span>3.</span>
            </div>
          </div>
        </section>
        <FAQ></FAQ>
        <Footer></Footer>
      </div>
    </main>
  );
}
