import Link from "next/link";
const Landing = () => {
  return(
    <div>
    <div className="container">
      <div className="flex flex-row">
        <div className="basis-1/2">
          <div className="text-8xl text-white">
            The Next Generation Decentralised Social Media
          </div>
          <div className="text-xl pt-8">
            Decentralised blogging with ownership and freedom of speech to
            everyone
          </div>
          <div className="flex flex-row mt-16">
            <button
              className=" basis-1/2 bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold rounded"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              
              Get Started
            </button>
            <button className=" basis-1/2 outline outline-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-4 px-6 rounded ml-6">
              <Link href="#info">Learn more</Link>
            </button>
          </div>
        </div>

        <div className="basis-1/2 m-2">
          <img src="/tower.png" alt="tower" />
        </div>
      </div>
    </div>
    <div className="container m-16" id="info">
      <div className="text-4xl text-white text-center">
        Why you should use Elpis
      </div>
      <div className="text-xl text-center p-4">
        <p className="p-2">

          Elpis will provide many benefits for everyone using Elpis for their
          Social Activities.
        </p>
        <p className="p-1">

          Here are some important benefits provided by Elpis
        </p>
      </div>
      <div className="flex flex-row">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[#03132e] text-center">
          <div className="px-6 py-4 ">
            <img src="/money.png" className="mx-auto" />
            <div className="font-bold text-xl mb-2">Earn Tokens When Post</div>
            <p className="text-gray-700 text-base">
              We believe it is the creator who should own and benefit from their
              content not the platform. So everytime your post go viral you will
              earn tokens!!
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[#03132e] text-center ml-10">
          <div className="px-6 py-4 ">
            <img src="/Safety.png" className="mx-auto" />
            <div className="font-bold text-xl mb-2">
              Secure and Decentralised
            </div>
            <p className="text-gray-700 text-base">
              We use decentralised file system to store your posts which is
              cryptographically hashed so it is secure and totally decentralised
            </p>
          </div>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[#03132e] text-center ml-10">
          <div className="px-6 py-4 ">
            <img src="/NFT.png" className="mx-auto" />
            <div className="font-bold text-xl mb-2">Mint Your Post as NFT</div>
            <p className="text-gray-700 text-base">
              We help you to save and convert your post as an NFT which you can
              even sell on OpenSea!!
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500  text-center">
        <p className="text-4xl p-8">
          Join us and Lets change the world with Elpis !!
        </p>
        <button
          className="bg-white text-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded m-8"
          onClick={() => {
            router.push("/About Us");
          }}
        >
          Join Us
        </button>
      </div>
    </div>
  </div>
  )
};
export default Landing;
