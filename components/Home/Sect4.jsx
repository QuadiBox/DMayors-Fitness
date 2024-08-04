import Link from "next/link"

const Sect4 = () => {
  return (
    <section className="homeSect4">
        <h2>HEALTH & WELLNESS BLOGS</h2>

        <div className="blogShowcaseCntn">
            <Link href={"/"} className="unitBlogCntn">
                <div className="topBlogImg"></div>
                <div className="bottomBlogData">
                    <h3>Unraveling the Mysteries of Macronutrients: Your Guide to Healthier Eating</h3>
                    <p>Discover the essential building blocks of nutrition with our comprehensive guide to macronutrients. Learn how proteins, fats, and carbohydrates impact your health and how to balance them for optimal well-being. Whether you're aiming to boost your energy, build muscle, or maintain a healthy weight, our article provides practical tips and insights to help you make informed dietary choices.</p>

                    <div className="blogiconholder"><i className="icofont-culinary"></i></div>
                </div>
            </Link>
            <Link href={"/"} className="unitBlogCntn">
                <div className="topBlogImg"></div>
                <div className="bottomBlogData">
                    <h3>Top 4 Strategies for Staying Motivated and Consistent with Your Gym Routine</h3>
                    <p>Maintaining motivation and consistency with your gym routine is crucial for long-term success in your health and fitness journey. Let's explore effective strategies to help you stay motivated and consistent, overcome common challenges, and ensure your workouts remain engaging and effective.</p>

                    <div className="blogiconholder"><i className="icofont-gym"></i></div>
                </div>
            </Link>
            <Link href={"/"} className="unitBlogCntn">
                <div className="topBlogImg"></div>
                <div className="bottomBlogData">
                    <h3>Busting Common Fitness Myths: Get the Facts and Improve Your Fitness Journey at DMayor Fitness Hub</h3>
                    <p>Navigating the world of fitness can sometimes feel like walking through a maze of misconceptions. Whether they're born out of anecdotal evidence, misinterpreted studies, or old-school thinking, fitness myths are everywhere. As we all strive to achieve our fitness goals, it's essential to ground our strategies and habits in scientific truth.</p>

                    <div className="blogiconholder"><i className="icofont-gym-alt-2"></i></div>
                </div>
            </Link>
        </div>
    </section>
  )
}

export default Sect4
