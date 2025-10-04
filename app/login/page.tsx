import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../lib/firebaseClient";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    router.push("/dashboard");
  };
  const signin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Login / Sign up</h1>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="mb-2"/>
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="mb-4"/>
      <div className="flex gap-2">
        <button onClick={signin} className="btn">Sign in</button>
        <button onClick={signup} className="btn">Sign up</button>
      </div>
    </div>
  );
}
