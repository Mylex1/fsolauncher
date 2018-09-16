import IHeader from "../../lib/interfaces/components/IHeader";
import IPost from "../../lib/interfaces/components/IPost";

// fsolauncher
// \src\views\Home\IDispatchProps.ts

export default interface IDispatchProps {
   updateHeader: (header: IHeader) => void;
   updatePosts: (posts: IPost[]) => void;
}
