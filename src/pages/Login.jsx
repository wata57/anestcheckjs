import { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { inputCss } from "../utils/css";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Spinner from "../components/ui/Spinner";
import { useLogin } from "../services/auth/useLogin";
import { useUser } from "../services/auth/useUser";
import { useNavigate } from "react-router-dom";

function Login() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending } = useLogin();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  function handleVisible(e) {
    e.preventDefault();
    setVisible(() => !visible);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email: email.trim(), password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="h-dvh relative p-4 md:p-5 w-full bg-gray-1  md:justify-around gap-5 overflow-hidden">
        <div className="animate-left flex justify-between items-center p-5">
          <h1 className="text-2xl mini:text-2xl sm:text-5xl font-bold text-primary-light">
            AnestCheck
          </h1>
          {/* <h1 className="text-2xl mini:text-2xl sm:text-5xl font-bold text-primary-light ">
            Entrar
          </h1> */}
          {/* <button className=" sm:text-3xl lg:hover:-translate-y-1 border-2 h-10 w-10  rounded-full lg:active:translate-y-1 font-bold transition-all pl-0.5 duration-300 text-primary-light  border-primary-light  ">
            <MdKeyboardArrowLeft size={30} />
          </button> */}
        </div>
        <div className="p-10 w-full lg:w-1/2 rounded-md absolute top-0 md:top-1/2 left-1/2 -translate-x-1/2 translate-y-1/4 md:-translate-y-1/2 flex flex-col items-center gap-4 bg-gray-1">
          <>
            <form>
              <div className="animate-left flex items-center flex-col gap-6 border-b-2 border-primary-light">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 select-none">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      disabled={isPending}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${inputCss} text-gray-950 placeholder:text-gray-500 transition-all duration-300`}
                    />
                    <div className="text-primary-light ">
                      <MdEmail size={30} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div className="relative flex items-center gap-2  select-none">
                    <input
                      type={visible ? "text" : "password"}
                      name="senha"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isPending}
                      className={`${inputCss} placeholder:text-gray-500 transition-all duration-300 text-gray-950`}
                    />
                    <div className="text-primary-light">
                      <RiLockPasswordFill size={30} />
                    </div>
                    <button
                      type="button"
                      className="absolute text-gray-950 right-0 -translate-x-12 select-none"
                      onClick={handleVisible}
                    >
                      {visible ? (
                        <div className="text-primary-light ">
                          <AiFillEyeInvisible size={25} />
                        </div>
                      ) : (
                        <div className="text-primary-light ">
                          <AiFillEye size={25} />
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-10 mb-6 select-none">
                  <button
                    type="button"
                    className="text-sm md:text-lg text-gray-950  transition-all duration-300 font-bold"
                  >
                    Esqueceu sua senha?
                  </button>

                  {!isPending ? (
                    <button
                      type="submit"
                      className="text-sm md:text-2xl tracking-wide bg-primary-light text-white  active:translate-y-1 py-3 px-4 md:px-4 rounded-full  font-bold transition-all duration-300"
                      onClick={handleSubmit}
                    >
                      Entrar
                    </button>
                  ) : (
                    <div className="flex justify-center items-center">
                      <Spinner />{" "}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </>
        </div>
      </div>
    </>
  );
}

export default Login;
