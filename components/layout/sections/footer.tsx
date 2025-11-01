import { LogoIcon } from "@/components/icons/Icons";

export const FooterSection = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container grid items-start grid-cols-1 gap-8 py-16 md:grid-cols-3">
        <div className="space-y-3 md:col-span-1">
          <a
            rel="noreferrer noopener"
            href="/"
            className="flex items-center gap-2 text-xl font-bold"
          >
            <LogoIcon />
            PT. Putra Pile Indah
          </a>
          <p className="text-sm text-muted-foreground">
            BIIE Blok C5-1, Sukadami, Cikarang Selatan, Bekasi, Jawa Barat
            17550
          </p>
          <div className="pt-2 space-y-1 text-sm">
            <a
              rel="noreferrer noopener"
              href="mailto:putrapile.info@gmail.com"
              className="block opacity-80 hover:opacity-100"
            >
              Email: putrapile.info@gmail.com
            </a>
            <a
              rel="noreferrer noopener"
              href="tel:+62218972255"
              className="block opacity-80 hover:opacity-100"
            >
              Phone: (021) 8972255
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="overflow-hidden border rounded-md">
            <iframe
              width="100%"
              height="300px"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=PT.%20Putra%20Pile%20Indah%2C%20Jalan%20Inti%20II%2C%20Cibatu%2C%20Bekasi%20Regency%2C%20West%20Java%2C%20Indonesia&maptype=roadmap"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="container text-center pb-14">
        <h3>
          &copy; {new Date().getFullYear()} PT. Putra Pile Indah. All rights
          reserved.
        </h3>
      </section>
    </footer>
  );
};
