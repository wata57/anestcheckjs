const user = {
  nome: "Felipe de Andrade Watai",
  crm: "182779",
};

function Perfil() {
  return (
    <div className="flex-1 flex flex-col">
      {" "}
      <div className="hidden lg:block bg-primary-light p-8"></div>
      <div className=" flex-1 flex w-full lg:w-3/4 lg:mx-auto ">
        <div className="flex-1 flex flex-col items-center  bg-red-500">
          <h1>{user.nome}</h1>
        </div>
        <div className=" flex-1 bg-green-500">{user.crm}</div>
      </div>
      <div className="hidden lg:block bg-primary-light p-8"></div>
    </div>
  );
}

export default Perfil;
