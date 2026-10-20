import "./globals.css";
import './fanta.css'
import Head from "./head";
import Link from "next/link";
import Cart from "@/components/Cart";
import EmailInput from "@/components/EmailInput";
import ProductsProvider from "@/context/ProductContext";

export const metadata = {
  title: "Smolstore",
  description: "A super cool store for programmers and productivity fiends!",
};

export default function RootLayout({ children }) {
  return (
    <ProductsProvider>
      <html lang="en">
        <Head />
        <body >
          <div id="portal" />
          <div id="app" >
            <header>
              <div className="header-content">
                <Link href={'/'}>
                  <h1>Smolstore</h1>
                </Link>
                <h5 className="mid-text">- Cool stuff for cool people -</h5>
                <Cart />
              </div>
            </header>

            <main>
              {children}
            </main>
            <div className="hr" />

            <footer>
              <div className="email-container">
                <h5>Get a sneak peak at new additions to the store, special offers, and so much more.</h5>
                <EmailInput />
              </div>

              <div className="links-container">
                <div>
                  <h3>Rae</h3>
                  <Link target="_blank" href={'https://github.com/Raejiii'}>GitHub</Link>
                  <Link target="_blank" href={'https://www.linkedin.com/in/rahul-joy-suneel-1b90ba300/'}>LinkedIn</Link>
                </div>
                <div>
                  <h3>Store</h3>
                  <Link href={'/'}>Home</Link>
                  <Link href={'/cart'}>Cart</Link>
                </div>
                <div>
                  <h3>Support</h3>
                  <Link href={'/contact'}>Contact</Link>
                  <Link href={'/faq'}>FAQs</Link>
                </div>
              </div>

              <div className="socials">
                <p>Built by <a href="https://github.com/Raejiii" target="_blank">Rahul JS (Rae)</a><br />Built with NextJS & <a target="_blank" href="https://www.fantacss.smoljames.com">FantaCSS</a> 🔥</p>
                <div className="social-links">
                  <Link href={'https://github.com/Raejiii'} target="_blank"><i className="fa-brands fa-github"></i></Link>
                  <Link href={'https://www.linkedin.com/in/rahul-joy-suneel-1b90ba300/'} target="_blank"><i className="fa-brands fa-linkedin"></i></Link>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ProductsProvider>
  );
}
