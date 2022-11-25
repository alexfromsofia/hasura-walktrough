import { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import {
  GetFriendsQuery,
  GetFriends,
  GetFriendsQueryVariables,
} from "../generated/graphql";
import { client } from "../utils/client";

interface Props {
  friends: GetFriendsQuery["friend"];
}

export const getServerSideProps = ({ req }: GetServerSidePropsContext) => {
  return client
    .query<GetFriendsQuery, GetFriendsQueryVariables>(GetFriends, {})
    .toPromise()
    .then((d) => {
      console.log({ d, data: d.data?.friend });
      return {
        props: { friends: d.data?.friend },
      };
    })
    .catch(console.error);
};

const Home: NextPage<Props> = ({ friends }) => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {friends.map((f) => (
            <div key={f.id}>{f.name}</div>
          ))}
          <Link href="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
