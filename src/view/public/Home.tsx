const HomePage = () => {
  return (
    <>
      {" "}
      <div className="min-h-screen font-sans">
        <header className="bg-[#1B2A99] text-white flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
              alt="Colegio Crayon's"
              className="h-10"
            />
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="hover:underline">
              Inicio
            </a>
            <a href="#propuesta" className="hover:underline">
              Propuesta educativa
            </a>
            <a href="#vision" className="hover:underline">
              Visión y Misión
            </a>
            <a
              href="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            >
              Aula
            </a>
          </nav>
        </header>
        <section id="propuesta" className="py-12 bg-white px-6 md:px-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A99] mb-4">
            Propuesta Educativa
          </h2>
          <p className="mb-10 text-gray-700">
            Nuestra institución es heredera de una rica tradición pedagógica y
            humanista. Ofrecemos una educación integral que fomente el
            desarrollo intelectual, la formación en valores y la preparación
            para enfrentar los desafíos del mundo contemporáneo. Nuestros
            estudiantes se convierten en ciudadanos responsables y comprometidos
            con la sociedad.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                INICIAL
              </h3>
              <p className="text-gray-700">
                Ofrecemos un entorno cálido y estimulante diseñado para promover
                el desarrollo integral de los niños. Fomentamos la curiosidad,
                la creatividad y el aprendizaje a través del juego, base para
                futuros logros académicos y habilidades sociales.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                PRIMARIA
              </h3>
              <p className="text-gray-700">
                Impulsamos el crecimiento intelectual y emocional de los
                estudiantes mediante una enseñanza interactiva y el uso de
                metodologías modernas. Fomentamos habilidades fundamentales,
                pensamiento crítico y valores éticos en un entorno que promueve
                la confianza.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded shadow">
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                SECUNDARIA
              </h3>
              <p className="text-gray-700">
                Acompañamos a los estudiantes en una etapa crucial de formación
                académica y personal. Nuestro enfoque educativo refuerza la
                autonomía, el pensamiento crítico y la responsabilidad para
                prepararlos para la educación superior y la sociedad.
              </p>
            </div>

            <div>
              <img
                src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747278463/egresados_1_rr8bvi.png"
                alt="Egresados"
                className="rounded shadow object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        <section
          className="relative h-[350px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dszdc6rh8/image/upload/v1747277976/hero_jze7rh.png')",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-[#9c27b0] drop-shadow-lg">
              Una educación integral para un futuro brillante
            </h1>
            <p className="mt-4 text-lg md:text-xl drop-shadow">
              Nuestro compromiso es con el desarrollo académico y personal de
              nuestros estudiantes
            </p>
          </div>
        </section>

        <section className="bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">
              Servicios educativos
            </h2>
            <p className="text-gray-700 mb-10 max-w-3xl mx-auto">
              Contamos con una infraestructura moderna y funcional, diseñada
              para ofrecer un servicio educativo integral que respalde el
              desarrollo académico, investigativo, cultural y recreativo de
              nuestros estudiantes. Nuestro objetivo es contribuir de manera
              significativa al crecimiento personal y profesional de cada uno de
              ellos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "BIBLIOTECA",
                  img: "https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351783/image_1_hqzhgk.png",
                },
                {
                  title: "CAMPOS DEPORTIVOS",
                  img: "https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351783/image_2_ept9xn.png",
                },
                {
                  title: "TALLERES",
                  img: "https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351783/image_3_buq7qi.png",
                },
                {
                  title: "LABORATORIO",
                  img: "https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351783/image_4_mbarfk.png",
                },
                {
                  title: "COMEDOR",
                  img: "https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351783/image_5_nc6cyk.png",
                },
                {
                  title: "INGLÉS",
                  img: "https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_6_bztvlv.png",
                },
                {
                  title: "COMPUTACIÓN",
                  img: "https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_7_tpzewt.png",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="bg-purple-800 text-white text-center py-2 font-semibold">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <img
            src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351783/image_3_f3lxhs.png"
            alt=""
          />
        </section>
        <footer className="bg-[#3b2c88] text-white py-8 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="flex items-center justify-center md:justify-start">
              <img
                src="https://res.cloudinary.com/dszdc6rh8/image/upload/v1747351782/image_1_vhjpzr.png"
                alt="Logo Colegio Crayon's"
                className="h-20"
              />
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-2">CONTACTO</h3>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5h2l3.6 7.59-1.35 2.44a11.042 11.042 0 005.14 5.14l2.44-1.35L19 19v2a2 2 0 01-2 2H7a4 4 0 01-4-4V7a2 2 0 012-2z"
                  />
                </svg>
                974958865
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12l-4-4m0 0l-4 4m4-4v8"
                  />
                  <rect
                    width="16"
                    height="12"
                    x="4"
                    y="6"
                    rx="2"
                    ry="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                pvilcapoma2022@gmail.com
              </p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-2">DIRECCIÓN</h3>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c1.104 0 2-.895 2-2s-.896-2-2-2-2 .895-2 2 .896 2 2 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21c4-4 6-9 6-11a6 6 0 10-12 0c0 2 2 7 6 11z"
                  />
                </svg>
                JR. JOSE PARDO NRO. 181 JUNIN - SATIPO
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
