import { NextPage } from "next";
import {
  GetFriendsQuery,
  GetFriends,
  GetFriendsQueryVariables,
} from "../generated/graphql";
import styles from "../styles/Home.module.css";
import { client } from "../utils/client";

interface Props {
  friends: GetFriendsQuery["friend"];
}

export const getServerSideProps = () => {
  return client
    .query<GetFriendsQuery, GetFriendsQueryVariables>(GetFriends, {})
    .toPromise()
    .then((d) => ({
      props: { friends: d.data?.friend },
    }))
    .catch(console.error);
};

const Home: NextPage<Props> = ({ friends }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {friends.map(({ name, id }) => (
          <h2 key={id}>{name}</h2>
        ))}
      </main>
    </div>
  );
};

export default Home;
