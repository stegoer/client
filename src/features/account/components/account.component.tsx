import AccountNavigation from "@features/account/components/account.navigation";
import UpdateModal from "@features/account/components/modals/update.modal";
import UserData from "@features/account/components/user-data";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import type { User } from "@graphql/generated/codegen.generated";
import type { Dispatch, SetStateAction } from "react";

export type AccountComponentProps = {
  user: User;
  setTitle: Dispatch<SetStateAction<string>>;
};

const AccountComponent = ({
  user,
  setTitle,
}: AccountComponentProps): JSX.Element => {
  const router = useRouter();
  const [modelOpened, setModalOpened] = useState(false);

  // set title on mount
  useEffect(() => {
    setTitle(`account`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // once router is ready set clean router query
  useEffect(() => {
    if (router.isReady) {
      void router.push(
        {
          pathname: router.pathname,
        },
        `${router.pathname}`,
        { shallow: true },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <>
      <UserData user={user} />
      <UpdateModal
        user={user}
        opened={modelOpened}
        setOpened={setModalOpened}
      />
      <AccountNavigation
        user={user}
        disabled={modelOpened}
        onUpdate={() => setModalOpened(true)}
      />
    </>
  );
};

export default AccountComponent;
