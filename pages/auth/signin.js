import React from "react";
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";
import { Button } from "@mui/material";

function signIn({ providers }) {
  return (
    //OAuth SignIn from next-auth website
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen justify-center -mt-2 `text-center">
        <img
          className="w-80"
          src="https://cdn.shopify.com/s/files/1/0249/5892/6941/products/stickerirononInstagram-Logo_3840x.png?v=1615134485"
          alt=""
        />
        <p className="ml-4 font-xs italic">
          Instagram Clone -- Built For Educational Purposes Only
        </p>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button
                className="bg-blue-500 text-white rounded-lg hover:bg-blue-900"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
export default signIn;
