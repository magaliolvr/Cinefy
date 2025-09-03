import TvShowList_Detail from "../components/TvShowList_Detail";

function TvShow() {
  return (
    <>
      <h1>Tv Show</h1>
      {/* adicionar algum componente para titulo */}

      <section className="flex-wrap">
        {/* adionar algum componente para galeria */}

        <TvShowList_Detail />
      </section>
    </>
  );
}

export default TvShow;
