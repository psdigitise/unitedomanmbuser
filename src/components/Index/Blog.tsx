import { MainBlogCard } from "./Blog/MainBlogCard";
import { BlogSlick } from "./Blog/BlogSlick/BlogSlick";

export const Blog = () => {
  return (
    <section className="lg:py-[60px] md:py-[40px] py-[40px]">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-Montserrat md:text-[40px] text-mindfulBlack font-bold sm:text-[35px] text-[24px] mb-[30px]">
            The Blog
          </h2>
        </div>

        <div>
          <MainBlogCard />
        </div>

        <div>
          <BlogSlick />
        </div>
      </div>
    </section>
  );
};
