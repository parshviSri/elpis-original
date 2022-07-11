import Link from "next/link";

const Footer = () => {
  return (
    <div className="container">
      <div className="flex flex-row">
        <div className="basis-1/3 text-center">
          <Link href="/">
            <img
              src="/Logo.png"
              alt="Logo"
              className="mx-auto"
              width={80}
              height={80}
            />
          </Link>
          <span className="text-4xl">Elpis</span>
          <p>
            Decentralised blogging with ownership and freedom of speech to
            everyone
          </p>
        </div>
        <div className="basis-1/3 text-center">
          <p className="text-2xl">Menu</p>
          <Link href="/">
            <p className="p-2">Home</p>
          </Link>
          <Link href="/dashboard">
            <p className="p-2">SignUp</p>
          </Link>
          <Link href="/community">
            <p className="p-2">Community</p>
          </Link>
          <Link href="/aboutUs">
            <p className="p-2">About Us</p>
          </Link>
        </div>
        <div className="basis-1/3 text-center">
          <p className="text-2xl">Stay connected with us</p>
          <p>Keep in touch with us for all the updates and information</p>
          <div className="flex flex-row">
            <a href="https://twitter.com/_parshvi">
              <img src="/twitter.png" className="p-6" />{" "}
            </a>
            <a href="https://github.com/parshviSri/elpis">
              <img src="/github.png" className="p-6" />{" "}
            </a>
            <a herf="https://discord.gg/vDNpawZmVF">
              <img src="/discord.png" className="p-6" />{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
