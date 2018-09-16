// fsolauncher
// \src\views\Home\index.tsx

import * as React from "react";

import { Timeline } from "react-twitter-widgets";
import { connect } from "react-redux";
import { updateHeader, updatePosts } from "../../store/actions";
import { fetchPosts } from "../../lib";

import IProperties from "./IProperties";
import IStateProps from "./IStateProps";
import IDispatchProps from "./IDispatchProps";
import IPost from "../../lib/interfaces/components/IPost";
import IState from "../../lib/interfaces/state/IState";

/**
 * The Home Page component which displays an RSS feed
 * and official Twitter timeline.
 */
class Home extends React.Component<IProperties> {
   public async componentDidMount() {
      this.props.updateHeader({
         subtitle: "Last-minute FreeSO news and Twitter updates",
         title: "Home"
      });

      if (this.props.Posts.length == 0) {
         // Only update if posts are empty.
         fetchPosts(
            (posts: IPost[]) => posts != null && this.props.updatePosts(posts)
         );
      }
   }

   public render(): any {
      const posts = this.props.Posts.map((post: IPost) => (
         <li className="" key={this.props.Posts.indexOf(post).toString()}>
            <h1>{post.headline}</h1>
            <div>{post.date}</div>
            <p>{post.body}</p>
            <a
               className="Button"
               href={post.link}
               target="_blank"
               style={{
                  borderRadius: "999px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  background: "transparent",
                  boxShadow: "none",
                  color: "#4B88E4",
                  marginTop: "30px"
               }}
            >
               READ MORE <i className="material-icons">arrow_drop_down</i>
            </a>
         </li>
      ));

      return (
         <div className="Home">
            <ul className="BlogPosts" style={{ paddingTop: "40px" }}>
               {this.props.Posts.length > 0 ? (
                  posts
               ) : (
                  <li style={{ textAlign: "center" }}>
                     <i
                        className="material-icons"
                        style={{ marginBottom: "20px", fontSize: "30px" }}
                     >
                        cloud_off
                     </i>
                     <br />
                     No blog posts available
                  </li>
               )}
            </ul>
            <div className="TwitterEmbed">
               <Timeline
                  dataSource={{
                     sourceType: "profile",
                     screenName: "FreeSOGame"
                  }}
                  options={{
                     username: "FreeSOGame",
                     height: "600"
                  }}
               />
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state: { launcher: IState }) => {
   return {
      Posts: state.launcher.Posts
   };
};

export default connect<IStateProps, IDispatchProps, any>(
   mapStateToProps,
   { updateHeader, updatePosts }
)(Home);
