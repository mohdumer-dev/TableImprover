import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow-md bg-white">
      {/* Left side - Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        MyApp
      </Link>

      {/* Right side - Auth buttons */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal" afterSignInUrl="/dashboard">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal" afterSignUpUrl="/welcome">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          {/* User avatar + menu (logout included) */}
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}

export default NavBar;
