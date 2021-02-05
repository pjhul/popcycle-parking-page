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

    const emailValidator = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,5}$/;
    if(emailValidator.test(email)) {
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
      catch {
        setMessage("We're having trouble signing you up, please try again later.");
      }
    }
    else {
      setMessage("Please enter a valid email.");
    }

    setIsLoading(false);
  }

  React.useEffect(() => {
    let isMounted = true;

    if(message !== "") {
      setTimeout(() => {
        if(isMounted) {
          setMessage("");
        }
      }, 2000);
    }

    return () => {
      isMounted = false;
    }
  }, [message]);

  return (
    <form className="h-10 w-full md:w-auto md:h-12 relative flex items-center" onSubmit={onSubmit}>
      <div className="group h-full mr-2 flex items-center px-2 space-x-2 border-2 border-purple bg-white rounded-md text-gray-400 focus-within:text-purple">
        <FiMail className="w-5 h-5 md:w-6 md:h-6" />
        <input type="email"
          autoComplete="email"
          autoCapitalize="off"
          className="w-48 md:w-64 outline-none text-purple"
          placeholder="Enter your email"
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <button type="submit" className="h-full px-6 bg-purple text-white rounded-md focus:outline-none focus:ring-4 focus:ring-opacity-60 focus:ring-purple">
        Join
      </button>

      { isLoading ? <div className="ml-4 bg-orange w-6 h-6 animate-spin duration-500" /> : null }

      { message ? <div className="absolute top-full mt-2 text-purple italic whitespace-nowrap">{ message }</div> : null }
    </form>
  );
}

export default EmailBox;
