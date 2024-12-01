"use client";

import ButtonWithLoading from "@/components/ButtonWithLoading";
import { Button } from "@/components/ui/button";
import {
  useGetUserQuery,
  useLogoutMutation,
} from "@/store/slices/useUserSlice";
import Link from "next/link";

export default function ButtonCondition() {
  const { data } = useGetUserQuery();

  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

  console.log(data);

  const onLogout = async () => {
    try {
      await logout(null).then(() => window.location.reload());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {data !== undefined ? (
        <ButtonWithLoading
          label="Logout"
          type="button"
          onClick={() => onLogout()}
          isLoading={logoutLoading}
        />
      ) : (
        <>
          <Link href="/sign-up">
            <Button variant="outline">Sign Up</Button>
          </Link>
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        </>
      )}
    </div>
  );
}
