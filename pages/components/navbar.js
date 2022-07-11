
import Link from 'next/link';
import { useRouter } from 'next/router';
const NavBar = () =>{
    const router = useRouter();
    return (
      <nav>
        <div className="container max-auto">
          <div className="flex flex-row">
            <div className="basis-1/3">
              <div
                className="flex flex-row"
                onClick={() => {
                  router.push("/");
                }}
              >
                <img
                  src="/Logo.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="animate-bounce"
                />
                <span className="text-4xl p-7">Elpis</span>
              </div>
            </div>
            <div className="basis-1/2">
              <div className="flex flex-row">
                <div className="p-7">
                  <Link href="/" className="p-4">
                    Home
                  </Link>
                </div>
                <div className="p-7">
                  <Link href="/dashboard">SignUp</Link>
                </div>
                <div className="p-7">
                  <Link href="/community">Community</Link>
                </div>
                <div className="p-7">
                  <Link href="/aboutUs">About Us</Link>
                </div>
              </div>
            </div>
            <div className="basis-1/6">
              <div className="absolute top-0 right-1">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default NavBar
