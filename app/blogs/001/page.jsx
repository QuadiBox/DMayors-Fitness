import Link from 'next/link';
import Navbar from "@/components/navbar";
import Footer from '@/components/Home/Footer'
import "../blog.css"

export const metadata = {
    title: 'Blog | DMayor Fitness & Game Hub',
    description: "Read the latest tips, stories, and updates from DMayor Fitness & Game Hub. Stay informed, inspired, and entertained.",
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/001`,
      title: 'DMayor Fitness Blog',
      description: 'Discover fitness tips, motivational stories, and updates at DMayor Fitness & Game Hub\'s Blog.',
    },
    twitter: {
      card: "Blog",
      creator: "@QuadVox",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/001`,
      title: 'Latest from the DMayor Fitness Blog',
      description: 'Stay updated with tips, news, and stories on the DMayor Fitness Blog. Learn, grow, and stay inspired!',
    },
}

const Page = () => {
    return (
        <main className="membershipGrandCntn">
            <div className="grandHomeCntn">
                <Navbar></Navbar>
                <div className='blogGrandCntn'>
                    <section className="blogCntn">
                        <div className="preSect">
                            <Link href={"/"}>Home</Link>
                            <span><i class="icofont-rounded-right"></i></span>
                            <Link href={"/blogs"}>Blogs</Link>
                            <span><i class="icofont-rounded-right"></i></span>
                            <p>Blog - 001 ( Mastering Macro 101 )</p>
                        </div>
                        <h1>Unraveling the Mysteries of Macronutrients: Your Guide to Healthier Eating</h1>
                        <div className="blogImage">
                            <img src="/food_1.jpeg" alt="food image" />
                            <p>Photo by  <span> Jane Trang Doan - Pexels</span></p>
                        </div>
                        <div className="theBlog">
                            <div className="unitBlogSection">
                                <p>Hey there, DMayor Fitness fam! No, this isn&apos;t a burpee challenge or a new spin class announcement. Today, we&apos;re gearing up to talk about something equally important to your fitness journey - <span>Nutrition</span>.</p>
                                <p>We&apos;ve all heard the buzzword &apos;macronutrients&apos; or its street name, &apos;macros&apos;. Maybe you&apos;ve had a buddy tell you they&apos;re &quot;counting their macros&quot; or seen it mentioned on your favourite fitness blog (hey, that&apos;s us!). But what the heck are these &apos;macros&apos;? Grab a protein shake and pull up a chair - it&apos;s time for a light-hearted trip down Nutrition Avenue.</p>
                            </div>
                            <div className="unitBlogSection">
                                <h2>What Are Macronutrients?</h2>
                                <p>Macronutrients, lovingly referred to as &apos;macros&apos;, are the nutrients our bodies need in large amounts to function properly. They provide us with energy (aka calories) and have unique roles in supporting our health. Macronutrients fall into three main categories: carbohydrates, proteins, and fats. Each is equally important - think of them as the lead characters in the sitcom that is your body.</p>
                            </div>
                            <div className="unitBlogSection">
                                <h2>Carbohydrates: The Energizer Bunny</h2>
                                <p>First up, carbohydrates, also known as carbs. These bad boys are like the Energizer Bunny of your body — they keep you going and going and going. They&apos;re your body&apos;s favourite source of energy and help fuel your brain, kidneys, heart muscles, and central nervous system. So, yes, your body is a bit of a carb-addict.</p>

                                <p>Carbs come in two forms: simple (like sugars) and complex (like whole grains and legumes). Complex carbs are the goody-two-shoes in the family — packed with fiber, they release energy slowly, helping you to avoid that mid-afternoon energy crash.</p>
                            </div>
                            <div className="unitBlogSection">
                                <h2>Protein: The Body Builder</h2>
                                <p>Next in the line-up is protein. It&apos;s not just for those bulky guys at the gym, you know! Proteins are the building blocks for your body. They help to build and repair tissues (like after those killer classes at DMayor Fitness), make enzymes and hormones, and support a healthy immune system.</p>

                                <p>Animal-based foods like meat, fish, eggs, and dairy are high in protein, but plant-based pals like beans, nuts, and whole grains can also pack a punch.</p>
                            </div>
                            <div className="unitBlogSection">
                                <h2>Fats: The Unsung Heroes</h2>
                                <p>Finally, we have fats. Now, we know fats often get a bad rap, but they&apos;re actually incredibly important. Fats are the marathon runners of the macronutrient world - they provide long-lasting energy, protect your organs, help with nutrient absorption, and are crucial for brain health.</p>

                                <p>But not all fats wear capes - we&apos;re looking for the unsaturated fats found in avocados, nuts, seeds, and fish, not the saturated and trans fats often found in processed foods.</p>
                            </div>
                            <div className="unitBlogSection">
                                <h2>Your Macronutrient Mix</h2>
                                <p>So, how many carbs, protein, and fat should you be consuming? That&apos;s a great question and, annoyingly, the answer is, &quot;it depends.&quot; Your ideal mix of macros will depend on a variety of factors, including your age, sex, weight, activity level, and fitness goals.</p>

                                <p>For instance, someone looking to build muscle might need more protein, while an endurance runner might need more carbs. It&apos;s all about balance and figuring out what works best for your body and your goals.</p>
                            </div>
                            <div className="unitBlogSection">
                                <h2>Wrapping Up</h2>
                                <p>Remember, our bodies are kind of like cars — they need the right fuel to run at their best. Understanding macronutrients is a crucial part of tuning up your engine and ensuring you&apos;re ready to crush your next workout at DMayor Fitness.</p>

                                <p>In the great food journey, let&apos;s not get too bogged down with the numbers and forget the fundamental rule of nutrition - eat a variety of foods, packed full of the good stuff, and enjoy what you eat.</p>

                                <p>Stay tuned for more nutrition insights from us at DMayor Fitness, and remember, whether you're spinning, lifting, jumping, or squatting - your food is fueling you every step of the way. You've got this!</p>
                            </div>
                            <div className="nextPrev">
                                <Link href={"/blogs/002"} className="n_p next">Up Next <i class="icofont-rounded-right"></i></Link>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer/>
            </div>
    
        </main>
    )
}

export default Page
