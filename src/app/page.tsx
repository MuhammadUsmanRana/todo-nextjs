import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="text-gray-300 body-font min-h-screen">
        {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 z-10 "></div> */}
        {/* main div */}
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          {/* left bar data */}
          <div className=" lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="text-4xl font-bold title-font mb-4 mt-4 ">
              Todo App with Next.js, Tailwind CSS and Redux Toolkit{" "}
              <span className="text-blue-500">(RTK)</span>
            </h1>
            <p className="leading-relaxed mb-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Delectus, facere nostrum. Laboriosam temporibus adipisci quis
              fugit, repellendus eligendi quae dolorem, dicta animi magni vitae
              maxime molestiae quisquam ut explicabo minus.
            </p>
            <Link href="/dashboard">
              <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                Get Started
              </button>
            </Link>
          </div>

          {/* right bar data */}
          <div className=" lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <video style={{ width: "100%", height: "100%" }} controls autoPlay>
              <source src="/public/video.mp4" type="video/mp4" />
              <track
                src="/path/to/captions.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </>
  );
}
