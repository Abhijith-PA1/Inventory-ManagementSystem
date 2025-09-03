import React from "react";
import home1v from "../../src/assets/Images/home1.mp4";
import home9i from "../../src/assets/Images/home9.jpg";
import home6i from "../../src/assets/Images/home6.png";
import home1i from "../../src/assets/Images/home1.png";
import home2i from "../../src/assets/Images/home2.png";
import home3i from "../../src/assets/Images/home3.jpeg";
import home4i from "../../src/assets/Images/home4.jpg";
import home5i from "../../src/assets/Images/home5.jpeg";
import home7i from "../../src/assets/Images/home7.jpg";
import home8i from "../../src/assets/Images/home8.webp";
import admin1 from "../../src/assets/Images/admin1.jpg";
import admin2 from "../../src/assets/Images/admin2.png";
import admin3 from "../../src/assets/Images/admin3.jpg";
import admin4 from "../../src/assets/Images/admin4.webp";
import home2v from "../../src/assets/Images/home2.mp4";
import home3v from "../../src/assets/Images/home3.mp4";
import home4v from "../../src/assets/Images/home4.webm";
import home5v from "../../src/assets/Images/home5.webm";
import home6v from "../../src/assets/Images/home6.webm";
import { Link } from "react-router-dom";

function Home() {
  const symbols = [
    { icon: "💪", title: "High Strength" },
    { icon: "🛡️", title: "Corrosion Resistant" },
    { icon: "🏗️", title: "Earthquake Proof" },
    { icon: "✅", title: "ISI Certified" },
  ];
  const galleryImage = [
    { gimage: `${home1i}` },
    { gimage: `${home2i}` },
    { gimage: `${home3i}` },
    { gimage: `${home4i}` },
    { gimage: `${home5i}` },
    { gimage: `${home6i}` },
    { gimage: `${home7i}` },
    { gimage: `${home8i}` },
    { gimage: `${home9i}` },
  ];
  const BOD = [
    { image: `${admin1}`, name: "Mr. R.K. Sharma", D: "CEO" },
    { image: `${admin2}`, name: "Ms. Anjali Verma", D: "MD" },
    { image: `${admin3}`, name: "Mr. Vikram Singh", D: "Admin" },
    { image: `${admin4}`, name: "Ms. Neha Mehra", D: "Chef Engineer" },
  ];
  // const video = [ home2v, home3v, home4v, home5v, home6v ]

  return (
    <>
      <div className="h-auto">
        {/* video  */}
        <video src={home1v} autoPlay muted loop></video>
        <div className=" border-1 border-white w-fit h-fit absolute top-1/5 sm:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:p-5 p-2">
          <h1 className="text-white">This App is for maintain work flow</h1>
          <p className="text-center text-green-200">login in to explor</p>
          <Link
            to={"/login"}
            className="btn btn-block btn-success sm:m-3 m-1 btn-outline"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="btn btn-block btn-warning sm:m-3 m-1 btn-outline"
          >
            Register
          </Link>
        </div>
        {/* about */}
        <section className="bg-base-300 m-4 p-4">
          <h1 className="m-8 text-4xl text-amber-700">About Our Company</h1>
          <p className="m-6 ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam
            quasi ex fuga. Inventore, natus dolore nobis officia officiis
            voluptate debitis fugit accusantium. Quisquam cupiditate laboriosam
            aliquid officia laborum totam iure! Consequuntur quisquam beatae
            eveniet dignissimos soluta, ratione cum velit facere quo iure, ipsam
            repudiandae. Possimus id recusandae dignissimos nostrum ratione
            quia, adipisci quasi temporibus maiores modi sapiente harum?
            Molestiae, minus.
          </p>
        </section>
        {/* headlines */}
        <section className="bg-gray-500 p-3">
          <div className="bg-yellow-200 p-4 m-5">
            <h1 className="text-2xl m-3 text-green-600">Headline 1</h1>
            <div className="flex">
              <p className="text-justify m-2 sm:w-[100%] w-[50%]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laborum molestiae nihil ad quis natus animi accusamus dicta,
                quaerat nesciunt, et qui excepturi repellendus dolorem alias
                harum quam consequuntur in tempora? olore Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Quae tenetur laborum ratione
                iusto doloribus! Ducimus beatae eos, esse voluptatem soluta
                veritatis quia officia suscipit ab cumque est magnam autem illo.
              </p>
              <img
                className="rounded-full sm:w-[250px] w-[50%] h-[200px]"
                src={home9i}
                alt=""
              />
            </div>
          </div>
          <div className="bg-base-200 p-4 m-5">
            <h1 className="text-2xl m-3 text-green-600">Headline 1</h1>
            <div className="flex">
              <img
                width={"250px"}
                className="rounded-full sm:w-[250px] w-[50%] h-[200px]"
                src={home6i}
                alt=""
              />
              <p className="text-justify m-2 sm:w-[100%] w-[50%]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laborum molestiae nihil ad quis natus animi accusamus dicta,
                quaerat nesciunt, et qui excepturi repellendus dolorem alias
                harum quam consequuntur in tempora? olore Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Quae tenetur laborum ratione
                iusto doloribus! Ducimus beatae eos, esse voluptatem soluta
                veritatis quia officia suscipit ab cumque est magnam autem illo.
              </p>
            </div>
          </div>
          <div className="bg-yellow-200 p-4 m-5">
            <h1 className="text-2xl m-3 text-green-600">Headline 1</h1>
            <div className="flex">
              <p className="text-justify m-2 sm:w-[100%] w-[50%]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laborum molestiae nihil ad quis natus animi accusamus dicta,
                quaerat nesciunt, et qui excepturi repellendus dolorem alias
                harum quam consequuntur in tempora? olore Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Quae tenetur laborum ratione
                iusto doloribus! Ducimus beatae eos, esse voluptatem soluta
                veritatis quia officia suscipit ab cumque est magnam autem illo.
              </p>
              <img
                width={"250px"}
                className="rounded-full sm:w-[250px] w-[50%] h-[200px]"
                src={home1i}
                alt=""
              />
            </div>
          </div>
        </section>
        {/* features */}
        <section className="py-16 px-6 md:px-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-yellow-600">
            Why Choose Our TMT Bars?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {symbols.map((items) => (
              <div className="p-6 bg-white rounded shadow hover:shadow-lg transition duration-300">
                <div className="text-5xl mb-4">{items.icon}</div>
                <h3 className="text-xl font-semibold">{items.title}</h3>
              </div>
            ))}
          </div>
        </section>
        {/* Gallery */}
        <section className="py-16 px-6 md:px-20 bg-white">
          <h2 className="text-3xl font-bold text-center mb-10 text-yellow-600">
            Gallery: Our Production Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryImage.map((image) => (
              <div className="overflow-hidden rounded shadow hover:shadow-lg transition duration-300">
                <img
                  src={image.gimage}
                  alt={""}
                  className="w-full h-48 object-cover transform hover:scale-105 transition duration-300"
                />
              </div>
            ))}
          </div>
        </section>
        {/* videos */}
        <section className="m-10 md:mx-70">
          <div className="carousel w-full">
            <div id="slide0" className="carousel-item relative w-full">
              <video src={home1v} autoPlay muted loop className="w-full h-full object-cover"></video>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide5" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide1" className="carousel-item relative w-full">
              <video src={home2v} autoPlay muted loop className="w-full h-full object-cover"></video>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide0" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <video src={home3v} autoPlay muted loop className="w-full h-full object-cover"></video>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <video src={home4v} autoPlay muted loop className="w-full h-full object-cover"></video>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <video src={home5v} autoPlay muted loop className="w-full h-full object-cover"></video>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide5" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
            <div id="slide5" className="carousel-item relative w-full">
              <video src={home6v} autoPlay muted loop className="w-full h-full object-cover"></video>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide0" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Board of Directors */}
        <section className="bg-white text-black">
          <div>
            <h1 className="text-center text-4xl p-8 font-bold">
              Board of Directors
            </h1>
            <marquee behavior="scroll" direction=" left" scrollamount="12">
              <div className="flex m-2">
                {BOD.map((data) => (
                  <div className="sm:w-40 w-25 sm:h-50 h-40 sm:mx-18 mx-8">
                    <div className="sm:w-40 w-25 sm:h-40 h-25">
                      <img
                        className="w-full h-full rounded-full"
                        src={data.image}
                        alt=""
                      />
                    </div>
                    <h1 className="text-center">{data.name}</h1>
                    <p className="text-center">{data.D}</p>
                  </div>
                ))}
              </div>
            </marquee>
          </div>
        </section>
        {/* Location */}
        <section className="py-16 px-6 md:px-20">
          <h2 className="text-3xl font-bold text-center mb-8 text-yellow-600">
            our Location
          </h2>
          <div className="sm:w-170 w-full sm:h-100 h-60 mx-auto rounded overflow-hidden shadow-lg">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.719210961265!2d72.86552881535218!3d19.07283078705386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce3d9e0d9c15%3A0xd38a287b130a1a46!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1689980089652!5m2!1sen!2sus"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
