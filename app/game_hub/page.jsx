import HeroSectBg from "@/components/Home/HeroSectBg";
import Navbar from "@/components/navbar";
import Footer from '@/components/Home/Footer'
import FAQGamehub from "./FAQ";

export const metadata = {
    title: 'Game Hub | DMayor Fitness & Game Hub',
    description: "Dive into the Game Hub at DMayor Fitness. From board games to VR, enjoy a wide range of games and activities for everyone.",
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/game_hub`,
      title: 'Experience the Game Hub at DMayor Fitness',
      description: 'Explore our Game Hub and enjoy unlimited access to video games, board games, and more. Fun awaits at DMayor Fitness & Game Hub!',
    },
    twitter: {
      card: "summary_image_large",
      creator: "@QuadVox",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/game_hub`,
      title: 'Game Hub | DMayor Fitness & Game Hub',
      description: 'Ready to play? Check out the Game Hub at DMayor Fitness, where fun has no limits!',
    },
}

const Game_hub = () => {
    return (
        <main className="membershipGrandCntn">
            <div className="grandHomeCntn">
                <Navbar></Navbar>
                <section className='game_hub_Hero_Sect'>
                    <HeroSectBg src={"/gamebg_1.jpg"}></HeroSectBg>
                    <div className="about_Hero_Text_Cntn">
                        <p>Welcome To The Game Hub</p>
                        <h1>IT&apos;S GAME TIME!!!</h1>

                        <button className="heroDownScroller" type="button"><i className="icofont-dotted-down"></i></button>
                        <div className="locationCard"><i className="icofont-map-pins"></i>32 Mafemi Crescent Utako, Abuja, Nigeria.</div>
                    </div>
                </section>
                <section className="detail_Sect2">
                    <p>Welcome to the DMayor Game Hub! Here, fun knows no bounds, and every visit is a new adventure. Dive into an array of exciting experiences, from action-packed <span>video games</span> and classic board games like <span>Monopoly</span>, <span>Chess</span>, and <span>Scrabble</span> to thrilling rounds of <span>Billiards</span>, <span>Air Hockey</span>, and <span>Table soccer</span>. Feeling futuristic? Step into the world of <span>Virtual Reality</span> and push your limits! With free access for our gym members, the Game Hub is your ultimate playground, where relaxation meets exhilaration and friendly competition thrives.</p>

                    <p>Not a gym member yet? No problem! You can enjoy any game for just <b>#NGN1,000</b>, or if you&apos;re feeling fly, take on the challenge of playing them all for a <span>full day</span> at only <b>#NGN10,000</b>. At DMayor, we invite you to come, test your limits, and embrace the spirit of play. Whether you&apos;re looking to unwind, bond with friends, or simply challenge yourself, our Game Hub is the perfect place to unleash your inner gamer. Come experience the fun - <span>You Deserve It!</span></p>
                </section>
                <section className="the_grid_games">
                    <h2>Come, let&apos;s play ...</h2>
                    <div className="grid_cntn">
                        <div className="grid_unit item-1 horizontal">
                            <p className="grid_unittext">Billiards</p>
                        </div>
                        <div className="grid_unit item-2 vertical">
                            <p className="grid_unittext">Video Games</p>
                        </div>
                        <div className="grid_unit item-3 vertical">
                            <p className="grid_unittext">Air Hockey</p>
                        </div>
                        <div className="grid_unit item-4 vertical">
                            <p className="grid_unittext">V.R.</p>
                        </div>
                        <div className="grid_unit item-5 horizontal">
                            <p className="grid_unittext">Table Soccer</p>
                        </div>
                        <div className="grid_unit item-6 horizontal">
                            <p className="grid_unittext">Monopoly</p>
                        </div>
                        <div className="grid_unit item-7 horizontal">
                            <p className="grid_unittext">Chess & more...</p>
                        </div>
                    </div>
                </section>

                <FAQGamehub></FAQGamehub>
                <Footer></Footer>
            </div>
        </main>
    )
}

export default Game_hub
