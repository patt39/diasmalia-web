const Members = () => {
  return (
    <>
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-4xl font-pj">
              Our Members & Advisors
            </h2>
          </div>

          <div className="grid max-w-6xl grid-cols-1 px-20 mx-auto mt-12 text-center sm:px-0 sm:grid-cols-2 md:mt-20 gap-x-8 md:grid-cols-4 gap-y-12 lg:gap-x-16 xl:gap-x-20">
            <div>
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-1.png"
                alt=""
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                Jerome Bell
              </p>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Co founder, Chairman, Executive Director
              </p>
            </div>

            <div>
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-2.png"
                alt=""
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                Jerome Bell
              </p>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Co founder, Chairman, Executive Director
              </p>
            </div>

            <div>
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-3.png"
                alt=""
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                Jerome Bell
              </p>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Co founder, Chairman, Executive Director
              </p>
            </div>

            <div>
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/team/1/team-member-4.png"
                alt=""
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">
                Jerome Bell
              </p>
              <p className="mt-2 text-base font-normal text-gray-600 font-pj">
                Co founder, Chairman, Executive Director
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { Members };
