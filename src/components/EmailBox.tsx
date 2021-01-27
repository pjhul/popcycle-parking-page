import React from "react";
import { FiMail } from "react-icons/fi";

const ApiGatewayEndpoint = "https://vewxd92oz8.execute-api.us-east-1.amazonaws.com/sign-up";

const EmailBox: React.FC<unknown> = () => {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {

      await fetch(ApiGatewayEndpoint, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          email,
        })
      });

      setMessage("You're all signed up!");
    }
    catch(error) {
      setMessage(error.message);
    }

    setIsLoading(false);
  }

  return (
    <form className="h-10 w-full md:w-auto md:h-12 relative flex items-center" onSubmit={onSubmit}>
      <div className="h-full mr-2 flex items-center px-2 space-x-2 border-2 border-purple text-purple bg-white rounded-md">
        <FiMail className="w-5 h-5 md:w-6 md:h-6" />
        <input className="w-48 md:w-64" onChange={event => setEmail(event.target.value)} placeholder="Enter your email" />
      </div>

      <button type="submit" className="h-full px-6 bg-purple text-white rounded-md">
        Join
      </button>

      { isLoading ? <div className="ml-4 bg-orange w-6 h-6 animate-spin duration-500" /> : null }

      { message ? <div className="absolute top-full mt-2 md:mt-0 md:top-0 md:relative md:ml-4 text-purple italic">{ message }</div> : null }
    </form>
  );
}

export default EmailBox;
