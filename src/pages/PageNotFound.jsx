import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex relative flex-col h-dvh select-none">
      <div className="flex-1  md:p-10 w-full bg-primary-light text-white dark:bg-dark-bg md:justify-around gap-5">
        <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-5xl">
            Página não encontrada
          </h1>
          <button
            className="p-4 text-lg bg-white text-primary-light rounded-full text-gray-light font-bold"
            onClick={() => navigate(-1)}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
