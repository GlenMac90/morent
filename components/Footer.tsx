import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { footerLinks } from "@/constants";

const Footer = () => {
  return (
    <div className="flex w-full bg-white dark:bg-gray900">
      <footer className="flex w-full flex-col bg-white p-6 dark:bg-gray900 xl:px-[2.5rem] xl:pb-[3.75rem] xl:pt-[5rem] 2xl:mx-auto 2xl:max-w-[90rem]">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Morent & Our vision */}
          <div className="flex flex-col justify-start gap-4">
            <p className="text-[1.5rem] font-bold not-italic leading-[1.8rem] text-blue500 md:text-[2rem] md:leading-[2.4rem] md:tracking-[0.0625rem]">
              MORENT
            </p>
            <p className="text-[0.75rem] font-medium not-italic leading-6 tracking-[-0.0075rem] text-gray400 dark:text-white200 md:text-[1rem] md:leading-8 md:tracking-[-0.01rem]">
              Our vision is to provide convenience <br />
              and help increase your sales business.
            </p>
          </div>
          {/* About, Community and Socials links */}
          <div className="flex flex-col gap-12 sm:flex-row md:gap-6 lg:mr-[3.75rem] lg:gap-[3.75rem]">
            {/* About, Community */}
            <div className="mt-12 flex flex-row justify-between sm:gap-12 md:mt-0 md:gap-6 lg:gap-[3.75rem]">
              {footerLinks.slice(0, 2).map((item) => (
                <div key={item.title}>
                  <h3 className="text-[1.25rem] font-semibold not-italic leading-6 text-gray800 dark:text-white100">
                    {item.title}
                  </h3>
                  <div className="mt-5 flex flex-col gap-4 sm:mt-6">
                    {item.links.map((link) => (
                      <Link
                        key={link.title}
                        href={link.url}
                        className="text-[1rem] font-medium not-italic leading-[1.2rem] text-gray400 hover:text-gray800 dark:text-white200 dark:hover:text-blue500"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Social links */}
            <div className="sm:mt-12 md:mt-0">
              <h3 className="text-[1.25rem] font-semibold not-italic leading-6 text-gray800 dark:text-white100">
                {footerLinks[2].title}
              </h3>
              <div className="mt-5 flex flex-col gap-4 sm:mt-6">
                {footerLinks[2].links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.url}
                    className="font-medium not-italic leading-[1.2rem] text-gray400 last:text-[1rem] hover:text-gray800 dark:text-white200 dark:hover:text-blue500"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Separator className="hidden sm:mt-12 sm:block sm:bg-blue50 dark:sm:bg-gray850 md:mt-[3.75rem]" />
        {/* ©2023 MORENT. All rights reserved Privacy & Policy, Terms & Condition */}
        <div className="mt-12 flex flex-col text-[0.75rem] font-semibold not-italic leading-6 tracking-[-0.0075rem] text-gray800 dark:text-white100 sm:flex-row-reverse sm:justify-between md:text-[1rem] md:leading-8 md:tracking-[-0.01rem]">
          <div className="mb-8 flex flex-row justify-between sm:gap-[3.75rem] md:mb-0 md:text-right">
            <Link href="/">Privacy & Policy</Link>
            <Link href="/">Terms & Condition</Link>
          </div>
          <p>©{new Date().getFullYear()} MORENT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
