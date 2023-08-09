import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="flex flex-col pt-12 md:bg-white md:px-[3.75rem] md:pb-[3.75rem] md:pt-[5rem]">
      <div className="flex flex-col md:flex-row md:justify-between">
        {/* Morent & Our vision */}
        <div className="flex flex-col justify-start gap-4">
          <p className="text-blue500 text-[1.5rem] font-bold not-italic leading-[1.8rem] md:text-[2rem] md:leading-[2.4rem] md:tracking-[0.0625rem]">
            MORENT
          </p>
          <p className="text-gray400 text-[0.75rem] font-medium not-italic leading-6 tracking-[-0.0075rem] md:text-[1rem] md:leading-8 md:tracking-[-0.01rem] md:text-[#13131399]">
            Our vision is to provide convenience <br />
            and help increase your sales business.
          </p>
        </div>
        {/* About, Community and Socials links */}
        <div className="flex flex-row gap-[4.06rem] md:gap-6 lg:mr-[3.75rem] lg:gap-[3.75rem]">
          {/* About, Community */}
          <div className="mt-12 flex flex-col gap-12 min-[500px]:flex-row md:mt-0 md:gap-6 lg:gap-[3.75rem]">
            {footerLinks.slice(0, 2).map((item, i) => (
              <div key={item.title}>
                <h3 className="text-gray900 md:text-gray800 text-[1.25rem] font-semibold not-italic leading-6">
                  {item.title}
                </h3>
                <div className="mt-5 flex flex-col gap-4 sm:mt-6">
                  {item.links.map((link) => (
                    <Link
                      key={link.title}
                      href={link.url}
                      className="text-gray400 text-[1rem] font-medium not-italic leading-[1.2rem] md:text-[#13131399]"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Social links */}
          <div className="mt-12 md:mt-0">
            <h3 className="text-gray900 md:text-gray800 text-[1.25rem] font-semibold not-italic leading-6">
              {footerLinks[2].title}
            </h3>
            <div className="mt-5 flex flex-col gap-4 sm:mt-6">
              {footerLinks[2].links.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className="text-gray400 text-[1rem] font-medium not-italic leading-[1.2rem] md:text-[#13131399]"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Separator className="sm:bg-blue50 hidden sm:mt-12 sm:block md:mt-[3.75rem]" />
      {/* ©2023 MORENT. All rights reserved Privacy & Policy, Terms & Condition */}
      <div className="text-gray900 md:text-gray800 mt-12 flex flex-col text-[0.75rem] font-semibold not-italic leading-6 tracking-[-0.0075rem] sm:flex-row-reverse sm:justify-between md:text-[1rem] md:leading-8 md:tracking-[-0.01rem]">
        <div className="mb-8 flex flex-row justify-between sm:gap-[3.75rem] md:mb-0 md:text-right">
          <Link href="/">Privacy & Policy</Link>
          <Link href="/">Terms & Condition</Link>
        </div>
        <p>©2023 MORENT. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
