import Demo from "@/components/ui/demo";

const TechStackSection = () => {
  return (
    <section id="techstack" className="py-xxl">
      <h2 className="font-heading font-black uppercase tracking-tighter text-foreground text-left text-[4rem] leading-none md:text-[6rem] lg:text-[8rem] mb-4 px-4 lg:px-[30px]">
        Tech Stack
      </h2>

      <div className="mt-xl px-4 lg:px-[30px]">
        <Demo />
      </div>
    </section>
  );
};

export default TechStackSection;