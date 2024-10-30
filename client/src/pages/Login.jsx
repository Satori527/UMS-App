import LoginForm from "../components/LoginForm";


function Login() {
    return (
        <div className="flex flex-row w-full h-svh">

            <div className="flex flex-col justify-center content-center items-center align-middle w-full h-fit min-h-[90vh] ml-52 pt-20 gap-8 "
            style={{boxShadow:  "inset 2px 4px 4px 2px rgba(0, 0, 0, 0.3)"}}>
            
            <LoginForm/>

            </div>
        </div>
    );
}

export default Login;