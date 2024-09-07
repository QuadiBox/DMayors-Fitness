import Navbar from '@/components/navbar'
import Link from 'next/link'
import React from 'react'
import "./blog.css"
import Footer from '@/components/Home/Footer'

export const metadata = {
    title: 'Blog | DMayor Fitness & Game Hub',
    description: "Read the latest tips, stories, and updates from DMayor Fitness & Game Hub. Stay informed, inspired, and entertained.",
    openGraph: {
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      title: 'DMayor Fitness Blog',
      description: 'Discover fitness tips, motivational stories, and updates at DMayor Fitness & Game Hub\'s Blog.',
    },
    twitter: {
      card: "Blog",
      creator: "@QuadVox",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      title: 'Latest from the DMayor Fitness Blog',
      description: 'Stay updated with tips, news, and stories on the DMayor Fitness Blog. Learn, grow, and stay inspired!',
    },
}

const Event = () => {
    return (
        <main>
            <div className="grandHomeCntn">
                <Navbar></Navbar>
                <section className='membershipFisrtSect blogs'>
                    <h1>Blogs</h1>
                </section>
                <section className="topicsCntn">
                    <div className="topics">
                        <h2>Welcome to the DMayor Fitness Blog! Here you'll find a treasure trove of informative and inspiring articles designed to fuel your fitness journey. Explore a variety of topics, from workout tips and nutrition advice to motivational stories and success stories from our members. Dive into our collection of engaging blog articles and discover the valuable insights that will empower you to achieve your fitness goals.</h2>
                        <Link href={"/blogs/001"} className="fancyBorderClass unitTopicCntn">
                            <div className="unitTopic">
                                <div className="topBlogImg"><img src="/food_1.jpeg" alt="food image" /></div>
                                <div className="topicdetails">
                                    <h3>Unraveling the Mysteries of Macronutrients: Your Guide to Healthier Eating</h3>
                                    <p>Discover the essential building blocks of nutrition with our comprehensive guide to macronutrients. Learn how proteins, fats, and carbohydrates impact your health and how to balance them for optimal well-being. Whether you&apos;re aiming to boost your energy, build muscle, or maintain a healthy weight, our article provides practical tips and insights to help you make informed dietary choices.</p>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/blogs/002"} className="fancyBorderClass unitTopicCntn">
                            <div className="unitTopic">
                                <div className="topBlogImg"><img src="/wit_h2.jpg" alt="what ever it takes image" /></div>
                                <div className="topicdetails">
                                    <h3>Top 4 Strategies for Staying Motivated and Consistent with Your Gym Routine</h3>
                                    <p>Maintaining motivation and consistency with your gym routine is crucial for long-term success in your health and fitness journey. Let&apos; explore effective strategies to help you stay motivated and consistent, overcome common challenges, and ensure your workouts remain engaging and effective.</p>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/blogs/003"} className="fancyBorderClass unitTopicCntn">
                            <div className="unitTopic">
                                <div className="topBlogImg"><img src="/support_h2.jpg" alt="support image" /></div>
                                <div className="topicdetails">
                                    <h3>Busting Common Fitness Myths: Get the Facts and Improve Your Fitness Journey at DMayor Fitness Hub</h3>
                                    <p>Navigating the world of fitness can sometimes feel like walking through a maze of misconceptions. Whether they&apos;re born out of anecdotal evidence, misinterpreted studies, or old-school thinking, fitness myths are everywhere. As we all strive to achieve our fitness goals, it&apos;s essential to ground our strategies and habits in scientific truth.</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
                <Footer></Footer>
            </div>
        </main>
    )
}

export default Event
